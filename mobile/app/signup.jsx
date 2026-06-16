import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useFonts, GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { Link } from 'expo-router';
import api from "./api.js";
import styles from "./globalStyle.js";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Fonts
  let [fontsLoaded] = useFonts({ GreatVibes_400Regular });
  if (!fontsLoaded) return null;

  const validateForm = () => {
    let errors = {}

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!confirmpass) {
      errors.confirmpass = "Confirm password is required";
    } else if (password !== confirmpass) {
      errors.confirmpass = "Password does not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await api.post("/api/auth/signup", {
        username,
        password,
      });
      console.log("Signup Success:", response.data);


      setUsername("");
      setPassword("");
      setConfirmpass("");
      setErrors({});
      setSuccess(true);


    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("MESSAGE:", error.message);

      alert(error.response?.data?.message || error.message);
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

            <Text style={styles.label}>Confirm your password</Text>
            <TextInput
              style={[styles.input, styles.authInput]}
              placeholder="Confirm password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmpass}
              onChangeText={setConfirmpass}
            />
            <View style={styles.messageSlot}>
              {errors.confirmpass ? <Text style={styles.errorText}>{errors.confirmpass}</Text> : null}
            </View>

            <Link href="/" asChild>
              <Text style={styles.loginOrSign}>Already have an account? <Text style={styles.blueText}>Log in</Text></Text>
            </Link>


            <TouchableOpacity style={[styles.saveButton, styles.authButton]} activeOpacity={0.8} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            {
              success ? <Text style={styles.successText}>Signup successful! Please login</Text> : null
            }
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
