import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import Pic from "../assets/image/avater.png";
import { darkBrown, lightBrown } from "../util/colors";
import Feather from "@expo/vector-icons/Feather";
import { Card, Divider } from "react-native-paper";
import CustomStarRating from "../components/starRating/starRating";
import BookButton from "../components/buttons/bookButton";
import StarRatingEdit from "../components/starRating/starRating(edit)";

const customerReviews = [
  {
    id: 1,
    avatarLetter: "A",
    name: "Alice Smith",
    review: "Great service! John was punctual and fixed everything perfectly.",
    rating: 5,
  },
  {
    id: 2,
    avatarLetter: "B",
    name: "Brian Johnson",
    review: "The work was okay, but he arrived late.",
    rating: 3,
  },
  {
    id: 3,
    avatarLetter: "C",
    name: "Cynthia Lee",
    review: "Exceptional professionalism and attention to detail.",
    rating: 4,
  },
];

const SingleTechnician = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const [newReview, setNewReview] = useState({ name: "", review: "", rating: 0 });

  const handleAddReview = () => {
    if (newReview.name && newReview.review && newReview.rating) {
      const newReviewWithId = {
        ...newReview,
        id: customerReviews.length + 1,
        avatarLetter: newReview.name.charAt(0).toUpperCase(),
      };
      setCustomerReviews([newReviewWithId, ...customerReviews]);
      setNewReview({ name: "", review: "", rating: 0 }); // Reset form
    } else {
      alert("Please fill out all fields and provide a rating.");
    }
  };

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
                  John Doe
                </Text>
                <Text style={tw`text-base text-gray-600`}>Electrician</Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <Feather name="map-pin" size={18} color={lightBrown} />
                  <Text style={tw`text-sm text-gray-500`}>
                    San Francisco, CA
                  </Text>
                </View>
                <CustomStarRating rating={3} />
              </View>
            </View>
          </Card>

          {/* Description Card */}
          <Card style={tw`bg-white shadow-md rounded-lg p-4`}>
            <Text
              style={[
                tw`font-bold text-2xl mb-1 text-gray-800`,
                { fontFamily: "Lato_Regular" },
              ]}
            >
              Description
            </Text>
            <Text
              style={[
                tw`text-sm text-gray-700 leading-6`,
                { lineHeight: 22 },
                isExpanded ? tw`mb-3` : { overflow: "hidden", height: 66 },
              ]}
            >
              {descriptionText}
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

          {/* customer review */}
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-3 mt-1`}>
            <Text style={[tw`font-bold text-2xl mb-4 text-gray-800`, { fontFamily: "Lato_Regular" },]}>Customer Reviews</Text>
            {customerReviews.map((review) => (
            <>
            <View key={review.id} style={tw`w-full flex flex-row items-start gap-3 mb-4 p-1`} >
              {/* Avatar */}
              <View style={tw`w-10 h-10 bg-[${lightBrown}] rounded-full flex items-center justify-center`}>
                <Text style={tw`text-white font-bold text-lg`}>{review.avatarLetter}</Text>
              </View>
              {/* Review Details */}
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-semibold text-gray-800`}>{review.name}</Text>
                <Text style={tw`text-sm text-gray-700 my-1`}>{review.review}</Text>
                <CustomStarRating rating={review.rating} />
              </View>
            </View>
            </>
            ))}
          </Card>

           {/* Add Review Section */} 
          <Card style={tw`bg-white w-[100%] shadow-md rounded-lg p-3 mt-1 mb-2`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}> Leave a Review </Text>
            <StarRatingEdit />
            <TextInput style={tw`border rounded-lg p-2 mb-2 text-gray-700`} placeholder="Your Review" value={newReview.review} onChangeText={(text) => setNewReview({ ...newReview, review: text })}multiline/>
            <TouchableOpacity style={tw`bg-[${darkBrown}] p-3 rounded-lg mt-3`} onPress={handleAddReview}>
              <Text style={tw`text-white text-center font-semibold`}>Submit Review</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
      <BookButton />
    </View>
  );
};

export default SingleTechnician;
