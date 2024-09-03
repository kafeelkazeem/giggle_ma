import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { SvgXml } from 'react-native-svg';
import tw from 'twrnc'; // Import twrnc for Tailwind styles

const { width } = Dimensions.get('window');

// Example SVG Markup
const svg1 = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill="#000"/>
</svg>`;

const svg2 = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill="#FF0000"/>
</svg>`;

const svg3 = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill="#00FF00"/>
</svg>`;

const Onboarding = () => {
  return (
    <Swiper
      style={tw`h-full`}
      showsButtons={false}
      loop={false}
      paginationStyle={tw`bottom-2`}
      dotStyle={tw`bg-gray-400`}
      activeDotStyle={tw`bg-blue-500`}
    >
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <SvgXml
          xml={svg1}
          width={width * 0.8}
          height={width * 0.8}
        />
        <Text style={tw`text-2xl mt-4 text-center`}>Welcome to Our App</Text>
      </View>
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <SvgXml
          xml={svg2}
          width={width * 0.8}
          height={width * 0.8}
        />
        <Text style={tw`text-2xl mt-4 text-center`}>Discover New Features</Text>
      </View>
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <SvgXml
          xml={svg3}
          width={width * 0.8}
          height={width * 0.8}
        />
        <Text style={tw`text-2xl mt-4 text-center`}>Get Started Now</Text>
      </View>
    </Swiper>
  );
};

export default Onboarding;
