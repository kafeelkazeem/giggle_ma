import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../screens/home';
import SearchPage from '../screens/search';
import MapPage from '../screens/map';
import SettingsPage from '../screens/settings';
import { darkBrown } from '../util/colors';

const BottomNav = () => {
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = React.useState('home');

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'map':
        return <MapPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to Logout?",
          [
            { text: "Cancel", onPress: () => console.log("Exit cancelled"), style: "cancel" },
            {
              text: "Logout",
              onPress: async () => {
                await AsyncStorage.removeItem('user');
                navigation.navigate('Signin');
              },
              style: "destructive",
            },
          ],
          { cancelable: true }
        );
        return true; // Prevents the default back button behavior
      };

      // Add the back button listener
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      // Cleanup the listener when the Home Page loses focus
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Render Current Screen */}
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('home')}
        >
          <Icon name="home" size={24} color={currentTab === 'home' ? darkBrown : '#000'} />
          <Text style={[styles.navText, currentTab === 'home' && styles.activeText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('search')}
        >
          <Icon name="magnify" size={24} color={currentTab === 'search' ? darkBrown : '#000'} />
          <Text style={[styles.navText, currentTab === 'search' && styles.activeText]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('map')}
        >
          <Icon name="map-marker" size={24} color={currentTab === 'map' ? darkBrown : '#000'} />
          <Text style={[styles.navText, currentTab === 'map' && styles.activeText]}>
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentTab('settings')}
        >
          <Icon name="cog" size={24} color={currentTab === 'settings' ? darkBrown : '#000'} />
          <Text style={[styles.navText, currentTab === 'settings' && styles.activeText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefae0',
  },
  screenContainer: {
    flex: 1,
    padding: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fefae0',
    paddingVertical: 18,
    borderTopWidth: 0,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
  activeText: {
    color: darkBrown,
  },
});

export default BottomNav;
