// SearchableFlatList.tsx
import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, Text } from "react-native";

interface SearchableFlatListProps<ItemType> {
  data: ItemType[];
  renderItem: ({ item }: { item: ItemType }) => React.ReactElement;
  keyExtractor: (item: ItemType) => string;
  placeholder: string;
}

export function SearchableFlatList<ItemType>({
  data,
  renderItem,
  keyExtractor,
  placeholder,
}: SearchableFlatListProps<ItemType>) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View >
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
