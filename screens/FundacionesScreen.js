import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native';
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

const FundacionScreen = () => {

  const navigation = useNavigation();

    const locationInitial = {
        latitude: 0,
        longitude: 0,
    }
    const [fundaciones, setFundaciones] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [distanciaMaxima, setDistanciaMaxima] = useState(10000000000); // Define la distancia máxima permitida en kilómetros
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
      <TouchableOpacity style={styles.itemContainer}
            onPress={() => navigation.navigate('DescripcionFundacion', { item: item })}
        >
        <View style={[styles.newsCard, getColor(index)]}>
          <View style={styles.vertical}>
            <Icon style={styles.icono} name = "location-outline" size={30}></Icon>
            <Divider orientation="vertical" color={getColorString(index)}/>
            <View style={styles.horizontal}>
              <Text style={styles.newsTitle}>{item.nombre}</Text>
              <Divider orientation="horizontal" color={getColorString(index)}/>
              <Text style={styles.newsdirection}>{item.direccion}</Text>
              <Divider style={styles.Divisor} orientation="horizontal" color={getColorString(index)}/>
              <Text style={styles.newsContent}>ver en mapa</Text>
            </View>
          </View>
        </View>
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

    return (

    <Container style={darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: 'white' }}>

      <Text style={styles.titulo}>Fundaciones</Text>

      <SearchBar
      placeholder="Buscar fundaciones..."
      onChangeText={(text) => setSearchText(text)}
      value={searchText}
      inputStyle={styles.inputStyle}
      containerStyle={styles.searchBarContainer}
    />

      <FlatList
        data={fundaciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <ActionButton
        buttonColor="#d9cffb"
        onPress={() => showDialog()}
        renderIcon={renderIcon}
        style={{ position: 'absolute', bottom: 40, right: 0 }}
      />
            
            
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
    fontSize:30,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    margin: 20,
    borderRadius: 22,
    backgroundColor: '#313131',
    borderColor:'#313131',
    width: '90%',
  },
  inputStyle: {
    backgroundColor: 'black',
    borderColor: '#313131',
    fontSize: 16,
    borderRadius: 20,
    paddingLeft: 10,
  },
  newsCard: {
    borderWidth: 3,
    alignContent: 'center',
    borderColor: '#000',
    textAlign: 'center',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  itemContainer: {
    borderWidth: 0,
    alignContent: 'center',
    borderColor: '#000',
    textAlign: 'center',
  },
  newsCardBlue: {
    borderWidth: 3,
    backgroundColor: 'blue',
    borderColor: '#000',
    textAlign: 'center',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  newsCardYellow: {
    borderWidth: 3,
    backgroundColor: 'yellow',
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  newsCardPink: {
    borderWidth: 3,
    backgroundColor: 'pink',
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    maxWidth: '100%',
  },
  newsdirection: {
    fontSize: 10,
    marginLeft: 8,
    textAlign: 'left',
    maxWidth: '100%',
  },
  newsContent: {
    fontSize: 10,
    textAlign: 'right',
    maxWidth: '100%',
  },

  awesomeButton: {
    size: 12,
    marginBottom: -12,
  },
  vertical: {
    maxWidth: 300,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
},
horizontal: {
  display: 'flex',
  flexDirection: 'column',
  width: 250,
},
Divisor:{
  alignContent: 'center',
},
icono:{
  paddingRight: 5,
  alignSelf: 'center',
  paddingBottom: 3,
},
});
