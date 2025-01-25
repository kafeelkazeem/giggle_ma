import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Appbar, Divider, Searchbar } from "react-native-paper";
import tw from 'twrnc';
import { darkBrown, lightBrown } from "../util/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import TheSearch from '../assets/svg/search.svg'
import NoResult from '../assets/svg/no_result.svg'
import TechnicianList from "../components/technicianList";
import { ApiUrl } from "../util/url";
import axios from "axios";
import { fetchToken } from "../util/helpers";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if(searchQuery === ''){
      return alert('Input your search')
    }
    setLoading(true)
    try {
      const token = await fetchToken()
      const response = await axios.get(`${ApiUrl}/search?searchQuery=${searchQuery}`, {
        headers : {
          'Authorization': `${token}`,
        },
      })
      setSearchResult(response.data.technicians)
      setLoading(false)
    } catch (error) {
      alert('An error occured')
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* App Bar */}
      <Appbar.Header style={tw`bg-[${darkBrown}]`}>
        <Appbar.Content title={<Text style={tw`text-2xl text-white tracking-0.5 font-bold`}>Search <AntDesign name="search1" size={25} color="white" /></Text>} color="white" />
      </Appbar.Header>
      {/* Search Bar and Button Row */}
      <View style={tw`flex-row items-center px-3 mt-4`}>
        <Searchbar
          placeholder="search by name, address, profess....."
          placeholderTextColor={'grey'}
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode='bar'
          onSubmitEditing={handleSearch}
          theme={{ colors: { primary: lightBrown, placeholder: 'grey' } }}  
          style={[tw`border py-1`,{backgroundColor: "rgba(221, 161, 94, 0.2)", borderRadius: 10}]}
          rippleColor={darkBrown}
        />
      </View>
      <View style={tw`flex-1 p-2 px-4`}>
        <Divider style={tw`mb-1 mt-2 shadow`} bold={true} />
        {loading ? (
           <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color={darkBrown} />
            <Text>Searching...</Text>
          </View>
        ) : (
        searchResult ? (
          <View style={tw`flex-1 w-full`}>
            {
              searchResult.length <= 0 ? (
                <View style={tw`flex-1 w-full justify-center items-center gap-4`}>
                  <NoResult />
                  <Text style={[tw`text-lg font-light text-center text-gray-600 tracking-0.5`, { fontFamily: 'Lato_Regular' }]}>No Results</Text>
                </View>  
              ) : (
                <FlatList
                  data={searchResult}
                  style={tw`-mb-2`}
                  renderItem={({ item }) => <TechnicianList id={item._id} profilePicture={item.profilePicture} businessName={item.businessName} profession={item.profession} address={item.location.address} isAvailable={item.availability.isAvailable} ratings={item.rating.avgRatings} route='singleTechnician' cardStyle='m-2 mx-0 p-3 bg-white shadow' />}
                  keyExtractor={(item, index) => index.toString()}
                />
              )
            }
          </View>
        ) : (
          <View style={tw`flex-1 w-full justify-center items-center`}>
            <TheSearch />
            <Text style={[tw`text-lg font-light text-center text-gray-600 mt-4 tracking-0.5`, { fontFamily: 'Lato_Regular' }]}>Search. Connect. Get it done.</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchPage;
