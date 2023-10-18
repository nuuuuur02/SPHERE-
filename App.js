import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import AddPostScreen from './screens/AddPostScreen';
import AddCommentScreen from './screens/AddCommentScreen';
import PostCard from './components/PostCard'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as React from 'react';
import { LogBox } from 'react-native';
import * as Updates from 'expo-updates';
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  //LogBox.ignoreLogs(['Warning: ...']);pepe
  LogBox.ignoreAllLogs();
  
  return (

    <NavigationContainer>
      <Stack.Navigator styles={styles.container}>


        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{

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
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
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
          }}
        />

        <Stack.Screen
          name="AddCommentScreen"
          component={AddCommentScreen}
          options={{

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
          }}
        />

       


      </Stack.Navigator>


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
