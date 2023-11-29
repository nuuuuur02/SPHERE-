import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image,} from 'react-native';
import { Container } from '../styles/FeedStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { db } from '../components/ConfigFirebase';
import { query, collection, getDocs } from "firebase/firestore";
import DialogInput from 'react-native-dialog-input';
import * as Location from 'expo-location';


const FundacionScreen = () => {
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

  const getColor = (index) => {
    if (index % 3 === 0) {
      return { backgroundColor: 'lightblue' }
    } else if (index % 3 === 1) {
      return { backgroundColor: 'lightyellow' }
    } else {
      return { backgroundColor: 'lightpink' }
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

  const renderItem = ({ item, index }) => (
    <View style={[styles.newsCard, getColor(index)]}>
      <Text style={styles.newsTitle}>{item.ciudad}</Text>
      <Image source={{ uri: item.urlToImage }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <Text style={styles.newsTitle}>{item.nombre}</Text>
      <Text style={styles.newsContent}>{item.descripcion}</Text>
    </View>
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
  

  return (
    <Container>
      <FlatList
        data={fundaciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <FontAwesome5.Button
        style={styles.awesomeButton}
        name="sort-up"
        size={33}
        backgroundColor="#fff"
        color="#2e64e5"
        onPress={showDialog}
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
  newsCard: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  newsCardBlue: {
    borderWidth: 3,
    backgroundColor: 'blue',
    borderColor: '#000',
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  newsContent: {
    textAlign: 'center',
    fontSize: 16,
  },

  awesomeButton: {
    size: 12,
    marginBottom: -12,
  },
});
