import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFetchData } from "@/Fetch/useFetchStudents";
import { useApiPostRequest } from "@/Request/useApiPostRequest";

export default function Calendar() {
  const { data: fetchedData, error: fetchError, loading: fetchLoading } = useFetchData("calendars/all");
  const { data: postData, loading: postLoading, error: postError, postRequest } = useApiPostRequest({
    url: "calendars"
  });
  
  const [eventData, setEventData] = useState<{ [key: string]: any[] }>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    height: 50,
    day: "",
    endDay: "",
  });

  useEffect(() => {
    if (fetchedData) {
      const formattedData = preprocessEvents(fetchedData);
      setEventData(formattedData);
    }
  }, [fetchedData]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setShowModal(true);
  };

  const handleDateConfirm = (date: Date) => {
    // Ensure end day is not before the start day
    if (selectedDate && moment(date).isBefore(moment(selectedDate))) {
      alert("End date cannot be before the start date.");
      return;
    }

    setShowDatePicker(false);
    setNewEvent((prev) => ({
      ...prev,
      endDay: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const handleAddEvent = () => {
    // Validate form fields
    if (!newEvent.name || !selectedDate || !newEvent.endDay) {
      alert("Please fill out all fields before adding an event.");
      return;
    }

    // Add new event to eventData
    const updatedEventData = { ...eventData };
    if (!updatedEventData[selectedDate]) {
      updatedEventData[selectedDate] = [];
    }

    updatedEventData[selectedDate].push({
      id: Date.now().toString(),
      ...newEvent,
      day: selectedDate,
    });

    setEventData(updatedEventData);
    setShowModal(false);
    setNewEvent({ name: "", height: 50, day: "", endDay: "" });

    // Call postRequest to submit the event
    const data = {
      name: newEvent.name,
      height: 50,
      day: selectedDate,
      endDay: newEvent.endDay,
    };

    postRequest(data);

  };

  const renderItem = (item: any) => (
    <View style={styles.item}>
      <Text style={styles.itemtext} >{item.name}</Text>
    </View>
  );

  if (fetchLoading || postLoading) return <Text>Loading...</Text>;
  if (fetchError || postError) return <Text>Error loading events</Text>;

  return (
    <View style={styles.container}>
      <Agenda
        items={eventData}
        renderItem={renderItem}
        onDayPress={handleDayPress}
        theme={{
          agendaDayTextColor: "black",
          agendaDayNumColor: "gray",
          agendaTodayColor: "red",
          agendaKnobColor: "#6de3d8",
        }}
      
      />

      {/* Modal for Adding Event */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={newEvent.name}
              onChangeText={(text) => setNewEvent((prev) => ({ ...prev, name: text }))}
            />
            <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
              <View style={styles.datePickerContainer}>
                <Text>{newEvent.endDay || "Select End Date"}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Button
              title={postLoading ? "Adding Event..." : "Add Event"}
              onPress={handleAddEvent}
              disabled={postLoading}
            />
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
}

// Preprocess the event data to expand events over the range of dates
const preprocessEvents = (events: any[]) => {
  const processedEvents: { [key: string]: any[] } = {};

  events.forEach((event: any) => {
    const { day, endDay } = event;

    if (!day || !endDay) return;

    const startDate = moment(day, "YYYY-MM-DD");
    const endDate = moment(endDay, "YYYY-MM-DD");

    let currentDate = startDate;
    while (currentDate.isSameOrBefore(endDate)) {
      const formattedDate = currentDate.format("YYYY-MM-DD");

      if (!processedEvents[formattedDate]) {
        processedEvents[formattedDate] = [];
      }

      processedEvents[formattedDate].push({
        ...event,
        day: formattedDate,
      });

      currentDate = currentDate.add(1, "days");
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
    backgroundColor: "#4a90e2",
    padding: 20,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 17,
   // color: "white",
  },
  itemtext:{
    color: "white",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,  
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 40,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  dayText: {
    fontSize: 16,
  },
  today: {
    color: "red",
  },
});
