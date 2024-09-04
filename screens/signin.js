import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Checkbox } from 'react-native-paper';
import { darkBrown, white } from '../util/colors';
import AltAuth from '../components/socialAuth';

const SigninPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSignUp = () => {
    // Handle sign up logic
    console.log({ email, password, rememberMe });
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
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`} keyboardShouldPersistTaps="handled">
        <View style={[tw`p-4`]}>
          <Text style={[tw`text-2xl font-bold text-left mb-6`, { fontFamily: 'Lato_Regular' }]}>Login</Text>
          {[
            { placeholder: "Email", value: email, onChangeText: setEmail, icon: "email", keyboardType: "email-address" },
            { 
              placeholder: "Password", 
              value: password, 
              onChangeText: setPassword, 
              icon: "lock", 
              secureTextEntry: !isPasswordVisible, 
              toggleVisibility: () => setIsPasswordVisible(!isPasswordVisible),
              isVisible: isPasswordVisible 
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

          <View style={tw`flex-row items-center mb-4`}>
            <Checkbox
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              color={darkBrown}
            />
            <Text style={[tw`ml-2 text-gray-700 text-lg tracking-0.1`, {fontFamily: 'Lato_Regular'}]}>Remember Me</Text>
          </View>

          <Button
            mode="contained"
            onPress={handleSignUp}
            style={[tw`mb-4 p-1`, styles.signUpButton, { backgroundColor: darkBrown }]}
          >
            Login
          </Button>

          <Text style={[tw`text-center text-lg text-gray-500 mb-4`, {fontFamily: 'Lato_Regular'}]}>-Or login with-</Text>
          <AltAuth />
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

export default SigninPage;
