import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Button } from 'react-native-paper';
import { white } from '../util/colors';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <View style={[tw`flex-1 justify-center p-4`, {backgroundColor: white}]}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>Register</Text>

      <TextInput
        style={tw`border p-3 mb-4 rounded-xl`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tw`border p-3 mb-4 rounded`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={tw`border p-3 mb-4 rounded`}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={tw`border p-3 mb-4 rounded`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={tw`border p-3 mb-4 rounded`}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

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
