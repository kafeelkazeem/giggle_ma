import React, { useState } from "react";
import { TouchableOpacity, Animated, Alert, Linking } from "react-native";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { darkBrown } from "../../util/colors";

const BookButton = ({ phoneNumber, whatsapp, email }) => {
  const [fabOpen, setFabOpen] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  const toggleFab = () => {
    setFabOpen(!fabOpen);
    Animated.timing(scaleAnim, {
      toValue: fabOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
    const whatsappUrl = `https://wa.me/${whatsapp}`;
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

      {/* WhatsApp Button */}
      {fabOpen && (
        <Animated.View
          style={[
            tw`absolute bottom-24 right-3`,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={tw`w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-lg`}
            onPress={handleWhatsApp}
          >
            <FontAwesome5 name="whatsapp" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Call Button */}
      {fabOpen && (
        <Animated.View
          style={[
            tw`absolute bottom-34 right-3`,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={tw`w-14 h-14 bg-blue-600 my-5 rounded-full items-center justify-center shadow-lg`}
            onPress={handleCall}
          >
            <Feather name="phone" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Gmail Button */}
      {fabOpen && (
        <Animated.View
          style={[
            tw`absolute bottom-44 right-3`,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={tw`w-14 h-14 bg-[#c71610] my-10 rounded-full items-center justify-center shadow-lg`}
            onPress={handleEmail}
          >
            <Feather name="mail" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* FAB for Booking */}
      <TouchableOpacity
        style={tw`absolute bottom-6 right-2 w-16 h-16 bg-[${darkBrown}] rounded-full items-center justify-center shadow-2xl`}
        onPress={toggleFab}
      >
        <Feather name={fabOpen ? "x" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default BookButton;
