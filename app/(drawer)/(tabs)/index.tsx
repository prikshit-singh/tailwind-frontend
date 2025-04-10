import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import CustomCarousel from '@/components/Home/Carosal';

const Page: React.FC = () => {
  return (
    <View 
    className="flex-1 w-full h-48 bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 flex items-center"
    >
      <CustomCarousel />
    </View>
  );
};

export default Page;
