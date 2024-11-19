import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { darkBrown, lightBrown } from '../util/colors';
import { View } from 'react-native';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search profession"
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
  );
};

export default Search;
