import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Stats from './Stats';
import Create from './Create'

const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'status') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'create') {
          iconName = focused ? 'create-sharp' : 'create-outline';
        }

        
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6EACDA',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="status" component={Stats} />
    <Tab.Screen name="create" component={Create} />
  </Tab.Navigator>

);
  
}

export default Home