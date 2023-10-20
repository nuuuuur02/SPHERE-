import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const { userName, userImg } = route.params;

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
            onSend={(messages) => onSend(messages)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
