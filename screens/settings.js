import React, { useEffect, useState } from "react";
import {FlatList,Text,TouchableOpacity,View,Alert,Modal,TextInput,Button,} from "react-native";
import { Appbar, Divider } from "react-native-paper";
import tw from "twrnc";
import { darkBrown } from "../util/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchCustomerDetails } from "../util/helpers";

const logout = () => {
  Alert.alert("Log Out", "Are you sure you want to log out?", [
    { text: "Cancel", style: "cancel" },
    { text: "Log Out", onPress: () => console.log("logout"), style: "destructive" },
  ]);
};

const ButtonList = ({ title, icon, handlePress }) => {
  return (
    <>
      <View style={tw`p-3 py-5 flex justify-center items-center mt-0`}>
        <TouchableOpacity
          onPress={handlePress}
          style={tw`flex flex-row items-center p-4 rounded`}
          activeOpacity={0.8}
        >
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

const SettingsPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(()=>{
    const func = async () =>{
      const details = await fetchCustomerDetails()
      setFullName(details.fullname)
      setPhoneNumber(details.phoneNumber.toString())
    }
    func()
  }, [])

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case "Profile":
        return (
          <View style={tw`p-5`}>
            <Text style={tw`text-xl font-bold mb-4`}>Edit Profile</Text>
            <TextInput value={fullName} placeholder="Name" style={tw`border p-3 mb-4 rounded`} />
            <TextInput value={phoneNumber} keyboardType="phone-pad" placeholder="Phone Number" style={tw`border p-3 mb-4 rounded`} />
            <Button color={darkBrown} title="Save" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "Change Password":
        return (
          <View style={tw`p-5 bg-white`}>
            <Text style={tw`text-xl font-bold mb-4`}>Change Password</Text>
            <TextInput
              placeholder="Old Password"
              secureTextEntry
              style={tw`border p-3 mb-4 rounded`}
            />
            <TextInput
              placeholder="New Password"
              secureTextEntry
              style={tw`border p-3 mb-4 rounded`}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={tw`border p-3 mb-4 rounded`}
            />
            <Button color={darkBrown} title="Save" onPress={() => setModalVisible(false)} />
          </View>
        );
      case "Search Range":
        return (
          <View style={tw`p-5`}>
            <Text style={tw`text-xl font-bold mb-4`}>Set Search Range</Text>
            <TextInput
              placeholder="Search Range (in km)"
              keyboardType="numeric"
              style={tw`border p-3 mb-4 rounded`}
            />
            <Button color={darkBrown} title="Save" onPress={() => setModalVisible(false)} />
          </View>
        );
      default:
        return null;
    }
  };

  const content = [
    {
      title: "Profile",
      icon: <Entypo name="user" size={25} color="black" />,
      action: () => showModal("Profile"),
    },
    {
      title: "Change Password",
      icon: <Entypo name="key" size={25} color="black" />,
      action: () => showModal("Change Password"),
    },
    {
      title: "Search Range",
      icon: <FontAwesome name="map-marker" size={25} color="black" />,
      action: () => showModal("Search Range"),
    },
    {
      title: "Terms and Condition",
      icon: <FontAwesome name="legal" size={25} color="black" />,
      action: () => console.log("pressed"),
    },
    {
      title: "Logout",
      icon: <MaterialIcons name="logout" size={25} color="black" />,
      action: logout,
    },
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      <Appbar.Header style={tw`bg-[${darkBrown}]`}>
        <Appbar.Content
          color="white"
          title={
            <Text style={tw`text-2xl text-white tracking-0.5 font-bold`}>
              <Ionicons name="settings-sharp" size={27} color="white" />
            </Text>
          }
        />
      </Appbar.Header>
      <View style={tw`w-full p-4`}>
        <Text style={tw`text-2xl font-bold tracking-0.5`}>General</Text>
      </View>
      <View style={tw`flex-1 bg-white w-full -mt-5`}>
        <FlatList
          data={content}
          renderItem={({ item }) => (
            <ButtonList title={item.title} icon={item.icon} handlePress={item.action} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`absolute top-18 right-4`}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={tw`bg-white w-4/5 rounded-xl p-5`}>
            {renderModalContent()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsPage;
