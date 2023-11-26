import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { auth, db } from '../../components/ConfigFirebase';  
import { doc, getDoc } from 'firebase/firestore';

export default function PerfilScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isProfessionalEnabled, setIsProfessional] = useState(false);
  const [isFamiliarEnabled, setIsFamiliar] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserData({
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          nombre: user.displayName,
        });

        const userDocRef = doc(db, 'user', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsProfessional(userData.profesional);
          setIsFamiliar(userData.familiar);
        }
      } else {
        setUserData(null);
        setIsProfessional(false);
        setIsFamiliar(false);
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
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{userData.nombre}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>

          <Text style={styles.label}>Rol:</Text>
          {isProfessionalEnabled && <Text style={styles.text}>Profesional</Text>}
          {isFamiliarEnabled && <Text style={styles.text}>Familiar</Text>}

          {isProfessionalEnabled && <Text style={styles.label}>Papers publicados:</Text>}
          {isProfessionalEnabled && <Text style={styles.text}>¿Cómo reconocer los signos del TEA en niños?:</Text>}
          
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