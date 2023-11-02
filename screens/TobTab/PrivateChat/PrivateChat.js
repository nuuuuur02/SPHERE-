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

    return (
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