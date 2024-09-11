import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { darkBrown, lightBrown, white } from '../util/colors';
import { View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View>
        <Searchbar
        placeholder="Category"
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode='bar'
        theme={{ colors: { primary: lightBrown } }}
        style={{backgroundColor: "rgba(221, 161, 94, 0.2)", borderColor: 'black', border: 3}}
        rippleColor={darkBrown}
        />
    </View>
  );
};

export default Search;

