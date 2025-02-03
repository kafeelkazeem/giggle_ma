import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import tw from 'twrnc';
import * as Location from 'expo-location';
import TechnicianList from '../components/technicianList';
import axios from 'axios';
import { ApiUrl } from '../util/url';
import { darkBrown } from '../util/colors';
import { capitalize, fetchToken } from '../util/helpers';
import Void from '../assets/svg/void.svg';

const SelectedCategory = ({ route, navigation }) => {
  const { categoryName } = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName, // Set header title dynamically
    });
  }, [navigation, categoryName]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const fetchTechnicians = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    try {
      const token = await fetchToken();
      const response = await axios.get(`${ApiUrl}/getSelectedProfession`, {
        params: {
          profession: categoryName,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        headers: {
          Authorization: `${token}`,
        },
      });
      setTechnicians(response.data.nearestTechnician);
      console.log(response.data);
    } catch (error) {
      console.log('An error occurred while fetching technicians', error);
    } finally {
      setLoading(false);
    }
  }, [location, categoryName]);

  useEffect(() => {
    if (location) {
      fetchTechnicians();
    }
  }, [location, fetchTechnicians]);

  const onRefresh = async () => {
    setRefreshing(true); // Start pull-to-refresh
    await fetchTechnicians();
    setRefreshing(false); // Stop pull-to-refresh
  };

  if (errorMsg) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={darkBrown} />
        <Text>Finding Technicians....</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      {technicians.length <= 0 ? (
        <View style={tw`flex-1 justify-center items-center gap-4`}>
          <Void />
          <Text style={tw`text-lg font-light text-center text-gray-600 tracking-0.5`}>
            {`No nearby ${capitalize(categoryName)} found`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={technicians}
          renderItem={({ item }) => (
            <TechnicianList
              id={item._id}
              profilePicture={item.profilePicture}
              businessName={item.businessName}
              profession={item.profession}
              address={item.location.address}
              isAvailable={item.availability.isAvailable}
              ratings={item.rating.avgRatings}
              whatsappNumber={item.contact.WhatsAppNumber}
              phoneNumber={item.contact.phoneNumber}
              email={item.email}
              route="singleTechnician"
              cardStyle="m-3 p-3"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={darkBrown} />
          }
        />
      )}
    </View>
  );
};

export default SelectedCategory;
