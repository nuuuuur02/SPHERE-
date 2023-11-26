import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth } from '../../components/ConfigFirebase';
import { doc, setDoc } from "firebase/firestore";

export default function PerfilScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Usuario autenticado, puedes acceder a los datos del usuario aquí
        setUserData({
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          nombre: user.displayName,
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.formContainer}>
          {userData.photo && (
            /*<Image source={{ uri: userData.photo }} style={styles.profileImage} />*/ //Esto se te que canviar quan s'arregle lo de la imatge 
            <Image source={require("../../assets/user.png")} style={styles.profileImage} />
          )}
          <Text style={styles.label}>UID:</Text>
          <Text style={styles.text}>{userData.uid}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>

          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{userData.nombre}</Text>

          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.text}>{userData.nombre}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 15,
  },
});