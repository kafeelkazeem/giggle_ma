import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { darkBrown } from '../util/colors';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

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

  return (
    <View style={tw`flex-1 justify-center p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>Sign Up</Text>

      <View style={tw`flex-row items-center border p-3 mb-4 rounded-xl`}>
        <Icon name="account" size={22} color={darkBrown} style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={tw`flex-row items-center border p-3 mb-4 rounded-xl`}>
        <Icon name="email" size={22} color={darkBrown} style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={tw`flex-row items-center border p-3 mb-4 rounded-xl`}>
        <Icon name="phone" size={22} color={darkBrown} style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={tw`flex-row items-center border p-3 mb-4 rounded-xl`}>
        <Icon name="lock" size={22} color={darkBrown} style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24} 
            color={darkBrown}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center border p-3 mb-4 rounded-xl`}>
        <Icon name="lock" size={22} color={darkBrown} style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1`}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <Icon
            name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
            size={22}
            color={darkBrown}
          />
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={tw`mb-4 bg-blue-500`}
      >
        Sign Up
      </Button>

      <Text style={tw`text-center text-gray-500 mb-4`}>Or sign up with</Text>

      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={tw`flex-1 bg-red-500 p-3 rounded mr-2`}
          onPress={handleGoogleSignUp}
        >
          <Text style={tw`text-center text-white`}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 bg-blue-700 p-3 rounded ml-2`}
          onPress={handleFacebookSignUp}
        >
          <Text style={tw`text-center text-white`}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupPage;
