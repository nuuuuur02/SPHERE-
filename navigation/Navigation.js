import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//defaulSphere
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

//Screens
import PictosScreen from "../screens/Tab/PictosScreen";
import Descripcion from "../screens/Tab/Descripcion";
import CalendarioScreen from "../screens/Tab/CalendarioScreen";
import PerfilScreen from "../screens/Tab/PerfilScreen";
import AjustesScreen from "../screens/Drawer/AjustesScreen";
import ChatsScreen from "../screens/TobTab/ChatsScreen";

import PrivateChat from "../screens/TobTab/PrivateChat/PrivateChat";
import PrivateChatScreen from "../screens/TobTab/PrivateChat/PrivateChatScreen";
import GrupalChat from "../screens/TobTab/GrupalChat/GrupalChat";
import ChatScreen from "../screens/TobTab/GrupalChat/ChatScreen";

import HomeScreen from '../screens/HomeScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import AddPostScreen from '../screens/AddPostScreen';

//Icons
import { FontAwesome } from '@expo/vector-icons';
import Principal from "../screens/Tab/PictosScreen";

//Home
const Home = createNativeStackNavigator();

function HomeGroup() {
    const optionsAdd = {
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2e64e515',
            shadowColor: '#2e64e515',
            elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
            <View style={{ marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={25} color="#2e64e5" />
            </View>
        ),
    }

    return (
        <Home.Navigator>
            <Home.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Home.Screen name="AddPostScreen" component={AddPostScreen} options={optionsAdd} />
            <Home.Screen name="AddCommentScreen" component={AddCommentScreen} options={optionsAdd} />
            
        </Home.Navigator>
        
    )
}

//TopTab
const TobTab = createMaterialTopTabNavigator();

function TobTabGroup() {
    return (
        <TobTab.Navigator>
            <TobTab.Screen name="Comunidad" component={HomeGroup} />
            <TobTab.Screen name="Chats" component={PrivateChat} />
            <TobTab.Screen name="Grupos" component={GrupalChat} />
            
        </TobTab.Navigator>
    )
}


//Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
    return (
        <Drawer.Navigator /*screenOptions={{ headerShown: false }}*/>
            <Drawer.Screen name="Home" component={StackGroup} options={{ headerShown: false }}

            />
            <Drawer.Screen name="Ajustes" component={AjustesScreen} />
        </Drawer.Navigator>
    )
}

//Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={TabGroup}
                options=
                {{
                    title: 'Sphere',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#2e64e5',
                        fontSize: 18,
                    },
                    headerStyle: {
                        shadowColor: '#fff',
                        elevation: 0,
                    },
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    title: route.params.item.userName,
                })}
            />
            <Stack.Screen
                name="Descripcion"
                component={Descripcion}
            />
            <Stack.Screen
                name="Private Chat"
                component={PrivateChatScreen}
                options={({ route }) => ({
                    title: route.params.userName,
                })}
            />
        </Stack.Navigator>
    )
}

//Tab
const Tab = createBottomTabNavigator();

function TabGroup() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require("../assets/user.png")}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    }, []);

    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "Pictos": iconName = "picture-o"; break;
                        case "Calendario": iconName = "calendar"; break;
                        case "Perfil": iconName = "user"; break;
                    }
                    return <FontAwesome name={iconName} color={color} size={size} />
                },
            })}
        >
            <Tab.Screen name="Home" component={TobTabGroup} options={{ headerShown: false}}  />
            <Tab.Screen name="Pictos" component={PictosScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Calendario" component={CalendarioScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <DrawerGroup />
        </NavigationContainer>
    )
}