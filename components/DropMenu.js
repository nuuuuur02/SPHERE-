import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DropMenu = ({ isVisible, onDeletePress, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={onDeletePress}>
        <Text style={styles.menuItemRed}>Eliminar</Text>
      </TouchableOpacity>
      {/* Agrega más elementos de menú si es necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
  },
  menuItemRed: {
    fontSize: 16,
    padding: 5,
    color:'red'
  },
});

export default DropMenu;