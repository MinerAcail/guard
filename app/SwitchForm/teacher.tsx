import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { SearchableFlatList } from "@/components/SearchableFlatList";
import { useFetchData } from "@/Fetch/useFetchStudents";
import { useAuth } from "@/context/middleware/authContext";
import { useApiPostRequest } from "@/Request/useApiPostRequest";

// Zod schema
const FormSchema = z.object({
  confirmed: z.boolean().optional(),
});

// Define types
interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

interface Location {
  student_id: string;
}

interface ToggleLog {
  student_id: string;
  staff_id?: string;
  confirmed: boolean;
}

export default function Teacher() {
  const { user } = useAuth();
  const { postRequest } = useApiPostRequest({ url: "locationbystaff" });
  const [toggleLog, setToggleLog] = useState<ToggleLog[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>(
    {}
  ); // Local state for switches


  // Fetching student data and location data
  const { data: studentData, error: studentError, loading: studentLoading } = useFetchData("students/all");
  const { data: locationData, error: locationError, loading: locationLoading } = useFetchData(`stafflocationbyday/all`);

  const { control } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmed: true,
    },
  });

  // Set initial switch states based on fetched location data
  useEffect(() => {
    if (locationData) {
      const initialStates = locationData.reduce((acc, location) => {
        acc[location.student_id] = true; // Set to true if a location entry exists
        return acc;
      }, {});
      setSwitchStates(initialStates);
    }
  }, [locationData]);

  // Function to handle toggling and posting the confirmation state
  const handleToggleChange = async (studentId: string, confirmed: boolean) => {
    const toggleInfo: ToggleLog = {
      student_id: studentId,
      staff_id: user?.id,
      confirmed,
    };

    try {
      // Send the toggle state to the backend
      await postRequest(toggleInfo);

      // Update the local state with the toggle action
      setSwitchStates((prev) => ({
        ...prev,
        [studentId]: confirmed, // Update the switch state immediately
      }));

      // Log the toggle state
      setToggleLog((prev) => {
        const existing = prev.find((log) => log.student_id === studentId);
        if (existing) {
          return prev.map((log) =>
            log.student_id === studentId ? toggleInfo : log
          );
        }
        return [...prev, toggleInfo];
      });
    } catch (err) {
      console.error("Error submitting toggle info:", err);
    }
  };

  // Render item for the student list
  const renderItem = useCallback(
    ({ item }: { item: Student }) => {
      const isConfirmed = switchStates[item.id] || false; // Use local state for switch

      return (
        <View style={styles.studentContainer}>
          <Text style={styles.header}>{`${item.firstName} ${item.lastName}`}</Text>
          <Controller
            control={control}
            name={`student_${item.id}`} // Dynamic switch name
            render={({ field: { onChange } }) => (
              <View style={styles.switchContainer}>
                <Text>{`${item.firstName} Confirmed Location`}</Text>
                <Switch
                  value={isConfirmed} // Current value of the switch based on local state
                  onValueChange={(newValue) => {
                    onChange(newValue); // Update the form control value
                    handleToggleChange(item.id, newValue); // Handle toggle change and submit data
                  }}
                />
              </View>
            )}
          />
        </View>
      );
    },
    [control, switchStates]
  );

  // Handle loading state
  if (studentLoading || locationLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Handle error state
  if (studentError || locationError) {
    return (
      <Text style={styles.errorText}>
        Error loading data: {studentError?.message || locationError?.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <SearchableFlatList
        data={studentData || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        placeholder="Search by student name"
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  studentContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
