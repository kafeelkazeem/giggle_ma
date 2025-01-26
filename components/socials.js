import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import React from 'react';
import Facebook from '../assets/svg/socials/facebook.svg';
import Instagram from '../assets/svg/socials/instagram.svg';
import LinkedIn from '../assets/svg/socials/linkedin.svg';
import GitHub from '../assets/svg/socials/github.svg';
import tw from 'twrnc';
import { Linking } from 'react-native';

const Socials = ({ links = [] }) => {
  // Patterns to identify platforms
  const socialPatterns = {
    facebook: /facebook\.com/,
    instagram: /instagram\.com/,
    github: /github\.com/,
    linkedin: /linkedin\.com/,
  };

  // Corresponding icons for each platform
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    github: GitHub,
    linkedin: LinkedIn,
  };

  // Identify the platform based on URL
  const identifyPlatform = (url) => {
    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      if (pattern.test(url)) {
        return platform;
      }
    }
    return null;
  };

  // Handle clicking the icon to open the URL
  const handleOpenURL = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(`Cannot open URL: ${url}`);
    }
  };

  return (
    <View style={tw`w-full`}>
      {links.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 px-4 py-3 flex flex-row justify-center w-full`}
        >
          {links.map((url, index) => {
            const platform = identifyPlatform(url);
            if (!platform) return null; // Skip if platform isn't recognized

            const Icon = socialIcons[platform];
            return (
              <TouchableOpacity
                style={tw`rounded p-2`}
                key={index}
                onPress={() => handleOpenURL(url)}
              >
                <Icon width={45} height={45} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={tw`w-full py-4 items-center`}>
          <Text style={tw`text-base text-gray-500`}>No socials available</Text>
        </View>
      )}
    </View>
  );
};

export default Socials;
