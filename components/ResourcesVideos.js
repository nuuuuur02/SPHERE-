import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResourcesList() {
    function openWebsite(websiteLink) {
        Linking.openURL(websiteLink)
    }
    return (
        <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.resource, styles.elevResourceVid]}
                onPress={() => openWebsite('https://www.youtube.com/watch?v=NBxhzcDCH5g')}>
                <View style={styles.headingContainer}>
                    <Image
                        source={{ uri: 'https://img.youtube.com/vi/NBxhzcDCH5g/maxresdefault.jpg' }}
                        style={styles.resourceImageVid}
                    />
                    <Text style={styles.headerText}>
                        Trastorno del Espectro Autista (TEA): Síntomas y criterios
                    </Text>
                    <Text style={styles.DateText}>
                        16 octubre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resource, styles.elevResourceVid]}
                onPress={() => openWebsite('https://www.youtube.com/watch?v=FXDt0VRfGeY')}>
                <View style={styles.headingContainer}>
                    <Image
                        source={{ uri: 'https://img.youtube.com/vi/FXDt0VRfGeY/maxresdefault.jpg' }}
                        style={styles.resourceImageVid}
                    />
                    <Text style={styles.headerText}>
                        El Autismo. Claves para padres, educadores y profesionales.
                    </Text>
                    <Text style={styles.DateText}>
                        15 octubre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resource, styles.elevResourceVid]}
                onPress={() => openWebsite('https://www.youtube.com/watch?v=0-X2gqto7Z4')}>
                <View style={styles.headingContainer}>
                    <Image
                        source={{ uri: 'https://img.youtube.com/vi/0-X2gqto7Z4/sddefault.jpg' }}
                        style={styles.resourceImageVid}
                    />
                    <Text style={styles.headerText}>
                        Así es como un niño con autismo percibe el mundo
                    </Text>
                    <Text />
                    <Text style={styles.DateText}>
                        28 septiembre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resource, styles.elevResourceVid]}
                onPress={() => openWebsite('https://www.youtube.com/watch?v=_R4lWNpsmno')}>
                <View style={styles.headingContainer}>
                    <Image
                        source={{ uri: 'https://img.youtube.com/vi/_R4lWNpsmno/maxresdefault.jpg' }}
                        style={styles.resourceImageVid}
                    />
                    <Text style={styles.headerText}>
                        10 rasgos del AUTISMO INFANTIL - Identifica los PRIMEROS SIGNOS de TEA
                    </Text>
                    <Text style={styles.DateText}>
                        23 noviembre 2023
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    resource: {
        flex: 1,
        alignItems: 'center',
        width: 210,
        height: 250,
        borderRadius: 20,
        margin: 8,
        color: '#000000'
    },
    elevResourceVid: {
        backgroundColor: '#FFD37E',
        shadowColor: '#ffffff'
    },
    resourceImageVid: {
        height: 150,
        width: 210,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        color: 'black',
        margin: 15,
        marginTop: 8,
        marginBottom: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DateText: {
        color: 'black',
        margin: 15,
        marginTop: 0,
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})