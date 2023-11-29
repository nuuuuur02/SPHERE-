import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput, View, StyleSheet, Alert, Image } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
import { query, collection, addDoc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { EventRegister } from 'react-native-event-listeners';

const CreateChat = ({ navigation }) => {
    const [nameGroup, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [photo, onChangePhoto] = useState('');
    const [users, onChangeUsers] = useState('');

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
            <Image
                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2FGroups%2FSphereLogo.jpg?alt=media&token=517e5910-c963-47e2-96b3-2343fbb2ff88" }}
                style={styles.logo}
            />
            <View>
                <Input property="Nombre" onChangeText={onChangeName} value={nameGroup} />
                <Input property="Descripción" onChangeText={onChangeDescription} value={description} />
                <Input property="Foto" onChangeText={onChangePhoto} value={photo} />
                <Input property="Usuarios" onChangeText={onChangeUsers} value={users} />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 50,
        margin: 10,
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
});

export default CreateChat;