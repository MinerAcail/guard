import { useApi } from "@/context/ApiContext";
import { useEffect, useState } from "react";

// Types
interface Message {
    id: string;
    content: string;
    sender_id: string;
    receiver_id: string;
    created_at: string;
    status: 'read' | 'unread';
  }
  
  interface Parent {
    id: string;
    firstName: string;
    lastName: string;
  }
  
  interface UseApiPostRequestProps {
    url: string;
    initialData?: any;
  }
  
  // Custom hooks
  export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = useApi();
    const { postRequest: sendMessageRequest } = useMessageApiPostRequest({ url: 'messages' });
    const { postRequest: sendMultipleRequest } = useMessageApiPostRequest({ url: 'messages/multiple' });
  
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/messages/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };
  
    const sendMessage = async (content: string, receiverId: string) => {
      if (!content.trim() || !receiverId) {
        throw new Error('Invalid message data');
      }
  
      try {
        const messageData = {
          content: content.trim(),
          receiver_id: receiverId,
          status: 'unread'
        };
        const result = await sendMessageRequest(messageData);
        if (result) {
          setMessages(prev => [...prev, result]);
        }
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    };
  
    const sendMultipleMessages = async (content: string, receiverIds: string[]) => {
      if (!content.trim() || !receiverIds.length) {
        throw new Error('Invalid message data');
      }
  
      try {
        const messageData = {
          content: content.trim(),
          recipients: receiverIds,
        };
        const result = await sendMultipleRequest(messageData);
        if (result) {
          setMessages(prev => [...prev, ...result]);
        }
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send messages';
        setError(errorMessage);
        throw new Error(errorMessage);
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
      sendMultipleMessages,
      refreshMessages: fetchMessages
    };
  };
  
  export const useMessageApiPostRequest = ({ url, initialData }: UseApiPostRequestProps) => {
    const [data, setData] = useState<any>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = useApi();
  
    const postRequest = async (requestData: any) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`${apiUrl}/${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Request failed');
        }
  
        const result = await response.json();
        setData(result);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Request failed';
        console.error('API Error:', errorMessage);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, loading, error, postRequest };
  };
  