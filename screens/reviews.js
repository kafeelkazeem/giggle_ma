import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-paper';
import tw from "twrnc";
import CustomStarRating from '../components/starRating/starRating';
import { lightBrown } from '../util/colors';
import { capitalize, fetchCustomerId, fetchToken, getInitials } from '../util/helpers';
import moment from 'moment';
import axios from 'axios';
import { ApiUrl } from '../util/url';
import ReviewMenu from '../components/reviewMenu';

const Reviews = ({ route, navigation }) => {
  const { customerReviews, businessName } = route.params;

  const [cusReviews, setCusReviews] = useState(customerReviews)
  const [customerId, setCustomerId] = useState('')

  useEffect(() => {
    navigation.setOptions({
      title: capitalize(businessName), // Set header title dynamically
    });
  }, [navigation, businessName]);

  useEffect(()=>{
    const func = async () =>{
      setCustomerId(await fetchCustomerId())
    }
    func()
  }, [])

  const onDeleteReview = async (arr=[], reviewId) =>{
    const token = await fetchToken()
    try {
      const formData = {customerId: customerId, reviewId: reviewId}
      const response = await axios.delete(`${ApiUrl}/deleteReview`, {params: formData}, {
        headers : {
          'Authorization': `${token}`,
        },
      })
      console.log(response.data)
      setCusReviews(arr.filter((i) => i._id !== reviewId))
    } catch (error) {
      console.log(error)
      alert('An error occured')
    }
  }

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={tw`w-full flex flex-row items-start gap-3 mb-4 p-1`} >
      {/* Avatar */}
      <View style={tw`w-10 h-10 bg-[${lightBrown}] rounded-full flex items-center justify-center`}>
        <Text style={tw`text-white font-bold text-lg`}>{getInitials(item.customer.fullName)}</Text>
      </View>
      {/* Review Details */}
      <View style={tw`flex-1`}>
        <View style={tw`flex flex-row w-full justify-between items-center`}>
          <Text style={tw`text-base font-semibold text-gray-800`}>{capitalize(item.customer.fullName)}</Text>
          {customerId == item.customer._id && <ReviewMenu onPress={() => onDeleteReview(customerReviews, item._id)}  />}
        </View>
        <Text style={tw`text-sm text-gray-700 my-1`}>{item.review}</Text>
        <View style={tw`flex flex-row w-full justify-between items-center`}>
          <CustomStarRating rating={item.rating} />
          <Text style={tw`text-sm text-[#8a817c]`}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <Card style={tw`bg-white w-[100%] flex-1 shadow-md rounded-lg p-3 mt-1`}>
        <FlatList
          data={cusReviews}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use a keyExtractor for unique keys
        />
      </Card>
    </View>
  );
};

export default Reviews;
