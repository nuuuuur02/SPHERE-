import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, addDoc } from "firebase/firestore";
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
            const groups = query(collection(db, 'groups'));

            const newGroup = {
                userName: nameGroup,
                messageText: description,
                userImg: photo,
                messageTime: new Date(),
            };

            addDoc(groups, newGroup)
        }
        catch (error) {
            console.error('Error al agregar el grupo: ', error);
        }
    }   
    
    return (
        <View style={darkMode === true ? styles.containerDark : styles.container}>
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
                    AddGroup()
                    navigation.navigate('Grupos')
                }}
                style={{
                    marginBottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' }
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
        backgroundColor: 'white',
        padding: 50,
        margin: 10,
    },
    containerDark: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#1c1c1c',
        padding: 50,
        margin: 10,
    },
});

export default CreateChat;