import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { useFetchData } from "@/Fetch/useFetchStudents";

export default function Calendar() {
  const { data, error, loading } = useFetchData("calendars/all");

  // Preprocess the event data to fit the calendar
  const eventData = preprocessEvents(data || []);

  const renderItem = (item: any) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  // Render loading or error states
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <View style={styles.container}>
      <Agenda
        items={eventData}
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

// Preprocess the event data to expand events over the range of dates
const preprocessEvents = (events: any[]) => {
  const processedEvents: { [key: string]: any[] } = {};

  events.forEach((event: any) => {
    const { day, endDay } = event;

    if (!day || !endDay) return; // Skip events with missing day or endDay

    // Parse the start and end days using moment
    const startDate = moment(day, "YYYY-MM-DD");
    const endDate = moment(endDay, "YYYY-MM-DD");

    // Loop through each date in the range using moment
    let currentDate = startDate;
    while (currentDate.isSameOrBefore(endDate)) {
      const formattedDate = currentDate.format("YYYY-MM-DD");

      if (!processedEvents[formattedDate]) {
        processedEvents[formattedDate] = [];
      }

      processedEvents[formattedDate].push({
        ...event,
        day: formattedDate, // update the event's day to reflect the specific date
      });

      currentDate = currentDate.add(1, "days"); // Move to the next day
    }
  });

  return processedEvents;
};

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
  