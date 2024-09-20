import React from "react";
import { View, Button, StyleSheet, Text, FlatList } from "react-native";
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string; // Adjust the type if needed, e.g., Date
}
export const notificationsData: Notification[] = [
  {
    id: "1",
    title: "School Event",
    message: "Don't miss the annual school carnival happening this Friday at 5 PM.",
    date: "2024-09-07",
  },
  {
    id: "2",
    title: "Parent-Teacher Meeting",
    message: "Parent-Teacher meetings are scheduled for next Monday. Please sign up for a slot.",
    date: "2024-09-04",
  },
  {
    id: "3",
    title: "Holiday Notice",
    message: "School will be closed for the upcoming holidays from September 10th to September 15th.",
    date: "2024-09-01",
  },
  {
    id: "4",
    title: "Assignment Due",
    message: "Reminder: The assignment for Math 101 is due on September 5th.",
    date: "2024-09-03",
  },
  {
    id: "5",
    title: "Library Book Return",
    message: "Please return the library books by the end of the week to avoid late fees.",
    date: "2024-09-02",
  },
  // Add more school-related notifications as needed
];
export default function Notification() {
  // Function to handle button press, if needed
  const onPressHandler = () => {
    // Handle button press action herenotification
    console.log("Button Pressed");
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.header}>{item.title}</Text>
      <Text>{item.message}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData} // Pass in the notifications data
        renderItem={renderItem} // Use the renderItem function to render each item
        keyExtractor={(item) => item.id} // Unique key for each item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  notificationContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});
