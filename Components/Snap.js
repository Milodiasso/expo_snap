import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Platform, Image, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const Snap = ()=> {
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState('');
    const [token, setToken] = useState('');
    const [toggle, setToggle] = useState(false);
    const [itemValue, setItemValue] = useState('JS')
    const [selected, setSelected] = useState();
    const [contact, setContact] = useState('')
    

    useEffect(() => {
        const getToken = async () => {
            const value = await AsyncStorage.getItem('token')
            setToken(value);
        }
        getToken();
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        axios.get("https://snapi-wac.herokuapp.com/all", {headers : {token : token}})
            .then((res)=>{
                setUsers(res.data.data)
            })
      }, [token])


    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    }

    
    const styles = StyleSheet.create({
        ScrollView: {
            width: '80%',
        },
        
        text : {
            textAlign: "center",
            borderWidth: 2,
            borderColor: 'blue',
            borderRadius: 20,
            padding: 5,
            margin: 3,
            backgroundColor: "grey",
            color: "white"
        }

    })
    function voir_contacts () {
        if(image){
            setToggle(true);
        } else {
            alert("Rien à envoyer")
        }
    }

    const formData = new FormData();
    formData.append("data", {data: image})
    formData.append("type", {type: "image/jpg"})
    formData.append("name", {name: "image/jpg"})
    

    const snapped = axios.post("https://snapi-wac.herokuapp.com/snap", {
        headers : {"Content-Type" : "multipart/form-data", "token" : token}, 
        body : {
            duration : selected,
            to : contact,
            image : formData
        }})
    .then((res)=>{
        console.log(res.data);
    })


    
    return (
        <View /* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' } */>
        <Button title ="envoyer" onPress={snapped}/>
        <Button title="Prendre une photo" onPress={pickImage} />
        { image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
        <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) =>
        setSelected(itemValue) }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
        </Picker>
        { toggle ? <ScrollView style={styles.ScrollView}>
            {
                users ? users.map((user, key) => (
                    <Button style={styles.text} key={key} onPress={()=>setContact(user.email)} >{user.email}</Button>
                )) : <Text>Chargement...</Text>

            }
            </ScrollView> : <Button onPress={voir_contacts} title="Contacts" color="#841584" />
        }
        
        </View>
    );
}

export default Snap