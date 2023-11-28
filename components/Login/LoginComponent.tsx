import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

export default function LoginComponent({ changeScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function userLogin() {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response.user) {
        console.log("Logged in successfully!");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => userLogin()}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeScreen()}
          style={styles.register}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
    backgroundColor: "white",
    position: "relative",
    padding: 40,
  },
  textInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,

    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },

  buttonContainer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 20,
  },
  loginButton: {
    backgroundColor: "black",
    width: "100%",
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
  register: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontWeight: "bold",
  },
});
