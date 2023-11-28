import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalog from "./screens/Catalog";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import Basket from "./screens/Basket";
import Pdp from "./screens/Pdp";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { clearUser, setUser } from "./reducers/userReducer";
import Paypal from "./screens/Paypal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

function MyApp() {
  const dispatch = useDispatch();

  function extractUserData(user) {
    if (!user) return null;

    const { uid, email, displayName, photoURL, emailVerified } = user;
    return {
      uid,
      email,
      displayName,
      photoURL,
      emailVerified,
    };
  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const userData = extractUserData(user);
        dispatch(setUser(userData));
        console.log("User is signed in");
        console.log(userData);
        // You can perform actions when the user is signed in
      } else {
        // User is signed out
        dispatch(clearUser(user));

        console.log("User is signed out");
        // You can perform actions when the user is signed out
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Catalog"
        screenOptions={{ animation: "none" }}
      >
        <Stack.Screen
          name="Catalog"
          component={Catalog}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PDP"
          component={Pdp}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Basket"
          component={Basket}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paypal"
          component={Paypal}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
