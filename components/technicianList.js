import React from 'react';
import { View } from 'react-native'; 
import { Card, Avatar, Text, Button } from 'react-native-paper';
import tw from 'twrnc';
import Pic from '../assets/image/avater.png'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import CustomStarRating from './starRating/starRating';
import { capitalize } from '../util/helpers';
  
const TechnicianList = ({id, profilePicture, businessName, profession, address, ratings, route, cardStyle}) => {

  const navigation = useNavigation()

  const onView = () =>{
    navigation.navigate(route, {technicianId: id})
  }

  return (
    <Card style={tw`${cardStyle}`}>
      <View style={tw`flex-row`}>
        {/* Profile picture on the left */}
        <Avatar.Image 
          size={110} 
          source={profilePicture ? {uri: profilePicture} : Pic} 
          style={tw`mr-3`}
        />

        {/* Right side content */}
        <View style={tw`flex-1 gap-1`}>
          {/* Name, category, address */}
          <Text style={tw`text-xl font-bold`}>{capitalize(businessName)}</Text>
          <Text style={tw`text-base text-gray-600`}>{capitalize(profession)}</Text>
          <Text style={tw`text-sm text-gray-600`}><Feather name="map-pin" size={18} color='grey' />{` ${address}`}</Text>
          
          {/* Custom Star ratings */}
          <View style={tw`my-1`}>
            <CustomStarRating rating={ratings} />
          </View>

          {/* Action buttons */}
          <View style={tw`flex-row justify-between gap-1 mt-2`}>
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
