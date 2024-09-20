import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // You can format this timestamp as needed
}

interface NotificationProps {
  notification: Notification;
  onPress: (id: string) => void; // Function to handle notification press
}

const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => onPress(notification.id)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name="bell" size={24} color="white" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a90e2", // Change to your preferred color
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  message: {
    color: "white",
    fontSize: 14,
  },
  timestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 5,
  },
});

export default NotificationItem;
