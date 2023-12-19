import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { auth, db } from '../components/ConfigFirebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [blacklistEmails, setBlacklistEmails] = useState([]);


    // Check before render
    useLayoutEffect(() => {
        // Esta función se ejecutará cada vez que cambie el estado de autenticación
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario está autenticado, puedes realizar acciones específicas para usuarios autenticados
                navigation.navigate('HomeMain');
            }
        });
    }, []);

    useEffect(() => {
    const fetchBlacklistEmails = async () => {
    const blacklistCollectionRef = collection(db, 'listaNegraUsers');
    const blacklistQuery = query(blacklistCollectionRef);

    try {
        const snapshot = await getDocs(blacklistQuery);

        const blacklistData = snapshot.docs[0].data().listaNegra || [];
        setBlacklistEmails(blacklistData);
    } catch (error) {
        console.error('Error fetching blacklist emails:', error);
    }};
    fetchBlacklistEmails();
    }, []);

    const SignIn = () => {
        if (email !== null && password !== null && !blacklistEmails.includes(email)) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigation.navigate('HomeMain');
            })
            .catch((error) => Alert.alert("Login error:", error.message));
        } else if (blacklistEmails.includes(email)) {
            Alert.alert("Login error:", "Tu cuenta ha sido baneada");
        } else {
            Alert.alert("Login error:", "Escribe un email y/o contraseña válida");
        }
    };

    return (
        <View
          style={styles.container}
          behavior='padding'
        >
            <View style={styles.titleContainer}>
              <Text style={styles.big}>
                Accede a{'\n'}tu cuenta
              </Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.titleInput}>
                  E-Mail
                </Text>
                <TextInput
                  placeholder="E-Mail"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
                >
                </TextInput>
                <Text style={styles.titleInput}>
                  Contraseña
                </Text>
                <TextInput
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
                >
                </TextInput>
                <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('ForgottenLogin')}
            >
                <Text style={styles.navButtonText}>
                ¿Olvidaste tu contraseña?
                </Text>
            </TouchableOpacity>
            
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {
                
                 SignIn()
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: 20,
    alignItems: 'flex-start',
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
    marginTop: 175,
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
    color: '#A49CFF',
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
    marginBottom: 0,
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