import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../components/ConfigFirebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [blacklistEmails, setBlacklistEmails] = useState([]);

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
      }
      
    };
    fetchBlacklistEmails();

  }, []);

  const SignIn = () => {
    if (email !== null && password !== null && !blacklistEmails.includes(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Log-in ok");
          console.log(blacklistEmails)
          console.log(auth);
          navigation.navigate('HomeMain');
        })
        .catch((error) => Alert.alert("Login error:", error.message));
    } else if (blacklistEmails.includes(email)) {
      Alert.alert("Login error:", "Tu cuenta a sido Baneada");
    } else {
      Alert.alert("Login error:", "Escribe un email y/o contraseña valida.");
    }
  };

  return (
    <View
      style={styles.container}
      behavior='padding'
    >

    <Image
        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2FGroups%2FSphereLogo.jpg?alt=media&token=517e5910-c963-47e2-96b3-2343fbb2ff88" }}
        style={styles.logo}
    />

     


      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text.toLowerCase())}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        >
        </TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            SignIn()
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 70,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 70,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
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