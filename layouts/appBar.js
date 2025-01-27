import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';
import { Appbar, Avatar } from 'react-native-paper';
import { darkBrown } from '../util/colors';
import logo from '../assets/logo/cover.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInitials } from '../util/helpers';

const AppBar = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setName(user.customer.fullName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View>
      {/* AppBar */}
      <Appbar.Header
        style={[
          tw`h-22 p-2`, 
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
        <Image source={logo} style={tw`w-50 h-15 -ml-5`} />
        <Appbar.Content />
        {/* Avatar with User Initials */}
        <Avatar.Text
          size={40}
          label={getInitials(name)} // Get initials from name
          style={tw`bg-[#086788]`}
        />
      </Appbar.Header>
    </View>
  );
};

export default AppBar;
