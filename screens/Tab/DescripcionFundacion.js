import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, FlatList } from 'react-native';

export default function DescripcionFundacion({ navigation, route }) {
  
  const {item} = route.params
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white'}}>
        <View style={Styles.fondo}>
            <Text style={Styles.titulo}>{item.nombre}</Text>
            <Image source={{uri: item.urlToImage }} style={Styles.foto}/>
            <Text style={Styles.descripcion}>{item.descripcion}</Text>
            <Text style={Styles.direccion}> {item.direccion}</Text>
            <Text style={Styles.donar} onPress={() => navigation.navigate('Donar', { item: item })}> Quieres donar?</Text>
        </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
    titulo:{
        marginTop: 30,
        marginLeft: 30,
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold'
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