// context/ApiContext.tsx
import React, { createContext, useContext } from 'react';
import Constants from 'expo-constants';

// Dynamically get the Expo development machine's IP address and API port from hostUri
const apiUrl = `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:8080`;

// Create a context with the API URL
const ApiContext = createContext(apiUrl);

// Create a provider component
export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};
