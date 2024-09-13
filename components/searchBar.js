import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { darkBrown, lightBrown } from '../util/colors';
import { View } from 'react-native';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Category"
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode='bar'
        theme={{ colors: { primary: lightBrown } }}
        style={{
          backgroundColor: "rgba(221, 161, 94, 0.2)", 
          borderColor: 'grey', 
          borderWidth: 1
        }}
        rippleColor={darkBrown}
      />
    </View>
  );
};

export default Search;
