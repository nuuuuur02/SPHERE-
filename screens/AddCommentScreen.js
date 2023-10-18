import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../components/ConfigFirebase';
import { updateDoc, getDoc, doc } from "firebase/firestore";
import moment from 'moment';
import {

    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
} from '../styles/FeedStyles';

const AddCommentScreen = ({ route }) => {
    const { item } = route.params;
    const [comment, setComment] = useState('');
    const [isCommentEmpty, setIsCommentEmpty] = useState(true);
    const [comments, setComments] = useState([]);

    // Cargar los comentarios cuando el componente se monta
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const postId = item.id;
            const postRef = doc(db, 'posts', postId);
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                const postData = postDoc.data();
                const postComments = postData.comments || [];
                setComments(postComments);
            }
        } catch (error) {
            console.error('Error al cargar los comentarios:', error);
        }
    }

    const handleCommentChange = (txt) => {
        setComment(txt);
        setIsCommentEmpty(txt === '');
    }

    const postComment = async () => {
        if (!isCommentEmpty) {
            try {
                const postId = item.id;
                const postRef = doc(db, 'posts', postId);
                const postDoc = await getDoc(postRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const currentComments = postData.comments || [];

                    // Agregar el comentario con información del usuario
                    const user = {
                        userName: item.userName, // Reemplaza 'NombreUsuario' con el nombre real del usuario
                        userImg: item.userImg, // Reemplaza 'URLImagenUsuario' con la URL de la imagen real del usuario
                    };

                    currentComments.push({ comment, user });
                    await updateDoc(postRef, { comments: currentComments });
                    setComment('');
                    setIsCommentEmpty(true);
                    setComments(currentComments);
                }
                fetchComments();
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={[item, ...comments.slice().reverse()]} // Combine el item principal con los comentarios
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (index === 0) {
                        // Renderiza el Card principal
                        return (
                            <Card>
                                <UserInfo>
                                    <UserImg source={{ uri: item.userImg }} />
                                    <UserInfoText>
                                        <UserName>{item.userName}</UserName>
                                        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                                    </UserInfoText>
                                </UserInfo>
                                <PostText>{item.post}</PostText>
                                {item.postImg != null ? (
                                    <PostImg
                                        source={{ uri: item.postImg }}
                                        style={{ width: '100%', height: 250 }}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Divider />
                                )}
                                <InteractionWrapper></InteractionWrapper>
                            </Card>
                        );
                    } else {
                        // Renderiza los comentarios
                        return (
                            <Card>
                                <UserInfo>
                                    <UserImg source={{ uri: item.user.userImg }} />
                                    <UserInfoText>
                                        <UserName>{item.user.userName}</UserName>
                                        <PostText>{item.comment}</PostText>
                                    </UserInfoText>
                                </UserInfo>
                            </Card>
                        );
                    }
                }}
            />
            <View style={{
                height: 60,
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TextInput
                    value={comment}
                    onChangeText={handleCommentChange}
                    placeholder="Escribe algún comentario"
                    style={{
                        flex: 1,
                        marginLeft: 20
                    }}
                />
                <View style={{ marginRight: 20 }}>
                    <Button
                        title="Enviar"
                        onPress={postComment}
                        disabled={isCommentEmpty}
                    />
                </View>
            </View>
        </View>
    );
}

export default AddCommentScreen;