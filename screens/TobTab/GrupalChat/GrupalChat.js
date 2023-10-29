import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
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
} from '../../../styles/GrupalChat/MessageStyles';

const MessagesScreen = ({ navigation }) => {

    const [messages, setGroups] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const groups = query((collection(db, 'groups')));//, orderBy("messageTime", "asc"));
        getDocs(groups).then(docSnap => {
            const everyGroup = [];
            docSnap.forEach((doc) => {
                everyGroup.push({ ...doc.data(), id: doc.id })
                setGroups(everyGroup)
            })
        })
    }

    return (
        <Container>
            <FlatList
                data={messages}
                keyExtractor={item=>item.id}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { item })}>
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