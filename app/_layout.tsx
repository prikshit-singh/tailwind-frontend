import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Slot } from 'expo-router';
import { SessionProvider } from "@/context/authContext";
import '../global.css'
export default function _layout() {
  return (
    <SessionProvider>
      
      <Slot/>
   
    </SessionProvider>
  );
}
