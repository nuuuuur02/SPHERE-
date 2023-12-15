import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SearchBar } from "react-native-elements";

const SearchArticulo = () => {
    const [searchText, setSearchText] = React.useState('');

    function openWebsite(websiteLink) {
        Linking.openURL(websiteLink)
    }

    //Articulos
    const data = [
        { id: 1, nombre: '¿Cómo reconocer los signos del TEA en niños?', time: '15 noviembre 2023', link: 'https://centropediatrico.es/como-reconocer-los-signos-del-tea-en-ninos/' },
        { id: 2, nombre: '¿Qué son los trastornos del espectro autista?', time: '18 octubre 2023', link: 'https://www.cdc.gov/ncbddd/spanish/autism/facts.html' },
        { id: 3, nombre: 'Tratamientos para los niños con TEA', time: '10 octubre 2023', link: 'https://effectivehealthcare.ahrq.gov/products/autism-update/espanol' },
        { id: 4, nombre: '10 consejos para padres de niños con TEA', time: '29 septiembre 2023', link: 'https://www.neuroxtimular.com/10-consejos-para-padres-de-ninos-con-tea/' },
       /* { id: 5, nombre: 'Elemento 3', time: '23 novimebre 2023' },
        { id: 6, nombre: 'Elemento 4', time: '23 novimebre 2023' },
        { id: 5, nombre: 'Elemento 3', time: '23 novimebre 2023' },
        { id: 6, nombre: 'Elemento 4', time: '23 novimebre 2023' },
        { id: 5, nombre: 'Elemento 3', time: '23 novimebre 2023' },
        { id: 6, nombre: 'Elemento 4', time: '23 novimebre 2023' },*/
    ];

    // Función para renderizar los elementos en grupos de dos
    const renderItem = () => {
        const filteredData = data.filter(elemento => {
            const nombreLowerCase = elemento.nombre.toLowerCase();
            return nombreLowerCase.includes(searchText.toLowerCase());
        });

        return filteredData.map((elemento, index) => {
            if (index % 2 === 0) {
                // Si el índice es par, renderiza un grupo de dos elementos
                const elementoSiguiente = filteredData[index + 1];
                return (
                    <View key={index} style={styles.grupoContainer}>
                        <TouchableOpacity style={styles.itemContainer}
                            onPress={() => openWebsite(elemento.link)}>
                            <Text style={styles.headerText} numberOfLines={5} ellipsizeMode="tail">{elemento.nombre}</Text>
                            <Text style={styles.DateText}>{elemento.time}</Text>
                        </TouchableOpacity>
                        {elementoSiguiente && (
                            <TouchableOpacity style={styles.itemContainer}
                                onPress={() => openWebsite(elementoSiguiente.link)}>
                                <Text style={styles.headerText} numberOfLines={5} ellipsizeMode="tail">{elementoSiguiente.nombre}</Text>
                                <Text style={styles.DateText}>{elementoSiguiente.time}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            }
            return null; // Si el índice es impar, no renderizar nada
        });
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
            />
            <ScrollView>
                <View style={{ height: 60 }}></View>
                {renderItem()}
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
        width: 210,
        height: 150,
        borderRadius: 20,
        margin: 8,
        color: '#000000',
        backgroundColor: '#B7C1FF',
        shadowColor: '#ffffff'
    },
    headerText: {
        color: 'black',
        margin: 15,
        marginTop: 25,
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
        backgroundColor: 'black',
        borderRadius: 40,
    },
});

export default SearchArticulo;