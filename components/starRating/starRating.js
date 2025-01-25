import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import { View } from "react-native";

const CustomStarRating = ({ rating, size }) => {
    const maxStars = 5;  
    return (
      <View style={tw`flex-row`}>
        {Array.from({ length: maxStars }, (_, index) => {
          const starNumber = index + 1;
          return (
            <FontAwesome
              key={index}
              name='star'
              size={size}
              color={starNumber <= rating ? "#ffa723" : '#707070'}
              style={tw`mr-1`}
            />
          );
        })}
      </View>
    );
  };

  export default CustomStarRating;