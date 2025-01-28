import React, { useState } from 'react'; // Added useState import
import { Linking, TouchableOpacity, View } from 'react-native';
import { Card, Avatar, Text, Button, Portal, Modal } from 'react-native-paper';
import tw from 'twrnc';
import Pic from '../assets/image/avater.png';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import CustomStarRating from './starRating/starRating';
import { capitalize } from '../util/helpers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { darkBrown } from '../util/colors';

const TechnicianList = ({id, profilePicture, businessName, email, profession, address, whatsappNumber, phoneNumber, isAvailable, ratings, route, cardStyle,}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const onView = () => {
    navigation.navigate(route, { technicianId: id });
  };

  const openModal = () => {
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  const handleCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert("Error", "Unable to open the phone app.");
        }
      })
      .catch((err) => console.error("Error opening call app:", err));
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          Alert.alert("Error", "Unable to open WhatsApp.");
        }
      })
      .catch((err) => console.error("Error opening WhatsApp:", err));
  };

  const handleEmail = () => {
    const emailUrl = `mailto:${email}`;
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert("Error", "Unable to open the email app.");
        }
      })
      .catch((err) => console.error("Error opening email app:", err));
  };

  return (
    <>
      <Card style={tw`${cardStyle}`}>
        <View style={tw`flex-row`}>
          {/* Profile picture on the left */}
          <Avatar.Image
            size={110}
            source={profilePicture ? { uri: profilePicture } : Pic}
            style={tw`mr-3`}
          />

          {/* Right side content */}
          <View style={tw`flex-1 gap-1`}>
            {/* Name, category, address */}
            <Text style={tw`text-xl font-bold`}>{capitalize(businessName)}</Text>
            <Text style={tw`text-base text-gray-600`}>
              <MaterialIcons name="handyman" size={18} color="grey" />
              {` ${capitalize(profession)}`}
            </Text>
            <Text style={tw`text-sm text-gray-600`}>
              <Feather name="map-pin" size={18} color="grey" />
              {` ${address}`}
            </Text>
            <View style={tw`flex flex-row items-center gap-1 mt-1`}>
              {isAvailable ? (
                <>
                  <View style={tw`w-3 h-3 rounded-full bg-[green]`}></View>
                  <Text style={tw`text-sm text-gray-600`}>Available</Text>
                </>
              ) : (
                <>
                  <View style={tw`w-3 h-3 rounded-full bg-[red]`}></View>
                  <Text style={tw`text-sm text-gray-600`}>Not Available</Text>
                </>
              )}
            </View>

            {/* Custom Star ratings */}
            <View style={tw`my-1`}>
              <CustomStarRating rating={ratings} size={22} />
            </View>

            {/* Action buttons */}
            <View style={tw`flex-row justify-between gap-1 mt-2`}>
              <Button mode="contained" onPress={onView}>
                View
              </Button>
              <Button mode="outlined" onPress={openModal}>
                Contact
              </Button>
            </View>
          </View>
        </View>
      </Card>
      <View>
        {/* Modal for enlarged image */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={closeModal}
            contentContainerStyle={tw`flex-1 justify-center items-center`}
          >
            <Card style={tw`w-[90%] bg-white rounded-lg p-4`}>
              <Card.Content>
                <Text style={tw`text-lg font-bold mb-4 text-center`}>
                  {`Contact ${capitalize(businessName)}`}
                </Text>
                <View style={tw`mb-4 w-full flex flex-row justify-around items-center p-2 gap-2`}>
                  <View style={tw`flex flex-col gap-1`}>
                    <TouchableOpacity
                      style={tw`w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-lg`}
                      onPress={handleCall}
                    >
                      <Feather name="phone" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-center mt-3`}>Call</Text>
                  </View>
                  <View style={tw`flex flex-col gap-1`}>
                    <TouchableOpacity
                      style={tw`w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-lg`}
                      onPress={handleWhatsApp}
                    >
                      <FontAwesome5 name="whatsapp" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-center mt-3`}>Whatsapp</Text>
                  </View>
                  <View style={tw`flex flex-col gap-1`}>
                    <TouchableOpacity
                      style={tw`w-14 h-14 bg-[#c71610] rounded-full items-center justify-center shadow-lg`}
                      onPress={handleEmail}
                    >
                      <Feather name="mail" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-center mt-3`}>Email</Text>
                  </View>
                </View>
                <Button
                  mode="contained"
                  onPress={closeModal}
                  style={tw`mt-2 bg-[${darkBrown}]`}
                >
                  Close
                </Button>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>
      </View>
    </>
  );
};

export default TechnicianList;
