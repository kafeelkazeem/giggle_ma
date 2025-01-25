import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Modal, Portal, Button, Card } from 'react-native-paper';
import tw from "twrnc";
import AntDesign from '@expo/vector-icons/AntDesign';

const ProfileImages = ({ workImages = [] }) => {
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

    const openModal = (image) => {
        setSelectedImage(image); // Set the clicked image
        setModalVisible(true); // Open the modal
    };

    const closeModal = () => {
        setSelectedImage(null); // Clear the selected image
        setModalVisible(false); // Close the modal
    };

    return (
        <View>
            {/* Grid of images */}
            <View style={tw`flex-row flex-wrap -mt-3`}>
                {workImages.length === 0 ? (
                    <View style={tw`flex-1 w-full justify-center items-center py-15`}>
                        <Text>No images available</Text>
                    </View>
                ) : (
                    workImages.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => openModal(image)}
                            style={tw`w-1/2 p-1`} 
                        >
                            <Image
                                source={{ uri: image }}
                                style={tw`w-full h-40 rounded-lg border`} 
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))
                )}
            </View>

            {/* Modal for enlarged image */}
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={closeModal}
                    contentContainerStyle={tw`flex-1 justify-center items-center`}
                >
                    <Card style={tw`w-[95%] bg-white rounded-lg`}>
                        <Card.Content style={tw`items-center`}>
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={tw`w-full h-96 rounded-lg`} 
                                    resizeMode="contain"
                                />
                            ) : (
                                <Text>No image to display</Text> 
                            )}
                        </Card.Content>
                        <Card.Actions style={tw`justify-end p-2`}>
                            <Button onPress={closeModal} mode="contained" style={tw`bg-red-500`}>
                                <AntDesign name="close" size={24} color="white" />
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        </View>
    );
};

export default ProfileImages;
