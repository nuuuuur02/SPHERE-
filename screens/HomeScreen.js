import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, NavigationContainer } from 'react-native';
import { Container } from '../styles/FeedStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostCard from '../components/PostCard';
import { db } from '../components/ConfigFirebase';
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { EventRegister } from 'react-native-event-listeners';
import ActionButton from 'react-native-action-button';

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
        <Container style={darkMode === true ? { backgroundColor: '#1c1c1c' } : { backgroundColor: '#fff' }} >
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard item={item} updatePosts={updatePosts} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

            <ActionButton
                buttonColor="#2e64e5"
                onPress={() => navigation.navigate('AddPostScreen')}
            ></ActionButton>
        </Container>
    );
};

export default HomeScreen;
