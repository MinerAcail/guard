import { ChatRoomItem } from "@/components/charts";
import { mockChatRooms } from "@/components/data/chartData";
import { FlatList, StyleSheet, View } from "react-native";
// import { ChatRoomItem } from "./communication";

// Usage Example with Mock Data
export default function Communication() {
  return (
    <View style={styles.page}>
      <FlatList
        data={mockChatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
  
}


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d9eef0",
    flex: 1,
    paddingTop: 10,

  },
});