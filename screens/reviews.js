import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Card } from 'react-native-paper';
import tw from "twrnc";
import CustomStarRating from '../components/starRating/starRating';
import { lightBrown } from '../util/colors';
import { getInitials } from '../util/helpers';
import moment from 'moment';

const Reviews = ({ route, navigation }) => {
  const { customerReviews, businessName } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: businessName, // Set header title dynamically
    });
  }, [navigation, businessName]);

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={tw`w-full flex flex-row items-start gap-3 mb-4 p-1 px-2`}>
      {/* Avatar */}
      <View style={tw`w-10 h-10 bg-[${lightBrown}] rounded-full flex items-center justify-center`}>
        <Text style={tw`text-white font-bold text-lg`}>{getInitials(item.customer.fullName)}</Text>
      </View>
      {/* Review Details */}
      <View style={tw`flex-1`}>
        <View style={tw`flex flex-row w-full justify-between items-center`}>
            <Text style={tw`text-base font-semibold text-gray-800`}>{item.customer.fullName}</Text>
            <Text style={tw`text-sm text-gray-700`}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
        </View>
        <Text style={tw`text-sm text-gray-700 my-1`}>{item.review}</Text>
        <CustomStarRating rating={item.rating} />
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <Card style={tw`bg-white w-[100%] flex-1 shadow-md rounded-lg p-3 mt-1`}>
        <FlatList
          data={customerReviews}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use a keyExtractor for unique keys
        />
      </Card>
    </View>
  );
};

export default Reviews;
