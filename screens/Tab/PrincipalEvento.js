import { View, Text, Button, SectionList, Image, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput  } from 'react-native';
import React, {useState} from 'react'

const DATA = [
  { id: 1, name: 'Desayunar', image: require('../../assets/Pictos/Desayunar.png'), desc: ['por turnos los jugadores lanzan sus canicas intentado sacar las demás']},
  { id: 2, name: 'Ir al cole', image: require('../../assets/Pictos/Iralcole.png'), desc: ['09:00 a.m. - 17:30 a.m.', 'cada vez que el perseguidor alcanze a otro jugador este se convierte en el perseguidor']},
  { id: 3, name: 'Hacer los deberes', image: require('../../assets/Pictos/Hacerlosdeberes.png'), desc: ['18:00 a.m. - 19:30 a.m.', 'Tienes que mover la cintura para que el hula hoop se mantenga girando alrededor tuya'] },
]

const ADD = [
  {id: null, name: '', image: '', desc: ['','']}
]
const Principal = ({ navigation }) => {

  const [data, setData] = useState(DATA)
  const [isRender, setIsRender] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalAddVisible, setIsModalAddVisible] = useState(false)
  const [imputText, setImputText] = useState()
  const [editItem, seteditItem] = useState()
  const [addItem, setaddItem] = useState()
  
  const onPressItem = (item) => {
    setIsModalVisible(true);
    setImputText(item.name)
    seteditItem(item.id)
  }

  const onAddItem = () => {
    setIsModalAddVisible(true);
  }
  
  const renderItem = ({item, index}) => {
    return (
    <TouchableOpacity style = {styles.item}
      onPress= {() => navigation.navigate('Descripcion', {item : item})}
    >
      <Image source={item.image} style = {styles.image}/>
      <Text style = {styles.text}>{item.name}</Text>
      <Button title = "Editar" onPress= {() => onPressItem(item)}>
      </Button>
    </TouchableOpacity>
    )
  }

  const handleEditItem = (editItem) => {
    const newData = data.map(item => {
      if (item.id == editItem){
        item.name = imputText;
        return item
      }
      return item;
    })
    setData(newData);
    setIsRender(!isRender)
  }

  const handleAddItem = (addItem) => {
    const addData = () => {
      var newArray = [...data, {id:(data.length+1), name: addItem,image: require('../../assets/Pictos/Desayunar.png')}]
      return (newArray);
    }
    setData(addData);
    setIsRender(!isRender)
  }

  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setIsModalVisible(false);
  } 

  const onPressAdd = () => {
    handleAddItem(addItem);
    setIsModalAddVisible(false);
  }
  return (
    
    <SafeAreaView styles = {styles.container}>
      <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={isRender}/>
        <Modal
          animationType='fade'
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style = {styles.modalView}>
            <Text style = {styles.text}> Edita el evento:
            </Text>
            <TextInput style = {styles.textImput}
              onChangeText= {(text) => setImputText(text)}
              defaultValue = {imputText}
              editable = {true}
              multiline = {false}
              maxLength = {200}
            />
            <TouchableOpacity onPress= {() => onPressSaveEdit()} 
             style= {styles.touchableSave}>
              <Text style = {styles.textButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        </View>
      <View>
      <TouchableOpacity onPress= {() => onAddItem()}
      style= {styles.touchableAdd}>
        <Text style = {styles.text}>Añadir evento</Text>
      </TouchableOpacity>
      </View>
      <Modal
          animationType='fade'
          visible={isModalAddVisible}
          onRequestClose={() => setIsModalAddVisible(false)}
        >
          <View style = {styles.modalView}>
            <Text style = {styles.text}> Añade el evento:
            </Text>
            <TextInput style = {styles.textImput}
              onChangeText= {(text) => setaddItem(text)}
              defaultValue = {imputText}
              editable = {true}
              multiline = {false}
              maxLength = {200}
            />
            <TouchableOpacity onPress= {() => onPressAdd()} 
             style= {styles.touchableSave}>
              <Text style = {styles.textButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container : {
    
    flex: 1,
    marginBottom:30,
  },
  image: {
    width: 150, // Personaliza el ancho de la imagen según tus necesidades
    height: 150, // Personaliza la altura de la imagen según tus necesidades
    marginRight: 10 // Espacio entre la imagen y el texto
  },
  item:{
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    //widthidth: "100%",
  },
  text:{
    marginVertical: 30,
    marginHorizontal: 30,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  textButton:{
    marginVertical: 30,
    paddingHorizontal: 30,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  textImput:{
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25
  },
  modalView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableSave:{
    backgroundColor: 'orange',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  
  },
  touchableAdd:{
    backgroundColor: 'blue',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
    maxWidth: 'fit-content'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60, // Ancho del botón
    height: 60, // Alto del botón
    borderRadius: 30, // Radio de esquinas para hacerlo redondo
    backgroundColor: 'blue', // Color de fondo del botón
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
const styles2 = StyleSheet.create({
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
  item:{
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    maxWidth: "100%",
  },
  touchableAdd:{
    backgroundColor: 'blue',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
    maxWidth: 'fit-content'
  },
});
export default Principal;