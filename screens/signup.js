import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { darkBrown} from '../util/colors';
import AltAuth from '../components/socialAuth';
import axios from 'axios';

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [focusedField, setFocusedField] = useState(null);

  const handleSignUp = async () => {
    // Handle sign up logic
    const formData = { name: name, email: email, phoneNumber: phone, password: password};
    try {
      const response = await axios.post(`${'https://giggle-be.onrender.com/api'}/registerCustomer`, formData)
      console.log(response.data) 
    } catch (error) {
      console.log(error)
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic
    console.log('Sign up with Google');
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook sign up logic
    console.log('Sign up with Facebook');
  };

  const handleLogin = () => {
    // Navigate to login page
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
          {[
            { placeholder: "Name", value: name, onChangeText: setName, icon: "account" },
            { placeholder: "Email", value: email, onChangeText: setEmail, icon: "email", keyboardType: "email-address" },
            { placeholder: "Phone", value: phone, onChangeText: setPhone, icon: "phone", keyboardType: "phone-pad" },
            { 
              placeholder: "Password", 
              value: password, 
              onChangeText: setPassword, 
              icon: "lock", 
              secureTextEntry: !isPasswordVisible, 
              toggleVisibility: () => setIsPasswordVisible(!isPasswordVisible),
              isVisible: isPasswordVisible 
            },
            { 
              placeholder: "Confirm Password", 
              value: confirmPassword, 
              onChangeText: setConfirmPassword, 
              icon: "lock", 
              secureTextEntry: !isConfirmPasswordVisible, 
              toggleVisibility: () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible),
              isVisible: isConfirmPasswordVisible 
            },
          ].map((field, index) => (
            <View
              key={index}
              style={[
                tw`flex-row items-center border p-3 mb-4 rounded-xl`,
                focusedField === field.placeholder && { borderColor: darkBrown },
              ]}
            >
              <Icon name={field.icon} size={22} color={darkBrown} style={tw`mr-2`} />
              <TextInput
                style={tw`flex-1`}
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={field.onChangeText}
                keyboardType={field.keyboardType || 'default'}
                secureTextEntry={field.secureTextEntry}
                onFocus={() => setFocusedField(field.placeholder)}
                onBlur={() => setFocusedField(null)}
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
          ))}

          <Button
            mode="contained"
            onPress={handleSignUp}
            style={[tw`mb-4 p-1`, styles.signUpButton, { backgroundColor: darkBrown }]}
          >
            Sign Up
          </Button>

          <Text style={[tw`text-center text-lg text-gray-500 mb-4`, {fontFamily: 'Lato_Regular'}]}>- Or sign up with -</Text>
          <AltAuth />
          <View style={tw`flex items-center justify-center mt-6`}>
            <Text style={[tw`text-gray-500 text-lg`, {fontFamily: 'Lato_Regular'}]}>
              Already have an account?{' '}
              <Text style={{color: darkBrown}} onPress={handleLogin}>
                Login
              </Text>
            </Text>
          </View>
        </View>
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
