import MessageInput from '@/components/charts/MessageInput';
import { messageData } from '@/components/data/chartData';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define types for message and reply
interface Reply {
  id: string;
  content: string;
}

interface Message {
  id: string;
  content: string;
  replies: Reply[];
}

export interface MessageData {
  name: string;
  messages: Message[];
}

// Sample message data with type assertion


const ViewChart: React.FC = () => {
  // Function to render each reply
  const renderReply = ({ item }: { item: Reply }) => (
    <View style={styles.reply}>
      <Text>{item.content}
      
      </Text>
    </View>
  );

  // Function to render each message
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.message,
          item.replies.length ? styles.messageWithReplies : null,
          item.replies.length > 0 ? styles.messageWithReplies : null,
          { alignSelf: item.replies.length ? 'flex-start' : 'flex-end' }
        ]}
      >
        <Text>{item.content}</Text>
      </View>
      {item.replies.length > 0 && (
        <FlatList
          data={item.replies}
          renderItem={renderReply}
          keyExtractor={(reply) => reply.id}
          style={styles.replyList}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{messageData.name}</Text> */}
      <FlatList
        data={messageData.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />

      <MessageInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 15,
    // flexDirection: 'row',
    alignItems: 'flex-start',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageWithReplies: {
    marginBottom: 5,
  },
  reply: {
    backgroundColor: '#f0f0f0',
    padding: 10,
   
    borderRadius: 5,
    marginVertical: 2,
    marginHorizontal: 50,
    // paddingHorizontal:40
    
    // width:"auto",
    // height:100
  },
  replyList: {
    marginTop: 5,
  }
});

export default ViewChart;
