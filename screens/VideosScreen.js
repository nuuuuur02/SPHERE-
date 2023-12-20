import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Linking, Image } from 'react-native';
import { SearchBar } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';

const SearchArticulo = () => {
    const [searchText, setSearchText] = React.useState('');

    function openWebsite(websiteLink) {
        Linking.openURL(websiteLink)
    }

    //Articulos
    const data = [
        { id: 1, nombre: 'Trastorno del Espectro Autista (TEA): Todo lo que debes saber (Síntomas y criterios)', time: '16 octubre 2023', link: 'https://www.youtube.com/watch?v=NBxhzcDCH5g', image: 'https://img.youtube.com/vi/NBxhzcDCH5g/maxresdefault.jpg' },
        { id: 2, nombre: 'El Autismo. Claves para padres, educadores y profesionales.', time: '15 octubre 2023', link: 'https://www.youtube.com/watch?v=FXDt0VRfGeY', image: 'https://img.youtube.com/vi/FXDt0VRfGeY/maxresdefault.jpg' },
        { id: 3, nombre: 'Así es como un niño con autismo percibe el mundo', time: '28 septiembre 2023', link: 'https://www.youtube.com/watch?v=0-X2gqto7Z4', image: 'https://img.youtube.com/vi/0-X2gqto7Z4/sddefault.jpg' },
        { id: 4, nombre: '10 rasgos del AUTISMO INFANTIL - Identifica los PRIMEROS SIGNOS de TEA visibles', time: '23 noviembre 2023', link: 'https://www.youtube.com/watch?v=_R4lWNpsmno', image: 'https://img.youtube.com/vi/_R4lWNpsmno/maxresdefault.jpg' },
    ];

    // Función para renderizar los elementos en grupos de dos
    const renderItem = () => {
        const filteredData = data.filter(elemento => {
            const nombreLowerCase = elemento.nombre.toLowerCase();
            return nombreLowerCase.includes(searchText.toLowerCase());
        });

        return filteredData.map((elemento, index) => (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => openWebsite(elemento.link)}>
                <Image
                    source={{ uri: elemento.image }}
                    style={styles.image}
                />
                <Text style={styles.headerText} numberOfLines={5} ellipsizeMode="tail">{elemento.nombre}</Text>
                <Text style={styles.DateText}>{elemento.time}</Text>
            </TouchableOpacity>
        ));
    };
       

    return (
        <View >
            <SearchBar
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
                clearIcon
                searchIcon={() => < AntDesign name="search1" size={24} color="white" size={24} style={{ marginLeft: 10 }} />}
            />
            <ScrollView>
                <View style={{ height: 60 }}></View>
                <View style={{ alignItems: 'center' }}>
                    {renderItem()}
                </View>
                {/* <View style={{ height: 50 }}></View>*/}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    grupoContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        height: 250,
        width: 350,
        borderRadius: 20,
        margin: 8,
        color: '#000000',
        backgroundColor: '#FFD37E',
        shadowColor: '#ffffff'
    },
    headerText: {
        color: 'black',
        margin: 15,
        marginTop: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DateText: {
        color: 'black',
        position: 'absolute',
        bottom: 20,
        left: 'center',
        fontSize: 12,
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
        backgroundColor: '#313131',
        borderRadius: 40,
    },
    image: {
        height: 150,
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default SearchArticulo;