import React, { useState, useMemo } from "react";
import { View, TextInput, FlatList, StyleSheet, Text } from "react-native";

interface SearchableItem {
  firstName: string;
  lastName: string;
}

interface SearchableFlatListProps<ItemType extends SearchableItem> {
  data: ItemType[];
  renderItem: ({ item }: { item: ItemType }) => React.ReactElement;
  keyExtractor: (item: ItemType) => string;
  placeholder: string;
}

export function SearchableFlatList<ItemType extends SearchableItem>({
  data,
  renderItem,
  keyExtractor,
  placeholder,
}: SearchableFlatListProps<ItemType>) {
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize the filtered data to avoid recalculating on every render
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery]);

  return (
    <View>
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
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingBottom: 200, // Adjust this value as needed
  },
});
