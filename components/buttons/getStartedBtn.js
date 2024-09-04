import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkBrown } from '../../util/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RoundButtonWithText = ({onPress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Get Started</Text>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.6}>
        <Ionicons name="arrow-forward-outline" size={26} color={darkBrown} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.05, 
    backgroundColor: darkBrown,
    width: screenWidth * 0.85, 
    height: screenHeight * 0.08, 
    borderRadius: screenHeight * 0.04, 
    marginTop: screenHeight * 0.09, 
  },
  button: {
    backgroundColor: 'white',
    borderRadius: screenHeight * 0.025, 
    padding: screenWidth * 0.02, 
    marginRight: screenWidth * 0.03, 
  },
  text: {
    fontSize: screenWidth * 0.06, 
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RoundButtonWithText;
