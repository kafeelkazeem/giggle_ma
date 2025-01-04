import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import tw from 'twrnc';
import * as Location from 'expo-location';
import TechnicianList from '../components/technicianList';
import axios from 'axios';
import { ApiUrl } from '../util/url';
import { darkBrown } from '../util/colors';
import { capitalize } from '../util/helpers';
import Void from '../assets/svg/void.svg'

const SelectedCategory = ({route, navigation}) => {
  const {categoryName} = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [technicians, setTechnicians] = useState([]); 

  useEffect(() => {
    navigation.setOptions({
      title: categoryName, // Set header title dynamically
    });
  }, [navigation, categoryName]);

  useEffect(() => {
    (async () => {
      setLoading(true)
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
          const response = await axios.get(`${ApiUrl}/getSelectedProfession`, {
            params: {
              profession: categoryName,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
          setTechnicians(response.data.nearestTechnician); // Store the fetched data
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
      {/* <TechnicianList technicians={technicians} /> */}
      {technicians.length <= 0 ? (
            <View style={tw`flex-1 justify-center items-center gap-4`}>
              <View>
                  <Void />
              </View>
              <Text style={tw`text-lg font-lighter text-center text-gray-600 tracking-0.5`}>{`No nearby ${capitalize(categoryName)} found`}</Text>
            </View>
        ) : (
          <FlatList
            data={technicians}
            renderItem={({ item }) => <TechnicianList id={item._id} businessName={item.businessName} profession={item.profession} address={item.location.address} ratings={item.rating.avgRatings} route='singleTechnician' cardStyle='m-3 p-3' />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
    </View>
  );
};

export default SelectedCategory;
