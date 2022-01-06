// import axios from 'axios';
import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import circle from "../assets/circle.png"




const Navbar = ({navigation})=> {
    
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
  
        if (pickerResult.cancelled === true) {
        return;
      }
  
      setSelectedImage({ localUri: pickerResult.uri });
    }

    if(AsyncStorage.getItem('token') === false){
        navigation.navigate('Login')
    }
    const styles = StyleSheet.create({
        navbar: {
            borderWidth: 2,
            borderColor: "grey",
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: 30,

        },
        title: {
            marginTop: 16,
            paddingVertical: 8,
            borderWidth: 4,
            borderColor: "#20232a",
            borderRadius: 6,
            backgroundColor: "red",
            color: "#20232a",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold"
        },
        image : {
            width: 50,
            height: 50

        },
        photo: {
            width: 250,
            height: 250
        },
        buttonFacebookStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#485a96',
            borderWidth: 0.5,
            borderColor: '#fff',
            height: 40,
            borderRadius: 5,
            margin: 5,
          },
    })

    
    if (selectedImage !== null) {
      return (
        <View >
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.photo}
          />
        </View>
      );
    }


    return(
        <View style={styles.navbar} >
            
            <TouchableOpacity onPress={openImagePickerAsync} activeOpacity={0.5}>
                <Image
                    source={ circle }
                    style= {styles.image}
                />
            </TouchableOpacity>

        </View>
    )
}

export default Navbar