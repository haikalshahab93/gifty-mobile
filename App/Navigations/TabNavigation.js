import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen';
import MyCourse from '../Screen/MyCourse';
import LeaderBoard from '../Screen/LeaderBoard';
import Profile from '../Screen/ProfileScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import HomeScreenNavigation from './HomeScreenNavigation';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="home" component={HomeScreenNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="my-course" component={MyCourse}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    )
                }} />

            <Tab.Screen name="leaderboard" component={LeaderBoard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="leaderboard" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="supervised-user-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )

}