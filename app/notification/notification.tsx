import NotificationItem from "@/components/notification/notification";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";


const notifications = [
  {
    id: "1",
    title: "New Message",
    message: "You have received a new message from John.",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    title: "New Arrived",
    message: "Kobbi arrived it at his Location.",
    timestamp: "5 minutes ago",
  },
  
];

const NotificationList = () => {
  const handleNotificationPress = (id: string) => {
    console.log("Notification pressed:", id);
    // Handle the notification press (e.g., navigate to a specific screen)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem notification={item} onPress={handleNotificationPress} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
});

export default NotificationList;
