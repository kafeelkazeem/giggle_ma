import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Card, Avatar, Text, Button } from 'react-native-paper';
import tw from 'twrnc';
import Pic from '../assets/image/avater.png'
import Feather from '@expo/vector-icons/Feather';

const CustomStarRating = ({ rating }) => {
    const maxStars = 5;  
    return (
      <View style={tw`flex-row`}>
        {Array.from({ length: maxStars }, (_, index) => {
          const starNumber = index + 1;
          return (
            <FontAwesome
              key={index}
              name='star'
              size={20}
              color={starNumber <= rating ? "#ffa723" : '#707070'}
              style={tw`mr-1`}
            />
          );
        })}
      </View>
    );
  };
  

const TechnicianList = ({businessName, category, address, ratings}) => {
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
            <Button mode="contained" onPress={() => console.log('Contact')}>
              Contact
            </Button>
            <Button mode="outlined" onPress={() => console.log('Details')}>
              Details
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default TechnicianList;
