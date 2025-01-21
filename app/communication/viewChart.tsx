import MessageInput from '@/components/charts/MessageInput';
import { messageData } from '@/components/data/chartData';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useMessages } from './useMessages';
import { useParents } from './useParents';
import { Parent } from '../auth/types';
import moment from 'moment';
import { useAuth } from '@/context/middleware/authContext';

// Define types for message and reply
interface Reply {
  id: string;
  content: string;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  replies: Reply[];
}

export interface MessageData {
  name: string;
  messages: Message[];
}




const ViewChart: React.FC = () => {
  const { parentId } = useLocalSearchParams();
  const { isAuthenticated, user, logout } = useAuth();
  const userid = user?.id;
  const isParent = user?.position === "parent";

  const { messages, sendMessage, loading: messagesLoading } = useMessages();
  const { parents, loading: parentsLoading } = useParents();
  const [currentParent, setCurrentParent] = useState<Parent | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
console.log("messages",messages);

  useEffect(() => {
    const targetId = isParent ? userid : parentId;
    if (messages && targetId) {
      const filteredMessages = messages
        .filter(
          msg => msg.sender_id === targetId || msg.receiver_id === targetId
        )
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setChatMessages(filteredMessages);
    }
  }, [messages, parentId, userid, isParent]);

  useEffect(() => {
    if (isParent) {
      const parent = parents.find(p => p.id === userid);
      setCurrentParent(parent || null);
    } else if (parentId) {
      const parent = parents.find(p => p.id === parentId);
      setCurrentParent(parent || null);
    }
  }, [parents, parentId, userid, isParent]);

  const handleSendMessage = async (content: string) => {
    
    const targetId = isParent ? userid : parentId;
    console.log("content",content,"targetId",targetId?.toString());
    if (!targetId || !content.trim()) {
      console.warn("Invalid message data");
      return;
    }
    try {
      await sendMessage(content.trim(), targetId.toString());
    } catch (error) {
      console.error("Failed to send message:", error);
      // Add a toast notification here if necessary
    }
  };

  if (messagesLoading || parentsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {currentParent && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {`${currentParent.firstName} ${currentParent.lastName}`}
          </Text>
        </View>
      )}

      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender_id === (isParent ? userid : parentId)
                ? styles.sentMessageContainer
                : styles.receivedMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                item.sender_id === (isParent ? userid : parentId)
                  ? styles.sentBubble
                  : styles.receivedBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender_id === (isParent ? userid : parentId)
                    ? styles.sentMessageText
                    : styles.receivedMessageText,
                ]}
              >
                {item.content}
              </Text>
              <Text style={styles.timeText}>
                {moment(item.created_at).format("HH:mm")}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />

      <MessageInput
        onSend={handleSendMessage}
        disabled={messagesLoading}
      />
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  receivedMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
  },
  sentBubble: {
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentMessageText: {
    color: '#000000',
  },
  receivedMessageText: {
    color: '#333333',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  messagesList: {
    padding: 15,
  },

  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
});




export default ViewChart;
