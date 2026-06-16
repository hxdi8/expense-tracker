import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import styles from "./globalStyle.js";
import DateTimePicker from '@react-native-community/datetimepicker';
import api from "./api.js";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AddExpense() {
  const router = useRouter();
  const { loggedInUser } = useLocalSearchParams();
  const username = loggedInUser;

  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const saveExpense = async () => {
    if (!amount || !category) {
      alert("Please fill in the Amount and Category");
      return;
    }

    try {
      await api.post("/api/expenses", {
        username,
        type,
        amount: Number(amount),
        description,
        category,
        date,
      });

      router.back();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to save transaction");
    }
  };

  const data = [
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Bills', value: 'Bills' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Health', value: 'Health' },
    { label: 'Education', value: 'Education' },
    { label: 'Salary', value: 'Salary' },
  ];

  return (
    <View style={styles.keyboardWrapper}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Add Transaction</Text>

          <Text style={styles.label}>Transaction Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "expense" ? styles.activeExpenseButton : styles.inactiveButton
              ]}
              activeOpacity={0.8}
              onPress={() => setType("expense")}
            >
              <Text style={type === "expense" ? styles.activeExpenseText : styles.inactiveButtonText}>
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "income" ? styles.activeIncomeButton : styles.inactiveButton
              ]}
              activeOpacity={0.8}
              onPress={() => setType("income")}
            >
              <Text style={type === "income" ? styles.activeIncomeText : styles.inactiveButtonText}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="₹ 0"
            placeholderTextColor={styles.placeholderStyle.color}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="What was this for?"
            placeholderTextColor={styles.placeholderStyle.color}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Category</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select category"
            searchPlaceholder="Search..."
            value={category}
            onChange={item => setCategory(item.value)}
          />

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            activeOpacity={0.7}
            onPress={() => setShow(true)}
          >
            <Text style={styles.datePickerButtonText}>
              {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShow(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={saveExpense}>
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
