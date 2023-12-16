import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, FlatList, TextInput } from 'react-native';

export default function Donar({ navigation, route }) {
  
  const {item} = route.params
  return (
    <View style={Styles.fondo}>
        <Text style={Styles.titulo}>Introduce tus datos</Text>
        <Text style={Styles.textos}>Número de tarjeta</Text>
        <TextInput></TextInput>
    </View>
  );
};

const Styles = StyleSheet.create({
    titulo:{
        marginTop: 30,
        marginLeft: 30,
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 60,
    },
    foto:{
        marginLeft: 30,
        marginRight:30,
        height: 300,
        width: 300,
    },
    fondo:{
        backgroundColor: 'white',
        height: '100%',
    },
    textos: {
        margin: 30,
        fontSize: 16,
    },
    descripcion:{
        margin: 30,
        fontSize: 16,
    },

    direccion:{
        margin: 30,
        fontSize: 14,
    },
    donar:{
        margin: 30,
        fontSize: 18,
        fontWeight: 'bold'
    },
  });