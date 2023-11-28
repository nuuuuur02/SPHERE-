import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Image, StyleSheet } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';  
import { doc, getDoc } from 'firebase/firestore';

export default function Principal({ navigation }) {

    const [pinModalVisible, setPinModalVisible] = useState(true);
    const [enteredPin, setEnteredPin] = useState('');
    const [correctPin, setCorrectPin] = useState('');

    useEffect(() => {
        const obtenerPin = auth.onAuthStateChanged(async (user) => {
            if (user) {  
                const userDocRef = doc(db, 'user', user.uid);
                const userDoc = await getDoc(userDocRef);
  
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setCorrectPin(userData.pin);
                    setPinModalVisible(false);
                }
            } else {
                setUserData(null);
                setIsProfessional(false);
                setIsFamiliar(false);
            }
        }); 

        return () => obtenerPin();
    }, []);

    useEffect(() => {
        if (enteredPin === correctPin) {
            setPinModalVisible(false);
        }
    }, [enteredPin, correctPin]);

    const handleImageClick = () => {
        if (enteredPin == correctPin) {
            setPinModalVisible(false);
            console.log('pin correcto')
            console.log(pinModalVisible)
            navigation.navigate('Login'); //Falta canviar que vaja a Principal Evento 
        } else {
            console.warn('PIN incorrecto');
            console.log(enteredPin)
            console.log(correctPin)
        }
    };

  return(
    <View style={styles.container}>
        <Modal isVisible={pinModalVisible}>
            <View style={styles.pinModalContainer}>
                <Text>Ingrese el PIN:</Text>
                    <TextInput
                        style={styles.pinInput}
                        onChangeText={(text) => setEnteredPin(text)}
                        value={enteredPin}
                        keyboardType="numeric"
                        secureTextEntry
                    />
                <Button title="Enviar" onPress={handleImageClick} />
            </View>
        </Modal>
    </View>
  )
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 30,
    },
    item: {
      borderBottomWidth: 1,
      flexDirection: 'row',
      borderBottomColor: 'grey',
      alignItems: 'center',
      maxWidth: '100%',
    },
    image: {
      width: 150,
      height: 150,
      marginRight: 10,
    },
    text: {
      marginVertical: 30,
      marginHorizontal: 30,
      fontSize: 12,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    textButton: {
      marginVertical: 30,
      paddingHorizontal: 30,
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    textInput: {
      width: '90%',
      height: 70,
      borderColor: 'grey',
      borderWidth: 1,
      fontSize: 25,
    },
    modalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchableSave: {
      backgroundColor: 'orange',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 20,
    },
    touchableAdd: {
      backgroundColor: 'blue',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 50,
      maxWidth: 'fit-content',
    },
    pinModalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    pinInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });
  