import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';
import { collection, doc, updateDoc, serverTimestamp, getDoc, Timestamp } from 'firebase/firestore';
import {
    CardDiary,
    CardDiaryCom,
    CardAddDiary,
    DiaryText,
    AddDiaryBar,
    NoteButton,
    UserImgDiary,
    UserNameDiary,
    userFeelingImg,
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

const AddDiaryScreen = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [inputText, setInputText] = useState('');

    const handleFeelButtonPress = (feeling) => {
        setSelectedButton(selectedButton === feeling ? null : feeling);
    };

    const saveDiaryEntry = async (diaryText, feeling) => {
        try {
            const user = auth.currentUser;

            if (!user || !user.uid) {
                console.error('Usuario no autenticado o sin UID');
                return;
            }

            const clientTimestamp = new Date();

            const userRef = doc(db, 'user', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const existingDiaryCards = userDoc.data().diaryCards || [];

                const newDiaryEntry = {
                    diaryText,
                    feeling,

                    diaryTime: Timestamp.fromDate(new Date())
                };

                const updatedDiaryCards = [newDiaryEntry, ...existingDiaryCards];

                await updateDoc(userRef, {
                    diaryCards: updatedDiaryCards,
                });


                console.log('Entrada de diario guardada exitosamente');
            } else {
                console.error('El documento de usuario no existe');
            }
        } catch (error) {
            console.error('Error al guardar la entrada de diario:', error);
        }
    };


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setSelectedButton(null);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setSelectedButton(selectedButton);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [selectedButton]);

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
                    <FeelButton onPress={() => handleFeelButtonPress('Carita Contenta')} isSelected={selectedButton === 'Carita Contenta'}>
                        <Image source={require('../../assets/iconos/caritacontenta.png')} />
                    </FeelButton>
                    <FeelButton onPress={() => handleFeelButtonPress('Carita Tranquila')} isSelected={selectedButton === 'Carita Tranquila'}>
                        <Image source={require('../../assets/iconos/caritatranquila.png')} />
                    </FeelButton>
                    <FeelButton onPress={() => handleFeelButtonPress('Carita Enfadada')} isSelected={selectedButton === 'Carita Enfadada'}>
                        <Image source={require('../../assets/iconos/caritaenfadada.png')} />
                    </FeelButton>
                    <FeelButton onPress={() => handleFeelButtonPress('Carita Triste')} isSelected={selectedButton === 'Carita Triste'}>
                        <Image source={require('../../assets/iconos/caritatriste.png')} />
                    </FeelButton>
                </View>
                <View style={{ position: 'absolute', bottom: 0, right: 0, alignSelf: 'flex-end', padding: 30 }}>
                    <NoteButton onPress={() => {
                        saveDiaryEntry(inputText, selectedButton);
                        navigation.goBack();
                    }}>
                        <Text>¡HECHO!</Text>
                    </NoteButton>
                </View>
            </CardAddDiary>
        </KeyboardAvoidingView>
    );
};

export default AddDiaryScreen;
