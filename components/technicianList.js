import React, { useState } from 'react';
import { View } from 'react-native'; 
import { Card, Avatar, Text, Button } from 'react-native-paper';
import tw from 'twrnc';
import Pic from '../assets/image/avater.png'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import CustomStarRating from './starRating/starRating';
  
const TechnicianList = ({businessName, category, address, ratings, route}) => {

  const navigation = useNavigation()

  const onView = () =>{
    navigation.navigate(route)
  }

  return (
    <Card style={tw`m-3 p-3`}>
      <View style={tw`flex-row`}>
        {/* Profile picture on the left */}
        <Avatar.Image 
          size={110} 
          source={Pic} 
          style={tw`mr-3`}
        />

        {/* Right side content */}
        <View style={tw`flex-1 gap-1`}>
          {/* Name, category, address */}
          <Text style={tw`text-xl font-bold`}>{businessName}</Text>
          <Text style={tw`text-sm text-gray-600`}>{category}</Text>
          <Text style={tw`text-sm text-gray-600`}><Feather name="map-pin" size={18} color='grey' />{` ${address}`}</Text>
          
          {/* Custom Star ratings */}
          <View style={tw`my-1`}>
            <CustomStarRating rating={ratings} />
          </View>

          {/* Action buttons */}
          <View style={tw`flex-row justify-between gap-2 mt-2`}>
            <Button mode="contained" onPress={onView}>
              View
            </Button>
            <Button mode="outlined" onPress={() => console.log('Contact')}>
              Contact
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default TechnicianList;
