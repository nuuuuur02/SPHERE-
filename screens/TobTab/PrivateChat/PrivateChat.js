import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, getDocs, orderBy, where } from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
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

    useEffect(() => {
        fetchChats();
        getProfessionalUsers();
    }, []);

    const fetchChats = async () => {
        const chats = query((collection(db, "chats")));//, orderBy("messageTime", "asc"));
        getDocs(chats).then(docSnap => {
            const everyChat = [];
            docSnap.forEach((doc) => {
                everyChat.push({ ...doc.data(), id: doc.id })
            })
            setChats(everyChat)
        })
    }

    const getProfessionalUsers = async () => {
        const professionalUsers = query((collection(db, "user")), where("isProfessional", "==", true));
        getDocs(professionalUsers).then(docSnap => {
            const everyProfessionalUser = [];
            docSnap.forEach((doc) => {
                everyProfessionalUser.push({ ...doc.data(), id: doc.id })
            })
            setProfessionals(everyProfessionalUser)
        })
    }

    // Genera colores en función de la posición del elemento
    const generateColor = (index) => {
        const hue = (index * 50) % 360; // Ajusta el valor según tus preferencias
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

    const ExpertItem = ({ item, index, navigation }) => (
        <TouchableOpacity
            style={[
                styles.resource,
                styles.elevResource,
                { backgroundColor: generateColor(index) },
            ]}
            onPress={() => navigation.navigate('Private Chat', { item })}
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

    return (
        <>
            <View>
                <Text style={styles.titleText}>Otros expertos</Text>
                <FlatList
                    data={professionals}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatListContainer}
                    renderItem={({ item, index }) => <ExpertItem item={item} index={index} navigation={navigation} />}
                />
                <Text style={styles.titleText}>Chats abiertos</Text>
            </View>
            <Container>
                <FlatList
                    data={messages}
                    keyExtractor={item=>item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => navigation.navigate('Private Chat', { item })}>
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={{ uri: item.userImg }} />
                                </UserImgWrapper>
                                <TextSection>
                                    <UserInfoText>
                                        <UserName>{item.userName}</UserName>
                                        <PostTime>{item.messageTime}</PostTime>
                                    </UserInfoText>
                                    <MessageText>{item.messageText}</MessageText>
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
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 15,
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
        margin: 15,
    },
});