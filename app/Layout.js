import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './screen/Signin';
import Login from './screen/Login';
import Home from './screen/Home';
import { CatProvider } from './context/CatContext';
import { useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProdProvider } from './context/ProdContext';
import { AuthContext } from './context/AuthContext';
const Stack = createNativeStackNavigator();
const Layout = () => {
    const { userAuth } = useContext(AuthContext)

    return (
        <NavigationContainer>

            {
                userAuth ? (
            <Stack.Navigator>
                <Stack.Screen name='home' component={Home} />
            </Stack.Navigator>

             ) : (
                    <Stack.Navigator>
                        <Stack.Screen name='login' component={Login} />
                        <Stack.Screen name='signin' component={Signin} />
                    </Stack.Navigator>
                )
            } 


        </NavigationContainer>

    )
}

const Main = () => {
    return (
        <AuthProvider>
            <CatProvider>
                <ProdProvider>
                    <Layout />
                </ProdProvider>
            </CatProvider>

        </AuthProvider>

    )
}

export default Main

