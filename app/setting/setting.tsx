import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Settings() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isDataSaverEnabled, setIsDataSaverEnabled] = useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleDataSaver = () => setIsDataSaverEnabled(!isDataSaverEnabled);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
     

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Dark Mode */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Language Selection */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
          </Picker>
        </View>
      </View>

      {/* Data Saver */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Data Saver Mode</Text>
        <Switch value={isDataSaverEnabled} onValueChange={toggleDataSaver} />
      </View>

      {/* Account Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Account Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* Terms and Conditions */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Terms and Conditions</Text>
      </TouchableOpacity>

      {/* Help Center */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Help Center</Text>
      </TouchableOpacity>

      {/* Feedback */}
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Send Feedback</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={[styles.settingItem, styles.logoutButton]}>
        <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f9",
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#41aded",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  pickerContainer: {
    width: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    color: "#333",
  },
  logoutButton: {
    marginTop: 40,
    borderTopWidth: 2,
    borderTopColor: "#f00",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
