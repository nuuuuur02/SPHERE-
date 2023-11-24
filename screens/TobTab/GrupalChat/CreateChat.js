import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput, View, Text, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
import { query, collection, addDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const CreateChat = ({ navigation }) => {
    const [nameGroup, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [photo, onChangePhoto] = useState('');
    const [users, onChangeUsers] = useState('');

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
            await Promise.all(users.map(async (userEmail) => {
                await signInWithEmailAndPassword(auth, userEmail, 'fP');
            }));
        }
        catch (error) {
            if (error.code === 'auth/invalid-email') {
                //El usuario no existe
                Alert.alert("Usuarios incorrectos.", "Asegúrate de que los correos de los usuarios introducidos son correctos y existen en la aplicación.");
                return false;
            } else {
                //El usuario existe
                return true;
            }
        }
    }

    return (
        <View style={styles.container}>
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
                    marginBottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        </View>
    );
};

const Input = props => {
    return (
        <>
            <Text style={styles.boldText}>{ props.property }:</Text>
            <TextInput
                style={styles.inputField}
                onChangeText={ props.onChangeText }
                value={ props.value }
            />
        </>
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
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 50,
        margin: 10,
    },
});

export default CreateChat;