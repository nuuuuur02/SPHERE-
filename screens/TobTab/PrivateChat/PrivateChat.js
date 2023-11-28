import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { db } from '../../../components/ConfigFirebase';
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
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

    const [messages, setChats] = useState(null);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        const chats = query((collection(db, "chats")));//, orderBy("messageTime", "asc"));
        getDocs(chats).then(docSnap => {
            const everyChat = [];
            docSnap.forEach((doc) => {
                everyChat.push({ ...doc.data(), id: doc.id })
                setChats(everyChat)
            })
        })

    }

    return (
        <>
            <View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    padding: 15,
                }} >
                    Otros expertos
                </Text>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={{
                        height: 250,
                        padding: 15,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.resource, styles.elevResource]}
                            onPress={() => navigation.navigate('Private Chat', { item })}>
                            {/*<Image
                                source={{
                                    uri: 'https://centropediatrico.es/wp-content/uploads/2018/05/reconocer-TEA-ninos-600x300.jpg',
                                }}
                                style={styles.resourceImage}
                            />
                            <View style={styles.headingContainer}>
                                <Text style={styles.headerText}>
                                    �C�mo reconocer los signos del TEA en ni�os?
                                </Text>
                            </View>*/}
                            <Image
                                source={{
                                    uri: 'https://centropediatrico.es/wp-content/uploads/2018/05/reconocer-TEA-ninos-600x300.jpg',
                                }}
                                style={styles.resourceImage}
                            >
                            </Image>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}
                            >
                                Change Name
                            </Text>
                            <Text
                                style={{
                                    padding: 5,
                                }}
                            >Change Description</Text>
                            <View
                                
                                style={{
                                    flexDirection: 'row',
                                    padding: 15,
                                }}
                            >
                                <Feather
                                    name="phone"
                                    size={20}
                                    style={{
                                        paddingRight: 20,
                                    }}
                                />
                                <Ionicons
                                    name="md-chatbubble-outline"
                                    size={20}
                                    style={{
                                        paddingLeft: 20,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        padding: 15,
                    }}
                >
                    Chats abiertos
                </Text>
            </View>
            <Container>
                <FlatList
                    data={messages}
                    keyExtractor={item=>item.id}
                    renderItem={({ item }) => (
                        <Card onPress={() => navigation.navigate('Private Chat', { item })}>
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
        </>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container: {
        padding: 8
    },
    resource: {
        flex: 1,
        alignItems: 'center',
        width: 165,
        height: 220,
        borderRadius: 20,
        marginLeft: 5,
        color: '#000000'
    },
    elevResource: {
        backgroundColor: 'white',
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#ffffff'
    },
    resourceImage: {
        margin: 20,
        height: 75,
        width: 75,
        borderRadius: 50,
    },
    headerText: {
        color: '#ffffff',
        margin: 8,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    }
});