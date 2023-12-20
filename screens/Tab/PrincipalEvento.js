import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';  
import { doc, getDoc } from 'firebase/firestore';
import { EventRegister } from 'react-native-event-listeners';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackView } from '@react-navigation/stack';
import ActionButton from 'react-native-action-button';

const DATA = [
  { id: 0, name: 'Martes mañana', durTotal: 'Duración: 1 hora 15 min', image: require('../../assets/Pictos/desayuno.jpg'), desc: ['1. Desayunar', '45 minutos', '2. Vestirse', '30 minutos'], image2: require('../../assets/Pictos/desayuno.jpg')},
  { id: 1, name: 'Martes tarde', durTotal: 'Duración: 4 horas 30 min', image: require('../../assets/Pictos/desayuno.jpg'), desc: ['1. Desayunar', '45 minutos', '2. Vestirse', '30 minutos'], image2: require('../../assets/Pictos/desayuno.jpg')},
  { id: 2, name: 'Jueves mañana', durTotal: 'Duración: 3 horas', image: require('../../assets/Pictos/desayuno.jpg'), image2: require('../../assets/Pictos/desayuno.jpg'), desc: ['1. Desayunar', '45 minutos', '2. Vestirse', '30 minutos']},
  { id: 3, name: 'Viernes mañana', durTotal: 'Duración: 5 horas', image: require('../../assets/Pictos/desayuno.jpg'), desc: ['1. Desayunar', '45 minutos']},
  { id: 4, name: 'Sábado noche', durTotal: 'Duración: 30 min',  image: require('../../assets/Pictos/desayuno.jpg'), desc: ['1. Desayunar', '45 minutos', '2. Vestirse', '30 minutos'], image2: require('../../assets/Pictos/desayuno.jpg')},
  
];

const Principal = ({ navigation }) => {
  const [data, setData] = useState(DATA);
  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [imputTextName, setImputTextName] = useState('');
  const [imputTextDur, setImputTextDur] = useState('');
  const [imputTextDesc, setImputTextDesc] = useState('');
  const [editItem, seteditItem] = useState(null);
  const [addItem, setaddItem] = useState('');
  const coloresPasteles = ['#DACEFC', '#B7C1FF', '#FFD37E','#DACEFC', '#B7C1FF', '#FFD37E','#DACEFC', '#B7C1FF', '#FFD37E','#DACEFC', '#B7C1FF', '#FFD37E','#DACEFC', '#B7C1FF', '#FFD37E'];

  const onPressItem = (item) => {
    setIsModalVisible(true);
    setImputTextName(item.name);
    setImputTextDesc(item.desc);
    setImputTextDur(item.durTotal);
    seteditItem(item.id);
  };

  const onAddItem = () => {
    setIsModalAddVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Descripcion de Evento', { item })}
    >
      <View style={[styles.table, { backgroundColor: coloresPasteles[item.id % coloresPasteles.length] }]}>
        <View style={styles.row}>
          {/* Primera columna */}
            <View style={styles.column1}>
              <View style={styles.cell}>
              <Text style={[styles.textInCell1, { color: 'black' }]}>{item.name}</Text>
              </View>
              <View style={styles.cell}>
              <Text style={[styles.textInCell2, { color: 'black' }]}>{item.durTotal}</Text>
              </View>
            </View>

          {/* Segunda columna */}
            <View style={styles.column2}>
              <View style={styles.cell}>
              <TouchableOpacity style={styles.buttonTal}
                  onPress={() => onPressItem(item)}
              >
                <Ionicons name="ellipsis-vertical-outline" size={40} color="black"/>
              </TouchableOpacity>
              </View>
            </View>
          </View>
      </View>

    </TouchableOpacity>
  );

  const handleEditItem = () => {
    const newData = data.map((item) => {
      if (item.id === editItem) {
        item.name = imputTextName;
        item.desc = imputTextDesc;
        item.durTotal = imputTextDur;
      }
      return item;
    });
    setData(newData);
    setIsRender(!isRender);
    setIsModalVisible(false);
  };

  const handleAddItem = () => {
    if (addItem.trim() !== '') {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newData = [...data, { id: newId, name: addItem, image: require('../../assets/Pictos/desayuno.jpg'), desc: addItem}];
      setData(newData);
      setIsRender(!isRender);
      setIsModalAddVisible(false);
      setaddItem('');
    }
  };

    //Theme
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setDarkMode(data)
        })
        return () => {
            //EventRegister.removeAllListeners(listener)
        }
    }, [darkMode])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text2}>Horarios</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={isRender}
      />

     

          <ActionButton
              buttonColor="black"
              onPress={onAddItem}
              renderIcon={() => (

                  <Ionicons name="add" size={25} color="white" />

              )}
              style={{ position: 'absolute', bottom: 10, right: 0 }}
          />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ScrollView contentContainerStyle= {styles.scroll} >
        <Text style={[styles.title2, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Editar</Text>
          <Text style={[styles.text3, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Crea y personaliza tus propios horarios</Text>
          <TextInput
            style={styles.table2}
            onChangeText={(text) => setImputTextName(text)}
            defaultValue='Nombre del horario'
            editable
            multiline={false}
            maxLength={200}
          />
          <TextInput
            style={styles.table2}
            onChangeText={(text) => setImputTextDesc(text)}
            defaultValue='Nombre de la tarea'
            editable
            multiline={false}
            maxLength={200}
          />
          <Image source= {require('../../assets/Pictos/desayuno.jpg')} style={styles.image} />
          <Text style={[styles.text4, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Duración</Text>
          <View style={[styles.table4]}>
            <View style={styles.row}>
              {/* Primera columna */}
              <View style={styles.column4}>
				          <TextInput
				            style={styles.table2}
				            onChangeText={(text) => setaddItem(text)}
				            defaultValue='Horas'
				            editable
				            multiline={false}
				            maxLength={200}
			            />
              </View>
              {/* Segunda columna */}
              <View style={styles.column4}>
                  <TextInput
				            style={styles.table2}
				            onChangeText={(text) => setaddItem(text)}
				            defaultValue='Minutos'
				            editable
				            multiline={false}
				            maxLength={200}
			            />
              </View>
          </View>
      </View>
          <TouchableOpacity onPress={handleEditItem} style={styles.touchableSave}>
            <Text style={styles.textButton}>¡HECHO!</Text>
          </TouchableOpacity>
        </ScrollView>
       
      </Modal>

      <Modal
        animationType="fade"
        visible={isModalAddVisible}
        onRequestClose={() => setIsModalAddVisible(false)}
      >
      <ScrollView contentContainerStyle= {styles.scroll} >
        <Text style={[styles.title2, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Nuevo horario</Text>
          <Text style={[styles.text3, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Crea y personaliza tus propios horarios</Text>
          <TextInput
            style={styles.table2}
            onChangeText={(text) => setaddItem(text)}
            defaultValue='Nombre del horario'
            editable
            multiline={false}
            maxLength={200}
          />
          <Text style = {styles.espacio}></Text>
          <TextInput
            style={styles.table2}
            onChangeText={(text) => setaddItem(text)}
            defaultValue='Nombre de la tarea'
            editable
            multiline={false}
            maxLength={200}
          />
          <Image source= {require('../../assets/Pictos/desayuno.jpg')} style={styles.image} />
          <Text style={[styles.text4, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Duración</Text>
          <View style={[styles.table4]}>
            <View style={styles.row}>
              {/* Primera columna */}
              <View style={styles.column4}>
				          <TextInput
				            style={styles.table2}
				            onChangeText={(text) => setaddItem(text)}
				            defaultValue='Horas'
				            editable
				            multiline={false}
				            maxLength={200}
			            />
              </View>
              {/* Segunda columna */}
              <View style={styles.column4}>
                  <TextInput
				            style={styles.table2}
				            onChangeText={(text) => setaddItem(text)}
				            defaultValue='Minutos'
				            editable
				            multiline={false}
				            maxLength={200}
			            />
              </View>
          </View>
      </View>
          <TouchableOpacity onPress={handleAddItem} style={styles.touchableSave}>
            <Text style={styles.textButton}>¡HECHO!</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: 45,
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: 20,
  },
  item: {
    borderBottomWidth: 0,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    maxWidth: '100%',
  },
  image: {
    width: 325,
    height: 375,
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  text: {
    marginHorizontal: 10,
    marginRight: 35,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  text2: {
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 35,
    fontSize: 24,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  text3: {
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 20,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  text4: {
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 20,
    fontSize: 16,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  textButton: {
    marginVertical: 10,
    paddingHorizontal: 25,
    fontSize: 15,
    alignSelf: 'center',
    color: 'black',
  },
  textButton2: {
    marginVertical: 10,
    paddingHorizontal: 25,
    fontSize: 35,
    alignSelf: 'center',
    color: 'white',
  },
  textInput: {
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableSave: {
    backgroundColor: '#B7C1FF',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
    borderRadius: 30,
    padding: 5,
  },
  touchableAdd: {
    backgroundColor: 'black',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
    borderRadius: 50,
    maxWidth: 'fit-content',
  },
  touchableAdd2: {
    backgroundColor: 'black',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 50,
    maxWidth: 'fit-content',
  },
  table: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  table2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  table3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  table4: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  column1: {
    flex: 4, // Ocupa el 80% del ancho de la fila
    borderBottomWidth: 0,
  },
  column2: {
    flex: 1, // Ocupa el 20% del ancho de la fila
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    padding: 8,
  },
  column4: {
    flex: 1,
    borderBottomWidth: 0,
    borderBottomColor: 'black',
  },
  textInCell1: {
    fontSize: 24,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  textInCell2: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  buttonTal: {
    alignSelf: 'flex-end',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  espacio: {
    marginTop: 15,
  },
});

export default Principal;