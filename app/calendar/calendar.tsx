import items from "@/components/data/event.json";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";

export default function Calendar() {
  const renderItem = (item: any) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: "black",
          agendaDayNumColor: "gray",
          agendaTodayColor: "red",
          agendaKnobColor: "#6de3d8",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6de3d8",
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 17,
  },
});

// export default Calendar;
