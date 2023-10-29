import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { storagebd, db } from '../../../components/ConfigFirebase';
import { doc, setDoc, addDoc, collection, snapshotEqual, Timestamp, orderBy, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const { userName, userImg, item } = route.params;
    const { userName, userImg, item } = route.params;

    const temporalAvatar = 'https://picsum.photos/200/300?grayscale';

    const truncateName = (name) => {
        const userNameSliced = name.split(' ');
        const firstName = userNameSliced[0];
        return firstName.length > 10 ? firstName.slice(0, 10) + "..." : firstName;
    };

    const userNames = [];
    userNames.push(userName);
    userNames.push("Armand Putero Ballesteros");

    const truncatedUserNames = userNames.map((name) => truncateName(name));

    function create(messages) {

        addDoc(collection(db, "groups"), {
            comments: messages,
            userName: "Armand Putito",
        })
    }


    const postMessages = async (message) => {
        try {
            console.log("", item.id)
            console.log(item)
            console.log(message)
            
                const postId = item.id;
                const postRef = doc(db, 'test', postId);
            const postDoc = await getDoc(postRef);
            console.log(postDoc.exists())
            const postData = postDoc.data();
            const currentMessages = postData.messages || [];

                    // Agregar el comentario con información del usuario
                    const user = {
                        userName: "pepe", // Reemplaza 'NombreUsuario' con el nombre real del usuario
                        //userImg: item.userImg, // Reemplaza 'URLImagenUsuario' con la URL de la imagen real del usuario
                    };
                    console.log(user)

                    currentMessages.push( "A", "B" );
                    await updateDoc(postRef, { messages: currentMessages });
                    console.log("currentMessages: ", currentMessages)
                    console.log("DB: ", db)
            } catch (error) {
                console.error('Error al agregar el comentario: ', error);
            }
    }


    useEffect(() => {
        setMessages([
            {
                _id: 6,
                text: 'Nice XDDDDD',
                createdAt: new Date(),
                user: {
                    _id: 3,
                    name: truncatedUserNames[1],
                    avatar: temporalAvatar,
                },
            },
            {
                _id: 5,
                text: 'Oh fuck',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: truncatedUserNames[0],
                    avatar: userImg,
                },
            },
            {
                _id: 4,
                text: 'Hi, I\'m fine, and you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: truncatedUserNames[0],
                    avatar: userImg,
                },
            },
            {
                _id: 3,
                text: 'How are you?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                },
            },
            {
                _id: 2,
                text: 'Hi',
                createdAt: new Date(),
                user: {
                    _id: 3,
                    name: truncatedUserNames[1],
                    avatar: temporalAvatar,
                },
            },
            {
                _id: 1,
                text: 'Nice',
                createdAt: new Date(),
                user: {
                    _id: 1,
                },
            },
        ]);
    }, [userImg]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 2, marginRight: 5 }}
                        size={45}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    left: {
                        backgroundColor: '#dddddd',
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={25} color='#333' />
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => {
                postMessages(messages)
                onSend(messages)
            }}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            renderUsernameOnMessage={true}
        />
    );
};

export default ChatScreen;