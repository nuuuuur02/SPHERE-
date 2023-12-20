import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';

export default function GameDetailScreen({ navigation, route }) {
  
  const CustomButton = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.ButtonNext} onPress={onPress}>
        <Text style={styles.buttonText}>SIGUIENTE</Text>
      </TouchableOpacity>
    );
  };

  const {item} = route.params
  return (
    <ScrollView contentContainerStyle= {styles.scroll} >
    <Text style={styles.title}>{item.name}</Text>
    <Text style = {styles.espacio}></Text>
    <View>
    <Text style = {styles.descri}>{item.desc[0]}</Text>
    <Image source={item.image} style={styles.image} />
    <Text style = {styles.espacio}></Text>
    <Text style = {styles.description}>{item.desc[1]}</Text>
    <Text style = {styles.descri}>{item.desc[2]}</Text>
    {item.image2 != null && <Image source={item.image2} style={styles.image} />}
    {item.image2 != null &&<Text style = {styles.espacio}></Text>}
    {item.image2 != null &&<Text style = {styles.description}>{item.desc[3]}</Text>}
  <CustomButton onPress={() => navigation.navigate('PrincipalEvento', { item })} />
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
        marginLeft: 0,
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
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      textAlign: 'center',
      marginLeft: 45,
    },
    image: {
      width: 325,
      height: 325,
      resizeMode: 'cover',
      marginBottom: 20,
      alignSelf: 'center',
      marginLeft: 10,
      marginRight: 0,
      marginTop: 20,
    },
    description: {
      fontSize: 16,
      maxWidth: null,
      margin: 15,
      alignSelf:'center',
      textAlign: 'center',
    },
    descri: {
      fontSize: 20,
      maxWidth: null,
      fontWeight: 'bold',
      margin: 15,
      alignSelf:'flex-start',
      textAlign: 'center',
    },
    ButtonNext: {
      fontSize: 20,
      backgroundColor: '#B7C1FF',
      maxWidth: null,
      fontWeight: 'bold',
      margin: 15,
      alignSelf:'flex-end',
      textAlign: 'center',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 50,
      color: 'black',
    },
    buttonText: {
      fontSize: 15,
      maxWidth: null,
      margin: 15,
      textAlign: 'center',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      color: 'black',
    }
  });