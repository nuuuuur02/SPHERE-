import React, { useState, useEffect, useCallback, useLayoutEffect, Button } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Container } from '../styles/FeedStyles';
import { db } from '../components/ConfigFirebase';
import { query, collection, getDocs } from "firebase/firestore";
import DialogInput from 'react-native-dialog-input';
import * as Location from 'expo-location';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners';
import { Divider, SearchBar } from 'react-native-elements';
import { black } from 'color-name';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const FundacionScreen = () => {

    const navigation = useNavigation();

    const locationInitial = {
        latitude: 0,
        longitude: 0,
    }
    const [fundaciones, setFundaciones] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [distanciaMaxima, setDistanciaMaxima] = useState(100000000); // Define la distancia máxima permitida en kilómetros
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [userPosition, setUserPosition] = useState(locationInitial);
    const [color, setColor] = useState('blue');
    const [searchText, setSearchText] = useState('');

    const getColor = (index) => {
        if (index % 3 === 0) {
            return { backgroundColor: '#ffd37e' }
        } else if (index % 3 === 1) {
            return { backgroundColor: '#dacefc' }
        } else {
            return { backgroundColor: '#b7c1ff' }
        }
    }

    const getColorString = (index) => {
        if (index % 3 === 0) {
            return '#ffd37e'
        } else if (index % 3 === 1) {
            return '#dacefc'
        } else {
            return '#b7c1ff'
        }
    }

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setUserPosition(location)
    }

    const fetchFundaciones = async () => {
        try {
            const q1 = query((collection(db, "fundaciones")));
            const docSnap = await getDocs(q1);
            const fundacionesData = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setFundaciones(fundacionesData);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const colorearData = (fundacionesDataSortedFiltered) => {
        for (let index = 0; index < fundacionesDataSortedFiltered.length; index++) {
            let color;

            // Establecer el color basado en el índice
            if (index % 3 === 0) {
                color = 'pink';
            } else if (index % 3 === 1) {
                color = 'yellow';
            } else {
                color = 'blue';
            }
            fundacionesDataSortedFiltered[index].backgroundColor = color;

            return fundacionesDataSortedFiltered;
        }
    };

    const calcularDistanciaHaversine = (coordenadas1, coordenadas2) => {
        const R = 6371; // Radio de la Tierra en kilómetros
        const lat1 = coordenadas1.latitude;
        const lon1 = coordenadas1.longitude;
        const lat2 = coordenadas2.latitude;
        const lon2 = coordenadas2.longitude;

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = R * c;

        return distancia;
    };

    const filterFundacionesPorDistancia = async (fundacionesData) => {
        // Reemplaza con las coordenadas de tu ubicación actual    
        await getLocation();
        console.log(userPosition.coords);
        const ubicacionActual = userPosition.coords;
        const fundacionesFiltradas = fundacionesData.filter((fundacion) => {
            const distancia = calcularDistanciaHaversine(
                ubicacionActual,
                fundacion.ubicacion
            );
            fundacion.distancia = distancia;
            return distancia <= distanciaMaxima;
        });
        return fundacionesFiltradas;
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getLocation();
        await fetchFundaciones();
        await arreglarFiltros();
        setRefreshing(false);
    }, []);

    const nosFuimos = (item) => {
        Linking.openURL('https://www.google.es/maps/place/' + item.ubicacion);
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={[styles.newsCard, getColor(index)]}
            onPress={() => navigation.navigate('DescripcionFundacion', { item: item })}
        >
            <View style={styles.dir}>
                <Icon style={styles.icono} name="location-outline" size={30}></Icon>
                <View style={styles.textContainerl}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.newsTitle}>{item.nombre}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.newsdirection}>{item.direccion}</Text>
                </View>
            </View>
            <Text style={styles.newsContent}>ver en mapa</Text>

        </TouchableOpacity>

    );

    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleAccept = (input) => {
        setDistanciaMaxima(parseInt(input, 10));
        setDialogVisible(false);
    };

    arreglarFiltros = async () => {
        const fundacionesDataSorted = await filterFundacionesPorDistancia(fundaciones);
        const fundacionesDataSortedFiltered = await fundacionesDataSorted.sort((a, b) => a.distancia - b.distancia);
        const fundacionesDataSortedFilteredColored = await colorearData(fundacionesDataSortedFiltered);
        setFundaciones(fundacionesDataSortedFilteredColored)
    }
    useLayoutEffect(() => {
        (async () => {
            await getLocation();
            await fetchFundaciones();
            await arreglarFiltros();
        })();
    }, [distanciaMaxima]);

    const renderIcon = () => (
        <Icon name="md-search" size={20} style={{ ...styles.actionButtonIcon, color: 'black' }} />
    );

    return (
        <Container style={styles.container}>
            <Text style={styles.titulo}>Fundaciones</Text>
            <SearchBar
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
                clearIcon
                searchIcon={() => < AntDesign name="search1" size={24} color="white" style={{ marginLeft: 10 }} />}
            />
            <View style={{ height: 100 }}></View>
            <TouchableOpacity style={styles.filtro}
                onPress={() => showDialog()}
            >
                <Text style={styles.filtroText}>{distanciaMaxima} km</Text>

            </TouchableOpacity>
            <FlatList
                data={fundaciones}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.lista}
            />
            <View style={{ height: 50 }}></View>

            <DialogInput
                isDialogVisible={isDialogVisible}
                title={"Cambiar Distancia Máxima"}
                message={"Ingrese la nueva distancia máxima (en kilómetros):"}
                hintInput={"Distancia máxima"}
                submitInput={(inputText) => handleAccept(inputText)}
                closeDialog={() => handleCancel()}
                submitText={"Aceptar"}
                cancelText={"Cancelar"}
            />
        </Container>
    );
};

export default FundacionScreen;

const styles = StyleSheet.create({
    // Define estilos para NewsCard según tus necesidades
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: 'white'
    },
    lista: {
        padding: 8,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        margin: 20,
        marginTop: 45,
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
    newsCard: {
        borderRadius: 25,
        padding: 15,
        margin: 8,
        
    },
    dir: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 30
    },
    newsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    newsdirection: {
        fontSize: 10,
    },
    newsContent: {
        fontSize: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 10
    },

    awesomeButton: {
        size: 12,
        marginBottom: -12,
    },
    icono: {
        paddingRight: 10,
        alignSelf: 'center',
        paddingBottom: 3,
    },
    verMapa: {
        alignSelf: 'flex-end',
    },
    filtro: {
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        position: 'absolute',
        top: 110,
        zIndex: 1,
    },
    filtroText: {
        marginLeft: 15,
        marginRight: 15,
        margin:2
    }
});
