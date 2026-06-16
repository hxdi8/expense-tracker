import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import api from "./api.js";
import styles from "./globalStyle.js";
import { useFocusEffect } from "@react-navigation/native";
import { Link, useLocalSearchParams } from "expo-router";
// import { useFonts, Oi_400Regular } from '@expo-google-fonts/oi';

export default function Expense() {
  const { loggedInUser } = useLocalSearchParams();
  const username = Array.isArray(loggedInUser) ? loggedInUser[0] : loggedInUser;
  // let [fontsLoaded] = useFonts({ Oi_400Regular });
  // if (!fontsLoaded) return null;
  const [expenses, setExpenses] = useState([]);

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

      <TouchableOpacity style={styles.expenseButton} activeOpacity={0.85}>
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
    </View>
  );
}
