import React, { useState } from "react";
import { TouchableOpacity, Animated} from "react-native";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { darkBrown } from "../../util/colors";

const BookButton = () =>{
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

    return(
        <>

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
                onPress={() => alert("Call")}
            >
                <Feather name="phone" size={24} color="white" />
            </TouchableOpacity>
            </Animated.View>
        )}

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
            onPress={() => alert("WhatsApp")}
          >
            <FontAwesome5 name="whatsapp" size={24} color="white" />
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
            onPress={() => alert("Gmail")}
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
    )
}

export default BookButton;