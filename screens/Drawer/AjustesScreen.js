import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState, useContext } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../styles/Theme/themeContext.js';

export default function AjustesScreen() {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.text, { color: theme.color }]}>AjustesScreen</Text>
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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold'
    }
 })