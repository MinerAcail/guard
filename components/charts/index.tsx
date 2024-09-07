import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { useRouter } from "expo-router";
// import { style } from "./style";



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
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>(chatRoom.lastMessage);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const navigation = useNavigation();

  const onPress = () => {
    console.log("Pressed Chat Room:", chatRoom.name);
    router.push("/communication/viewChart");

  };

  const time = moment(lastMessage?.createdAt).fromNow();

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }   

  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
        
      <Image
        source={{ uri: chatRoom.imageUri || user?.imageUri }}
        style={style.image}
      />
      <View style={style.badgeContainer}>
        <Text style={style.badgeText}>{chatRoom.newMessages}</Text>
      </View>
      <View style={style.rightContainer}>
        <View style={style.row}>
          <Text style={style.name}>{chatRoom.name || user?.name}</Text>
          <Text style={style.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={style.text}>
          {lastMessage?.content}        
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Usage Example with Mock Data



export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    backgroundColor: '#867fc1',
    
borderRadius:6
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: '#3777f0',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
    color: 'white',

  },
  text: {
    // color: 'grey',
    color: 'white',

  }
});