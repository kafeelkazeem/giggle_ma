import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Snackbar } from 'react-native-paper'; 
import { darkBrown } from '../../util/colors';
import AltAuth from '../../components/socialAuth';
import axios from 'axios';
import { ApiUrl } from '../../util/url';
import * as Yup from 'yup';
import { Formik } from 'formik';

const SignupPage = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarType, setSnackbarType] = useState(''); 

  // Validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSignUp = async (values, { resetForm }) => {
    setLoading(true); 
    const formData = { fullName: values.fullName, email: values.email, phoneNumber: values.phone, password: values.password };
    try {
      const response = await axios.post(`${ApiUrl}/registerCustomer`, formData);
      console.log(response.data);
      setSnackbarType('success');
      setSnackbarMessage('Signup successful');
      navigation.navigate('Signin')
      resetForm(); 
    } catch (error) {
      console.log(error);
      setSnackbarType('error');
      setSnackbarMessage('Signup failed. Please try again.');
    } finally {
      setLoading(false); 
      setSnackbarVisible(true);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Signin');
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`} keyboardShouldPersistTaps="handled">
        <View style={[tw`p-4`]}>
          <Text style={[tw`text-2xl font-bold text-left mb-6`, { fontFamily: 'Lato_Regular' }]}>Sign Up</Text>

          <Formik
            initialValues={{ fullName: '', email: '', phone: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {[
                  { placeholder: "Name", value: values.fullName, onChangeText: handleChange('fullName'), onBlur: handleBlur('fullName'), icon: "account", error: touched.fullName && errors.fullName },
                  { placeholder: "Email", value: values.email, onChangeText: handleChange('email'), onBlur: handleBlur('email'), icon: "email", keyboardType: "email-address", error: touched.email && errors.email },
                  { placeholder: "Phone", value: values.phone, onChangeText: handleChange('phone'), onBlur: handleBlur('phone'), icon: "phone", keyboardType: "phone-pad", error: touched.phone && errors.phone },
                  { 
                    placeholder: "Password", 
                    value: values.password, 
                    onChangeText: handleChange('password'), 
                    onBlur: handleBlur('password'), 
                    icon: "lock", 
                    secureTextEntry: !isPasswordVisible, 
                    toggleVisibility: () => setIsPasswordVisible(!isPasswordVisible),
                    isVisible: isPasswordVisible,
                    error: touched.password && errors.password 
                  },
                  { 
                    placeholder: "Confirm Password", 
                    value: values.confirmPassword, 
                    onChangeText: handleChange('confirmPassword'), 
                    onBlur: handleBlur('confirmPassword'), 
                    icon: "lock", 
                    secureTextEntry: !isConfirmPasswordVisible, 
                    toggleVisibility: () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible),
                    isVisible: isConfirmPasswordVisible,
                    error: touched.confirmPassword && errors.confirmPassword 
                  },
                ].map((field, index) => (
                  <View key={index}>
                    <View
                      style={[
                        tw`flex-row items-center border p-3 mb-2 rounded-xl`,
                        focusedField === field.placeholder && { borderColor: darkBrown },
                      ]}
                    >
                      <Icon name={field.icon} size={22} color={darkBrown} style={tw`mr-2`} />
                      <TextInput
                        style={tw`flex-1`}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChangeText={field.onChangeText}
                        onBlur={field.onBlur}
                        keyboardType={field.keyboardType || 'default'}
                        secureTextEntry={field.secureTextEntry}
                        onFocus={() => setFocusedField(field.placeholder)}
                      />
                      {field.toggleVisibility && (
                        <TouchableOpacity onPress={field.toggleVisibility}>
                          <Icon
                            name={field.isVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color={darkBrown}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    {field.error && <Text style={tw`text-red-500 mb-4`}>{field.error}</Text>}
                  </View>
                ))}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[tw`mb-4 p-1`, styles.signUpButton, { backgroundColor: darkBrown }]}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'}
                </Button>
              </>
            )}
          </Formik>

          <Text style={[tw`text-center text-lg text-gray-500 mb-4`, { fontFamily: 'Lato_Regular' }]}>- Or sign up with -</Text>
          <AltAuth />
          <View style={tw`flex items-center justify-center mt-6`}>
            <Text style={[tw`text-gray-500 text-lg`, { fontFamily: 'Lato_Regular' }]}>
              Already have an account?{' '}
              <Text style={{ color: darkBrown }} onPress={handleLogin}>
                Login
              </Text>
            </Text>
          </View>
        </View>

        {/* Snackbar for success/error messages */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: snackbarType === 'success' ? 'green' : 'red' }}
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

export default SignupPage;
