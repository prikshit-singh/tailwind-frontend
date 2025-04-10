import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";

const showAlert = (title: string, message: string) => {
    if (typeof window !== "undefined") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  export default showAlert