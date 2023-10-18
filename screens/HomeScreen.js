import React, { useState,useEffect} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    Button,
    RefreshControl,
} from 'react-native';
import {Container,} from '../styles/FeedStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostCard  from '../components/PostCard';
import AddCommentScreen from './AddCommentScreen';
import {db} from '../components/ConfigFirebase';
import { query,collection,getDocs, orderBy } from "firebase/firestore";
import * as Updates from 'expo-updates';


const Posts = [
      {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../assets/users/user-3.jpg'),
        postTime: '4 mins ago',
        post:
          'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-3.jpg'),
        liked: true,
        likes: '14',
        comments: '5',
      },
      {
        id: '2',
        userName: 'John Doe',
        userImg: require('../assets/users/user-1.jpg'),
        postTime: '2 hours ago',
        post:
          'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '8',
        comments: '0',
      },
      {
        id: '3',
        userName: 'Ken William',
        userImg: require('../assets/users/user-4.jpg'),
        postTime: '1 hours ago',
        post:
          'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-2.jpg'),
        liked: true,
        likes: '1',
        comments: '0',
      },
      {
        id: '4',
        userName: 'Selina Paul',
        userImg: require('../assets/users/user-6.jpg'),
        postTime: '1 day ago',
        post:
          'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-4.jpg'),
        liked: true,
        likes: '22',
        comments: '4',
      },
      {
        id: '5',
        userName: 'Christy Alex',
        userImg: require('../assets/users/user-7.jpg'),
        postTime: '2 days ago',
        post:
          'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        
        likes: '0',
        comments: '0',
      },
    ];

    

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    onRefresh
    fetchPosts();
  }, []);
const [refreshing, setRefreshing] = useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 1000);
}, []);

  const [posts, setPosts] = useState(null);

  const fetchPosts = async () =>  {
    const q1 = query((collection(db,"posts")), orderBy("postTime","desc"));
    console.log("holaaa")
    getDocs(q1).then(docSnap => {
      const posts1 = [];
      docSnap.forEach((doc)=>{
        posts1.push({...doc.data(), id:doc.id})
        setPosts(posts1)
      })
      console.log(posts1)
    })
      
    }


    const updatePosts = (postId) => {
      // Lógica para eliminar el post de la lista posts.
      setPosts(posts.filter((post) => post.id !== postId));
    };


    return(
        
        <Container>
          
          <FlatList
            data ={posts}
            renderItem={({ item }) => (
              <PostCard item={item} updatePosts={updatePosts} />
          )}
            
            keyExtractor = {item => item.id}
            showsVerticalScrollIndicator = {false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={()=> fetchPosts()} />
            }
            />
          
          <FontAwesome5.Button
                  name="plus"
                  size={22}
                  backgroundColor="#fff"
                  color="#2e64e5"
                  onPress={() => navigation.navigate('AddPostScreen')}
          />
            
                   
        </Container>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  text:{

    fontSize: 20,
  }
});