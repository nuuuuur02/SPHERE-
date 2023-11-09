import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { db, storagebd } from '../components/ConfigFirebase';
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
    setLiked(isUserLiked);
    getCommentCount().then(count => {
      setCommentCount(count);
    });
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
    setIsMenuOpen(!isMenuOpen); // Cambia el estado para abrir o cerrar el menú
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
      const postId = item.id; // Supongamos que tienes un campo id en tu objeto item
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        const currentLikes = postData.likes || [];

        if (liked) {
          const updatedLikes = currentLikes.filter(user => user !== item.userName);
          await updateDoc(postRef, { likes: updatedLikes });
          setLikeCount(likeCount - 1);
          setLiked(false);

        } else {
          const updatedLikes = [...currentLikes, item.userName];
          await updateDoc(postRef, { likes: updatedLikes });
          setLikeCount(likeCount + 1);
          setLiked(true);

        }

      }
    } catch (error) {
      console.error('Error al actualizar la lista de likes:', error);
    }
  };

  return (
    <Card>
      <UserInfo>
        <UserImg source={{ uri: item.userImg }} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
        <View style={{ flex: 1 }}></View>
        <Interaction onPress={handleToggleMenu}>
          <Ionicons name="ellipsis-vertical" size={25} color="#333" />
        </Interaction>
      </UserInfo>
      <PostText>{item.post}</PostText>
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
          <InteractionText active={liked}>
            {likeCount} Like{likeCount !== 1 ? 's' : ''}
          </InteractionText>
        </Interaction>



        <Interaction onPress={() => navigation.navigate('AddCommentScreen', { item })}>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>
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