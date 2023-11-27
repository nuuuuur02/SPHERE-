import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { db, storagebd,auth} from '../components/ConfigFirebase';
import { useNavigation } from '@react-navigation/native';
import { ref, deleteObject } from 'firebase/storage';
import { updateDoc, getDoc, doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { View } from 'react-native';
import DropMenu from './DropMenu';
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
  InteractionText,
  Divider,
} from '../styles/FeedStyles';
import { EventRegister } from 'react-native-event-listeners';

const PostCard = ({ item, updatePosts }) => {

  const isUserLiked = item.likes.includes("User");
  const [commentCount, setCommentCount] = useState(0);
  const initialLikeCount = Array.isArray(item.likes) ? item.likes.length : 0;
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(item.liked);
  const likeIconColor = liked ? '#2e64e5' : '#333';
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {
    getCommentCount().then(count => {
      setCommentCount(count);
    });
  
    // Verificar si el usuario actual ya dio like al post
    const isUserLiked = item.likes.includes(auth.currentUser?.displayName);
    setLiked(isUserLiked);
  
    // Inicializar el contador de likes
    const initialLikeCount = Array.isArray(item.likes) ? item.likes.length : 0;
    setLikeCount(initialLikeCount);
  }, []);

  const getCommentCount = async () => {
    try {
      const commentQuery = query(collection(db, "comments"), where("postId", "==", item.id));
      const commentSnapshot = await getDocs(commentQuery);
      const commentCount = commentSnapshot.size;
      return commentCount;
    } catch (error) {
      console.error('Error al obtener el número de comentarios:', error);
      return 0; // Manejar el error apropiadamente
    }
  };

  const handleToggleMenu = () => {
    const isCurrentUserOwner = auth.currentUser?.displayName === item.userName;
    if (isMenuOpen && isCurrentUserOwner) {
      setIsMenuOpen(false);
    } else {
      
      setIsMenuOpen(isCurrentUserOwner);
    }
  };

  const handleDeletePost = () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            handleToggleMenu();
          },
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const postId = item.id; // Supongamos que tienes un campo 'id' en tu objeto 'item'.

              // Elimina el documento del post de Firestore
              const postRef = doc(db, 'posts', postId);
              await deleteDoc(postRef);

              if (item.postImg) {
                // Si el post tiene una imagen, elimina la imagen del almacenamiento de Firebase
                const imageRef = ref(storagebd, item.postImg);
                await deleteObject(imageRef);
              }
              updatePosts(postId);
            } catch (error) {
              console.error('Error al eliminar el post:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleLike = async () => {
    try {
      const postId = item.id;
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
  
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const currentLikes = postData.likes || [];
        
        if (liked) {
          const updatedLikes = currentLikes.filter(user => user !== auth.currentUser?.displayName);
          await updateDoc(postRef, { likes: updatedLikes });
          setLikeCount(likeCount - 1);
          setLiked(false);
  
        } else {
          const updatedLikes = [...currentLikes, auth.currentUser?.displayName];
          await updateDoc(postRef, { likes: updatedLikes });
          setLikeCount(likeCount + 1);
          setLiked(true);
          
  
        }
      }
    } catch (error) {
      console.error('Error al actualizar la lista de likes:', error);
    }
  };

  //Theme
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
      const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
          setDarkMode(data)
      })
      return () => {
          EventRegister.removeAllListeners(listener)
      }
  }, [darkMode]  )

  return (
      <Card style={darkMode === true ? { backgroundColor: '#202020' } : { backgroundColor: '#f8f8f8' }} >
      <UserInfo>
        <UserImg source={{ uri: item.userImg }} />
        <UserInfoText>
          <UserName style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.userName}</UserName>
          <PostTime style={darkMode === true ? { color: '#909090' } : { color: '#666' }} >{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
        <View style={{ flex: 1 }}></View>
        <Interaction onPress={handleToggleMenu}>
                  <Ionicons name="ellipsis-vertical" size={25} color={darkMode === true ? '#A3A3A3' : '#333' } />
        </Interaction>
      </UserInfo>
          <PostText style={darkMode === true ? { color: 'white' } : { color: 'black' }}>{item.post}</PostText>
      {item.postImg != null ? (
        <PostImg
          //defaultImageSource={require('../assets/default-img.jpg')}
          source={{ uri: item.postImg }}
          style={{ width: '100%', height: 250 }}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}
      {/*<PostImg source ={require ('../assets/posts/post-img-2.jpg')}/>*/}

      <InteractionWrapper>

        <Interaction active={liked} onPress={toggleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={25} color={likeIconColor} />
                  <InteractionText active={liked} style={darkMode === true ? { color: 'white' } : { color: 'black' }}>
            {likeCount} Like{likeCount !== 1 ? 's' : ''}
          </InteractionText>
        </Interaction>



        <Interaction onPress={() => navigation.navigate('AddCommentScreen', { item })}>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText style={darkMode === true ? { color: 'white' } : { color: 'black' }}>
            {item.comments ? item.comments.length : 0} {item.comments && item.comments.length !== 1 ? 'Comments' : 'Comment'}
          </InteractionText>
        </Interaction>

      </InteractionWrapper>
      <DropMenu
        isVisible={isMenuOpen}
        onDeletePress={handleDeletePost}
        onClose={handleToggleMenu} // Cierra el menú cuando se hace clic en cualquier lugar
      />

    </Card>

  );
};
const styles = {
  menuContainer: {
    position: 'absolute',
    right: 10,
    top: 45,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
  },
  menuItem: {
    fontSize: 16,
    padding: 5,
  },
};
export default PostCard;