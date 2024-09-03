import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Map from '../assets/svg/map.svg'
import Register from '../assets/svg/register.svg'
import Welcome from '../assets/svg/welcome.svg'
import tw from 'twrnc'; 
import { darkBrown } from '../util/colors';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  return (
    <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: darkBrown}]}>
        <Swiper
            style={tw`h-full`}
            showsButtons={false}
            loop={false}
            paginationStyle={tw`bottom-10`}
            dotStyle={tw`bg-gray-400`}
            activeDotStyle={{backgroundColor: darkBrown}}
        >
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Welcome width={width * 0.8} height={width * 0.8} />
            <Text style={tw`text-2xl mt-4 text-center`}>Welcome to Our App</Text>
        </View>
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Register width={width * 0.8} height={width * 0.8} />
            <Text style={tw`text-2xl mt-4 text-center`}>Discover New Features</Text>
        </View>
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Map width={width * 0.8} height={width * 0.8} />
            <Text style={tw`text-2xl mt-4 text-center`}>Get Started Now</Text>
        </View>
        </Swiper>
    </View>
  );
};

export default Onboarding;
