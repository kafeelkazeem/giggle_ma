export function getInitials(name) {
    if (!name) return "";
  
    return name
      .split(" ") // Split the name into an array of words
      .map(word => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
      .join(""); // Join the initials together
}