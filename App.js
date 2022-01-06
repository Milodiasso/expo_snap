// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Login from "./Components/Login.js"
import Inscription from './Components/Register.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './Components/Navbar.js';
import Snap from './Components/Snap.js';
// import home from "../assets/Home_Icon.png"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const App = () => {
  const Stack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator 
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'pink' }}>
        <Tab.Screen style={styles.navbar} name="Navbarss" component={Navbar}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
         />
        <Tab.Screen style={styles.navbar} name="Snap" component={Snap}   
        options={{
          tabBarLabel: 'Snap',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="circle" color={color} size={26} />
          ),
        }}
        />
        {/* <Tab.Screen style={styles.navbar} name="Profil"   
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cube" color={color}  size={26} />
          ),
        }}
        /> */}
      </Tab.Navigator>
    );
  }

  return (
     <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="Snapi" component={MyTabs}   />
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%"

}
});

export default App
