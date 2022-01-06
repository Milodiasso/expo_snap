import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ActivityIndicator, FlatList } from 'react-native';


const axios = require('axios');

const Inscription = ({navigation})=> {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = () => {
    axios.post('https://snapi-wac.herokuapp.com/inscription', {email: email,password : password})
        .then((response) => {
            console.log(response.data)
            navigation.navigate('Login')
        })
        .catch(function (error) {
            // handle error
            console.log(error);
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
            <Text> Inscription </Text>
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
                title="S'inscrire"
                onPress={() => register()}
            />
            <Button
                title="Connexion"
                onPress={() => navigation.navigate('Login')}
            />

        </View>
    )
}

export default Inscription



