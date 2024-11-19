import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const StarRatingEdit = ({ maxStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <View style={[styles.container, tw`-mt-4`]}>
      <View style={styles.stars}>
        {Array.from({ length: maxStars }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(index + 1)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={index < rating ? 'star' : 'star-outline'}
              size={32}
              color={index < rating ? '#ffa723' : '#707070'} // Gold for filled stars, gray for empty
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
});

export default StarRatingEdit;
