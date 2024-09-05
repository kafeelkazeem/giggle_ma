import React from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';
import { Appbar, Avatar } from 'react-native-paper';
import { white, darkBrown } from '../util/colors';
import logo from '../assets/logo/cover.png';

const AppBar = () => {
  return (
    <View>
      {/* AppBar */}
      <Appbar.Header
        style={[
          tw`h-25 p-2]`, 
          {
            backgroundColor: darkBrown,
            padding: 2,
            elevation: 4, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.3, 
            shadowRadius: 4, 
          },
        ]}
      >
        {/* Image Logo on the left */}
        <Image
          source={logo} 
          style={tw`w-50 h-15 -ml-5`} 
        />
        <Appbar.Content />
        <Avatar.Text size={35} label="A" style={tw`bg-[${white}]`} />
      </Appbar.Header>
    </View>
  );
};

export default AppBar;
