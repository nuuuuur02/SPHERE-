import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, addDoc } from "firebase/firestore";

const CreateChat = ({ navigation }) => {
    const [nameGroup, onChangeName] = useState('');
    const [description, onChangeDescription] = useState('');
    const [photo, onChangePhoto] = useState('');
    const [users, onChangeUsers] = useState('');

    const groups = query(collection(db, 'groups'));

    const fetchPosts = async () => {
        //const groups = query(collection(db, 'groups'));
    }

    const AddGroup = () => {

        const groups = query(collection(db, 'groups'));

        const newGroup = {
            userName: nameGroup,
            messageText: description,
            userImg: photo,
            messageTime: new Date(),
        };

        addDoc(groups, newGroup)
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
                    AddGroup()
                    navigation.navigate('Grupos')
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