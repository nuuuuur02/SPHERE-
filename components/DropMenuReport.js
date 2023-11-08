import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DropMenuReport = ({ isVisible, onReportPress, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={onReportPress}>
        <Text style={styles.menuItemRed}>Report</Text>
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

export default DropMenuReport;