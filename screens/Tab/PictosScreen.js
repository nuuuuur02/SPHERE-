import { View, Text, Button, SectionList, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export default function Principal({ navigation }) {

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

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={[styles.itemName, darkMode === true ? { color: 'white' } : { color: 'black' }]}>{item.name}</Text>
            <Button title="Jugar"
                onPress={() => navigation.navigate('Descripcion', { item: item })} />
        </View>
    );

    return (
        <SectionList
            sections={Juegos}
            keyExtractor={(item, index) => item + index}
            // renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
        />
    );
}


const Juegos = [
    {
        data: [
            { name: 'Juego 1', image: require('../../assets/Pictos/juego1.png'), desc: ['Este juego trata de jugar con canicas', 'No se necesita material para este juego', 'El tiempo medio de este juego es de 10 minutos', 'El numero de jugadores puede ser cualquiera', 'El juego empieza con un circulo en el centro y canicas dentro de el', 'por turnos los jugadores lanzan sus canicas intentado sacar las demás', 'quien saque más canicas gana'] },
            { name: 'Juego 2', image: require('../../assets/Pictos/juego2.png'), desc: ['Este juego trata de jugar a perseguirse', 'No se necesita material para este juego', 'El tiempo medio de este juego es de 20 minutos', 'El numero de jugadores tiene que ser como minimo de 2', 'El juego empieza con uno de los jugadores como el perseguidor', 'cada vez que el perseguidor alcanze a otro jugador este se convierte en el perseguidor', 'El ultimo perseguidor pierde :C'] },
            { name: 'Juego 3', image: require('../../assets/Pictos/juego3.png'), desc: ['Este juego trata de girar un aro alrededor tuya', 'Para jugar a este juego se necesita un hula hoop', 'El tiempo meio de este juego es de 5 miuntos', 'El numero de jugadores es de 1', 'El juego empieza poniendote el aro en la cintira contigo dentro', 'Tienes que mover la cintura para que el hula hoop se mantenga girando alrededor tuya', 'cuanto más tiempo lo mantengas mejor :D'] },
        ],
    },
];

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        borderTopWidth: 4,
        borderTopColor: '#cac',
        borderBottomWidth: 4,
        borderBottomColor: '#cac',
        padding: 16,
        marginTop: -4,
    },
    itemImage: {
        width: 150,
        height: 150,
        marginRight: 2,
    },
    itemName: {
        fontSize: 18,
        textAlign: 'center',
        flex: 1,
    },
});
