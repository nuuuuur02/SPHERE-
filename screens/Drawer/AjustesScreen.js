import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState, useContext } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../styles/Theme/themeContext.js';
import Slider from '@react-native-community/slider';

const AjustesScreen = () => {
  const [generalVolume, setGeneralVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(0);
  const [sfxVolume, setSfxVolume] = useState(0);

  const onSlider1ValueChange = (value) => {
    setGeneralVolume(value);
  };
  const onSlider2ValueChange = (value) => {
    setMusicVolume(value);
  };
  const onSlider3ValueChange = (value) => {
    setSfxVolume(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.volumeControl}>
        <Text style={styles.volumeLabel}>Volumen general: {Math.round(generalVolume * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={generalVolume}
          onValueChange={onSlider1ValueChange}
          thumbTintColor="#3498db"
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
        />
      </View>
      <View style={styles.volumeControl}>
        <Text style={styles.volumeLabel}>Música: {Math.round(musicVolume * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={musicVolume}
          onValueChange={onSlider2ValueChange}
          thumbTintColor="#3498db"
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
        />
      </View>
      <View style={styles.volumeControl}>
        <Text style={styles.volumeLabel}>Efectos de sonido: {Math.round(sfxVolume * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={sfxVolume}
          onValueChange={onSlider3ValueChange}
          thumbTintColor="#3498db"
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
        />
      </View>
      <View style={{ backgroundColor: theme.backgroundColor }}>
            <Text style={{ color: theme.color }}>Tema dark</Text>
            <Switch
                value={darkMode}
                onValueChange={(value) => {
                    setDarkMode(value);
                    EventRegister.emit('ChangeTheme', value)
                }}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  volumeControl: {
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: 200,
  },
});

export default AjustesScreen;