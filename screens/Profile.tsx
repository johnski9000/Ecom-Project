import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import auth from "@react-native-firebase/auth";
import LoginComponent from "../components/Login/LoginComponent";
import SignUpComponent from "../components/SignUp/SignUpComponent";
import { useAppSelector } from "../hooks";
import UserProfile from "../components/UserProfile/UserProfile";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
function RegisterLogin() {
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

function UserScreen() {
  return (
    <View>
      <UserProfile />
    </View>
  );
}

export default function Profile({ navigation }: RouterProps) {
  const userState = useAppSelector((state) => state.user);
  console.log(userState);
  return (
    <View style={styles.container}>
      {userState ? <UserScreen /> : <RegisterLogin />}
      <Navigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
