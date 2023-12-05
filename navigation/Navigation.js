import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { auth, db } from '../components/ConfigFirebase';


//defaulSphere
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

//Screens
import PictosScreen from "../screens/Tab/PictosScreen";
import Descripcion from "../screens/Tab/Descripcion";
import PINScreen from "../screens/Tab/PINScreen";
import CalendarioScreen from "../screens/Tab/CalendarioScreen";
import PerfilScreen from "../screens/Tab/PerfilScreen";
import AjustesScreen from "../screens/Drawer/AjustesScreen";
import RecursosScreen from "../screens/Drawer/RecursosScreen";

//diario
import PrincipalEvento from "../screens/Tab/PrincipalEvento";
import DescripcionEvento from "../screens/Tab/DescripcionEvento"
import Diario from "../screens/Tab/Diario"

import PrivateChat from "../screens/TobTab/PrivateChat/PrivateChat";
import PrivateChatScreen from "../screens/TobTab/PrivateChat/PrivateChatScreen";
import GrupalChat from "../screens/TobTab/GrupalChat/GrupalChat";
import ChatScreen from "../screens/TobTab/GrupalChat/ChatScreen";
import CreateChat from "../screens/TobTab/GrupalChat/CreateChat";
import FundacionScreen from "../screens/FundacionesScreen";

import HomeScreen from '../screens/HomeScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import AddPostScreen from '../screens/AddPostScreen';

//Login/User
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

//Theme
import { EventRegister } from 'react-native-event-listeners';
import { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import theme from '../styles/Theme/theme.js';
import themeContext from '../styles/Theme/themeContext.js';

//Icons
import { FontAwesome } from '@expo/vector-icons';
import Principal from "../screens/Tab/PictosScreen";

//TopTab
const TobTab = createMaterialTopTabNavigator();

function TobTabGroup() {
    return (
        <TobTab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#d9cffb' },
                tabBarIndicatorStyle: {
                    backgroundColor: 'black',
                    borderRadius: 10,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15,
                    textTransform: 'capitalize',
                }
            }}

        >
            <TobTab.Screen name="Comunidad" component={HomeScreen} />
            <TobTab.Screen name="Grupos" component={GrupalChat} />
            <TobTab.Screen name="Expertos" component={PrivateChat} />

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
            <Drawer.Screen name="Recursos" component={RecursosScreen} />
            <Drawer.Screen name="Fundaciones" component={FundacionScreen} />
        </Drawer.Navigator>
    )
}

//Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
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
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Register" component={RegisterScreen}
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
            <Stack.Screen name="Login" component={LoginScreen}
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
            <Stack.Screen name="HomeMain" component={TabGroup}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                        elevation: 0,
                        shadowOpacity: 0, 
                    },
                }}
            />
            <Stack.Screen name="AddPostScreen" component={AddPostScreen}  options={{
                    optionsAdd,
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                        elevation: 0,
                        shadowOpacity: 0, 
                    },
                }} />
            <Stack.Screen name="AddCommentScreen" component={AddCommentScreen} options={{
                    optionsAdd,
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                        elevation: 0,
                        shadowOpacity: 0, 
                    },
                }} />
            <Stack.Screen name="PrincipalEvento" component={PrincipalEvento} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    title: route.params.item.userName,
                })}
            />
            <Stack.Screen name="CreateChat" component={CreateChat} />
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
            <Stack.Screen
                name="Descripcion de Evento"
                component={DescripcionEvento}
            />
            <Stack.Screen
                name="Diario"
                component={Diario}
            />
        </Stack.Navigator>
    )
}

/*function AuthStack() {
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
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Register" component={RegisterScreen}
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
            <Stack.Screen name="Login" component={LoginScreen}
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
        </Stack.Navigator>
    )
}*/

//Tab
const Tab = createBottomTabNavigator();

function TabGroup() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image
                        source={{ uri: auth.currentUser?.photoURL }}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    }, []);

    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#313131',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                },
                tabBarShowLabel: false,

                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "Pictos": iconName = "book"; break;
                        case "Calendario": iconName = "clock-o"; break;
                        case "Perfil1": iconName = "map-marker"; break;
                        case "Perfil": iconName = "user-o"; break;
                        
                    }
                    return <FontAwesome name={iconName} color={'white'} size={size} />
                },
            })}
        >
            <Tab.Screen name="Home" component={TobTabGroup} options={{ headerShown: false }} />
            <Tab.Screen name="Pictos" component={PictosScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Calendario" component={PINScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil1" component={PerfilScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setDarkMode(data)
        })
        return () => {
            EventRegister.removeAllListeners(listener)
        }
    }, [darkMode])

    return (
        <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
            <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
                <DrawerGroup />
            </NavigationContainer>
        </themeContext.Provider>
    )
}