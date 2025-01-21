// hooks/useMessages.ts
import { useApi } from "@/context/ApiContext";
import { useAuth } from "@/context/middleware/authContext";
import { useApiPostRequest } from "@/Request/useApiPostRequest";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = useApi();
  const { postRequest: sendMessageRequest } = useApiPostRequest({ url: 'messages' });
  const { postRequest: sendMultipleRequest } = useApiPostRequest({ url: 'messages/multiple' });
  const { isAuthenticated, user, logout } = useAuth();
  const userid = user?.id;
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/messages/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/messages/${userid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, receiverId: string) => {
    try {
      const messageData = {
        content,
        receiver_id: receiverId,
		SenderID: userid,

        status: 'unread'
      };
      const result = await sendMessageRequest(messageData);
      setMessages(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const sendMultipleMessages = async (content: string, receiverIds: string[]) => {
    try {
      const messageData = {
        content,
		SenderID: userid,

        recipients: receiverIds,
      };
      const result = await sendMultipleRequest(messageData);
      setMessages(prev => [...prev, ...result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    fetchUserMessages,
    sendMultipleMessages,
    refreshMessages: fetchMessages
  };
};