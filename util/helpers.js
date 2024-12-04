import AsyncStorage from "@react-native-async-storage/async-storage";

export function getInitials(name) {
    if (!name) return "";
  
    return name
      .split(" ") // Split the name into an array of words
      .map(word => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
      .join(""); // Join the initials together
}

export const fetchToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.token
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};