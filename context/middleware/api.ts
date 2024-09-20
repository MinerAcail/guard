// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from '../ApiContext';


// Helper function for making API requests
const fetchWithToken = async (url: string, options: RequestInit = {}): Promise<any> => {
    const apiUrl = useApi();
  const token = await AsyncStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized error
    await AsyncStorage.removeItem('token');
    // Optionally navigate to the login screen
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
};

// Login function
export const login = async (username: string, password: string): Promise<void> => {
  const response = await fetchWithToken('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  const { token } = response;
  await AsyncStorage.setItem('token', token);
  // Optionally navigate to the main screen
};

// Logout function
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('token');
  // Optionally navigate to the login screen
};

// Example of a protected API call
export const getProtectedData = async (): Promise<any> => {
  return fetchWithToken('/protected-data');
};
