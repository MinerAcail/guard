import { ChatRoomItem } from "@/components/charts";
import { mockChatRooms } from "@/components/data/chartData";
import { FlatList, StyleSheet, Text, View } from "react-native";
// import { ChatRoomItem } from "./communication";
//desplay the parents here then use the id to send the message
// Usage Example with Mock Data
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useParents } from "./useParents";
import { useMessages } from "./useMessages";
import { useAuth } from "@/context/middleware/authContext";


export default function Communication() {
  const { isAuthenticated, user, logout } = useAuth();
  const type = user?.position;
  const isParent = type === "parent"; // Renamed for clarity
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedParents, setSelectedParents] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const { parents, loading: parentsLoading } = useParents();
  console.log("parentsreftgregre",parents);	
  
  const { sendMultipleMessages, loading: messagesLoading } = useMessages();

  const handleSendPress = async () => {
    if (message.trim() && selectedParents.size > 0) {
      try {
        await sendMultipleMessages(message, Array.from(selectedParents));
        setMessage("");
        setSelectedParents(new Set());
        setSelectAll(false);
        setIsInputVisible(false);
      } catch (error) {
        console.error("Failed to send messages:", error);
      }
    }
  };

  const handleParentSelect = (parentId: string) => {
    setSelectedParents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(parentId)) {
        newSet.delete(parentId);
      } else {
        newSet.add(parentId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedParents(new Set());
    } else {
      setSelectedParents(new Set(parents.map((p) => p.id)));
    }
    setSelectAll(!selectAll);
  };

  if (parentsLoading || messagesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      {!isParent && (
        <View style={styles.header}>
          {isInputVisible ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message"
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!message.trim() || selectedParents.size === 0) &&
                    styles.sendButtonDisabled,
                ]}
                onPress={handleSendPress}
                disabled={!message.trim() || selectedParents.size === 0}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.selectContainer}>
              <TouchableOpacity
                onPress={handleSelectAll}
                style={styles.selectAllButton}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={selectAll}
                  onValueChange={handleSelectAll}
                />
                <Text style={styles.selectAllText}>
                  {selectAll ? "Deselect All" : "Select All"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.composeButton,
                  selectedParents.size === 0 && styles.composeButtonDisabled,
                ]}
                onPress={() => setIsInputVisible(true)}
                disabled={selectedParents.size === 0}
              >
                <Text style={styles.composeButtonText}>
                  Compose ({selectedParents.size})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <FlatList
        data={parents}
        renderItem={({ item: parent }) => (
          <View style={styles.chatRoomItem}>
            <Checkbox
              style={styles.checkbox}
              value={selectedParents.has(parent.id)}
              onValueChange={() => handleParentSelect(parent.id)}
            />
            <View style={styles.chatRoomItemContent}>
              <ChatRoomItem parent={parent} />
            </View>
          </View>
        )}
        keyExtractor={(parent) => parent.id}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#B0BEC5",
  },
  composeButtonDisabled:{
    backgroundColor: "#B0BEC5",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  selectAllText: {
    fontSize: 16,
    color: "#424242",
  },
  composeButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 8,
  },
  composeButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  chatRoomItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  chatRoomItemContent: {
    flex: 1,
    marginLeft: 10,
  },
  listContent: {
    padding: 10,
  },
});


