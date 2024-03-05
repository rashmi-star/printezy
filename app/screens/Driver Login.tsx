import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get, DataSnapshot } from 'firebase/database'; // Import Firebase Realtime Database methods

export default function DriverLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const db = getDatabase(); // Initialize Firebase Realtime Database
      const usersRef = ref(db, 'Driver');

      // Query to find user by email
      const userQuery = query(usersRef, orderByChild('Email'), equalTo(email));

      const snapshot: DataSnapshot = await get(userQuery);
      
      if (snapshot.exists()) {
        let userFound = false;
        snapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val();
          if (userData.Password === password) {
            userFound = true;
            alert('Success');
            navigation.navigate("Delivery Orders")
          }
        });
        if (!userFound) {
          alert('Incorrect password');
        }
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('D:/my-app/printezy.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={signIn} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  signInButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
