import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import tw from "twrnc";
import Pic from "../assets/image/avater.png";
import { darkBrown, lightBrown } from "../util/colors";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "react-native-paper";
import CustomStarRating from "../components/starRating/starRating";
import BookButton from "../components/buttons/bookButton";
import StarRatingEdit from "../components/starRating/starRating(edit)";
import axios from "axios";
import { ApiUrl } from "../util/url";
import { capitalize, fetchCustomerId, fetchToken, getInitials } from "../util/helpers";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import ReviewMenu from "../components/reviewMenu";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileImages from "../components/profileImages";
import Socials from "../components/socials";

const SingleTechnician = ({route }) => {
  
  const navigation = useNavigation()

  const {technicianId} = route.params
  const [customerId, setCustomerId] = useState('')

  const [isExpanded, setIsExpanded] = useState(false);
  const [technicianData, setTechnicianData] = useState({})
  const [customerReviews, setCustomerReviews] = useState([])

  const [isAvailable, setIsAvailable] = useState('')

  const [reviewRating, setReviewRating] = useState(0)
  const [review, setReview] = useState('')
  const[submitReviewLoading, setSubmitReviewLoading] = useState(false)
  const [submitCnt, setSubmitCnt] = useState(0)

  const [loading, setLoading] = useState(false)
  const [loadingReview, setLoadingReview] = useState(false)

  useEffect(()=>{
    const func = async () =>{
      setCustomerId(await fetchCustomerId())
    }
    func()
  }, [])

  useEffect(()=>{
    setLoading(true)
    const fetchTechnicianData = async () =>{
      try {
        const response = await axios.get(`${ApiUrl}/singleTechnician?technicianId=${technicianId}`)
        setTechnicianData(response.data.singleTechnician)
        setIsAvailable(response.data.singleTechnician.availability.isAvailable)
        setLoading(false)      
      } catch (error) {
        console.log(error)
        alert('An error occured')
      }finally{
        setLoading(false)
      }
    }
    fetchTechnicianData()
  }, [])

  useEffect(()=>{
    setLoadingReview(true)
    const fetchReviews = async () =>{
      try {
        const response = await axios.get(`${ApiUrl}/getReview?technicianId=${technicianId}`)
        setCustomerReviews(response.data.reviews)
        setLoadingReview(false)
      } catch (error) {
        console.log(error)
        alert('an error occured')
      }finally{
        setLoadingReview(false)
      }
    }
    fetchReviews()
  }, [submitCnt])

  const handleAddReview = async () => {
    const token = await fetchToken()
    setSubmitReviewLoading(true)
    if(review === `` && reviewRating <= 0){
      setSubmitReviewLoading(false)
      return alert('please leave a rating and review')
    }
    try {
      const formData = {technicianId: technicianId, customerId: customerId, rating: reviewRating, review: review}
      const response = await axios.post(`${ApiUrl}/leaveReview`, formData, {
        headers : {
          'Authorization': `${token}`,
        },
      })
      setSubmitCnt((prevCount) => prevCount + 1)
      setReview('')
      console.log(response.data)
      alert('submitted')
      setSubmitReviewLoading(false)
    } catch (error) {
      console.log(error)
      alert('An error occured')
    }finally{
      setSubmitReviewLoading(false)
    }
  };

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
      setCustomerReviews(arr.filter((i) => i._id !== reviewId))
    } catch (error) {
      console.log(error)
      alert('An error occured')
    }
  }

  // Show a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={darkBrown} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 bg-white p-2 flex-col gap-6`}>
          {/* Profile Card */}
          <Card style={tw`bg-white shadow-md rounded-lg`}>
            <View style={tw`w-full flex flex-col items-center gap-5 p-5`}>
              <Image
                source={technicianData.profilePicture ? {uri: technicianData.profilePicture} : Pic}
                style={tw`w-40 h-40 border-2 border-[${lightBrown}] rounded-full`}
              />
              <View style={tw`flex-1 flex-col gap-2 w-full justify-start`}>
                <Text style={tw`text-2xl font-semibold text-gray-900`}>
                  {capitalize(technicianData.businessName)}
                </Text>
              <View style={tw`flex-row items-center gap-1`}>
                <MaterialIcons name="handyman" size={18} color="grey" />
                <Text style={tw`text-base text-gray-600`}>{capitalize(technicianData.profession)}</Text>
               </View>
                <View style={tw`flex-row items-center gap-1`}>
                  <Feather name="map-pin" size={18} color="grey" />
                  <Text style={tw`text-sm text-gray-500`}>
                    {technicianData?.location?.address || "Address not available"}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-1 mt-1 mb-2 px-1`}>
                {
                  isAvailable ? (
                  <>
                    <View style={tw`w-3 h-3 rounded-full bg-[green]`}></View>
                    <Text style={tw`text-sm text-gray-600`}>{`Available ( ${moment(technicianData.availability.hours.start).format('LT')} - ${moment(technicianData.availability.hours.end).format('LT')} )`}</Text>
                  </>
                ) : (
                <>
                  <View style={tw`w-3 h-3 rounded-full bg-[red]`}></View>
                  <Text style={tw`text-sm text-gray-600`}>Not Available</Text>
                </>
                )
              }
              </View>
                <CustomStarRating rating={technicianData?.rating?.avgRatings || 0} size={25} />
              </View>
            </View>
          </Card>

          {/* Description Card */}
          <Card style={tw`bg-white p-4`}>
            <Text style={[tw`font-bold text-2xl mb-1 text-gray-800`, { fontFamily: "Lato_Regular" }]}>Bio</Text>
            <Text
              style={[
                tw`text-sm text-gray-700 leading-6`,
                { lineHeight: 22 },
                isExpanded ? tw`mb-3` : { overflow: "hidden", height: 45, textOverflow: 'ellipsis' },
              ]}
            >
              {technicianData.bio}
            </Text>
            {technicianData.description && technicianData.description.length > 100 && (
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={tw`text-sm text-[${darkBrown}] font-semibold`}>
                  {isExpanded ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </Card>

          {/* Work Images Card */}
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-0`}>
            <View style={tw`p-3`}>
              <Text style={[tw`font-bold text-2xl mb-1 text-gray-800`, { fontFamily: "Lato_Regular" }]}>Images</Text>
            </View>
            <ProfileImages workImages={technicianData.pastJobsPicture} />
          </Card>

          <View style={tw`bg-white shadow-md rounded-lg p-2`}>
            <Text style={[tw`font-bold text-2xl mb-1 text-gray-800`,{ fontFamily: "Lato_Regular" },]}> Socials</Text>
            <Socials links={technicianData.socialLinks} />
          </View>

          {/* Customer Reviews */}
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-3 mt-1`}>
            <Text style={[tw`font-bold text-2xl mb-4 text-gray-800`,{ fontFamily: "Lato_Regular" },]}>Customer Reviews</Text>
            { loadingReview ?  (
                <View style={tw`flex-1 justify-center items-center`}>
                  <ActivityIndicator size={25} color={darkBrown} />
                  <Text style={tw`mt-1`}>Loading reviews...</Text>
                </View>
            ) : (
            <>
            {customerReviews.length > 0 ? (
              customerReviews.slice(0, 4).map((review, key) => (
                <>
                <View key={key} style={tw`w-full flex flex-row items-start gap-3 mb-4 p-1`} >
                  {/* Avatar */}
                  <View style={tw`w-10 h-10 bg-[${lightBrown}] rounded-full flex items-center justify-center`}>
                    <Text style={tw`text-white font-bold text-lg`}>{getInitials(review.customer.fullName)}</Text>
                  </View>
                  {/* Review Details */}
                  <View style={tw`flex-1`}>
                    <View style={tw`flex flex-row w-full justify-between items-center`}>
                      <Text style={tw`text-base font-semibold text-gray-800`}>{capitalize(review.customer.fullName)}</Text>
                      {customerId == review.customer._id && <ReviewMenu onPress={() => onDeleteReview(customerReviews, review._id)}  />}
                    </View>
                    <Text style={tw`text-sm text-gray-700 my-1`}>{review.review}</Text>
                    <View style={tw`flex flex-row w-full justify-between items-center`}>
                      <CustomStarRating rating={review.rating} size={20} />
                      <Text style={tw`text-sm text-[#8a817c]`}>{moment(review.createdAt).format('DD/MM/YY')}</Text>
                    </View>
                  </View>
                </View>
                </>
              ))
            ) : (
              <Text style={tw`text-gray-500 text-center my-4`}>No reviews available.</Text>
            )}
            </>
          )}
            {customerReviews.length > 0 && 
              <TouchableOpacity onPress={() => navigation.navigate('reviews', {customerReviews: customerReviews, businessName: technicianData.businessName})} style={tw`flex flex-row justify-end gap-1 my-2`}>
                <Text style={tw`text-right text-[${darkBrown}] text-sm`}>See all reviews</Text><AntDesign name="arrowright" size={20} color={darkBrown} />
              </TouchableOpacity>}
          </Card>

           {/* Add Review Section */} 
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-3 mt-1 mb-2`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}> Leave a Review </Text>
            <StarRatingEdit onRatingChange={(rating) => setReviewRating(rating)} />
            <TextInput style={tw`border rounded-lg p-2 mb-2 text-gray-700`} placeholder="Your Review" value={review} onChangeText={(text) => setReview(text)}multiline/>
            <TouchableOpacity style={tw`bg-[${darkBrown}] p-3 rounded-lg mt-3`} onPress={handleAddReview} disabled={submitReviewLoading}>
              {submitReviewLoading ? <ActivityIndicator size={25} color="#fff" /> :  (<Text style={tw`text-white text-center font-semibold`}>Submit Review</Text>)}
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
      <BookButton />
    </View>
  );
};

export default SingleTechnician;
