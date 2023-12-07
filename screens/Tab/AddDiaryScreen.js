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

const AddDiaryScreen = ({ navigation, route }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [inputText, setInputText] = useState('');
  
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
  
          const newDiaryEntry = {
            diaryText,
            feeling: feelingId,  // Guardar solo el identificador del sentimiento
            diaryTime: Timestamp.fromDate(new Date()),
          };
  
          const updatedDiaryCards = [newDiaryEntry, ...existingDiaryCards];
  
          await updateDoc(userRef, {
            diaryCards: updatedDiaryCards,
          });
  
          
  
          route.params.loadUserData();
          navigation.goBack();
        } else {
          console.error('El documento de usuario no existe');
        }
      } catch (error) {
        console.error('Error al guardar la entrada de diario:', error);
      }
    };
  
    

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#EBEBEB' }}
    >
      <CardAddDiary style={{ backgroundColor: '#fff', flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 15 }}>Nuevo Diario </Text>
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
        <View style={{  bottom: 0, right: 0, alignSelf: 'flex-end', padding: 30 }}>
          <NoteButton onPress={() => saveDiaryEntry(inputText, selectedButton)}>
            <Text>¡HECHO!</Text>
          </NoteButton>
        </View>
      </CardAddDiary>
    </KeyboardAvoidingView>
  );
};

export default AddDiaryScreen;
