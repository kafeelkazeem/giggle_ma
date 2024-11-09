import React, { useState } from "react";
import { View } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import tw from 'twrnc';
import { darkBrown, lightBrown } from "../util/colors";

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
        <Appbar.Content title="Search Technicians" color="white" />
      </Appbar.Header>

      {/* Search Bar and Button Row */}
      <View style={tw`flex-row items-center px-4 mt-4`}>
      <Searchbar
        placeholder="search by name, state, address...."
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode='bar'
        theme={{ colors: { primary: lightBrown, placeholder: 'grey' } }}  
        style={{
          backgroundColor: "rgba(221, 161, 94, 0.2)", 
          borderColor: 'grey', 
          borderWidth: 1
        }}
        rippleColor={darkBrown}
      />
      </View>
      {/* Rest of the content */}
    </View>
  );
};

export default SearchPage;
