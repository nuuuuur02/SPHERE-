import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Switch } from 'react-native'
import React, { useState } from 'react'
import { db, auth } from '../components/ConfigFirebase';
import { createUserWithEmailAndPassword, updateProfile, setCustomUserClaims } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('https://i.pinimg.com/564x/3c/81/4a/3c814a534b0cf42c80fd5cba6e2ac07f.jpg')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [isProfessional, setIsProfessional] = useState(false);
    const [descriptionProfessional, setDescriptionProfessional] = useState('');

    const [isFamiliar, setIsFamiliar] = useState(false);
    const [pinFamiliar, setPinFamiliar] = useState('');

    const toggleProfessionalTouchable = () => setIsProfessional(previousState => !previousState);
    const toggleFamiliarTouchable = () => setIsFamiliar(previousState => !previousState);

    const AddUser = () => {

        if (!(email == '' || email == null) && !(password == '' || password == null) && password === repeatPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Después de crear la cuenta, obtenemos la referencia al usuario
                    const user = userCredential.user;

                    // Actualizamos el displayName y photoURL
                    return updateProfile(user, {
                        displayName: nick,
                        photoURL: 'https://i.pinimg.com/564x/3c/81/4a/3c814a534b0cf42c80fd5cba6e2ac07f.jpg',
                    });
                })
                .then(() => {
                    // Add extra parameters to User (is professional? is familiar?)
                    AddParametersUser();
                    navigation.navigate('HomeMain');
                })
                .catch((error) => Alert.alert("Login error:", error.message));
        } else if (email == null || email == '') {
            Alert.alert("Email incorrecto.", "Debe tener una estructura de email@dominio.xxx");
        } else {
            Alert.alert("Contraseña incorrecta", "Las contraseñas no coinciden.");
        }
    }

    // Add the professional and/or familiar parameters to User
    const AddParametersUser = async () => {
        try {
            const newUser = {
                displayName: nick,
                photoURL: photo,
                isProfessional: isProfessional,
                isFamiliar: isFamiliar,
                email: email,
            };

            if (isProfessional) {
                newUser.descriptionProfessional = descriptionProfessional;
            }

            if (isFamiliar) {
                newUser.pin = pinFamiliar;
            }

            await setDoc(doc(db, "user", auth.currentUser?.uid), newUser);
        }
        catch (error) { console.error("Error al añadir los parámetros al usuario", error); }
    }

    const pressedImageButton = () => {
        console.log("button pressed")
    }

    const handleToggle = (opcion) => {
        if (opcion === 'profesional') {
            setProfessional(!isProfessional);
        } else if (opcion === 'familiar') {
            setFamiliar(!isFamiliar);
        }
    };

    return (
        <View
            style={styles.container}
            behavior='padding'
        >

            <View style={styles.titleContainer}>
                <Text style={styles.big}>
                    Crea una{'\n'}cuenta
                </Text>
            </View>
            {/*<TouchableOpacity
                style={styles.button}
                onPress={pressedImageButton}
            ></TouchableOpacity>*/}

            <Text style={styles.titleInput}>
                ¿Quién eres?
            </Text>
            <View style={styles.eleccion}>
                <TouchableOpacity
                    style={[styles.opcion, isProfessional && styles.opcionSeleccionada]}
                    onPress={() => toggleProfessionalTouchable()}
                >
                    <Text style={[styles.textoOpcion, isProfessional && styles.opcionSeleccionadaTexto]}>Experto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.opcion, isFamiliar && styles.opcionSeleccionada]}
                    onPress={() => toggleFamiliarTouchable()}
                >
                    <Text style={[styles.textoOpcion, isFamiliar && styles.opcionSeleccionadaTexto]}>Familiar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.titleInput}>
                    Nombre
                </Text>
                <TextInput
                    placeholder="Nombre"
                    value={nick}
                    onChangeText={text => setNick(text)}
                    style={styles.input}
                >
                </TextInput>
                <Text style={styles.titleInput}>
                    E-Mail
                </Text>
                <TextInput
                    placeholder="E-Mail"
                    value={email}
                    onChangeText={text => setEmail(text.toLowerCase())}
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
                <Text style={styles.titleInput}>
                    Repetir contraseña
                </Text>
                <TextInput
                    placeholder="Repetir contraseña"
                    value={repeatPassword}
                    onChangeText={text => setRepeatPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        AddUser()
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterScreen

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
        height: 50,
        color: 'black'
    },
    buttonContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
    big: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 10,
        color: '#000000',
    },
    titleContainer: {
        justifyContent: "flex-start",
        alignItems: 'flex-start'
    },
    textoOpcion: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 16,
        justifyContent: 'center'
    },
    opcion: {
        backgroundColor: '#A2A2A2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 0,
        borderRadius: 70,
        marginRight: 10,
        height: 50,
        width: '46%'
    },
    opcionSeleccionada: {
        backgroundColor: 'black',
    },
    opcionSeleccionadaTexto: {
        color: 'white'
    },
    eleccion: {
        flexDirection: 'row',
        marginTop: 10
    },
    titleInput: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 14
    }


})