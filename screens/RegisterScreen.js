import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../components/ConfigFirebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useNavigation } from '@react-navigation/native'

const RegisterScreen = ({ navigation }) => {
    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [password, setPassword] = useState('')

    const AddUser = () => {

        if (email !== null && password !== null) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Después de crear la cuenta, obtenemos la referencia al usuario
                    const user = userCredential.user;

                    // Actualizamos el displayName y photoURL
                    return updateProfile(user, {
                        displayName: nick,
                        photoURL: photo,
                    });
                })
                .then(() => {
                    console.log(auth)
                    navigation.navigate('HomeMain');
                })
                .catch((error) => Alert.alert("Login error:", error.message));
        }
    }

    const UpdateUser = (profileUpdates) => {
        user.updateProfile(profileUpdates)
            .then(() => {
                console.log("User profile updated.");
            })
            .catch((error) => {
                Alert.alert("Login error:", error.message);
            });
    }

    return (
        <View
            style={styles.container}
            behavior='padding'
        >

            <Text style={styles.text}>Join Sphere Today</Text>


            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={nick}
                    onChangeText={text => setNick(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                <TextInput
                    placeholder="Confirm Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
                <TextInput
                    placeholder="Photo"
                    value={photo}
                    onChangeText={text => setPhoto(text)}
                    style={styles.input}
                >
                </TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    //onPress={handleLogin}
                    onPress={() => {
                        AddUser()
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('Login')}
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