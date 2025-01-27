import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Snackbar } from 'react-native-paper'; 
import { darkBrown } from '../../util/colors';
import axios from 'axios';
import { ApiUrl } from '../../util/url';
import * as Yup from 'yup'; 
import { Formik } from 'formik'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninPage = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  // Yup schema for validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    const formData = { email: values.email, password: values.password };
    setLoading(true); 
    try {
      const response = await axios.post(`${ApiUrl}/customerLogin`, formData);
      console.log(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data))
      navigation.navigate('App');
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Invalid username or password');
      setSnackbarVisible(true); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`} keyboardShouldPersistTaps="handled">
        <View style={[tw`p-4`]}>
          <Text style={[tw`text-2xl font-bold text-left mb-6`, { fontFamily: 'Lato_Regular' }]}>Login</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {/* Email Field */}
                <View style={tw`mb-4`}>
                  <View
                    style={[
                      tw`flex-row items-center border p-3 rounded-xl`,
                      focusedField === 'Email' && { borderColor: darkBrown },
                    ]}
                  >
                    <Icon name="email" size={22} color={darkBrown} style={tw`mr-2`} />
                    <TextInput
                      style={tw`flex-1`}
                      placeholder="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      onFocus={() => setFocusedField('Email')}
                    />
                  </View>
                  {/* Email Error */}
                  {errors.email && touched.email && <Text style={[tw`text-red-500 mt-2`, {fontFamily:'Lato_Regular'}]}>{errors.email}</Text>}
                </View>

                {/* Password Field */}
                <View style={tw`mb-4`}>
                  <View
                    style={[
                      tw`flex-row items-center border p-3 rounded-xl`,
                      focusedField === 'Password' && { borderColor: darkBrown },
                    ]}
                  >
                    <Icon name="lock" size={22} color={darkBrown} style={tw`mr-2`} />
                    <TextInput
                      style={tw`flex-1`}
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!isPasswordVisible}
                      onFocus={() => setFocusedField('Password')}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                      <Icon
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color={darkBrown}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* Password Error */}
                  {errors.password && touched.password && <Text style={[tw`text-red-500 mt-2`, {fontFamily:'Lato_Regular'}]}>{errors.password}</Text>}
                </View>

                {/* Forgot password */}
                <View style={tw`flex w-full justify-end mb-4 -mt-1`}>
                  <Text style={[tw`ml-2 text-[${darkBrown}] text-base tracking-0.1 text-right`, { fontFamily: 'Lato_Regular' }]}>Forgot Password?</Text>
                </View>

                {/* Login Button */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[tw`mb-4 p-1 mt-2`, styles.signUpButton, { backgroundColor: darkBrown }]}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator size={25} color="#fff" /> : 'Login'}
                </Button>
                <View style={tw`flex items-center justify-center mt-3`}>
                  <Text style={[tw`text-gray-500 text-lg`, { fontFamily: 'Lato_Regular' }]}>
                    Dont't have an account?{' '}
                    <Text style={tw`font-bold text-[${darkBrown}]`} onPress={()=> navigation.navigate('Signup')}>
                      Signup
                    </Text>
                  </Text>
                 </View>
              </>
            )}
          </Formik>

          {/* <Text style={[tw`text-center text-lg text-gray-500 mb-4`, { fontFamily: 'Lato_Regular' }]}>- Or login with -</Text>
          <AltAuth /> */}
        </View>

        {/* Snackbar for showing error */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
          duration={4000}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default SigninPage;
