import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Map from '../assets/svg/map.svg'
import Register from '../assets/svg/register.svg'
import Welcome from '../assets/svg/landingImg.svg'
import tw from 'twrnc'; 
import { darkBrown, white } from '../util/colors';
import RoundButtonWithText from '../components/buttons/getStartedBtn';

const { width } = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  return (
    <>
    <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: white}]}>
        <Swiper
            style={tw`h-full`}
            showsButtons={false}
            loop={false}
            paginationStyle={tw`bottom-10`}
            dotStyle={tw`bg-gray-400`}
            activeDotStyle={{backgroundColor: darkBrown}}
        >
          <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: white}]}>
              <Welcome width={width * 0.9} height={width * 0.9} />
              <Text style={[tw`text-2xl mt-4 text-center tracking-1`, {fontFamily: 'Lato_Regular'}]}>Welcome To Giggle</Text>
          </View>
          <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: white}]}>
              <Map width={width * 0.8} height={width * 0.8} />
              <Text style={[tw`text-2xl mt-4 text-center tracking-1`, {fontFamily: 'Lato_Regular'}]}>Search. Book. Relax</Text>
          </View>
          <View style={[tw`flex-1 justify-center items-center`, {backgroundColor: white}]}>
              <Register width={width * 0.8} height={width * 0.8} />
              <Text style={[tw`text-2xl mt-4 text-center tracking-1`, {fontFamily: 'Lato_Regular'}]}>Your job, their skill.</Text>
          </View>
        </Swiper>
        <View style={tw`mb-6`}>
          <RoundButtonWithText onPress={() => navigation.navigate('Signup')} />
        </View>
    </View>
    </>
  );
};

export default Onboarding;
