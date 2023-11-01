import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Catalog from './screens/Catalog';
import Search from './screens/Search';
import Favourites from './screens/Favourites';
import Profile from './screens/Profile';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Catalog' screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="Catalog" component={Catalog} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
