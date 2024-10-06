import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // Icon for dropdown
import { darkBrown, lightGreen } from '../util/colors';
import { ApiUrl } from '../util/url';
import axios from 'axios';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected technician
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [technicians, setTechnicians] = useState([])

  // // Mock data for service providers
  // const serviceProviders = [
  //   { id: 1, type: 'Tailor', latitude: 12.002179, longitude: 8.591956, title: 'Service Provider 1' },
  //   { id: 2, type: 'Carpenter', latitude: 12.0261093, longitude: 8.5857369, title: 'Service Provider 2' },
  //   { id: 3, type: 'Electrician', latitude: 12.015345, longitude: 8.588789, title: 'Service Provider 3' },
  //   { id: 4, type: 'Painter', latitude: 12.008764, longitude: 8.591467, title: 'Service Provider 4' },
  // ];

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
    const fetchTechnician = async () =>{
      try {
        const response = await axios.get(`${ApiUrl}/techniciansLocation`, {
          params:{
            selectedCategory: selectedCategory
          }
        })
        setTechnicians(response.data.techniciansLocation)
      } catch (error) {
        console.log('an error occured')
      }
    }
    fetchTechnician()
  }, [selectedCategory]);

  // Show an error message if location is not available
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // Default region to display on the map
  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 12.002179, // Latitude of Kano, Nigeria
        longitude: 8.591956, // Longitude of Kano, Nigeria
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <View style={styles.container}>
      {/* Styled dropdown container */}
      <TouchableOpacity style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          dropdownIconColor='white'
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Tailor" value="Tailor" />
          <Picker.Item label="Carpenter" value="Carpenter" />
          <Picker.Item label="Electrician" value="Electrician" />
          <Picker.Item label="Painter" value="Painter" />
        </Picker>
      </TouchableOpacity>

      <MapView style={styles.map} region={region} showsUserLocation={true} mapType="standard">
        {technicians.map((marker) => (
          <Marker
            key={marker._id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.businessName}
            description={marker.category}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', // Green background
    borderRadius: 10,
    padding: 0,
    width: 160,
    zIndex: 10, // Ensure it stays above the map
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    height: 20,
    color: 'white', // Change text color
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});

const MapPage = () => {
  return (
    <View style={tw`flex-1`}>
      <MapScreen />
    </View>
  );
};

export default MapPage;
