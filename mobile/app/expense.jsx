import { Alert, Button, View, Text, FlatList, TouchableOpacity, } from "react-native";
import { useState, useCallback } from "react";
import api, { getScanApi } from "./api.js";
import styles from "./globalStyle.js";
import { useFocusEffect } from "expo-router/react-navigation";
import { Link, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
// import { useFonts, Oi_400Regular } from '@expo-google-fonts/oi';

export default function Expense() {
  const { loggedInUser } = useLocalSearchParams();
  const username = Array.isArray(loggedInUser) ? loggedInUser[0] : loggedInUser;
  // let [fontsLoaded] = useFonts({ Oi_400Regular });
  // if (!fontsLoaded) return null;
  const [expenses, setExpenses] = useState([]);
  const [image, setImage] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await api.get(
        "/api/expenses",
        {
          params: { username },
        }
      );
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [fetchExpenses])
  );

  const deleteExpense = async (id) => {
    try {
      await api.delete(
        `/api/expenses/${id}`,
        {
          params: { username },
        }
      );

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete expense");
    }
  };

  const totals = expenses.reduce(
    (summary, item) => {
      const amount = Number(item.amount) || 0;

      if (item.type === "income") {
        summary.income += amount;
      } else {
        summary.expense += amount;
      }

      return summary;
    },
    { income: 0, expense: 0 }
  );

  const totalBalance = totals.income - totals.expense;
  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-US")}`;

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required to upload the receipt.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      await scanReceipt(result.assets[0]);
    }
  };

  const scanReceipt = async (selectedImage) => {
    const img = selectedImage || image;
    if (!img) {
      Alert.alert("No image", "Please select a receipt image first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("receipt", {
        uri: img.uri,
        type: img.mimeType || "image/jpeg",
        name: img.fileName || "receipt.jpg",
      });
      const response = await getScanApi().post("/api/scan-receipt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const receiptData = response.data;
      console.log("Receipt scanned:", receiptData);
      // Use the scanned data, e.g.:
      Alert.alert("Receipt scanned!", JSON.stringify(receiptData));

      await api.post("/api/expenses", {
        username,
        type: receiptData.type,
        amount: receiptData.amount,
        description: receiptData.description,
        category: receiptData.category,
        date: receiptData.date || new Date().toISOString(),
      });
      fetchExpenses();
      Alert.alert("Success", "Receipt scanned & expense saved!");

    } catch (error) {
      console.error("Scan receipt error:", error);
      Alert.alert("Error", "Failed to scan receipt.");
    }
  };


  return (
    <View style={styles.keyboardWrapper}>
      <View style={styles.expenseCard}>
        <View style={styles.form}>
          <Text style={styles.welcome}>Welcome, {username}!</Text>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>{formatCurrency(totalBalance)}</Text>
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.miniStatBox, styles.incomeMiniBox]}>
              <Text style={styles.miniBoxLabel}>Income</Text>
              <Text style={styles.incomeMiniValue}>{formatCurrency(totals.income)}</Text>
            </View>

            <View style={[styles.miniStatBox, styles.expenseMiniBox]}>
              <Text style={styles.miniBoxLabel}>Expenses</Text>
              <Text style={styles.expenseMiniValue}>{formatCurrency(totals.expense)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.transactionHistory}>
        <Text style={styles.historyHeading}>Transaction History</Text>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isIncome = item.type === "income";

            return (
              <View style={styles.transactionItem}>
                <View style={styles.leftBlock}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <Text style={styles.dateText}>
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </View>

                <View style={styles.rightBlock}>
                  <Text style={[styles.amountText, isIncome ? styles.incomeColor : styles.expenseColor]}>
                    {isIncome ? '+ ' : '- '}₹{item.amount}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteExpense(item._id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View>
        <TouchableOpacity style={[styles.expenseButton, { marginLeft: '45%' }]} activeOpacity={0.85}>
          <Link
            href={{
              pathname: "/addExpense",
              params: { loggedInUser: username },
            }}
            asChild
          >
            <Text style={styles.buttonText}>+ Add expense</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.expenseButton, { marginRight: '45%' }]} activeOpacity={0.85}
          onPress={pickImage}>
          <Text style={styles.buttonText}>+ Receipt image</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
