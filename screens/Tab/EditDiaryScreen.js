// AddDiaryScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';
import { collection, doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import {
  CardDiary,
  CardDiaryCom,
  CardAddDiary,
  DiaryText,
  AddDiaryBar,
  NoteButton,
  UserImgDiary,
  UserNameDiary,
  InputField,
} from '../../styles/FeedStyles';

const FeelButton = ({ children, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isSelected ? '#DACEFC' : '#ebebeb',
        padding: 15,
        borderRadius: 20,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

const EditDiaryScreen = ({ navigation, route }) => {

  const [selectedButton, setSelectedButton] = useState(route.params.feelingToEdit|| '');
  const [inputText, setInputText] = useState(route.params.diaryToEdit || '');  // Usa el valor del parámetro

  const feelings = [
    { id: 'caritacontenta', image: require('../../assets/iconos/caritacontenta.png') },
    { id: 'caritatranquila', image: require('../../assets/iconos/caritatranquila.png') },
    { id: 'caritaenfadada', image: require('../../assets/iconos/caritaenfadada.png') },
    { id: 'caritatriste', image: require('../../assets/iconos/caritatriste.png') },
  ];

  const handleFeelButtonPress = (feelingId) => {
    setSelectedButton(feelingId);
  };

  const saveDiaryEntry = async (diaryText, feelingId) => {
    try {
      const user = auth.currentUser;

      if (!user || !user.uid) {
        console.error('Usuario no autenticado o sin UID');
        return;
      }

      const userRef = doc(db, 'user', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingDiaryCards = userDoc.data().diaryCards || [];

        // Encuentra el índice del diario a editar
        const indexToEdit = existingDiaryCards.findIndex(
          (entry) => entry.diaryText === route.params.diaryToEdit
        );

        if (indexToEdit !== -1) {
          // Actualiza solo el diario existente en la misma posición
          existingDiaryCards[indexToEdit] = {
            diaryText,
            feeling: feelingId,
            diaryTime: existingDiaryCards[indexToEdit].diaryTime, // Mantén la misma fecha y hora
          };

          await updateDoc(userRef, {
            diaryCards: existingDiaryCards,
          });

          

          
          navigation.goBack();
        } else {
          console.error('No se encontró el diario a editar');
        }
      } else {
        console.error('El documento de usuario no existe');
      }
    } catch (error) {
      console.error('Error al guardar la entrada de diario:', error);
    }
  };

  const deleteDiaryEntry = async () => {
    try {
      const user = auth.currentUser;

      if (!user || !user.uid) {
        console.error('Usuario no autenticado o sin UID');
        return;
      }

      const userRef = doc(db, 'user', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingDiaryCards = userDoc.data().diaryCards || [];

        // Filtra los diaryCards, excluyendo el que se va a eliminar
        const updatedDiaryCards = existingDiaryCards.filter(
          (entry) => entry.diaryText !== route.params.diaryToEdit
        );

        await updateDoc(userRef, {
          diaryCards: updatedDiaryCards,
        });

        

        navigation.goBack();
      } else {
        console.error('El documento de usuario no existe');
      }
    } catch (error) {
      console.error('Error al eliminar la entrada de diario:', error);
    }
  };

 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#EBEBEB' }}
    >
      <CardAddDiary style={{ backgroundColor: '#fff', flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 15 }}>Editar Diario </Text>
        <CardDiaryCom>
          <InputField
            multiline
            numberOfLines={16}
            style={{
              fontSize: 16,
              textAlignVertical: 'top',
              textAlign: 'left',
            }}
            value={inputText}
            onChangeText={setInputText}
          />
        </CardDiaryCom>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 15 }}>Como te sientes? </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 25, paddingRight: 25, paddingTop: 15 }}>
          {feelings.map((feeling) => (
            <FeelButton
              key={feeling.id}
              onPress={() => handleFeelButtonPress(feeling.id)}
              isSelected={selectedButton === feeling.id}
            >
              <Image source={feeling.image} />
            </FeelButton>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
          <NoteButton onPress={deleteDiaryEntry}>
            <Text style={{ color: 'red' }}>ELIMINAR</Text>
          </NoteButton>
          <NoteButton onPress={() => saveDiaryEntry(inputText, selectedButton)}>
            <Text>¡HECHO!</Text>
          </NoteButton>
        </View>
      </CardAddDiary>
    </KeyboardAvoidingView>
  );
};

export default EditDiaryScreen;
