import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from "react-native-elements";


export default function AllJuegosScreen() {
    const [searchText, setSearchText] = React.useState('');
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}
            onPress={() => navigation.navigate('Descripcion', { item: item })}
        >
            <Text style={styles.Text}>{item.name}</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.dificultText}>{item.difficulty}</Text>
                <Text style={styles.Text} >{item.time}</Text>
            </View>
        </TouchableOpacity >
    );

    return (
        <View >
            <SearchBar
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
                clearIcon
            />
            <View style={{ height: 60 }}></View>
            <SectionList
                sections={Juegos}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                style={styles.container}
            />
        </View>
    );
}

const Juegos = [
    {
        data: [
            { name: 'Canicas', image: require('../assets/Pictos/juego1.png'), time: '10 min', difficulty: 'Dificultad Media', desc: ['Este juego trata de jugar con canicas', 'No se necesita material para este juego', 'El tiempo medio de este juego es de 10 minutos', 'El numero de jugadores puede ser cualquiera', 'El juego empieza con un circulo en el centro y canicas dentro de el', 'por turnos los jugadores lanzan sus canicas intentado sacar las demás', 'quien saque más canicas gana'] },
            { name: 'Pillapilla', image: require('../assets/Pictos/juego2.png'), time: '20 min', difficulty: 'Dificultad Alta', desc: ['Este juego trata de jugar a perseguirse', 'No se necesita material para este juego', 'El tiempo medio de este juego es de 20 minutos', 'El numero de jugadores tiene que ser como minimo de 2', 'El juego empieza con uno de los jugadores como el perseguidor', 'cada vez que el perseguidor alcanze a otro jugador este se convierte en el perseguidor', 'El ultimo perseguidor pierde :C'] },
            { name: 'Rodar el aro', image: require('../assets/Pictos/juego3.png'), time: '5 min', difficulty: 'Dificultad Baja', desc: ['Este juego trata de girar un aro alrededor tuya', 'Para jugar a este juego se necesita un hula hoop', 'El tiempo meio de este juego es de 5 miuntos', 'El numero de jugadores es de 1', 'El juego empieza poniendote el aro en la cintira contigo dentro', 'Tienes que mover la cintura para que el hula hoop se mantenga girando alrededor tuya', 'cuanto más tiempo lo mantengas mejor :D'] },
            { name: 'Escondite', image: require('../assets/Pictos/juego3.png'), time: '20 min', difficulty: 'Dificultad Media', desc: ['Este juego trata de girar un aro alrededor tuya', 'Para jugar a este juego se necesita un hula hoop', 'El tiempo meio de este juego es de 5 miuntos', 'El numero de jugadores es de 1', 'El juego empieza poniendote el aro en la cintira contigo dentro', 'Tienes que mover la cintura para que el hula hoop se mantenga girando alrededor tuya', 'cuanto más tiempo lo mantengas mejor :D'] },

        ],
    },
];

const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginBottom: 45
    },
    itemContainer: {
        height: 70,
        borderRadius: 20,
        margin: 8,
        color: '#000000',
        backgroundColor: '#DACEFC',
        padding: 15

    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Text: {
        fontSize: 16,
        textAlign: 'left',
    },
    dificultText: {
        fontSize: 13,
        color: '#725AB9'
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderRadius: 40,
    },
    searchBarInputContainer: {
        backgroundColor: 'black',
        borderRadius: 40,
    },
});