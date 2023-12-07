import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import {
  CardDiary,
  CardDiaryCom,
  DiaryText,
  AddDiaryBar,
  NoteButton,
  UserImgDiary,
  UserNameDiary,
} from '../../styles/FeedStyles';

const PerfilScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isProfessionalEnabled, setIsProfessional] = useState(false);
  const [isFamiliarEnabled, setIsFamiliar] = useState(false);
  const [diaryCards, setDiaryCards] = useState([]);

  const loadUserData = async () => {
    const user = auth.currentUser;

    if (user) {
      setUserData({
        uid: user.uid,
        photo: user.photoURL,
        email: user.email,
        nombre: user.displayName,
      });

      const userDocRef = doc(db, 'user', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsProfessional(userData.isProfesional);
        setIsFamiliar(userData.isFamiliar);
        setDiaryCards(userData.diaryCards || []);

        
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const renderItem = ({ item }) => {
    let feelingImageSource;

    switch (item.feeling) {
      case 'caritacontenta':
        feelingImageSource = require('../../assets/iconos/caritacontenta.png');
        break;
      case 'caritatranquila':
        feelingImageSource = require('../../assets/iconos/caritatranquila.png');
        break;
      case 'caritaenfadada':
        feelingImageSource = require('../../assets/iconos/caritaenfadada.png');
        break;
      case 'caritatriste':
        feelingImageSource = require('../../assets/iconos/caritatriste.png');
        break;
      default:
        feelingImageSource = null;
    }

    return (
      <CardDiaryCom style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 25, paddingRight: 25, paddingTop: 15 }}>
          <Text>{format(item.diaryTime.toDate(), 'dd/MM/yyyy HH:mm')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditDiaryScreen', { diaryToEdit: item.diaryText, feelingToEdit:item.feeling })}>
            <FontAwesome name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <DiaryText>{item.diaryText}</DiaryText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DiaryText>Hoy me siento: </DiaryText>
          {feelingImageSource && (
            <Image
              source={feelingImageSource}
            />
          )}
        </View>
      </CardDiaryCom>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
      <UserImgDiary source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqLHetw4u8ODXWqrunrcK_YeLbyQayrxfYVZrvyYiMw&s' }} />
      <UserNameDiary>{auth.currentUser.displayName}</UserNameDiary>
      <CardDiary style={{ marginTop: 35, backgroundColor: '#fff' }}>
        <AddDiaryBar>
          <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Diario</Text>
          <NoteButton onPress={() => navigation.navigate('AddDiaryScreen', { loadUserData })}>
            <Text>AÑADIR NOTA</Text>
          </NoteButton>
        </AddDiaryBar>
        <FlatList
          data={diaryCards}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </CardDiary>
    </View>
  );
};

export default PerfilScreen;
