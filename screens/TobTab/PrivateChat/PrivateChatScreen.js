import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { Bubble, GiftedChat, Send, Day, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db, auth } from '../../../components/ConfigFirebase';
import { doc, updateDoc, getDoc, Timestamp, onSnapshot } from "firebase/firestore";

const PrivateChatScreen = ({ route }) => {

    const { item, newDocId } = route.params;

    if (newDocId) {
        postId = newDocId;
    }
    else {
        postId = item.id;
    }

    const postRef = doc(db, 'chats', postId);

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {

        const unsubscribe = onSnapshot(postRef, () => {
            fetchMessages();
        });

        return () => unsubscribe();

    }, []);

    // Return a sliced name
    // If the first and second name are too long, return only the first name
    // Else return the entire name
    const truncateName = (name) => {
        const userNameSliced = name.split(' ');
        const expertName = userNameSliced[0] + ' ' + userNameSliced[1];
        return expertName.length > 15 ? (expertName.split(' '))[0] : expertName;
    };

    const postMessage = async (message) => {

        try {
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();
            const currentMessages = postData && postData._messages ? postData._messages : [];

            _messages = currentMessages.concat(message);
            messageTime = Timestamp.now().toDate();

            await updateDoc(postRef, { _messages, messageTime });

        } catch (error) {
            console.error('Error al enviar el mensaje: ', error);
        }
    }

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

    const onSend = useCallback((messageText = []) => {

        postMessage(messageText);

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messageText),
        );

    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#725AB9",
                            fontWeight: 'bold',
                            alignItems: 'center',
                        }}
                    >
                        Enviar
                    </Text>
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
                        backgroundColor: '#B7C1FF',
                        padding: 15,
                    },
                    left: {
                        backgroundColor: '#F9F9F9',
                        padding: 15,
                    }
                }}
                textStyle={{
                    right: {
                        color: '#111111',
                    },
                    left: {
                        color: '#111111',
                    },
                }}
                timeTextStyle={{
                    right: { color: '#727272' },
                    left: { color: '#727272' }
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={25} color='#333' />
        );
    }

    const renderUsername = (user) => {
        return (
            <View>
                <Text
                    style={{
                        color: '#725AB9',
                        marginLeft: 10,
                        marginBottom: 5,
                        marginTop: -4,
                        fontWeight: 'bold',
                    }}>
                    {user.name}
                </Text>
            </View>
        );
    };

    const renderDay = (props) => {
        return <Day {...props} textStyle={{ color: '#111111' }} />
    }

    const renderInputToolbar = (props) => {
        return <InputToolbar  {...props} containerStyle={{
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
        }} />
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth.currentUser?.uid,
                name: auth.currentUser?.displayName,
                avatar: auth.currentUser?.photoURL,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            renderUsernameOnMessage
            renderUsername={renderUsername}
            placeholder={''}
            renderAvatarOnTop
            timeFormat={"H:ss"}
            renderDay={renderDay}
            renderInputToolbar={renderInputToolbar}
            minInputToolbarHeight={90}
            textInputStyle={{
                marginBottom: 10,
                marginTop: 10,
            }}
        />
    );
};

export default PrivateChatScreen;