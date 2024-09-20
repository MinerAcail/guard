import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { useRouter } from "expo-router";

interface Message {
  id: string;
  content: string;
  createdAt: string;
}

interface ChatRoom {
  id: string;
  name: string;
  imageUri: string;
  lastMessage: Message;
  newMessages: number;
}

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
}

export function ChatRoomItem({ chatRoom }: ChatRoomItemProps) {
  const [lastMessage] = useState<Message | undefined>(chatRoom.lastMessage);
  const router = useRouter();

  const onPress = () => {
    router.push("/communication/viewChart");
  };

  const time = moment(lastMessage?.createdAt).fromNow();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: chatRoom.imageUri }} style={styles.image} />
      
      {/* Badge for New Messages */}
      {chatRoom.newMessages > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{chatRoom.name}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.messageText}>
          {lastMessage?.content || "No messages yet."}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#41aded",
    borderRadius: 15,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: "#ff3b30",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 45,
    top: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  timeText: {
    fontSize: 12,
    color: "#f0f0f0",
  },
  messageText: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 3,
  },
});
