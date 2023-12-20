import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { auth, db } from '../components/ConfigFirebase';
import { collection, getDocs, query, where } from "firebase/firestore";


//defaulSphere
import { View, Pressable, Image, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

//Screens
import Descripcion from "../screens/Tab/Descripcion";
import DescripcionFundacion from "../screens/Tab/DescripcionFundacion.js"
import Donar from "../screens/Tab/Donar.js";
import PerfilScreen from "../screens/Tab/PerfilScreen";
import AjustesScreen from "../screens/Drawer/AjustesScreen";
import RecursosPictosScreen from "../screens/RecursosPictosScreen";
import ArticulosScreen from "../screens/AriticulosScreen";
import VideosScreen from "../screens/VideosScreen";
import AllJuegosScreen from "../screens/AllJuegosScreen";

//diario
import PrincipalEvento from "../screens/Tab/PrincipalEvento";
import DescripcionEvento from "../screens/Tab/DescripcionEvento"
import Diario from "../screens/Tab/Diario"
import AddDiaryScreen from "../screens/Tab/AddDiaryScreen.js";
import EditDiaryScreen from "../screens/Tab/EditDiaryScreen.js";

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
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgottenLoginScreen from "../screens/ForgottenLoginScreen";

//Theme
import { EventRegister } from 'react-native-event-listeners';
import { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import theme from '../styles/Theme/theme.js';
import themeContext from '../styles/Theme/themeContext.js';

//fuentes
import { useFonts } from 'expo-font';
import SearchArticulo from "../screens/AriticulosScreen";

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
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={StackGroup} options={{ headerShown: false }} />
            <Drawer.Screen name="Ajustes" component={AjustesScreen} />
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

    const navigation = useNavigation();

    useEffect(() => {
        LoadCurrentUser();
    }, [auth.currentUser]);

    const [currentUser, setCurrentUser] = useState(null);

    const LoadCurrentUser = async () => {
        const userCollection = collection(db, "user");
        let userData = null;
        //console.log(auth.currentUser?.email)
        while (userData === null) {
            //console.log(auth.currentUser?.email)
            const querySnapshot = await getDocs(query(userCollection, where("email", "==", auth.currentUser?.email)));
            //console.log(querySnapshot)
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    userData = doc.data();
                    console.log("docdata: " + doc.data())
                });
            }
            //console.log("UsuarioNo: " + userData)
            // Peque�o retardo para no sobrecargar la solicitud
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        //console.log("Usuario: " + userData)
        setCurrentUser(userData);
    }

    return (
        <Stack.Navigator initialRouteName="Welcome"
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} 
            options=
            {{
                headerShown: false,
                title: '',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                    backgroundColor: 'transparent'
                },
            }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} 
            options=
            {{
                headerShown: false,
                title: '',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                    backgroundColor: 'transparent'
                },
            }}
            />
            <Stack.Screen name="Login" component={LoginScreen}
                options=
                {{
                    headerShown: false,
                    title: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#2e64e5',
                        fontSize: 18,
                    },
                    headerStyle: {
                        shadowColor: '#fff',
                        elevation: 0,
                        backgroundColor: 'transparent'
                    },
                }}
            />
            <Stack.Screen name="ForgottenLogin" component={ForgottenLoginScreen} 
            options=
            {{
                headerShown: false,
                title: '',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                    backgroundColor: 'transparent'
                },
            }}
            />
            <Stack.Screen name="HomeMain" component={TabGroup}
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                    },
                    headerShown: false,
                }}
            />
            <Stack.Screen name="AddPostScreen" component={AddPostScreen} options={{
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
                    headerTitleStyle: {
                        textAlignVertical: "center",
                        fontSize: 20,
                    },
                    headerLeft: () =>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Pressable onPress={() => navigation.goBack()}>
                                <Image
                                    source={require("../assets/iconos/flechaBack.png")}
                                    style={{ width: 30, height: 30 }}
                                />
                            </Pressable>
                            <Image
                                source={{
                                    uri: route.params.item.userImg,
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    marginLeft: 15,
                                    marginRight: 15,
                                }}
                            />
                            <Text
                                style={{
                                    color: "#B7C1FF",
                                    fontSize: 60,
                                }}
                            />
                        </View>,
                    headerStyle: {
                        backgroundColor: "#B7C1FF",
                    },
                })}
            />
            <Stack.Screen name="CreateChat" component={CreateChat} />
            <Stack.Screen
                name="Descripcion"
                component={Descripcion}
            />
            <Stack.Screen name="DescripcionFundacion" component={DescripcionFundacion}/>
            <Stack.Screen name="Donar" component={Donar}/>
            
            <Stack.Screen
                name="Private Chat"
                component={PrivateChatScreen}
                options={({ route }) => ({
                    title: currentUser.isProfessional ? route.params.item.userName : route.params.item.professionalName,
                    headerTitleStyle: {
                        textAlignVertical: "center",
                        fontSize: 20,
                    },
                    headerLeft: () =>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Pressable onPress={() => navigation.goBack()}>
                                <Image
                                    source={require("../assets/iconos/flechaBack.png")}
                                    style={{ width: 30, height: 30 }}
                                />
                            </Pressable>
                            <Image
                                source={{
                                    uri: currentUser.isProfessional ? route.params.item.userImg : route.params.item.professionalImg,
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    marginLeft: 15,
                                    marginRight: 15,
                                }}
                            />
                            <Text
                                style={{
                                    color: "#B7C1FF",
                                    fontSize: 60,
                                }}
                            />
                        </View>,
                    headerStyle: {
                        backgroundColor: "#B7C1FF",
                    },
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
            <Stack.Screen
                name="AddDiaryScreen"
                component={AddDiaryScreen}
                options={{
                    optionsAdd,
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />

            <Stack.Screen
                name="EditDiaryScreen"
                component={EditDiaryScreen}
                options={{
                    optionsAdd,
                    title: '',
                    headerStyle: {
                        backgroundColor: '#d9cffb',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
            <Stack.Screen name="ArticulosScreen" component={ArticulosScreen}
                options={{
                    title: '',
                    headerStyle: {
                        shadowColor: '#ffffff',
                    },
                }}
            />
            <Stack.Screen name="VideosScreen" component={VideosScreen}
                options={{
                    title: '',
                    headerStyle: {
                        shadowColor: '#ffffff',
                    },
                }}
            />
            <Stack.Screen name="AllJuegosScreen" component={AllJuegosScreen}
                options={{
                    title: '',
                    headerStyle: {
                        shadowColor: '#ffffff',
                    },
                }}
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
    /*
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
    */
    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#313131',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                },
                tabBarShowLabel: false,
                //headerShown: false,

            }}
        >
            <Tab.Screen name="Home" component={TobTabGroup} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/iconos/iconoHome.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#ECCB8D' : 'white'
                            }}

                        />
                    </View>
                ),
                title: '',
                headerStyle: {
                    backgroundColor: '#d9cffb',
                },
            }} />
            <Tab.Screen name="Recursos" component={RecursosPictosScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/iconos/iconoArticulos.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#ECCB8D' : 'white'
                            }}
                        />
                    </View>
                ),
                title: '',
                headerStyle: {
                    shadowColor: '#ffffff',
                },
            }} />
            <Tab.Screen name="Calendario" component={PrincipalEvento} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/iconos/iconoReloj.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#ECCB8D' : 'white'
                            }}
                        />
                    </View>
                ),
                title: '',
            }} />
            <Tab.Screen name="Fundaciones" component={FundacionScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/iconos/iconoUbi.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#ECCB8D' : 'white'
                            }}
                        />
                    </View>
                ),
                title: '',
            }} />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/iconos/iconoPerfil.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#ECCB8D' : 'white'
                                }}
                            />
                        </View>
                    ),
                    title: '',
                    headerStyle: {
                        backgroundColor: '#EBEBEB',
                        shadowColor: '#ffffff',
                    },
                }}


            />
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

    const [fontsLoaded] = useFonts({
        GeneralSans: require("../assets/fonts/GeneralSans-Medium.ttf"),
        GeneralSansSemibold: require("../assets/fonts/GeneralSans-Semibold.ttf"),
        rara: require("../assets/fonts/Zodiak-BoldItalic.ttf"),
    });
    if (!fontsLoaded) return null;

    return (
        <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
            <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
                <DrawerGroup/>
            </NavigationContainer>
        </themeContext.Provider>
    )
}