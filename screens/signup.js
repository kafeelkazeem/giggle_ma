import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { darkBrown, white } from '../util/colors';

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [focusedField, setFocusedField] = useState(null);

  const handleSignUp = () => {
    // Handle sign up logic
    console.log({ name, email, phone, password, confirmPassword });
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
    navigation.navigate('Login');
  };

  return (
    <View style={[tw`flex-1 justify-center p-4`, { backgroundColor: white }]}>
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

      <Text style={tw`text-center text-gray-500 mb-4`}>Or sign up with</Text>

      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={tw`flex-1 p-3 rounded mr-2 flex items-center justify-center bg-red-500 basis-1/4`}
          onPress={handleGoogleSignUp}
        >
          <Icon name="google" size={24} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 p-3 rounded ml-2 flex items-center justify-center bg-blue-500 basis-1/4`}
          onPress={handleFacebookSignUp}
        >
          <Icon name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex items-center justify-center mt-10`}>
        <Text style={tw`text-gray-500`}>
          Already have an account?{' '}
          <Text style={{color: darkBrown}} onPress={handleLogin}>
            Login
          </Text>
        </Text>
      </View>
    </View>
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
