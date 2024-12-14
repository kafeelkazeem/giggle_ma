import React from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import tw from 'twrnc';
import { darkBrown } from "../util/colors";
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsPage = () =>{
    return(
        <View style={tw`flex-1 bg-white`}>
            <Appbar.Header style={tw`bg-[${darkBrown}]`}>
                <Appbar.Content title={<Ionicons name="settings-sharp" size={27} color="white" />} color="white" />
            </Appbar.Header>
        </View>
    )
}

export default SettingsPage