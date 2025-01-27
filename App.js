import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/onBoarding';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 
import { darkBrown, white } from './util/colors';
import SignupPage from './screens/auth/signup';
import SigninPage from './screens/auth/signin';
import BottomNav from './layouts/bottomNav';
import SelectedCategory from './screens/selectedCategory';
import SingleTechnician from './screens/singleTechnician';
import Reviews from './screens/reviews';

// Custom theme for React Native Paper
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBrown,
    secondary: darkBrown,
  },
};

// Initialize Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Load fonts or other assets
        await useFonts({
          Lato_Black: require('./assets/fonts/Lato/Lato-Black.ttf'),
          Lato_Regular: require('./assets/fonts/Lato/Lato-Regular.ttf'),
        });
      } catch (error) {
        console.warn('Error loading resources:', error);
      } finally {
        // Hide splash screen once everything is ready
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Render null while loading resources
  if (!appIsReady) {
    return null; // Alternatively, you can show a custom loading spinner here
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={darkBrown} />
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="OnBoarding">
            <Stack.Screen name="OnBoarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupPage} options={{title: ' ',headerShown: true,headerStyle: { backgroundColor: darkBrown },headerTintColor: white,}}/>
            <Stack.Screen
              name="Signin"
              component={SigninPage}
              options={{
                title: ' ',
                headerShown: true,
                headerStyle: { backgroundColor: darkBrown },
                headerTintColor: white,
              }}
            />
            <Stack.Screen name="App" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen
              name="selectedCategory"
              component={SelectedCategory}
              options={{
                headerTitleStyle: { color: white },
                headerStyle: { backgroundColor: darkBrown },
                headerTintColor: white,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="singleTechnician"
              component={SingleTechnician}
              options={{
                title: '',
                headerTitleStyle: { color: white },
                headerStyle: { backgroundColor: darkBrown },
                headerTintColor: white,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="reviews"
              component={Reviews}
              options={{
                headerTitleStyle: { color: white },
                headerStyle: { backgroundColor: darkBrown },
                headerTintColor: white,
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
