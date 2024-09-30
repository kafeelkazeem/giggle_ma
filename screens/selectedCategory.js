import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import * as Location from 'expo-location';
import TechnicianList from '../components/technicianList';
import axios from 'axios';
import { ApiUrl } from '../util/url';
import { darkBrown } from '../util/colors';

const SelectedCategory = ({route}) => {
  const {categoryName} = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [technicians, setTechnicians] = useState([]); 

  useEffect(() => {
    (async () => {
      // Request permission for location access
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // Get the current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchTechnicians = async () => {
        setLoading(true); // Start loading
        try {
          const response = await axios.get(`${ApiUrl}/getSelectedCategory`, {
            params: {
              category: categoryName,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
          setTechnicians(response.data); // Store the fetched data
          console.log(response.data)
        } catch (error) {
          console.log('An error occurred while fetching technicians', error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchTechnicians();
    }
  }, [location]);

  // Show an error message if location is not available
  if (errorMsg) {
    return (
      <View style={`flex-1 justify-center items-center`}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // Show a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={darkBrown} />
        <Text>Loading technicians...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      {/* Pass the fetched technicians to the TechnicianList */}
      <TechnicianList technicians={technicians} />
    </View>
  );
};

export default SelectedCategory;
