import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-web'
import { useState } from 'react'
import React from 'react'
import {ref,set } from 'firebase/database'
import { Firebase_Db } from '../../firebaseConfig'

export default function UserPref() {

    const [username,setUsername]=useState('');
    const [name,setName]=useState('');
    const [ColorPrint,setColorPrint]=useState('');
    const [PhoneNumber,setPhoneNumber]=useState('');
    const [no_copies,setNo_Copies]=useState('');
    const [no_pages,setNo_Pages]=useState('');
    const [DeliveryAddress,setDeliveryAddress]=useState('');


    function create(){
        set(ref(Firebase_Db,'UserPref/'+username+'/'+name),{
            ColorPrint:ColorPrint,
            name:name,
            PhoneNumber:PhoneNumber,
            no_copies:no_copies,
            no_pages:no_pages,
            DeliveryAddress:DeliveryAddress,
            DeliveryStatus:"no"

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
      <TextInput style={styles.textBoxes}  placeholder="name"  value={name} onChangeText={(text:string)=>{setName(text)}}/>        
      <TextInput style={styles.textBoxes}  placeholder="ColorPrint" value={ColorPrint}  onChangeText={(text:string)=>{setColorPrint(text)}}/>        
      <TextInput style={styles.textBoxes}  placeholder="PhoneNumber" value={PhoneNumber} onChangeText={(text:string)=>{setPhoneNumber(text)}} />        
      <TextInput style={styles.textBoxes}  placeholder="no_copies" value={no_copies}   onChangeText={(text:string)=>{setNo_Copies(text)}} />        
      <TextInput style={styles.textBoxes}  placeholder="no_pages" value={no_pages}  onChangeText={(text:string)=>{setNo_Pages(text)} }/>        
      <TextInput style={styles.textBoxes}  placeholder="DeliveryAddress" value={DeliveryAddress}  onChangeText={(text:string)=>{setDeliveryAddress(text)}} />        
      
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