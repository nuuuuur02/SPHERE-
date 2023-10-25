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

    const [messages, setGroups] = useState(null);

    const fetchPosts = async () => {
        const users = query((collection(db, "user")));//, orderBy("messageTime", "asc"));
        //console.log("holaaa")
        getDocs(users).then(docSnap => {
            const users1 = [];
            docSnap.forEach((doc) => {
                users1.push({ ...doc.data(), id: doc.id })
                setGroups(users1)
            })
            //console.log(users1)
        })

    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Container>
            <FlatList
                data={messages}
                keyExtractor={item=>item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { userName: item.userName, userImg: item.userImg })}>
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