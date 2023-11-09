import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Container } from '../styles/FeedStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostCard from '../components/PostCard';
import { db } from '../components/ConfigFirebase';
import { query, collection, getDocs, orderBy } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const q1 = query(collection(db, "posts"), orderBy("postTime", "desc"));
      const docSnap = await getDocs(q1);

      const posts1 = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(posts1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const updatePosts = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} updatePosts={updatePosts} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});
