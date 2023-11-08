import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../components/ConfigFirebase';
import { updateDoc, getDoc, doc } from "firebase/firestore";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropMenuReport from '../components/DropMenuReport';
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
    CardCom
} from '../styles/FeedStyles';

const AddCommentScreen = ({ route }) => {
    const { item } = route.params;
    const [comment, setComment] = useState('');
    const [isCommentEmpty, setIsCommentEmpty] = useState(true);
    const [comments, setComments] = useState([]);
    const [openMenus, setOpenMenus] = useState({});
    const [commReport, setCountReport] = useState(0);

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

    const toggleMenu = (index) => {
        // Cerrar todos los menús abiertos
        const newOpenMenus = {};
        Object.keys(openMenus).forEach((key) => {
            newOpenMenus[key] = false;
        });

        // Abrir el menú correspondiente al índice seleccionado
        newOpenMenus[index] = !openMenus[index];
        setOpenMenus(newOpenMenus);
    }

    const checkReport = async (commentIndex) => {
        addCountReport(commentIndex)
        const newOpenMenus = {};
        Object.keys(openMenus).forEach((key) => {
            newOpenMenus[key] = false;
        });
        setOpenMenus(newOpenMenus);
        if (comments[commentIndex].user.commReport >= 10){
            console.log("Eliminarr")
            try {
                // Verifica que el índice de comentario sea válido
                if (commentIndex >= 0 && commentIndex < comments.length) {
                    // Obtén el ID del post
                    const postId = item.id;
    
                    // Obtén el documento del post
                    const postRef = doc(db, 'posts', postId);
                    const postDoc = await getDoc(postRef);
    
                    if (postDoc.exists()) {
                        // Obtén los datos del post
                        const postData = postDoc.data();
                        const currentComments = postData.comments || [];
    
                        // Elimina el comentario basado en el índice
                        currentComments.splice(commentIndex, 1);
    
                        // Actualiza el documento del post con la nueva lista de comentarios
                        await updateDoc(postRef, { comments: currentComments });
    
                        // Actualiza la lista de comentarios local
                        setComments(currentComments);
                        const newOpenMenus = {};
                        Object.keys(openMenus).forEach((key) => {
                            newOpenMenus[key] = false;
                        });
                        setOpenMenus(newOpenMenus);
                    }
                } else {
                    console.error('Índice de comentario no válido:', commentIndex);
                }} catch (error) {
                    console.error('Error al eliminar el comentario:', error);
                }
        }

    }

    const addCountReport = async (commentIndex) => {
        try {
            if (commentIndex < comments.length) {
                // Verifica que el índice esté dentro de los límites válidos
                comments[commentIndex].user.commReport += 1;

                const postId = item.id;
                const postRef = doc(db, 'posts', postId);
                const postDoc = await getDoc(postRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const currentComments = postData.comments || [];

                    currentComments[commentIndex] = comments[commentIndex];

                    await updateDoc(postRef, { comments: currentComments });
                }
            } else {
                console.error('Índice de comentario no válido:', commentIndex);
            }
        } catch (error) {
            console.error('Error al actualizar el contador de commReport:', error);
        }
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
                        userName: item.userName,
                        userImg: item.userImg,
                        commReport: 0,
                    };

                    currentComments.push({ comment, user });
                    await updateDoc(postRef, { comments: currentComments });
                    setComment('');
                    setIsCommentEmpty(true);
                    setComments(currentComments);
                }
                fetchComments();
            } catch (error) {
                console.error('Error awl agregar el comentario:', error);
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
                            <CardCom>
                                <UserInfo>
                                    <UserImg source={{ uri: item.user.userImg }} />
                                    <UserInfoText>
                                        <UserName>{item.user.userName}</UserName>

                                    </UserInfoText>
                                    <View style={{ flex: 1 }}></View>
                                    <Interaction onPress={() => toggleMenu(index)}>
                                        <Ionicons name="ellipsis-vertical" size={25} color="#333" />
                                    </Interaction>
                                </UserInfo>

                                <PostText>{item.comment}</PostText>
                                <DropMenuReport
                                    isVisible={openMenus[index]}
                                    onReportPress={() => checkReport(comments.length - index)} // Pasa el índice inverso
                                    onClose={() => toggleMenu(index)}
                                />
                            </CardCom>

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