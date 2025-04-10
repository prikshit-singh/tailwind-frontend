import React from 'react';
import { View, Image, Dimensions,Text } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

const images = [
  { id: 1, src: 'https://via.placeholder.com/400x300.png?text=Image+1' },
  { id: 2, src: 'https://via.placeholder.com/400x300.png?text=Image+2' },
  { id: 3, src: 'https://via.placeholder.com/400x300.png?text=Image+3' }
];

const { width } = Dimensions.get('window');

const CustomCarousel: React.FC = () => {
  const renderItem = ({ item }: { item: { id: number; src: string } }) => (
    <View className="rounded-lg overflow-hidden">
      <Image source={{ uri: item.src }} className="w-full h-64 rounded-lg" />
    </View>
  );

  return (
    <View className="justify-center ">
      {/* <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        loop
        autoplay
      /> */}

      <Text>hello</Text>
    </View>
  );
};

export default CustomCarousel;
