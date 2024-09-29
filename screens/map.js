import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import tw from 'twrnc';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      <MapView style={styles.map} region={region} showsUserLocation={true} mapType="standard">
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`${location.latitude}, ${location.longitude}`}
          />
        )}
        {/* Add markers for service providers (example data) */}
        <Marker
          coordinate={{ latitude: 12.002179, longitude: 8.591956 }}
          title="Service Provider 1"
          description="Tailor"
        />
        <Marker
          coordinate={{ latitude: 12.0261093, longitude: 8.5857369 }}
          title="Service Provider 2"
          description="Carpenter"
        />
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
});

const MapPage = () =>{
    return(
        <View style={tw`flex-1`}>
            <MapScreen />
        </View>
    )
}

export default MapPage