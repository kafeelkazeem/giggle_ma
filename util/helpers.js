import AsyncStorage from "@react-native-async-storage/async-storage";

export function getInitials(name) {
    if (!name) return "";
  
    return name
      .split(" ") // Split the name into an array of words
      .map(word => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
      .join(""); // Join the initials together
}

export function capitalize(str) {
  if (!str) return ''; // Handle empty or null strings
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
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

export const fetchCustomerId = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.customer._id
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

export const fetchCustomerDetails = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return {fullname: capitalize(user.customer.fullName), phoneNumber: user.customer.phoneNumber, searchRange: user.customer.searchRange}
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// export const setSearchRange = async (value) =>{
//   try {
    
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// }