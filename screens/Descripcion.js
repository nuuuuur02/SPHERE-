import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, FlatList } from 'react-native';

export default function GameDetailScreen({ navigation, route }) {
  
  const {item} = route.params
  return (
    <ScrollView contentContainerStyle= {styles.scroll} >
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.description}>
        {item.desc[0]}
      </Text>

      <View style={styles.table}>
      {/* Primera fila */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.title}>Materiales</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.title}>Participantes</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.title}>Tiempo</Text>
        </View>
      </View>
      {/* Segunda fila */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.description}>{item.desc[1]}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.description}>{item.desc[3]}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.description}>{item.desc[2]}</Text>
        </View>
      </View>
      <View style={styles.row}>
        
       </View>
    </View>
    <View style={styles.table}>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.title}>Descripción del juego</Text>
            </View>
        </View>
    </View>
    <Text style = {styles.description}>{item.desc[4]}</Text>
    <Text style = {styles.espacio}></Text>
    <View style={styles.table}>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.title}>Paso 2</Text>
            </View>
        </View>
    </View>
    <Text style = {styles.description}>{item.desc[5]}</Text>
    <Text style = {styles.espacio}></Text>
    <View style={styles.table}>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.title}>Paso 3</Text>
            </View>
        </View>
    </View>
    <Text style = {styles.description}>{item.desc[6]}</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    espacio: {
        marginTop: 15,
    },
    table: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 30,
        margin: 10,
      },
      scroll: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
      },
      cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        borderWidth: 1,
        borderColor: 'black',
        flexWrap: 'wrap',
      },
      cellText: {
        fontSize: 16,
      },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
    },
      
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10,
      alignSelf: 'center',
    },
    description: {
      fontSize: 16,
      maxWidth: null,
      margin: 15,
      alignSelf:'center',
      textAlign: 'center',
    },
  });