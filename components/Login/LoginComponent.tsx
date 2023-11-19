import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

export default function LoginComponent({ changeScreen }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <View>
      <TouchableOpacity onPress={() => changeScreen()}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <Text>LoginComponent</Text>
    </View>
  );
}
