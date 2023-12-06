import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import {
  CardDiary,
  CardDiaryCom,
  DiaryText,
  AddDiaryBar,
  NoteButton,
} from '../../styles/FeedStyles';
import { FontAwesome } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isProfessionalEnabled, setIsProfessional] = useState(false);
  const [isFamiliarEnabled, setIsFamiliar] = useState(false);
  const [diaryCards, setDiaryCards] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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

          // Obtén las tarjetas del diario y guárdalas en el estado
          setDiaryCards(userData.diaryCards || []);
        }
      } else {
        setUserData(null);
        setIsProfessional(false);
        setIsFamiliar(false);
        setDiaryCards([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <CardDiaryCom style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 25, paddingRight: 25, paddingTop: 15 }}>
        <Text>{format(item.diaryTime.toDate(), 'dd/MM/yyyy HH:mm')}</Text>
        <TouchableOpacity onPress={() => console.log('Editar')}>
          <FontAwesome name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <DiaryText>{item.diaryText}</DiaryText>
      </View>
    </CardDiaryCom>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
      <CardDiary style={{ marginTop: 240, backgroundColor: '#fff' }}>
        <AddDiaryBar>
          <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Diario</Text>
          <NoteButton onPress={() => console.log('Botón Derecha Presionadoooo')}>
            <Text>AÑADIR NOTA</Text>
          </NoteButton>
        </AddDiaryBar>

        {/* Renderiza las tarjetas del diario */}
        <FlatList
          data={diaryCards}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </CardDiary>
    </View>
  );
}
