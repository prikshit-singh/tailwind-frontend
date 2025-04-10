import { View, Text, Button,TouchableOpacity  } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign,Ionicons  } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  return (

    <Tabs
    screenOptions={{
      headerLeft: () => <DrawerToggleButton tintColor="#000" />,
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text className="font-bold text-red text-center">MyApp</Text> // Centered App Name
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push('/notifications')} style={{ marginRight: 15 }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    }}>

      <Tabs.Screen name='index' options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" size={24} color={color} />
        ),
        tabBarLabel: 'Home',
        // headerTitle: 'Home'
      }} />

      <Tabs.Screen name='feed' options={{
        tabBarIcon: ({ color }) => (
          <Feather name="list" size={24} color={color} />
        ),
        tabBarLabel: 'Feed',
        headerTitle: 'Feed',
        headerRight: () => <Button onPress={() => router.push('feed/new')} title='Add Post' />
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="user" size={24} color={color} />
        ),
        tabBarLabel: 'Profile',
        headerTitle: 'Profile'
      }} />
    </Tabs>
  )
}