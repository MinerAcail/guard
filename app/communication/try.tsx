import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import moment, { Moment } from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Types
interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface ChatRoomItemProps {
  message: Message;
  currentUserId: string;
  onPress?: () => void;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onRefresh: () => void;
  refreshing: boolean;
}

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
}

// ChatRoomItem Component
export const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  message,
  currentUserId,
  onPress,
}) => {
  const isMyMessage = message.sender_id === currentUserId;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isMyMessage ? styles.myMessageText : styles.theirMessageText,
          ]}
        >
          {message.content}
        </Text>
        <Text style={styles.timeText}>
          {moment(message.created_at).format("HH:mm")}
        </Text>
      </View>
    </Pressable>
  );
};

// MessageList Component
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onRefresh,
  refreshing,
}) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRoomItem message={item} currentUserId={currentUserId} />
      )}
      inverted
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

// MessageInput Component
export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim()) {
      try {
        await onSendMessage(message.trim());
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
      />
      <Pressable
        onPress={handleSend}
        style={({ pressed }) => [
          styles.sendButton,
          pressed && styles.sendButtonPressed,
        ]}
      >
        <Icon name="send" size={24} color="#007AFF" />
      </Pressable>
    </View>
  );
};

// Chat Screen Component
interface ChatScreenProps {
  currentUserId: string;
  receiverId: string;
  messages: Message[];
  loading?: boolean;
  onSendMessage: (content: string) => Promise<void>;
  onRefresh: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  currentUserId,
  messages,
  loading = false,
  onSendMessage,
  onRefresh,
}) => {
  return (
    <View style={styles.screenContainer}>
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        onRefresh={onRefresh}
        refreshing={loading}
      />
      <MessageInput onSendMessage={onSendMessage} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  theirMessageText: {
    color: "#000000",
  },
  timeText: {
    fontSize: 12,
    color: "#8E8E93",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  sendButtonPressed: {
    opacity: 0.7,
  },
});
