import React, { useState, useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
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

    useLayoutEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const localGroups = query((collection(db, 'groups')), orderBy("messageTime", "desc"));

        const unsubscribe = onSnapshot(localGroups, (querySnapshot) => {
            const everyGroup = [];
            const currentUser = auth.currentUser?.email;

            querySnapshot.forEach((doc) => {
                const groupData = doc.data();
                const usersInGroup = groupData.usersInGroup || [];

                // Comprueba si el usuario actual est� en el grupo
                if (usersInGroup.includes(currentUser)) {
                    everyGroup.push({ ...groupData, id: doc.id });
                }
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