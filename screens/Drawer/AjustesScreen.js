import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState, useContext } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../styles/Theme/themeContext.js';

export default function AjustesScreen() {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)

    return (
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
    );
}