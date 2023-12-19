import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'

const ForgottenLoginScreen = () => {

    return (
        <View
          style={styles.container}
          behavior='padding'
        >
            <View style={styles.titleContainer}>
              <Text style={styles.big}>
                ¿Olvidaste{'\n'}tu contraseña?
              </Text>
            </View>
            <Text style={{ fontSize: 16, marginRight: 10 }}>
              Escribe a continuación el e-mail con el que registraste tu cuenta.{'\n'}{'\n'}Si el e-mail se encuentra registrado, te enviaremos un link para que puedas restablecer tu contraseña.
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.titleInput}>
                  E-Mail
                </Text>
                <TextInput
                  placeholder="E-Mail"
                  style={styles.input}
                >
                </TextInput>
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Enviar link</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgottenLoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: 20,
    alignItems: 'flex-start'

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
    marginTop: 325,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
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
    color: 'white',
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
    color: '#C83CF4',
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
  big: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 70,
    color: '#000000',
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