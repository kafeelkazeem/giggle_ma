import React from "react";
import { FlatList, Text, TouchableOpacity, View, Alert } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import tw from 'twrnc';
import { darkBrown, lightBrown } from "../util/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const logout = () =>{
    Alert.alert(
        "Log Out", // Title of the alert
        "Are you sure you want to log out?", // Message in the alert
        [
          {
            text: "Cancel",
            
            style: "cancel", // Styles the button (e.g., "cancel", "destructive")
          },
          {
            text: "Log Out",
            onPress: () => console.log('logout'),
            style: "destructive", // Typically for actions like deletion or logging out
          },
        ],
        { cancelable: true } // Allows dismissal by tapping outside the alert
      );
}

const content = [
    {
        title: 'Profile',
        icon: <Entypo name="user" size={25} color='black' />,
        action: () => console.log('pressed')
    },
    {
        title: 'Change Password',
        icon: <Entypo name="key" size={25} color='black' />,
        action: () => console.log('pressed')
    },
    {
        title: 'Search Range',
        icon: <FontAwesome name="map-marker" size={25} color='black' />,
        action: () => console.log('pressed')
    },
    {
        title: 'Terms and Condition',
        icon: <FontAwesome name="legal" size={25} color='black' />,
        action: () => console.log('pressed')
    },
    {
        title: 'Logout',
        icon: <MaterialIcons name="logout" size={25} color='black' />,
        action: logout
    }
]

const ButtonList = ({title, icon, handlePress}) => {
    return (
      <>
      <View style={tw`p-3 py-5 flex justify-center items-center mt-0`}>  
      <TouchableOpacity onPress={handlePress} style={tw`flex flex-row items-center p-4 rounded`} activeOpacity={0.8}>
         {icon}
        <View style={tw`flex-1 ml-10`}>
          <Text style={tw`text-base font-medium tracking-0.2`}>{title}</Text>
        </View>
        <MaterialCommunityIcons name="greater-than" size={24} color={darkBrown} />
      </TouchableOpacity>
      </View>
      <Divider />
      </>
    );
  };

const SettingsPage = () =>{
    return(
        <View style={tw`flex-1 bg-white`}>
            <Appbar.Header style={tw`bg-[${darkBrown}]`}>
                <Appbar.Content title={<Text style={tw`text-2xl text-white tracking-0.5 font-bold`}><Ionicons name="settings-sharp" size={27} color="white" /></Text>} color="white" />
            </Appbar.Header>
            <View style={tw`w-full p-4`}>
                <Text style={tw`text-2xl font-bold tracking-0.5`}>General</Text>
            </View>
            <View style={tw`flex-1 bg-white w-full -mt-5`}>
                <FlatList
                data={content}
                renderItem={({ item }) => <ButtonList title={item.title} icon={item.icon} handlePress={item.action} />}
                keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default SettingsPage