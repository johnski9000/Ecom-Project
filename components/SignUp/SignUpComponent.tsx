import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

export default function SignUpComponent({ changeScreen }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const createProfile = async (response: any) => {
    db().ref(`/users/${response.user.uid}`).set({});
  };

  const registerAndGoToMainFlow = async () => {
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (response.user) {
          await createProfile(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => changeScreen()}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text>SignUpComponent</Text>
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <TouchableOpacity onPress={() => registerAndGoToMainFlow()}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
