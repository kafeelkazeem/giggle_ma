import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import AppBar from '../layouts/appBar';
import Search from '../components/searchBar';
import { categories } from '../util/categories';
import Electrician from '../assets/svg/categories/electrician.svg';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation()

  // Filter the categories based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category) => {
    navigation.navigate('selectedCategory', {categoryName: category.name})
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <AppBar />
      <View style={tw`flex-1 p-3 pt-3`}>
        {/* Pass the searchQuery and setSearchQuery to the Search component */}
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={tw`mt-1 p-2`}>
          <Text style={[tw`font-bold text-3xl tracking-0.3`, { fontFamily: 'Lato_Regular' }]}>
            Category
          </Text>
        </View>

        {/* Display fallback text if no category is found */}
        {filteredCategories.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={[tw`text-lg font-bold text-gray-500`, { fontFamily: 'Lato_Regular' }]}>
              Category not available yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredCategories}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`flex-1 items-center p-4`}
                onPress={() => handleCategoryPress(item)}
              >
                <View style={[tw`w-18 h-18 rounded-2xl p-2`, { backgroundColor: 'rgba(221, 161, 94, 0.2)', borderWidth: 1, borderColor: 'grey' }]}>
                  {item.svg ? item.svg : <Electrician />}
                </View>
                <Text style={[tw`text-center mt-2 font-bold tracking-0.3`, { fontFamily: 'Lato_Regular' }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default HomePage;
