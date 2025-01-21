import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useApi } from "../ApiContext";
import { jwtDecode } from "jwt-decode";


interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  type: string[];
  number: string;
  position?:string
}

interface DecodedToken {
  id: string;
  type: string[];
  exp: number;
}

const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: UserType | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
} | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const apiUrl = useApi(); // Use API context to get base URL

  useEffect(() => {
    const loadStoredToken = async () => {
      const storedToken = await AsyncStorage.getItem("jwtToken");
      if (storedToken) {
        const decoded = jwtDecode<DecodedToken>(storedToken);

        if (decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);
          await fetchUserData(decoded.id, storedToken); // Fetch user details
          setIsAuthenticated(true);
        } else {
          await AsyncStorage.removeItem("jwtToken");
          setIsAuthenticated(false);
        }
      }
    };

    loadStoredToken();
  }, []);

  const fetchUserData = async (userId: string, jwtToken: string) => {
    let response = await fetch(`${apiUrl}/staffs/${userId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  
    // If staff not found, try fetching parent data
    if (!response.ok || response.status === 404) {
      response = await fetch(`${apiUrl}/parents/${userId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
  
      if (!response.ok) {
        console.error("Error fetching parent data:", response.statusText);
        throw new Error("Invalid credentials or user not found");
      }
    }
  
    const userData = await response.json();
    setUser(userData);
  };
  const fetchALLParents = async (userId: string, jwtToken: string) => {
   
  
    
  
    setUser(userData);
  };

  const login = async (jwtToken: string) => {
    const decoded = jwtDecode<DecodedToken>(jwtToken);

    await AsyncStorage.setItem("jwtToken", jwtToken);
    setToken(jwtToken);
    await fetchUserData(decoded.id, jwtToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
