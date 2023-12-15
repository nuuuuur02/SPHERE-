import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
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
    const [newMessage, setNewMessage] = useState(false);

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

                // Comprueba si el usuario actual está en el grupo
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

    const fetchMessages = async () => {

        try {
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                const postData = postDoc.data();
                const postMessages = postData && postData._messages ? postData._messages : [];

                const messages = postMessages.map((message) => {
                    const _messages = message;
                    const truncatedUserName = truncateName(_messages.user.name);
                    return {
                        _id: _messages._id,
                        text: _messages.text,
                        createdAt: new Date(_messages.createdAt.seconds * 1000),
                        user: {
                            ..._messages.user,
                            name: truncatedUserName,
                        },
                        image: _messages.image,
                        sent: _messages.sent,
                        received: _messages.received,
                    };
                });

                setMessages(messages.slice().reverse())
            }
        } catch (error) {
            console.error('Error al cargar los mensajes: ', error);
        }
    }

    return (
        <Container style={darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' }}>
            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { item })}>
                        <UserInfo style={{ marginTop: 15 }}>
                            <UserImgWrapper>
                                <UserImg source={{ uri: item.userImg }} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.userName}</UserName>
                                    {/*<PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }}>{item.messageTime.toDate().toLocaleString()}</PostTime>*/}
                                </UserInfoText>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                    }}>
                                    <MessageText style={{
                                        marginBottom: 15,

                                    }}
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                    >
                                        {item.messageText}
                                    </MessageText>
                                    {newMessage ? (
                                        <View style={{
                                            height: 30,
                                            width: 30,
                                            backgroundColor: '#FFD37E',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                            marginTop: -12.5,
                                        }}
                                        />
                                    ) : (<></>)}
                                </View>
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