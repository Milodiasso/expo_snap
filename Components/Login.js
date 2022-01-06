import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text, View, Image, Button, TextInput, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation})=> {
    const getData = async () => {
        try {
             const value = await AsyncStorage.getItem('token')
            if(value) {
            navigation.navigate('Snapi')         
            }
        } catch(e) {
            return false;
        }
      }

      useEffect(() => {
        getData()
      }, [])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          console.log(e);
        }
    }

    const login = () => {
        axios.post("https://snapi-wac.herokuapp.com/connection", {email: email, password: password})
        .then((res)=>{
            storeData(res.data.data.token)
            navigation.navigate('Snapi')
        })
        .catch((err)=>{
            alert("Mot de passe ou email incorrect")
        })
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
    });

    return (
        <View style={styles.container}>
            <Text> Connexion </Text>
            <Text> Email</Text>
            <TextInput
                onChangeText={setEmail}
                style={{
                height: 40,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                // onChangeText= {handleChange(e)}
                }}
            />
            <Text> Password </Text>
            <TextInput 
                secureTextEntry={true} 
                onChangeText={setPassword}
                style={{
                height: 40,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                }}
            />
            <Button
                title="Connecter"
                onPress={() => login()}
            />
            <Button
                title="Inscription"
                onPress={() => navigation.navigate('Inscription')}
            />

        </View>
    )
}

export default Login