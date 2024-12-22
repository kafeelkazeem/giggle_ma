import React, { useEffect, useState } from "react";
import { FlatList,Text,TouchableOpacity,View,Alert,Modal,TextInput,Button,ActivityIndicator } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import tw from "twrnc";
import { darkBrown } from "../util/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchCustomerDetails, fetchToken } from "../util/helpers";
import axios from "axios";
import { ApiUrl } from "../util/url";
import { Picker } from '@react-native-picker/picker';

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
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchRange, setSearchRange] = useState('10km');
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const func = async () => {
      const details = await fetchCustomerDetails();
      setFullName(details.fullname);
      setPhoneNumber(details.phoneNumber.toString());
    };
    func();
  }, []);

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const onSaveProfile = async () => {
    if (!fullName || !phoneNumber) {
      return alert("Please fill out all fields.");
    }
    const formData = { fullName, phoneNumber };
    setLoading(true);
    try {
      const token = await fetchToken();
      await axios.put(`${ApiUrl}/updateProfile`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Profile updated successfully.");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the profile.");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill out all fields.");
    }
    // Validate new password: must be alphanumeric and at least 5 characters long
    const passwordRegex = /^[a-zA-Z0-9]{5,}$/;
    if (!passwordRegex.test(newPassword)) {
      return alert(
        "New password must be at least 5 characters long and contain only letters and numbers."
      );
    }
    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match.");
    }
    const formData = { currentPassword, newPassword };
    setLoading(true);
    try {
      const token = await fetchToken();
      await axios.put(`${ApiUrl}/changePassword`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Password changed successfully.");
      setModalVisible(false);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  const renderModalContent = () => {
    switch (modalContent) {
      case "Profile":
        return (
          <View style={tw`p-5`}>
            <Text style={tw`text-xl font-bold mb-4`}>Edit Profile</Text>
            <TextInput
              value={fullName}
              placeholder="Name"
              onChangeText={(text) => setFullName(text)}
              style={tw`border p-3 mb-4 rounded`}
            />
            <TextInput
              value={phoneNumber}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              onChangeText={(text) => setPhoneNumber(text)}
              style={tw`border p-3 mb-4 rounded`}
            />
            {loading ? (
              <ActivityIndicator color={darkBrown} />
            ) : (
              <Button color={darkBrown} title="Save" onPress={onSaveProfile} />
            )}
          </View>
        );
      case "Change Password":
        return (
          <View style={tw`p-5 bg-white`}>
            <Text style={tw`text-xl font-bold mb-4`}>Change Password</Text>
            <View style={tw`flex-row items-center mb-4 border rounded`}>
              <TextInput
                placeholder="Old Password"
                secureTextEntry={!showOldPassword}
                style={tw`flex-1 p-3`}
                onChangeText={(text) => setCurrentPassword(text)}
              />
              <TouchableOpacity style={tw`p-2`} onPress={() => setShowOldPassword(!showOldPassword)}>
                <Ionicons name={showOldPassword ? "eye" : "eye-off"} size={20} color={darkBrown} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row items-center mb-4 border rounded`}>
              <TextInput
                placeholder="New Password"
                secureTextEntry={!showNewPassword}
                style={tw`flex-1 p-3`}
                onChangeText={(text) => setNewPassword(text)}
              />
              <TouchableOpacity style={tw`p-2`} onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={20} color={darkBrown} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row items-center mb-4 border rounded`}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                style={tw`flex-1 p-3`}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity style={tw`p-2`} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color={darkBrown} />
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator color={darkBrown} />
            ) : (
              <Button color={darkBrown} title="Save" onPress={onChangePassword} />
            )}
          </View>
        );
      case "Search Range":
        return (
          <View style={tw`p-5`}>
            <Text style={tw`text-xl font-bold mb-4`}>Set Search Range</Text>
            <View style={tw`w-full border rounded mb-6`}>
              <Picker
                selectedValue={searchRange}
                onValueChange={(itemValue) => setSearchRange(itemValue)}
              >
                <Picker.Item label="10km" value="10km" />
                <Picker.Item label="20km" value="20km" />
                <Picker.Item label="30km" value="30km" />
              </Picker>
            </View>
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
