import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import SettingsPage from '../screens/settings';
import MapPage from '../screens/map';
import SearchPage from '../screens/search';
import HomePage from '../screens/home';
import { darkBrown } from '../util/colors';

const HomePageRoute = () => <HomePage /> ;

const SearchPageRoute = () => <SearchPage /> ;

const MapPageRoute = () => <MapPage />;

const SettingsPageRoute = () => <SettingsPage />;


const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'search', title: 'Search', focusedIcon: 'magnify'},
    { key: 'map', title: 'Map', focusedIcon: 'map-marker' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePageRoute,
    search: SearchPageRoute,
    map: MapPageRoute,
    settings: SettingsPageRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.bottomNav}
      activeColor= {darkBrown} 
      activeIndicatorStyle={{backgroundColor: "rgba(70, 91, 31, 0.2)"}}
      sceneAnimationEnabled
      sceneAnimationType='shifting'
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
