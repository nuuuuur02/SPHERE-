import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
import { query, collection, getDocs, orderBy, where, setDoc, doc, addDoc, onSnapshot } from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { EventRegister } from 'react-native-event-listeners';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../../../styles/PrivateChat/MessageStyles';

const MessagesScreen = ({ navigation }) => {

    const [messages, setChats] = useState(null);
    const [professionals, setProfessionals] = useState(null);
    const [newDocId, setNewDocId] = useState(null);
    const [lastDocId, setLastDocId] = useState(null);
    const [itemExpertUser, setItemExpertUser] = useState(null);

    useLayoutEffect(() => {
        fetchChats();
    }, []);

    // Get every chat in the data base
    const fetchChats = async () => {
        const chats = query(collection(db, "chats"), orderBy("messageTime", "desc"));
        const unsubscribe = onSnapshot(chats, (querySnapshot) => {
            const everyChat = [];
            const currentUser = auth.currentUser?.email;

            querySnapshot.forEach((doc) => {
                const chatData = doc.data();
                const usersInChat = chatData.usersInGroup || [];

                if (usersInChat.includes(currentUser)) {
                    everyChat.push({ ...doc.data(), id: doc.id })
                }
            })
            getProfessionalUsers(everyChat);
            setChats(everyChat)
        })

        return () => unsubscribe();
    }

    // Get every professional user in the data base
    const getProfessionalUsers = async (everyChat) => {
        const professionalUsers = query((collection(db, "user")), where("isProfessional", "==", true));
        const unsubscribe = onSnapshot(professionalUsers, (querySnapshot) => {
            const everyProfessionalUser = [];
            const currentUser = auth.currentUser?.email;
            const professionalEmailsInChats = new Set(everyChat.flatMap(chat => chat.usersInGroup));

            querySnapshot.forEach((doc) => {

                const professionalData = doc.data();

                //!((everyChat[0].usersInGroup).includes(professionalData.email))
                if (!professionalEmailsInChats.has(professionalData.email))
                {
                    everyProfessionalUser.push({ ...doc.data(), id: doc.id });
                }
            })
            setProfessionals(everyProfessionalUser)
        })

        return () => unsubscribe();
    }

    // Genera colores en funci�n de la posici�n del elemento
    const generateColor = (index) => {
        const hue = (index * 50) % 360; // Ajusta el valor seg�n tus preferencias
        return `hsl(${hue}, 70%, 70%)`; // HSL para tonos claros
    };

    // Return a sliced name
    // If the first and second name are too long, return only the first name
    // Else return the entire name
    const truncateName = (name) => {
        const userNameSliced = name.split(' ');
        const expertName = userNameSliced[0] + ' ' + userNameSliced[1];
        return expertName.length > 15 ? (expertName.split(' '))[0] : expertName;
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

    AddChat = async (itemExpertUser) => {
        try {

            // Add the expert user to the chat
            const actualUsers = [itemExpertUser.email]
            actualUsers.unshift(auth.currentUser?.email)

            const chats = collection(db, 'chats');

            const newChat = {
                userName: itemExpertUser.displayName,
                messageText: itemExpertUser.descriptionProfessional,
                userImg: itemExpertUser.photoURL,
                messageTime: new Date(),
                usersInGroup: actualUsers,
            };

            // A�adir un nuevo documento a la colecci�n
            const docRef = await addDoc(chats, newChat);
            await setNewDocId(docRef.id);
        }
        catch (error) {
            console.error('Error al agregar el grupo: ', error);
        }
    }

    // Expert component
    const ExpertItem = ({ item, index, navigation }) => {

        const handlePress = async () => {
            setItemExpertUser(item);
            await AddChat(item);
        };

        return (
            <TouchableOpacity
                style={[
                    styles.resource,
                    styles.elevResource,
                    { backgroundColor: generateColor(index) },
                ]}
                onPress={handlePress}
            >
                <Image
                    source={{ uri: item.photoURL }}
                    style={styles.resourceImage}
                />
                <Text style={styles.expertName}>{truncateName(item.displayName)}</Text>
                <Text style={styles.expertDescription}>{item.descriptionProfessional}</Text>
                <View style={styles.contactIcons}>
                    <Feather name="phone" size={20} style={styles.phoneIcon} />
                    <Ionicons name="md-chatbubble-outline" size={20} style={styles.chatIcon} />
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        if (newDocId != lastDocId && itemExpertUser) {
            setLastDocId(newDocId);
            navigation.navigate('Private Chat', { item: itemExpertUser, newDocId });
        }
    }, [newDocId]);

    return (
        <>
            <View>
                <Text style={styles.titleTextOthers}>Otros expertos</Text>
                <FlatList
                    data={professionals}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatListContainer}
                    renderItem={({ item, index }) => <ExpertItem item={item} index={index} navigation={navigation} />}
                />
                <Text style={styles.titleTextOpen}>Chats abiertos</Text>
            </View>
            <Container style={darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' }}>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card onPress={() => navigation.navigate('Private Chat', { item })}>
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={{ uri: item.userImg }} />
                                </UserImgWrapper>
                                <TextSection>
                                    <UserInfoText>
                                        <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.userName}</UserName>
                                        <PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }}>{item.messageTime.toDate().toLocaleString()}</PostTime>
                                    </UserInfoText>
                                    <MessageText style={darkMode === true ? { color: '#909090' } : { color: '#333333' }}>{item.messageText}</MessageText>
                                </TextSection>
                            </UserInfo>
                        </Card>
                    )}
                />
            </Container>
        </>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    resource: {
        flex: 1,
        alignItems: 'center',
        width: 165,
        height: 220,
        borderRadius: 20,
        marginLeft: 10,
        color: '#000000',
    },
    elevResource: {
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#ffffff'
    },
    resourceImage: {
        margin: 20,
        height: 75,
        width: 75,
        borderRadius: 50,
    },
    titleTextOthers: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    titleTextOpen: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    expertName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    expertDescription: {
        padding: 5,
    },
    contactIcons: {
        flexDirection: 'row',
        padding: 15,
    },
    phoneIcon: {
        paddingRight: 20,
    },
    chatIcon: {
        paddingLeft: 20,
    },
    flatListContainer: {
        height: 250,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
});