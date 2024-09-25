import { useAuth } from "@/context/middleware/authContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";


export default function useProtectedRoute (expectedType: string[]) {
  const { isAuthenticated, user } = useAuth();
 
  const userTypes = user?.type || [];

  useEffect(() => {
    if (!isAuthenticated || userTypes !== expectedType) {
      
    }
  }, [isAuthenticated, userTypes, expectedType]);

  return isAuthenticated && userTypes === expectedType; // Returns true if authorized
};
