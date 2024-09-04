import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/onBoarding';
import { useFonts } from 'expo-font';
import { darkBrown, white } from './util/colors';
import SignupPage from './screens/signup';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBrown, // Replace with your custom color
    secondary: darkBrown
  },
};

const Stack = createNativeStackNavigator()

export default function App() {
   // Load fonts
   const [loaded] = useFonts({
    Lato_Black: require('./assets/fonts/Lato/Lato-Black.ttf'),
    Lato_Regular: require('./assets/fonts/Lato/Lato-Regular.ttf')
  });
  // Render loading indicator while fonts are loading or token checking is in progress
  if (!loaded) {
    return null; // or you can show a loading indicator here
  }
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='OnBoarding'>
          <Stack.Screen name='OnBoarding' component={Onboarding} options={{headerShown: false}} />
          <Stack.Screen name='Signup' component={SignupPage} options={{title: ' ', headerShown: false, headerStyle: {backgroundColor: darkBrown}, headerTintColor: white}} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}