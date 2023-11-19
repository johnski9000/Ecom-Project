import { View, Text } from "react-native";
import React, { useState } from "react";
import LoginComponent from "../components/Login/LoginComponent";
import SignUpComponent from "../components/SignUp/SignUpComponent";

export default function Login() {
  const [screen, setScreen] = useState("Login");

  function changeScreen() {
    if (screen === "Login") {
      setScreen("Signup");
    } else {
      setScreen("Login");
    }
  }

  return (
    <View>
      {screen === "Login" ? (
        <LoginComponent changeScreen={changeScreen} />
      ) : (
        <SignUpComponent changeScreen={changeScreen} />
      )}
    </View>
  );
}
