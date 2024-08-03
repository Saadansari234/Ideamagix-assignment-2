import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [userData, setUserData] = useState([])
    const [userAuth, setUserAuth] = useState(false)
    useEffect(() => {
        const SaveUser = async () => {
            try {
                await AsyncStorage.setItem('useList', JSON.stringify(userData));
            } catch (error) {
                console.warn('Failed to save user:', error);
            }
        };

        SaveUser();
    }, [userData])



    const addUser = (newUser) => {
        setUserData((prevData) => {
            const existingUser = prevData.find((user) => user.email === newUser.email);
            if (existingUser) {
                return Alert("user already existed")
            }else{
                setUserAuth(true)
                return [...prevData,  newUser ];
                
            }
        });
    };


    const LoadUser = async (loginUser) => {
        try {
            const storedUser = await AsyncStorage.getItem('useList');
            const parsedUser = JSON.parse(storedUser);
            const filteredUser = parsedUser.filter(user => user.email == loginUser.email && user.password == loginUser.password)
            if (filteredUser) {
                setUserAuth(true)
            } else {

                Alert("user not found")
            }
        } catch (error) {
            console.error('Failed to load user:', error);
        }
    };

    


    return (
        <AuthContext.Provider value={{ userData, addUser, userAuth,LoadUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider