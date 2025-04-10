import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useSession } from "@/context/authContext";
import showAlert from "@/utils/showAlert";
export default function Verify() {
  const { signIn } = useSession();
  const { phone } = useLocalSearchParams(); // Get phone number from params

  // Convert phone to number (or set to null if invalid)
  const phoneNumber = phone ? Number(phone) : null;
  const [otp, setOtp] = useState<number | null>(null);

  useEffect(() => {
   
    if (!phoneNumber) {
      console.log(phoneNumber)
      router.replace("/sign-in")
      showAlert("Error", "Phone number is required!", );
    }
  }, [phoneNumber]);

  const handleVerify = () => {
    if (!phoneNumber) {
      showAlert("Error","Phone number is required");
      return
    }

    if (otp && otp.toString().length === 6) {
      signIn(phoneNumber, otp);
      // router.push("/" as any);
    } else {
      showAlert("Invalid OTP", "Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter OTP</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Sent to: {phoneNumber || "N/A"}</Text>

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
          letterSpacing: 5,
        }}
        keyboardType="numeric"
        placeholder="Enter 6-digit OTP"
        value={otp !== null ? otp.toString() : ""}
        onChangeText={(text) => setOtp(text ? Number(text) : null)}
        maxLength={6}
      />

      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}
