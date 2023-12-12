import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

import JuegosScreen from './Tab/JuegosScreen';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ResourcesVideos from '../components/ResourcesVideos'
import ResourcesArticulos from '../components/ResourcesArticulos'

const RecursosPictosScreen = () => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View>
                <TouchableOpacity>
                    <View style={styles.tituloFlecha}>
                        <Text style={styles.headingText}>Vídeos</Text>
                        <Image
                            source={require('../assets/iconos/flecha.png')}
                            resizeMode='contain'
                            style={styles.flecha}
                        />
                    </View>
                </TouchableOpacity>
                <ResourcesVideos />
            </View>
            <View>
                <TouchableOpacity>
                    <View style={styles.tituloFlecha}>
                        <Text style={styles.headingText}>Artículos</Text>
                        <Image
                            source={require('../assets/iconos/flecha.png')}
                            resizeMode='contain'
                            style={styles.flecha}
                        />
                    </View>
                </TouchableOpacity>
                <ResourcesArticulos />
            </View>
            <View>
                <TouchableOpacity>
                    <View style={styles.tituloFlecha}>
                        <Text style={styles.headingText}>Juegos</Text>
                        <Image
                            source={require('../assets/iconos/flecha.png')}
                            resizeMode='contain'
                            style={styles.flecha}
                        />
                    </View>
                </TouchableOpacity>
                <JuegosScreen />
            </View>
        </ScrollView>
    );
};

export default RecursosPictosScreen;

const styles = StyleSheet.create({
    headingText: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginTop: 20
    },
    tituloFlecha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flecha: {
        paddingHorizontal: 20,
        marginTop: 20,
    }
})