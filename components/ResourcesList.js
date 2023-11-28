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
                <Text style={styles.headingText}>Artículos</Text>
                <ScrollView horizontal={true} style={styles.container}>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://centropediatrico.es/como-reconocer-los-signos-del-tea-en-ninos/')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                ¿Cómo reconocer los signos del TEA en niños?
                            </Text>
                        </View>
                        <Image
                            source={{
                                uri: 'https://centropediatrico.es/wp-content/uploads/2018/05/reconocer-TEA-ninos-600x300.jpg',
                            }}
                            style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.cdc.gov/ncbddd/spanish/autism/facts.html')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                ¿Qué son los trastornos del espectro autista?
                            </Text>
                        </View>
                        <Image
                            source={{
                                uri: 'https://www.cdc.gov/ncbddd/autism/images/family-1339629687.jpg?_=98766',
                            }}
                            style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://effectivehealthcare.ahrq.gov/products/autism-update/espanol')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                Tratamientos para los niños con trastorno del espectro autista
                            </Text>
                        </View>
                        <Image
                            source={{
                                uri: 'https://effectivehealthcare.ahrq.gov/sites/default/files/styles/product_hero_desktop/public/images/autism-update_hero.jpg?itok=bEFYUGud',
                            }}
                            style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.neuroxtimular.com/10-consejos-para-padres-de-ninos-con-tea/')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                10 consejos para padres de niños con TEA
                            </Text>
                        </View>
                        <Image
                            source={{
                                uri: 'https://www.neuroxtimular.com/wp-content/uploads/2022/03/que-es-autismo.jpg',
                            }}
                            style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View>
                <Text style={styles.headingText}>Vídeos</Text>
                <ScrollView horizontal={true} style={styles.container}>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.youtube.com/watch?v=_R4lWNpsmno')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                10 rasgos del AUTISMO INFANTIL 🔵 Aprende a identificar los PRIMEROS SIGNOS de TEA en bebés y niños
                            </Text>
                        </View>
                        <Image 
                        source={{uri: 'https://img.youtube.com/vi/_R4lWNpsmno/maxresdefault.jpg'}}
                        style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.youtube.com/watch?v=NBxhzcDCH5g')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                TRASTORNO DEL ESPECTRO AUTISTA (TEA): TODO LO QUE DEBES SABER (SÍNTOMAS Y CRITERIOS) DSM en 5 minutos
                            </Text>
                        </View>
                        <Image 
                        source={{uri: 'https://img.youtube.com/vi/NBxhzcDCH5g/maxresdefault.jpg'}}
                        style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.youtube.com/watch?v=FXDt0VRfGeY')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                El Autismo. Claves para padres, educadores y profesionales.
                            </Text>
                        </View>
                        <Image 
                        source={{uri: 'https://img.youtube.com/vi/FXDt0VRfGeY/maxresdefault.jpg'}}
                        style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.resource, styles.elevResource]}
                        onPress={() => openWebsite('https://www.youtube.com/watch?v=0-X2gqto7Z4')}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headerText}>
                                Así es como un niño con autismo percibe el mundo
                            </Text>
                        </View>
                        <Image 
                        source={{uri: 'https://img.youtube.com/vi/0-X2gqto7Z4/sddefault.jpg'}}
                        style={styles.resourceImage}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container: {
        padding: 8
    },
    resource: {
        flex: 1,
        alignItems: 'center',
        width: 200,
        height: 250,
        borderRadius: 4,
        margin: 8,
        color: '#000000'
    },
    elevResource: {
        backgroundColor: 'grey',
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#ffffff'
    },
    resourceImage: {
        height: 150,
        width: 200
    },
    headerText: {
        color: '#ffffff',
        margin: 8,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    }
})