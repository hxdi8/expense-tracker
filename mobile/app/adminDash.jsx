import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import api from "./api.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./globalStyle.js";

export default function AdminDash() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExpenses: 0,
    totalAmount: 0,
  })

  const fetchStats = async () => {
    try {
      const response = await api.get("/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      // Filter out users with empty/null usernames to prevent blank items
      const validUsers = response.data.filter(user => user.username && user.username.trim() !== "");
      setUsers(validUsers);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  // Exact-match search filter
  const filteredUsers = searchTerm.trim()
    ? users.filter(user => user.username === searchTerm.trim())
    : users;

  const handleEdit = async (item) => {
    router.push({
      pathname: `/adminEdit`,
      params: {
        id: item._id,
        username: item.username,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.keyboardWrapper}>
      <View style={styles.expenseCard}>
        {/* ─── Admin Dashboard Header ─── */}
        <View style={styles.form}>
          <Text style={styles.adminLogin}>Admin Dashboard</Text>

          {/* Stats row: Users | Expenses */}
          <View style={styles.rowContainer}>
            <View style={[styles.miniStatBox, styles.incomeMiniBox]}>
              <Text style={styles.miniBoxLabel}>Total Users</Text>
              <Text style={styles.incomeMiniValue}>{stats.totalUsers}</Text>
            </View>
            <View style={[styles.miniStatBox, styles.expenseMiniBox]}>
              <Text style={styles.miniBoxLabel}>Total Expenses</Text>
              <Text style={styles.expenseMiniValue}>{stats.totalExpenses}</Text>
            </View>
          </View>

          {/* Total amount */}
          <View style={[styles.miniStatBox, { backgroundColor: "#F0F0F0", marginTop: 12 }]}>
            <Text style={styles.miniBoxLabel}>Total Amount Spent</Text>
            <Text style={styles.balanceValue}>{stats.totalAmount}</Text>
          </View>
        </View>

        {/* ─── Search Input ─── */}
        <TextInput
          style={[styles.input, { marginTop: 20 }]}
          placeholder="Search user..."
          placeholderTextColor="#9AA0A6"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* ─── Users List ─── */}
        <View style={[styles.form, { marginTop: 20 }]}>
          <Text style={styles.historyHeading}>Users</Text>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.transactionItem}>
                <View style={styles.leftBlock}>
                  <Text style={styles.categoryText}>{index + 1}. {item.username}</Text>
                </View>
                <View style={styles.rightBlock}>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.iconButton, styles.editButton]}
                      onPress={() => handleEdit(item)}
                    >
                      <MaterialIcons name="edit" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.iconButton, styles.deleteButton2]}
                      onPress={() => handleDelete(item._id)}
                    >
                      <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
