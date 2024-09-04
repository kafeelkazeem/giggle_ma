import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Google from '../assets/svg/google.svg'
import Facebook from '../assets/svg/facebook.svg'
import tw from 'twrnc';
import { darkBrown } from '../util/colors';


const AltAuth = () =>{
    return(
    <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
            style={[tw`flex-1 p-2 mr-2 flex items-center justify-center basis-1/4 border rounded`, {borderColor: darkBrown}]}
        >
            <Google width={35} height={35} />
        </TouchableOpacity>

        <TouchableOpacity
            style={[tw`flex-1 p-2 ml-2 flex items-center justify-center basis-1/4 border rounded`, {borderColor: darkBrown}]}
        >
            <Facebook width={35} height={35} />
        </TouchableOpacity>
    </View>
    )
}

export default AltAuth