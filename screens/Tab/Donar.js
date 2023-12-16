import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, FlatList, TextInput } from 'react-native';
import {Divider, useTheme } from '@rneui/themed';

export default function Donar({ navigation, route }) {
  const [tarjeta, setTarjeta] = React.useState('Numero de tarjeta');
  const {item} = route.params
  return (
    <View style={Styles.fondo}>
        <Text style={Styles.titulo}>Introduce tus datos</Text>
        <Text style={Styles.textos}>Número de tarjeta</Text>
        <TextInput
        style={Styles.input}
        onChangeText={setTarjeta}
        value={tarjeta}
      />
      <View style={Styles.vertical}>
        <View style={Styles.horizontal}>
            <Text style={Styles.textos}>Caduca</Text>

            <Divider orientation="horizontal" />

            <TextInput
                style={Styles.input}
                onChangeText={setTarjeta}
                value={tarjeta}
            />
        </View>

        <Divider orientation="vertical" />

        <View style={Styles.horizontal}>
            <Text style={Styles.textos}>CVV</Text>

            <Divider orientation="horizontal" />

            <TextInput
                style={Styles.input}
                onChangeText={setTarjeta}
                value={tarjeta}
            />
        </View>
      </View>
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
    input:{
        height: 40,
        marginHorizontal: 20,
        borderWidth: 0,
        padding: 10,
        paddingHorizontal: 10,
        borderRadius:20,
        backgroundColor: '#EBEBEB'
    },
    foto:{
        marginLeft: 30,
        marginRight:30,
        height: 300,
        width: 300,
    },
    vertical: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textosVertical:{
        textAlign: 'center',
        textAlignVertical: 'center'
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