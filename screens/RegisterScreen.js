import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React,{useEffect, useState} from 'react'

import { useNavigation } from '@react-navigation/native'

const RegisterScreen = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')



  return (
    <View
      style={styles.container}
      behavior='padding'
    >

    <Text style ={styles.text}>Join Sphere Today</Text>
     

      <View style ={styles.inputContainer}>
        <TextInput
          placeholder ="Username"
          value =  {email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          >
        </TextInput>
        <TextInput
          placeholder ="Email"
          value =  {password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          >
        </TextInput>
        <TextInput
          placeholder ="Password"
          value =  {password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          >
        </TextInput>
        <TextInput
          placeholder ="Confirm Password"
          value =  {password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          >
        </TextInput>
      </View>
      
      <View style ={styles.buttonContainer}>
        <TouchableOpacity
          //onPress={handleLogin}
          style ={styles.button}
        >
          <Text style ={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.forgotButton}
        //onPress={() => navigation.navigate('SignupScreen')}
        >
        <Text style={styles.navButtonText}>
          Already have an acount?
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen

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