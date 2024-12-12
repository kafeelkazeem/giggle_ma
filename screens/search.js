import React, { useState } from "react";
import { Text, View } from "react-native";
import { Appbar, Divider, Searchbar } from "react-native-paper";
import tw from 'twrnc';
import { darkBrown, lightBrown } from "../util/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import TheSearch from '../assets/svg/search.svg'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
    // Add your search logic here, e.g., filtering technicians by name, state, address, etc.
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
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode='bar'
          onSubmitEditing={() => alert('ih')}
          theme={{ colors: { primary: lightBrown, placeholder: 'grey' } }}  
          style={[tw`border py-1`,{backgroundColor: "rgba(221, 161, 94, 0.2)", borderRadius: 10}]}
          rippleColor={darkBrown}
        />
      </View>
      <View style={tw`flex-1 p-2 px-4`}>
        <Divider style={tw`mb-1 mt-4`} bold={true} />
        <View style={tw`flex-1 w-full justify-center items-center`}>
          <TheSearch />
        </View>
      </View>
    </View>
  );
};

export default SearchPage;
