import { View } from 'react-native'
import React from 'react'
import { Button, Menu, Text } from 'react-native-paper'
import Entypo from '@expo/vector-icons/Entypo';
import tw from 'twrnc'
import AntDesign from '@expo/vector-icons/AntDesign';

const ReviewMenu = ({onPress}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View>
        <Menu 
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}><Entypo name="dots-three-vertical" size={18} color='black' /></Button>}>
            <Menu.Item onPress={onPress} style={tw`h-5  flex justify-center items-center`} title={<Text style={tw`text-[red] text-center`}>Delete <AntDesign name="delete" size={16} color="red" /></Text>} />
        </Menu>
    </View>
  )
}

export default ReviewMenu