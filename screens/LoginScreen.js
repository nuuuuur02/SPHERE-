import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../components/ConfigFirebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from '@react-navigation/native'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const SignIn = () => {
        if (email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("Log-in ok");
                    console.log(auth)
                    navigation.navigate('HomeMain');
                })
                .catch((error) => Alert.alert("Login error:", error.message));
        }
    }

    return (
    <View
        style={styles.container}
        behavior='padding'
    >

    <Image
        source={require('../assets/twit.png')}
        style={styles.logo}
        />
     

        <View style ={styles.inputContainer}>
            <TextInput
                placeholder ="Email"
                value =  {email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                >
            </TextInput>
            <TextInput
                placeholder ="Password"
                value = {password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                >
            </TextInput>
        </View>
      
        <View style ={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {
                    SignIn()
                }}
                style = {styles.button}
            >
            <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: 'center',

  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor :"white",
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:70,
    marginTop:15,
  },
  buttonContainer : {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    
  },
  button : {
    backgroundColor:'#0782F9',
    width:'100%',
    padding:15,
    borderRadius:70,
    alignItems:'center'
  },
  buttonOutline : {
    backgroundColor: 'white',
    marginTop:5,
    borderColor:'#0782F9',
    borderWidth:2,
  },
  buttonText : {
    color: 'white',
    fontWeight:'700',
    fontSize:16,
  },
  buttonOutlineText:{
    color: '#0782F9',
    fontWeight:'700',
    fontSize:16,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e64e5',
    
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
   
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },


})