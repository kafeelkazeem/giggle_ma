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
import { professions } from '../util/professions';

const MapScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState('All'); 
  const [allTechnicians, setAllTechnicians] = useState([]); // Store all technicians
  const [technicians, setTechnicians] = useState([]); // Store filtered technicians

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/techniciansLocation`);
        console.log(response.data.techniciansLocation);
        setAllTechnicians(response.data.techniciansLocation);
        setTechnicians(response.data.techniciansLocation); // Initially set all
      } catch (error) {
        console.log(error);
        console.log('An error occurred');
      }
    };
    fetchTechnicians();
  }, []);

  useEffect(() => {
    if (selectedProfession === 'All') {
      setTechnicians(allTechnicians); // Show all technicians
    } else {
      const filtered = allTechnicians.filter(
        (tech) => tech.profession.toLowerCase() === selectedProfession.toLowerCase()
      );
      console.log("Filtered Technicians:", filtered);
      setTechnicians(filtered);
    }
  }, [selectedProfession, allTechnicians ]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 12.002179,
        longitude: 8.591956,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedProfession}
          style={tw`flex-1 text-white h-20`}
          dropdownIconColor="white"
          onValueChange={(itemValue) =>(setSelectedProfession(itemValue))}
        >
          <Picker.Item label="All Professions" value="All" />
          {professions.map((item, key) => (
            <Picker.Item key={item.value || key} label={item.name} value={item.name} />
          ))}
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
