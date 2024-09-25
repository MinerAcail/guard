import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useAuth } from '@/context/middleware/authContext';
import { useApi } from '@/context/ApiContext';
import {  useRouter } from 'expo-router';
import useProtectedRoute from '../protected';


export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Use login function from AuthContext
  const apiUrl = useApi(); // Use API context to get base URL
  const isAuthorized = useProtectedRoute(["teacher"]);

  
  const navigation = useRouter();
  
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        setErrorMessage('Invalid email or password');
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Use login function to set the token and user in AuthContext
       login(token);
       console.log("took",token);
       
      navigation.replace('/'); // Navigate to home page after login
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Enter your email and password to access your account.</Text>
        </View>
        <View style={styles.form}>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="m@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate('/auth/signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  link: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  error: { color: 'red', marginBottom: 10 },
});
