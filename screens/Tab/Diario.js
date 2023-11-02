import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

const GameDetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(item.idEstado);
  const [savedImages, setSavedImages] = useState([null, null, null]);

  const handleImageClick = (index) => {
    setSelectedButtonIndex(index);
    item.idEstado = index;
  };

  const handleRestore = () => {
    // Restaura el estado anterior de las imágenes (los colores anteriores)
    setSelectedButtonIndex(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.table}>
          <TouchableOpacity
            style={[
              styles.row,
              selectedButtonIndex === 0 && styles.selectedRow,
            ]}
            onPress={() => handleImageClick(0)}
          >
            <Image
              source={selectedImages[0] || require('../../assets/Pictos/check.png')}
              style={{ width: 50, height: 50 }}
            />
            <Image source={require('../../assets/Pictos/feliz.jpg')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row,
              selectedButtonIndex === 1 && styles.selectedRow,
            ]}
            onPress={() => handleImageClick(1)}
          >
            <Image
              source={selectedImages[1] || require('../../assets/Pictos/check.png')}
              style={{ width: 50, height: 50 }}
            />
            <Image source={require('../../assets/Pictos/normal.jpg')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row,
              selectedButtonIndex === 2 && styles.selectedRow,
            ]}
            onPress={() => handleImageClick(2)}
          >
            <Image
              source={selectedImages[2] || require('../../assets/Pictos/check.png')}
              style={{ width: 50, height: 50 }}
            />
            <Image source={require('../../assets/Pictos/triste.jpg')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <Button
          title="Guardar"
          onPress={() => navigation.navigate('Descripcion', {item : item})}
          disabled={selectedButtonIndex === null}
        />
        <Button title="Restaurar" onPress={handleRestore} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 30,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  selectedRow: {
    backgroundColor: 'gold',
  },
});

export default GameDetailScreen;