import React from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import AppBar from '../layouts/appBar';
import Search from '../components/searchBar';
import { Svg, Circle } from 'react-native-svg'; // For rendering the circle icon
import { categories } from '../util/categories';
import Electrician from '../assets/svg/categories/electrician.svg'
import { lightBrown } from '../util/colors';

const HomePage = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <AppBar />
      <View style={tw`flex-1 p-3 pt-5`}>
        <Search />
        <View style={tw`mt-1 p-2`}>
          <Text style={[tw`font-bold text-3xl`, { fontFamily: 'Lato_Regular' }]}>
            Category
          </Text>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Set number of columns to 3
          renderItem={({ item }) => (
            <View style={tw`flex-1 items-center p-4`}>
              {/* Circle Icon */}
              <View style={[tw`w-20 h-20 rounded-2xl p-2`, {backgroundColor: 'rgba(221, 161, 94, 0.2)'}]}>
                {item.svg ? item.svg : <Electrician />}
              </View>
              {/* <Svg height="50" width="50">
                <Circle cx="25" cy="25" r="25" fill="lightblue" />
              </Svg> */}
              {/* Category Name */}
              <Text style={[tw`text-center mt-2 font-bold`, {fontFamily: 'Lato_Regular'}]}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomePage;
