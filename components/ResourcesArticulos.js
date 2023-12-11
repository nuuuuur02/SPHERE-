import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResourcesList() {
    function openWebsite(websiteLink) {
        Linking.openURL(websiteLink)
    }
    return (
        <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                onPress={() => openWebsite('https://centropediatrico.es/como-reconocer-los-signos-del-tea-en-ninos/')}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headerText}>
                        ¿Cómo reconocer los signos del TEA en niños?
                    </Text>
                    <Text style={styles.DateTextArt}>
                        15 noviembre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                onPress={() => openWebsite('https://www.cdc.gov/ncbddd/spanish/autism/facts.html')}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headerText}>
                        ¿Qué son los trastornos del espectro autista?
                    </Text>
                    <Text style={styles.DateTextArt}>
                        18 octubre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                onPress={() => openWebsite('https://effectivehealthcare.ahrq.gov/products/autism-update/espanol')}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headerText}>
                        Tratamientos para los niños con TEA
                    </Text>
                    <Text style={styles.DateTextArt}>
                        10 octubre 2023
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                onPress={() => openWebsite('https://www.neuroxtimular.com/10-consejos-para-padres-de-ninos-con-tea/')}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headerText}>
                        10 consejos para padres de niños con TEA
                    </Text>
                    <Text style={styles.DateTextArt}>
                        29 septiembre 2023
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
    resourceArt: {
        flex: 1,
        alignItems: 'center',
        width: 210,
        height: 120,
        borderRadius: 20,
        margin: 8,
        color: '#000000'
    },
    elevResourceArt: {
        backgroundColor: '#B7C1FF',
        shadowColor: '#ffffff'
    },
    resourceImageArt: {
        height: 60,
        width: 210,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        color: 'black',
        margin: 15,
        marginTop: 45,
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
    },
    DateTextArt: {
        color: 'black',
        margin: 15,
        marginTop: -10,
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})