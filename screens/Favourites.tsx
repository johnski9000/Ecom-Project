import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Navigation from '../components/Navigation/Navigation'

interface RouterProps {
    navigation: NavigationProp<any, any>
  }
export default function Favourites({navigation} : RouterProps) {
return (
    <View style={styles.container}>
    <Text>Catalog</Text>
    <Navigation navigation={navigation}/>
  </View>
)
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      padding: 40,
      backgroundColor:"white"
    }
  })