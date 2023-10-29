import React, { useState, useContext, useEffect } from 'react';

import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import {
  Container,
  InputField,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,


} from '../styles/AddPost';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { storagebd, db } from '../components/ConfigFirebase';
import { doc, setDoc, addDoc, collection, snapshotEqual, Timestamp, orderBy, serverTimestamp } from "firebase/firestore";
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as Updates from 'expo-updates';

const AddPostScreen = ({ navigation }) => {


  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const [imageURL, setURL] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  
const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    })
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);

    };
  }

  const choosePhotoFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    })
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);

    };
  }


  const uploadMedia = async () => {


    try {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        }
        xhr.onerror = (e) => {
          reject(new TypeError('Failed Networl'));
        }
        xhr.responseType = 'blob';
        xhr.open('GET', image, true)
        xhr.send(null)
      })

      setIsUploading(true);

      const metadata = {
        contentType: 'image/jpeg'
      };


      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storagebd, 'Images/' + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setURL(downloadURL);
            addDoc(collection(db, "posts"), {

              comments: null,
              likes: [],
              post: post,
              postImg: downloadURL,
              postTime: Timestamp.fromDate(new Date()),
              userName: "User",
              userImg: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

            }).then(() => {
              console.log("Subido")
              /*Alert.alert(
                'Post published!',
                'Your post has been published Successfully!',
              );*/
              setPost(null);
              navigation.navigate('HomeScreen')

            }).catch((e) => {
              console.log(e)
            })

          });
        }
      );

    } catch (e) {
      create()
      console.log(e)
    }




  }

  function create() {
    console.log(imageURL)

    addDoc(collection(db, "posts"), {

      comments: null,
      likes: [],
      post: post,
      postImg: imageURL,
      postTime: Timestamp.fromDate(new Date()),
      userName: "User",
      userImg: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

    }).then(() => {
      console.log("Subido")
      /*Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );*/
      setPost(null);
      navigation.navigate('HomeScreen')

    }).catch((e) => {
      console.log(e)
    })
  }

  const handleInputChange = (content) => {
    setPost(content);
    // Verifica si el campo de entrada y la imagen están vacíos para habilitar o deshabilitar el botón.
    setIsButtonDisabled(content === '' && image === null);
  };

  const handleImageChange = (selectedImage) => {
    setImage(selectedImage);
    // Verifica si el campo de entrada y la imagen están vacíos para habilitar o deshabilitar el botón.
    setIsButtonDisabled(post === '' && selectedImage === null);
  };



  return (
    <Container>

      {image != null ? <AddImage source={{ uri: image }} /> : null}
      <InputField
        placeholder="Buen dia"
        multiline
        numberOfLines={4}
        value={post}
        onChangeText={handleInputChange}
      />
      <SubmitBtn>
        <SubmitBtnText
          onPress={() => {
            if (!isUploading) {
              uploadMedia();
            }
          }}
          disabled={isButtonDisabled || isUploading}
        >
          {isUploading ? 'Cargando...' : 'Post'}
        </SubmitBtnText>
      </SubmitBtn>



      <ActionButton buttonColor="#2e64e5">

      <ActionButton.Item
          buttonColor="#9b59b6"
          title="Cámara"
          onPress={choosePhotoFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#3498db"
          title="Galería"
          onPress={choosePhotoFromLibrary}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        
      </ActionButton>
    </Container>
  )

}

export default AddPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})