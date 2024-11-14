import React from "react";
import { View, Text, Image } from "react-native";
import tw from 'twrnc';
import Pic from '../assets/image/avater.png';
import { darkBrown, lightBrown } from "../util/colors";
import Feather from '@expo/vector-icons/Feather';
import { Card } from "react-native-paper";

const SingleTechnician = () => {
    return (
        <Card style={tw`flex-1 bg-white p-2`}>
            <View style={tw`w-full flex flex-row items-center gap-4 p-3 rounded-xl bg-[rgba(0,0,0,0.1)]`}>
                <Image 
                    source={Pic} 
                    style={tw`w-38 h-38 mr-4 border border-[${lightBrown}] rounded-2xl`}
                />
                <View style={tw`flex-1 flex-col gap-2`}>
                    <Text style={tw`text-2xl font-semibold text-gray-900`}>John Doe</Text>
                    <Text style={tw`text-base text-gray-600`}>Electrician</Text>
                    <Text style={tw`text-sm text-gray-500`}><Feather name="map-pin" size={18} color={lightBrown} /> San Francisco, CA</Text>
                </View>
            </View>
        </Card>
    );
}

export default SingleTechnician;
