import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Login from "./Login";
import UserScreen from "./UserScreen";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
export default function Profile({ navigation }: RouterProps) {
  return (
    <View style={styles.container}>
      {/* {auth.currentUser ? <UserScreen /> : <Login />}
      <Navigation navigation={navigation} /> */}
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 40,
    backgroundColor: "white",
  },
});
