import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, FlatList, TextInput } from 'react-native';
import {Divider, useTheme } from '@rneui/themed';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Donar({ navigation, route }) {

  const [isSelected, setSelection] = React.useState(false);
  const [tarjeta, setTarjeta] = React.useState('Numero de tarjeta');
  const [caducidad, setCaducidad] = React.useState('Caduca');
  const [CVV, setCVV] = React.useState('CVV');
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

            <Divider orientation="horizontal" color={'white'}/>

            <TextInput
                style={Styles.inputSeparado}
                onChangeText={setCaducidad}
                value={caducidad}
            />
        </View>

        <Divider orientation="vertical" color={'white'}/>

        <View style={Styles.horizontal}>
            <Text style={Styles.textos}>CVV</Text>

            <Divider orientation="horizontal" color={'white'}/>

            <TextInput
                style={Styles.inputSeparado}
                onChangeText={setCVV}
                value={CVV}
            />
        </View>

        
      </View>
      <CheckBox
        containerStyle={Styles.button}
        title="Guardar información de tarjeta"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        />
        
        <View style={Styles.bottomButtonContainer}>
        <TouchableOpacity
          style={Styles.enviar}>
          <Text style={Styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
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
        width: 'auto',
        marginHorizontal: 20,
        borderWidth: 0,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius:20,
        backgroundColor: '#EBEBEB'
    },
    inputSeparado:{
        height: 40,
        width: 150,
        marginHorizontal: 20,
        borderWidth: 0,
        padding: 10,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor: '#EBEBEB'
    },
    button: {
        backgroundColor: 'white',
        borderColor: 'white',
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
        justifyContent: 'space-evenly'
    },
    fondo:{
        flex: 1,
        backgroundColor: 'white',
    },
    textos: {
        marginHorizontal: 30,
        marginVertical:10,
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
    bottomButtonContainer:{
        margin: 30,
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        flex: 1,
        borderRadius: 20,
        alignSelf:'center',
    },
    enviar: {
        alignSelf: 'flex-end',
        borderRadius: 50,
        backgroundColor: '#b7c1ff', // Color de fondo personalizado
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 320,
    },
    buttonText: {
        color: 'black', // Color del texto
        fontSize: 18,
        textAlign: 'center',
    },
  });