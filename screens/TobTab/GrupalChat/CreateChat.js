import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    Container,
} from '../../../styles/GrupalChat/MessageStyles';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const CreateChat = ({ navigation }) => {


    
    return (
        <View style={styles.container}>
            <Input property="Nombre" />
            <Input property="Descripción" />
            <Input property="Foto" />
            <Input property="Usuarios" />
            <FontAwesome5.Button
                name="plus-circle"
                size={40}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={() => navigation.navigate('Grupos')}
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
            <TextInput style={styles.inputField} />
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