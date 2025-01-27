import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import { ApiUrl } from '../util/url';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { capitalize } from '../util/helpers';

const MapScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState('All'); // State for selected technician
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
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/techniciansLocation`, {
          params: {
            selectedProfession: selectedProfession,
          },
        });
        console.log(response.data.techniciansLocation);
        setTechnicians(response.data.techniciansLocation);
      } catch (error) {
        console.log(error);
        console.log('An error occurred');
      }
    };
    fetchTechnician();
  }, [selectedProfession]);

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
          selectedValue={selectedProfession}
          style={tw`flex-1 text-white h-20`}
          dropdownIconColor="white"
          onValueChange={(itemValue) => setSelectedProfession(itemValue)}
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
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            }}
            title={capitalize(marker.businessName)}
            description={capitalize(marker.profession)}
          >
            <Callout onPress={() => navigation.navigate('singleTechnician', { technicianId: marker._id })}>
              {/* <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{capitalize(marker.businessName || 'No business name')}</Text>
                <Text>{capitalize(marker.profession || 'No profession')}</Text>
              </View> */}
            </Callout>
          </Marker>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 1,
    paddingTop: 5,
    paddingBottom: 5,
    width: 160,
    height: 50,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
