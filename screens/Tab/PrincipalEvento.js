import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, Image, StyleSheet } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';  
import { doc, getDoc } from 'firebase/firestore';
import { EventRegister } from 'react-native-event-listeners';

const DATA = [
  { id: 1, name: 'Desayunar', image: require('../../assets/Pictos/Desayunar.png'), desc: ['por turnos los jugadores lanzan sus canicas intentando sacar las demás']},
  { id: 2, name: 'Ir al cole', image: require('../../assets/Pictos/Iralcole.png'), desc: ['09:00 a.m. - 17:30 p.m.', 'cada vez que el perseguidor alcance a otro jugador, este se convierte en el perseguidor']},
  { id: 3, name: 'Hacer los deberes', image: require('../../assets/Pictos/Hacerlosdeberes.png'), desc: ['18:00 p.m. - 19:30 p.m.', 'Tienes que mover la cintura para que el hula hoop se mantenga girando alrededor de ti'] },
];

const Principal = ({ navigation }) => {
  const [data, setData] = useState(DATA);
  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [imputText, setImputText] = useState('');
  const [editItem, seteditItem] = useState(null);
  const [addItem, setaddItem] = useState('');

  const onPressItem = (item) => {
    setIsModalVisible(true);
    setImputText(item.name);
    seteditItem(item.id);
  };

  const onAddItem = () => {
    setIsModalAddVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Descripcion', { item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Button title="Editar" onPress={() => onPressItem(item)} />
    </TouchableOpacity>
  );

  const handleEditItem = () => {
    const newData = data.map((item) => {
      if (item.id === editItem) {
        item.name = imputText;
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
      const newData = [...data, { id: newId, name: addItem, image: require('../../assets/Pictos/Desayunar.png') }];
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={[styles.text, darkMode === true ? { color: 'white' } : { color: 'black' }]}>Edita el evento:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setImputText(text)}
            defaultValue={imputText}
            editable
            multiline={false}
            maxLength={200}
          />
          <TouchableOpacity onPress={handleEditItem} style={styles.touchableSave}>
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={onAddItem} style={styles.touchableAdd}> 
        <Text style={styles.text}>Añadir evento</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={isModalAddVisible}
        onRequestClose={() => setIsModalAddVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>Añade el evento:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setaddItem(text)}
            defaultValue={imputText}
            editable
            multiline={false}
            maxLength={200}
          />
          <TouchableOpacity onPress={handleAddItem} style={styles.touchableSave}>
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  item: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    maxWidth: '100%',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  text: {
    marginVertical: 30,
    marginHorizontal: 30,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textButton: {
    marginVertical: 30,
    paddingHorizontal: 30,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
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
    backgroundColor: 'orange',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  touchableAdd: {
    backgroundColor: 'blue',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
    maxWidth: 'fit-content',
  },
});

export default Principal;