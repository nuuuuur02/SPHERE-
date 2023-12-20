import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput, View, StyleSheet, Alert, Image, Text, Button, TouchableOpacity,Table, Row, Modal, ScrollView, FlatList } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
import { query, collection, addDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { EventRegister } from 'react-native-event-listeners';
import { doc, getDoc } from 'firebase/firestore';
import {
    CardDiary,
    CardDiaryCom,
    DiaryText,
    AddDiaryBar,
    NoteButton,
    UserImgDiary,
    UserNameDiary,
} from '../../../styles/FeedStyles';


const CreateChat = ({ navigation }) => {
    const [nameGroup, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [photo, onChangePhoto] = useState('');
    const [users, onChangeUsers] = useState('');
    const [userData, setUserData] = useState(null);

    //Theme
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setDarkMode(data)
        })
        return () => {
            //EventRegister.removeAllListeners(listener)
        }
    }, [darkMode])

    const AddGroup = () => {
        try {

            // Dividir la cadena de usuarios y agregar el nuevo usuario al principio
            const actualUsers = users.split(" ")
            actualUsers.unshift(auth.currentUser?.email)

            const groups = query(collection(db, 'groups'));

            const newGroup = {
                userName: nameGroup,
                messageText: description,
                userImg: photo,
                messageTime: new Date(),
                usersInGroup: actualUsers,
            };

            addDoc(groups, newGroup)
        }
        catch (error) {
            console.error('Error al agregar el grupo: ', error);
        }
    }

    const CheckCredentials = () => {
        if (nameGroup != '' && description != '' && photo != '' && users != '') {
            if (checkURL(photo)) {
                checkUsers(users.split(" "))
                    .then((result) => {
                        if (result) {
                            AddGroup();
                            navigation.navigate('Grupos');
                        }
                    })
            } else {
                Alert.alert("Foto incorrecta.", "La foto tiene que ser un enlace.")
            }
        } else if (nameGroup == '') {
            Alert.alert("Nombre del grupo vacío.", "Un grupo debe tener un nombre.")
        } else if (description == '') {
            Alert.alert("Descripción del grupo vacía.", "Un grupo debe tener una descripción.")
        } else if (photo == '') {
            Alert.alert("Foto del grupo vacía.", "Un grupo debe tener una foto.")
        } else if (users == '') {
            Alert.alert("Lista de usuarios vacía.", "Un grupo debe tener al menos 1 usuario en la lista.")
        } else {
            Alert.alert("Datos del grupo incorrectos.", "Por favor, introduce los datos correctamente.")
        }
    }

    const checkURL = (photo) => {
        const urlPattern = /^(https?|http):\/\/[^\s$.?#].[^\s]*$/;
        return urlPattern.test(photo);
    };

    const checkUsers = async (users) => {
        try {
            const results = await Promise.all(users.map(async (userEmail) => {
                try {
                    await fetchSignInMethodsForEmail(auth, userEmail);
                    // El usuario existe
                    return true;
                } catch (error) {
                    // El usuario no existe
                    return false;
                }
            }));

            if (results.includes(false)) {
                Alert.alert("Usuarios incorrectos.", "Asegúrate de que los correos de los usuarios introducidos son correctos y existen en la aplicación.");
                return false;
            } else {
                return true;
            }
        }
        catch (error) {
            console.error("Error al verificar usuarios:", error);
            return false;
        }
    }

    return (
        <View
            style={darkMode === true ? styles.containerDark : styles.container}
            behavior='padding'
        >
            <Text style={styles.title}>Nuevo grupo</Text>
            <Text style={styles.espacio}></Text>
            <Text style={styles.titleSec}>Nombre del grupo</Text>
            <View>
                <Input property="Nombre del grupo" onChangeText={onChangeName} value={nameGroup} />
                <Text style={styles.espacio}></Text>
                <Text style={styles.titleSec}>¿A quién quieres invitar?</Text>
                <Input property="Buscar usuarios" onChangeText={onChangeUsers} value={users} />
                <Text style={styles.espacio}></Text>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', }}>
                <View style={styles.row}>
                <View style={styles.column2}>
                    <UserImgDiary source={{ uri: auth.currentUser.photoURL }} />
                </View>
                <View style={styles.column2}>
                    <Text style={styles.text}>{auth.currentUser.displayName}</Text>
                </View>
                <View style={styles.column2}>
                    <FontAwesome5.Button
                        name="circle"
                        size={40}
                        backgroundColor="#fff"
                        color="#2e64e5"
                        onPress={() => {
                            CheckCredentials();
                        }}
                        style={{
                            marginTop: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' },
                        }}
                    />
                </View>
                </View>
            </View>
                <Text style={styles.espacio}></Text>
                <Input property="Descripción" onChangeText={onChangeDescription} value={description} />
                <Input property="Foto" onChangeText={onChangePhoto} value={photo} />
                
                <FontAwesome5.Button
                    name="plus-circle"
                    size={40}
                    backgroundColor="#fff"
                    color="#2e64e5"
                    onPress={() => {
                        CheckCredentials()
                    }}
                    style={{
                        marginTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' },
                    }}
                    />
            </View>      
        </View>        
    );
};

const Input = props => {
    return (
        <TextInput
            style={styles.inputField}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder={props.property}
        />
    )
}

const loadUserData = async () => {
    const user = auth.currentUser;

    if (user) {
        setUserData({
            photo: user.photoURL,
            nombre: user.displayName,
        });
    }
};

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold',
    },
    inputField: {
        height: 40,
        width: 300,
        borderColor: '#2e64e5',
        borderWidth: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 70,
        marginTop: 15,
        fontFamily: 'Roboto',
    },
    title: {
        fontSize: 40,
        alignSelf: 'flex-start',
        textAlign: 'center',
        marginLeft: 0,
    },
    formContainer: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    titleSec: {
        fontSize: 18,
        alignSelf: 'flex-start',
        textAlign: 'center',
        marginLeft: 0,
        fontWeight: 'bold',
    },
    espacio: {
        marginTop: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 50,
        margin: 10,
        alignSelf: 'flex-start',
    },
    containerDark: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1c1c1c',
        padding: 50,
        margin: 10,
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    table: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },row: {
        flexDirection: 'row',
        width: '100%',
        marginRight: 20,
      },
      column2: {
        borderBottomWidth: 0,
        borderBottomColor: 'black',
        alignItems: 'flex-start',
        alignSelf:'center',
        padding: 8,
      },
      textInCell1: {
        fontSize: 24,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
      },
      textInCell2: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
      },
});

export default CreateChat;