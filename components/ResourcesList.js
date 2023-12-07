import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResourcesList() {
    function openWebsite(websiteLink) {
        Linking.openURL(websiteLink)
    }
    return (
        <View>
            <View>
                <Text style={styles.headingText}>Vídeos</Text>
                <ScrollView horizontal={true} style={styles.container}>
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
                            <Text/>
                            <Text style={styles.DateText}>
                                28 septiembre 2023
                            </Text>
                        </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>

            <View>
                <Text style={styles.headingText}>Artículos</Text>
                <ScrollView horizontal={true} style={styles.container}>
                    <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                        onPress={() => openWebsite('https://centropediatrico.es/como-reconocer-los-signos-del-tea-en-ninos/')}>
                        <Image
                            source={{
                                uri: 'https://centropediatrico.es/wp-content/uploads/2018/05/reconocer-TEA-ninos-600x300.jpg',
                            }}
                            style={styles.resourceImageArt}
                        />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                ¿Cómo reconocer los signos del TEA en niños?
                            </Text>
                            <Text style={styles.DateTextArt}>
                                23 noviembre 2023
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                        onPress={() => openWebsite('https://www.cdc.gov/ncbddd/spanish/autism/facts.html')}>
                        <Image
                            source={{
                                uri: 'https://www.cdc.gov/ncbddd/autism/images/family-1339629687.jpg?_=98766',
                            }}
                            style={styles.resourceImageArt}
                        />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                ¿Qué son los trastornos del espectro autista?
                            </Text>
                            <Text style={styles.DateTextArt}>
                                16 octubre 2023
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                        onPress={() => openWebsite('https://effectivehealthcare.ahrq.gov/products/autism-update/espanol')}>
                        <Image
                            source={{
                                uri: 'https://effectivehealthcare.ahrq.gov/sites/default/files/styles/product_hero_desktop/public/images/autism-update_hero.jpg?itok=bEFYUGud',
                            }}
                            style={styles.resourceImageArt}
                        />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                Tratamientos para los niños con TEA
                            </Text>
                            <Text style={styles.DateTextArt}>
                                15 octubre 2023
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resourceArt, styles.elevResourceArt]}
                        onPress={() => openWebsite('https://www.neuroxtimular.com/10-consejos-para-padres-de-ninos-con-tea/')}>
                        <Image
                            source={{
                                uri: 'https://www.neuroxtimular.com/wp-content/uploads/2022/03/que-es-autismo.jpg',
                            }}
                            style={styles.resourceImageArt}
                        />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                10 consejos para padres de niños con TEA
                            </Text>
                            <Text style={styles.DateTextArt}>
                                28 septiembre 2023
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
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
    resourceArt: {
        flex: 1,
        alignItems: 'center',
        width: 210,
        height: 130,
        borderRadius: 20,
        margin: 8,
        color: '#000000'
    },
    elevResourceVid: {
        backgroundColor: '#FFD37E',
        shadowColor: '#ffffff'
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