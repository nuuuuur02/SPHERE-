import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResourcesList() {
    function openWebsite(websiteLink){
        Linking.openURL(websiteLink)
    }
  return (
    <View>
      <Text style={styles.headingText}>Artículos</Text>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.resource, styles.elevResource]}>
            <View style={styles.headingContainer}>
                <Text style={styles.headerText}>
                    Artículo #1
                </Text>
            </View>
            <Image
            source={{
                uri: 'https://centropediatrico.es/wp-content/uploads/2018/05/reconocer-TEA-ninos-600x300.jpg'
            }}
            style={styles.resourceImage}
            />
        </View>
        <View style={[styles.resource, styles.elevResource]}>
            <Text>Artículo #2</Text>
        </View>
        <View style={[styles.resource, styles.elevResource]}>
            <Text>Artículo #3</Text>
        </View>
        <View style={[styles.resource, styles.elevResource]}>
            <Text>Artículo #4</Text>
        </View>
        <View style={[styles.resource, styles.elevResource]}>
            <Text>Artículo #5</Text>
        </View>
        <View style={[styles.resource, styles.elevResource]}>
            <Text>Artículo #6</Text>
        </View>
      </ScrollView>
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
        justifyContent: 'center',
        width: 150,
        height: 125,
        borderRadius: 4,
        margin: 8,
        color: '#000000'
    },
    elevResource: {
        backgroundColor: '#2e64e5',
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#ffffff'
    }
})