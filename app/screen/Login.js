import React from 'react'
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
    const navigation= useNavigation()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const {LoadUser}= useContext(AuthContext)
    
    const handlePress=()=>{
        if (email.trim()!=="" && password.trim()!== "") {
            LoadUser({email,password})

        }else{
            Alert("please fill all details")
        }
    }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome</Text>
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
    <TouchableOpacity style={styles.button} onPress={handlePress} >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <Text>dont have account? <Text style={styles.signup} onPress={()=>navigation.navigate("signin")}>signup</Text></Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#6EACDA',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    guestButton: {
      width: '100%',
      height: 50,
      borderColor: '#6EACDA',
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    guestButtonText: {
      color: '#6EACDA',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errror:{
    color:"red"
    },
    signup:{
        color:"blue",
    }
  });


export default Login