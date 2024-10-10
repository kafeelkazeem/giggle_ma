import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/onBoarding';
import { useFonts } from 'expo-font';
import { darkBrown, darkGreen, white } from './util/colors';
import SignupPage from './screens/auth/signup';
import SigninPage from './screens/auth/signin';
import BottomNav from './layouts/bottomNav';
import SelectedCategory from './screens/selectedCategory';
import SingleTechnician from './screens/singleTechnician';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBrown, 
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
    <>
    <StatusBar style='light' backgroundColor={darkBrown}/>
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='OnBoarding'>
          <Stack.Screen name='OnBoarding' component={Onboarding} options={{headerShown: false}} />
          <Stack.Screen name='Signup' component={SignupPage} options={{title: ' ', headerShown: true, headerStyle: {backgroundColor: darkBrown}, headerTintColor: white}} />
          <Stack.Screen name='Signin' component={SigninPage} options={{title: ' ', headerShown: true, headerStyle: {backgroundColor: darkBrown}, headerTintColor: white}} />
          <Stack.Screen name='App' component={BottomNav} options={{headerShown: false}} />
          <Stack.Screen name='selectedCategory' component={SelectedCategory} options={{headerTitleStyle: {color: white }, headerStyle: {backgroundColor: darkBrown}, headerTintColor: white, headerShown: true}} />
          <Stack.Screen name='singleTechnician' component={SingleTechnician} options={{title: '', headerTitleStyle: {color: white }, headerStyle: {backgroundColor: darkBrown}, headerTintColor: white, headerShown: true}} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </>
  );
}