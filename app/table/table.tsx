import { studentsData } from "@/components/data/mapData";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export interface StudentTableType {
  id: string;
  name: string;
  status: "Arrived" | "Not Arrived";
}



export default function StudentTable() {
  const renderItem = ({ item }: { item: StudentTableType }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={[styles.cell, styles.statusCell(item.status)]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Student Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Status</Text>
      </View>
      {/* Table Body */}
      <FlatList
        data={studentsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
  },
  statusCell: (status: "Arrived" | "Not Arrived") => ({
    color: status === "Arrived" ? "green" : "red",
    fontWeight: "bold",
  }),
});
