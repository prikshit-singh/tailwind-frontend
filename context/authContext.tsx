import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { router, useLocalSearchParams } from "expo-router";
import showAlert from '@/utils/showAlert';
const AuthContext = createContext<{
  signIn: (phone:number,otp:number) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (phone:number,otp:number) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (phone: number, otp: number) => {
          try {
            const response = await fetch("http://localhost:3000/api/user/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phone, verification_code:otp }),
            });

            const data = await response.json();

            if (response.ok ) {
              setSession(data); // Save session token
              router.push("/" as any); // Navigate to home
              console.log(data)
            } else {
              showAlert("Error","Invalid OTP. Please try again.");
            }
          } catch (error) {
            console.error("Error verifying OTP:", error);
            showAlert("Error","Something went wrong. Please try again later.");
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
