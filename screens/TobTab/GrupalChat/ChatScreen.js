import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from '../../../components/ConfigFirebase';
import { doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";

const ChatScreen = ({ route }) => {

    const { item } = route.params;
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, [item.id]);

    const truncateName = (name) => {
        const userNameSliced = name.split(' ');
        const firstName = userNameSliced[0];
        return firstName.length > 10 ? firstName.slice(0, 10) + "..." : firstName;
    };

    const postMessage = async (message) => {

        try {
            const postId = item.id;
            const postRef = doc(db, 'groups', postId);
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();
            const currentMessages = postData && postData._messages ? postData._messages : [];

            _messages = currentMessages.concat(message);
            messageTime = Timestamp.now().toDate();

            await updateDoc(postRef, { _messages, messageTime });

        } catch (error) {
            console.error('Error al agregar el comentario: ', error);
        }
    }

    const fetchMessages = async () => {

        try {
            const postId = item.id;
            const postRef = doc(db, 'groups', postId);
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
            console.error('Error al cargar los comentarios: ', error);
        }
    }

    const onSend = useCallback((messageText = []) => {

        postMessage(messageText);

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messageText),
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
        return (
            <FontAwesome name='angle-double-down' size={25} color='#333' />
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,         // Cambiar id al usuario actual que haya iniciado sesi�n en la base de datos
                name: "user",   // Cambiar user al usuario actual que haya iniciado sesi�n en la base de datos
                avatar: "https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2FGroups%2FLiax.jpg?alt=media&token=237b919f-0d72-46c3-a25f-06cc591cba13",
                                // Cambiar avatar al usuario actual que haya iniciado sesi�n en la base de datos
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