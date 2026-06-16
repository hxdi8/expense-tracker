import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "./api.js";
import styles from "./globalStyle.js";

export default function AdminEdit() {
  const router = useRouter();
  const { id, username: initialUsername } = useLocalSearchParams();

  const [username, setUsername] = useState(initialUsername || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [deletingExpenses, setDeletingExpenses] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/api/expenses", {
        params: { username: initialUsername },
      });
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (newPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const body = { username: username.trim() };

      if (newPassword) {
        body.password = newPassword;
      }

      await api.put(`/api/users/${id}`, body);

      router.back();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const deleteSingleExpense = async (expenseId) => {
    try {
      await api.delete(`/api/expenses/${expenseId}`, {
        params: { username: initialUsername },
      });

      setExpenses((prev) =>
        prev.filter((e) => e._id !== expenseId)
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete expense");
    }
  };

  const handleDeleteAllExpenses = () => {
    Alert.alert(
      "Delete All Expenses",
      `Are you sure you want to delete all ${expenses.length} expense record(s) for "${initialUsername}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingExpenses(true);
            try {
              const response = await api.delete(`/api/expenses/user/${initialUsername}`);
              Alert.alert(
                "Deleted",
                `${response.data.count} expense record(s) deleted successfully.`,
              );
              setExpenses([]);
            } catch (error) {
              console.log(error.response?.data || error.message);
              Alert.alert("Error", "Failed to delete expenses");
            } finally {
              setDeletingExpenses(false);
            }
          },
        },
      ],
    );
  };

  const formatCurrency = (amount) => `₹${Number(amount).toLocaleString("en-US")}`;

  return (
    <View style={styles.keyboardWrapper}>
      <View style={styles.container}>
        <View style={[styles.form, { marginTop: 40 }]}>
          <Text style={styles.heading}>Edit User &quot;{username}&quot;</Text>
          <Text style={styles.label}>New Password (optional)</Text>
          <TextInput
            style={[styles.input, styles.authInput]}
            placeholder="Enter new password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <View style={styles.messageSlot}>
            {errors.newPassword ? (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            ) : null}
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, styles.authInput]}
            placeholder="Confirm new password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.messageSlot}>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.saveButton, styles.authButton]}
            activeOpacity={0.85}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.form, { marginTop: 20, maxHeight: 350 }]}>
          <Text style={styles.historyHeading}>
            Transaction History ({expenses.length})
          </Text>

          {expenses.length === 0 ? (
            <Text style={styles.loginOrSign}>
              No expense records found.
            </Text>
          ) : (
            <FlatList
              data={expenses}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isIncome = item.type === "income";
                return (
                  <View style={styles.transactionItem}>
                    <View style={styles.leftBlock}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                      <Text style={styles.dateText}>
                        {new Date(item.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </View>
                    <View style={styles.rightBlock}>
                      <Text
                        style={[
                          styles.amountText,
                          isIncome ? styles.incomeColor : styles.expenseColor,
                        ]}
                      >
                        {isIncome ? "+ " : "- "}
                        {formatCurrency(item.amount)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => deleteSingleExpense(item._id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>

        <View style={[styles.form, { marginTop: 20, marginBottom: 40 }]}>
          <Text style={[styles.historyHeading, { color: "#C5221F", marginBottom: 8 }]}>
            Danger Zone
          </Text>
          <Text style={styles.dateText}>
            Delete all {expenses.length} expense record(s) for this user at once.
          </Text>
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: "#D93025",
                opacity: deletingExpenses || expenses.length === 0 ? 0.5 : 1,
              },
            ]}
            activeOpacity={0.85}
            onPress={handleDeleteAllExpenses}
            disabled={deletingExpenses || expenses.length === 0}
          >
            <Text style={styles.saveButtonText}>
              {deletingExpenses
                ? "Deleting..."
                : `Delete All Expenses`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
