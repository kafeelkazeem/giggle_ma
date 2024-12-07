import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import tw from "twrnc";
import Pic from "../assets/image/avater.png";
import { darkBrown, lightBrown } from "../util/colors";
import Feather from "@expo/vector-icons/Feather";
import { Card, Divider } from "react-native-paper";
import CustomStarRating from "../components/starRating/starRating";
import BookButton from "../components/buttons/bookButton";
import StarRatingEdit from "../components/starRating/starRating(edit)";
import axios from "axios";
import { ApiUrl } from "../util/url";
import { fetchCustomerId, fetchToken, getInitials } from "../util/helpers";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import ReviewMenu from "../components/reviewMenu";

const SingleTechnician = ({route}) => {
  
  const navigation = useNavigation()

  const {technicianId} = route.params
  const [customerId, setCustomerId] = useState('')

  const [isExpanded, setIsExpanded] = useState(false);
  const [technicianData, setTechnicianData] = useState('')
  const [customerReviews, setCustomerReviews] = useState([])

  const [reviewRating, setReviewRating] = useState(0)
  const [review, setReview] = useState('')
  const[submitReviewLoading, setSubmitReviewLoading] = useState(false)
  const [submitCnt, setSubmitCnt] = useState(0)

  const [loading, setLoading] = useState(false)
  const [loadingReview, setLoadingReview] = useState(false)

  
  const descriptionText = `Reliable Plumbing Solutions is your trusted partner for all plumbing needs, offering top-notch services to residential and commercial clients. From emergency repairs and leak fixes to comprehensive installation and maintenance, our experienced team delivers efficient and reliable solutions tailored to your needs.`;

  // Sample images for the technician's past work
  const workImages = [
    require("../assets/image/work1.jpg"),
    require("../assets/image/work2.jpg"),
    require("../assets/image/work3.jpg"),
    require("../assets/image/work4.jpg"),
    require("../assets/image/work5.jpg"),
    require("../assets/image/work6.jpg"),
  ];

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
        console.log(response.data.singleTechnician)
        setLoading(false)      
      } catch (error) {
        console.log(error)
        alert('an error occured')
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
        console.log(response.data.reviews)
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
            <View style={tw`w-full flex flex-row items-center gap-4 p-4`}>
              <Image
                source={Pic}
                style={tw`w-40 h-40 border-2 border-[${lightBrown}] rounded-2xl`}
              />
              <View style={tw`flex-1 flex-col gap-2`}>
                <Text style={tw`text-2xl font-semibold text-gray-900`}>
                  {technicianData.businessName}
                </Text>
                <Text style={tw`text-base text-gray-600`}>{technicianData.category}</Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <Feather name="map-pin" size={18} color={lightBrown} />
                  <Text style={tw`text-sm text-gray-500`}>
                    {technicianData.address}
                  </Text>
                </View>
                <CustomStarRating rating={technicianData.avgRatings} />
              </View>
            </View>
          </Card>

          {/* <Card style={tw`bg-white shadow-md rounded-lg p-4`}>
            <Text style={[tw`font-bold text-2xl mb-1 text-gray-800`,{ fontFamily: "Lato_Regular" },]}> Socials</Text>
          </Card> */}

          {/* Description Card */}
          <Card style={tw`bg-white shadow-md rounded-lg p-4`}>
            <Text style={[tw`font-bold text-2xl mb-1 text-gray-800`,{ fontFamily: "Lato_Regular" },]}>Description</Text>
            <Text
              style={[
                tw`text-sm text-gray-700 leading-6`,
                { lineHeight: 22 },
                isExpanded ? tw`mb-3` : { overflow: "hidden", height: 66 },
              ]}
            >
              {technicianData.description ? technicianData.description : descriptionText}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={tw`text-sm text-[${darkBrown}] font-semibold`}>
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </Card>

          {/* Work Images Card */}
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-0`}>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {workImages.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  style={tw`w-[33%] h-40 mb-1 rounded-lg border-2`}
                  resizeMode="cover"
                />
              ))}
            </View>
          </Card>

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
                      <Text style={tw`text-base font-semibold text-gray-800`}>{review.customer.fullName}</Text>
                      {customerId == review.customer._id && <ReviewMenu onPress={() => onDeleteReview(customerReviews, review._id)}  />}
                    </View>
                    <Text style={tw`text-sm text-gray-700 my-1`}>{review.review}</Text>
                    <View style={tw`flex flex-row w-full justify-between items-center`}>
                      <CustomStarRating rating={review.rating} />
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
