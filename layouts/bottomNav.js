import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import SettingsPage from '../screens/settings';
import MapPage from '../screens/map';
import SearchPage from '../screens/search';
import HomePage from '../screens/home';
import { darkBrown } from '../util/colors';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePageRoute = () => <HomePage />;
const SearchPageRoute = () => <SearchPage />;
const MapPageRoute = () => <MapPage />;
const SettingsPageRoute = () => <SettingsPage />;

const BottomNav = () => {
  const navigation = useNavigation();

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

  const [index, setIndex] = React.useState(0);

  // Assign `key` separately to avoid spreading it
  const routes = [
    { key: 'home', title: 'Home', focusedIcon: 'home', routeComponent: HomePageRoute },
    { key: 'search', title: 'Search', focusedIcon: 'magnify', routeComponent: SearchPageRoute },
    { key: 'map', title: 'Map', focusedIcon: 'map-marker', routeComponent: MapPageRoute },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', routeComponent: SettingsPageRoute },
  ];

  const renderScene = ({ route }) => {
    const currentRoute = routes.find(r => r.key === route.key);
    return currentRoute?.routeComponent ? currentRoute.routeComponent() : null;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNav}
      activeColor={darkBrown}
      activeIndicatorStyle={{ backgroundColor: "rgba(70, 91, 31, 0.2)" }}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      inactiveColor={'#000'}
    />
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#fefae0',
  },
});

export default BottomNav;
