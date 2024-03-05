import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-web'
import { useState } from 'react'
import React from 'react'
import {ref,set } from 'firebase/database'
import { Firebase_Db } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

export default function RegisterUser() {

    const [role,setRole]=useState('');
    const [username,setUsername]=useState('');


    function create(){

       

        set(ref(Firebase_Db,'Users/'+username),{
            username:username,
            role:role,

        }).then(()=>{
            alert('data saved');
        }).catch((error)=>{
            alert(error)
        });

    };


  return (
    <View style={styles.container}>
      <Text>Details</Text>

      <TextInput style={styles.textBoxes}  placeholder="Username" value={username} onChangeText={(text:string)=>{setUsername(text)}}  />
      <TextInput style={styles.textBoxes}  placeholder="Role"  value={role} onChangeText={(text:string)=>{setRole(text)}}/>        
      
      <button onClick={create}> Submit </button>
    
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
        borderRadius:10
    }
})