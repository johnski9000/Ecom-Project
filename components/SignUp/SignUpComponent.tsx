import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function SignUpComponent({ changeScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createProfile(uid: string, email: string) {
    firestore()
      .collection("Users")
      .doc(uid)
      .set({
        email: email,
        previousOrders: [],
      })
      .then(() => {
        console.log("User created!");
      });
  }
  async function registerAndGoToMainFlow() {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        await createProfile(response.user.uid, email);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => registerAndGoToMainFlow()}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeScreen()} style={styles.goBack}>
          <Text style={styles.goBackText}>Go Back</Text>
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
  goBack: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  goBackText: {
    fontWeight: "bold",
  },
});
