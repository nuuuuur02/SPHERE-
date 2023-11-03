import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

    const [groups, setGroups] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const localGroups = query((collection(db, 'groups')), orderBy("messageTime", "desc"));
        const unsubscribe = onSnapshot(localGroups, (querySnapshot) => {
            const everyGroup = [];
            querySnapshot.forEach((doc) => {
                everyGroup.push({ ...doc.data(), id: doc.id });
            });
            setGroups(everyGroup);
        });

        return () => unsubscribe();
    }

    return (
        <Container>
            <FlatList
                data={groups}
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
                                    <PostTime>{item.messageTime.toDate().toLocaleString()}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
            <FontAwesome5.Button
                name="plus"
                size={22}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={() => navigation.navigate('CreateChat')}
                style={{ marginBottom: 10 }}
            />
        </Container>
    );
};

export default MessagesScreen;