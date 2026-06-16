import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useFonts, GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { Link, useRouter } from 'expo-router';
import api from "./api.js";
import styles from "./globalStyle.js";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  // Fonts
  let [fontsLoaded] = useFonts({ GreatVibes_400Regular });
  if (!fontsLoaded) return null;

  const validateForm = () => {
    let errors = {}

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      console.log("Login Success:", response.data);

      setUsername("");
      setPassword("");
      setErrors({});
      router.replace({
        pathname: "/expense",
        params: { loggedInUser: username }
      });

    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardWrapper}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={[styles.form, styles.authForm]}>
            <Text style={styles.head}>Expense Tracker</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, styles.authInput]}
              placeholder="Enter your username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            <View style={styles.messageSlot}>
              {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
            </View>

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, styles.authInput]}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.messageSlot}>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <Link href="/signup" asChild>
              <Text style={styles.loginOrSign}>Don&apos;t have an account? <Text style={styles.blueText}>Sign up</Text></Text>
            </Link>

            <TouchableOpacity style={[styles.saveButton, styles.authButton]} activeOpacity={0.8} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>


          </View>
          <Link href="/admin" asChild>
            <Text style={styles.adminLoginLink} >Admin login</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
