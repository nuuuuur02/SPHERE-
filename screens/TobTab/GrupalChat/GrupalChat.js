import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native';
import { db, auth } from '../../../components/ConfigFirebase';
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionButton from 'react-native-action-button';
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
import { EventRegister } from 'react-native-event-listeners';

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
                data={groups}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { item })}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{ uri: item.userImg }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{user.isProfessional ? item.userName : item.professionalName}</UserName>
                                    <PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }}>{item.messageTime.toDate().toLocaleString()}</PostTime>
                                </UserInfoText>
                                <MessageText style={darkMode === true ? { color: '#909090' } : { color: '#333333' }}>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
            <ActionButton
                buttonColor="#2e64e5"
                onPress={() => navigation.navigate('CreateChat')}
                style={{ position: 'absolute', bottom: 40, right: 0 }}
            ></ActionButton>
        </Container>
    );
};

export default MessagesScreen;