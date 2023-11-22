import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image,} from 'react-native';
import { Container } from '../styles/FeedStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { db } from '../components/ConfigFirebase';
import { query, collection, getDocs } from "firebase/firestore";
import DialogInput from 'react-native-dialog-input';

const FundacionesCard = ({ item }) => (
  <View style={styles.newsCard}>
    <Image source={{ uri: item.urlToImage }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
    <Text style={styles.newsTitle}>{item.nombre}</Text>
    <Text style={styles.newsContent}>{item.descripcion}</Text>
    {/* Puedes agregar más elementos según tus necesidades */}
  </View>
);

const HomeScreen = () => {
  const [fundaciones, setFundaciones] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [distanciaMaxima, setDistanciaMaxima] = useState(10000000000); // Define la distancia máxima permitida en kilómetros
  const [isDialogVisible, setDialogVisible] = useState(false);

  const fetchFundaciones = async () => {
    try {
      const q1 = query((collection(db, "fundaciones")));
      const docSnap = await getDocs(q1);

      const fundacionesData = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const fundacionesDataSorted = filterFundacionesPorDistancia(fundacionesData);
      const fundacionesDataSortedFiltered = fundacionesDataSorted.sort((a, b) => a.distancia - b.distancia);
      setFundaciones(fundacionesDataSortedFiltered);
    } catch (error) {
      console.error("Error fetching news:", error);
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

  const filterFundacionesPorDistancia = (fundacionesData) => {
    // Reemplaza con las coordenadas de tu ubicación actual     
    const ubicacionActual = { latitude: 39, longitude: 0.3 };
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
    await fetchFundaciones();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }) => (
    <FundacionesCard
      item={item}
      // Agrega más props según sea necesario
    />
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
    fetchFundaciones();
  };

  useEffect(() => {
    fetchFundaciones();
  }, [distanciaMaxima]);

  return (
    <Container>
      <FlatList
        data={fundaciones}
        keyExtractor={(item) => item.id}
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

export default HomeScreen;

const styles = StyleSheet.create({
  // Define estilos para NewsCard según tus necesidades
  newsCard: {
    borderWidth: 3,
    backgroundColor: '#ffa',
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  newsContent: {
    textAlign: 'center',
    fontSize: 16,
  },

  awesomeButton: {
    marginBottom: -12,
  },
});
