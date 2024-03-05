import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-web'
import { useState } from 'react'
import React from 'react'
import {ref,set } from 'firebase/database'
import { StatusBar } from 'expo-status-bar'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../firebaseConfig'

export default function Register() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

   
    function signUp(){
        createUserWithEmailAndPassword(authentication,email,password)
        .then((userCrendtial)=>{
            const user=userCrendtial.user;


            alert("successfully signed up")

        }).catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.log(errorMessage);
        });

    }


  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <StatusBar style="auto"/>
      <TextInput style={styles.textBoxes}  placeholder="email" value={email} onChangeText={(text:string)=>{setEmail(text)}}  />
      <TextInput style={styles.textBoxes}  placeholder="password" value={password} onChangeText={(text:string)=>{setPassword(text)}}/> 

      <button onClick={signUp}> Submit </button>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    textBoxes:{
        width:'90%',
        fontSize:18,
        padding:12,
        borderColor:'gray',
        borderWidth:0.2,
        borderRadius:10,
        margin:10
    }
})