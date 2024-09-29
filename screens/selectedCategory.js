import React from 'react'
import { View } from 'react-native'
import tw from 'twrnc';
import TechnicianList from '../components/technicianList';

const SelectedCategory = () => {
  return (
    <View style={tw`flex-1`}>
      <TechnicianList />
    </View>
  )
}

export default SelectedCategory
