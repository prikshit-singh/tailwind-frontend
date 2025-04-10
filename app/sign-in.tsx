import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import { useSession } from "@/context/authContext";
import showAlert from "@/utils/showAlert";
export default function SignIn() {
  const { signIn } = useSession();
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

 

  const handleSignIn = async () => {
    if (mobileNumber.trim().length !== 10) {
      showAlert("Error", "Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobileNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        showAlert("Success", "OTP sent successfully!");
        router.push(`/verify?phone=${mobileNumber}`);
      } else {
        showAlert("Failed", data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      showAlert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
    className="w-full h-48 bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 flex items-center justify-center"
    style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Mobile Number</Text>
      
      <TextInput
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 16,
          textAlign: "center",
        }}
        keyboardType="phone-pad"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        maxLength={10}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleSignIn} />
      )}
    </View>
  );
}
