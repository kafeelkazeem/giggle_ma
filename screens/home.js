import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import AppBar from '../layouts/appBar';
import Search from '../components/searchBar';

const HomePage = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <AppBar />
      <View style={tw`flex-1 p-3 pt-5`}>
        <Search />
      </View>
    </View>
  );
};

export default HomePage;
