// context/ApiContext.tsx
import React, { createContext, useContext } from 'react';
const apiUrlString = 'http://192.168.223.110:8080'; // Base URL of the API

// Create a context with a default value
const ApiContext = createContext(apiUrlString); // Replace with your local IP and port

// Create a provider component
export const ApiProvider = ({ children }) => {
  const apiUrl = apiUrlString; // Base URL of the API
  
  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  );
};  

// Create a custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};
