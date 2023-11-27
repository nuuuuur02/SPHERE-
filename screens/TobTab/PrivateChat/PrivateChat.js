import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, getDocs, orderBy } from "firebase/firestore";
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
import { EventRegister } from 'react-native-event-listeners';

const MessagesScreen = ({ navigation }) => {

    const [messages, setChats] = useState(null);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        const chats = query((collection(db, "chats")));//, orderBy("messageTime", "asc"));
        //console.log("holaaa")
        getDocs(chats).then(docSnap => {
            const everyChat = [];
            docSnap.forEach((doc) => {
                everyChat.push({ ...doc.data(), id: doc.id })
                setChats(everyChat)
            })
            //console.log(users1)
        })

    }

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
        <Container style={darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' }}>
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
                                    <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.userName}</UserName>
                                    <PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }}>{item.messageTime}</PostTime>
                                </UserInfoText>
                                <MessageText style={darkMode === true ? { color: '#909090' } : { color: '#333333' }}>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});