import { View, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth, deleteUser } from '../components/ConfigFirebase';
import { arrayUnion, updateDoc, getDoc, doc, query, getDocs, collection, setDoc } from "firebase/firestore";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropMenuReport from '../components/DropMenuReport';
import { FontAwesome } from '@expo/vector-icons';
import { Alert } from 'react-native';
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
  Divider,
  CardCom
} from '../styles/FeedStyles';
import { EventRegister } from 'react-native-event-listeners';

const AddCommentScreen = ({ route }) => {
  const { item } = route.params;
  const [comment, setComment] = useState('');
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);
  const [comments, setComments] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

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
  };

  const handleCommentChange = (txt) => {
    setComment(txt);
    setIsCommentEmpty(txt === '');
  };

  const toggleMenu = (index) => {
    // Abrir o cerrar el menú correspondiente al índice seleccionado
    setOpenMenus((prevOpenMenus) => ({ ...prevOpenMenus, [index]: !prevOpenMenus[index] }));
  };

  const checkReport = async (commentIndex) => {
    // Verificar si el creador del comentario es el mismo que el usuario actual
    const isCurrentUserCreator = comments[commentIndex].user.userEmail === auth.currentUser?.email;

    // Evitar que el creador del comentario se reporte a sí mismo
    if (isCurrentUserCreator) {
      Alert.alert(
        'No puedes reportar tu propio comentario',
        'Solo puedes reportar comentarios de otros usuarios.',
        [
          {
            text: 'Vale',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      return;
    }

    addCountReport(commentIndex);

    const newOpenMenus = {};
    Object.keys(openMenus).forEach((key) => {
      newOpenMenus[key] = false;
    });
    setOpenMenus(newOpenMenus);
    alertReport();

    if (comments[commentIndex].user.commReport >= 10) {
      console.log('Eliminar');
      try {
        // Verifica que el índice de comentario sea válido
        if (commentIndex >= 0 && commentIndex < comments.length) {
          const reportedUserEmail = comments[commentIndex].user.userEmail;

          await addToBlacklist(reportedUserEmail);

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
          }
        } else {
          console.error('Índice de comentario no válido:', commentIndex);
        }
      } catch (error) {
        console.error('Error al eliminar el comentario:', error);
      }
    }
  };

  const addToBlacklist = async (reportedUserEmail) => {
    try {
      // Obtén la referencia de la colección "listaNegraUsers"
      const blacklistRef = collection(db, 'listaNegraUsers');

      // Obtén los documentos de la colección
      const snapshot = await getDocs(blacklistRef);

      // Supongamos que solo hay un documento en la colección
      const docId = snapshot.docs[0].id;

      // Actualiza el documento añadiendo el email reportado a la listaNegra
      await updateDoc(doc(blacklistRef, docId), {
        listaNegra: arrayUnion(reportedUserEmail),
      });

      console.log('Email añadido a la lista negra con éxito');
    } catch (error) {
      console.error('Error al añadir el email a la lista negra:', error);
    }
  };

  const alertReport = async () => {
    Alert.alert(
      'Reportado con éxito',
      'Gracias por avisarnos',
      [
        {
          text: 'Vale',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

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
  };

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
            userName: auth.currentUser?.displayName,
            userImg: auth.currentUser?.photoURL,
            userEmail: auth.currentUser?.email,
            commReport: 0,
          };

          currentComments.push({ comment, user });
          await updateDoc(postRef, { comments: currentComments });
          setComment('');
          setIsCommentEmpty(true);
          setComments(currentComments);
          console.log(user);
        }
        fetchComments();
      } catch (error) {
        console.error('Error al agregar el comentario:', error);
      }
    }
  };

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
    <View style={{ flex: 1 }} backgroundColor={'#ebebeb'}>
      <FlatList
        data={[item, ...comments.slice().reverse()]} // Combine el item principal con los comentarios
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            // Renderiza el Card principal
            return (
              <Card style={darkMode === true ? { backgroundColor: '#202020'} : { backgroundColor: '#f8f8f8' }}>
                <UserInfo>
                  <UserImg source={{ uri: item.userImg }} />
                  <UserInfoText>
                    <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.userName}</UserName>
                    <PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }}>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                  </UserInfoText>
                </UserInfo>
                <PostText style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.post}</PostText>
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
              <CardCom style={darkMode === true ? { backgroundColor: '#202020' } : { backgroundColor: '#f8f8f8' }}>
                <UserInfo>
                  <UserImg source={{ uri: item.user.userImg }} />
                  <UserInfoText>
                    <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.user.userName}</UserName>

                  </UserInfoText>
                  <View style={{ flex: 1 }}></View>
                  <Interaction onPress={() => toggleMenu(index)}>
                    <Ionicons name="ellipsis-vertical" size={25} color="#333" />
                  </Interaction>
                </UserInfo>

                <PostText>{item.comment}</PostText>
                
                {auth.currentUser.displayName != item.user.userName && (
                  <DropMenuReport
                    isVisible={openMenus[index]}
                    onReportPress={() => checkReport(comments.length - index)} // Pasa el índice inverso
                    onClose={() => toggleMenu(index)}
                  />
                )}
              </CardCom>

            );
          }
        }}
      />
      <View style={{
        height: 60,
        backgroundColor: '#d9cffb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
            

      }}>

        <TextInput
          value={comment}
          onChangeText={handleCommentChange}
          placeholder="Escribe algún comentario"
          style={{
            flex: 1,
            marginLeft: 20,
            
          }}
        />
        <View style={{ marginRight: 20 }}>
         
           <Ionicons name="md-send" size={25} color='#333' onPress={postComment} disabled={isCommentEmpty}/>
        </View>
      </View>
    </View>
  );
};

export default AddCommentScreen;