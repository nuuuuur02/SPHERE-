import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { auth, db } from '../components/ConfigFirebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  return (
    <View
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.titleContainer}>
        <Text style={styles.welcome}>
          ¡Bienvenido{'\n'}a Sphere!
        </Text>
      </View>

      <View>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2FIMG_7834-removebg-preview.png?alt=media&token=de1f3bd2-33cc-445d-92d5-467121c616fd' }} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
      <View style= {{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Text>
          ¿Ya tienes cuenta?
        </Text>
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.navButtonText}>
            Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>

    </View >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
    marginTop:60,
  },
  inputContainer: {
    width: "95%",
    alignContent: "flex-start"
  },
  input: {
    backgroundColor: '#E7E7E7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 70,
    marginTop: 10,
    height: 60,
    color: 'black'
  },
  buttonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#A49CFF',
    width: '70%',
    padding: 15,
    borderRadius: 70,
    alignItems: 'center',
    height: 60
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 24,
    textAlign: 'center'
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotButton: {
    marginVertical: 10,
    alignItems: "flex-end"
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A49CFF',
    marginLeft: 5
  },
  logo: {
    height: 350,
    width: 350,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  welcome: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 50,
    color: '#000000'
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: 'flex-start'
  },
  titleInput: {
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 18
  }


})