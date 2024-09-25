import { useFetchData } from "@/Fetch/useFetchStudents";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Type definitions for the fetched student and location data
export interface StudentType {
  id: string;
  firstName: string;
  lastName: string;
}

export interface LocationType {
  id: string;
  student_id: string;
  confirmed: boolean;
  student: StudentType | null;
}

export interface StaffLocationType {
  id: string;
  student_id: string;
  confirmed: boolean;
}

// Type definition for the formatted data
export interface FormattedLocationType {
  id: string;
  name: string;
  parentStatus: "Arrived" | "Not Arrived";
  staffStatus: "Arrived" | "Not Arrived";
}

// Function to map locations to students
const mapLocationsToStudents = (locations: LocationType[], students: StudentType[]): LocationType[] => {
  const studentMap = students.reduce<Record<string, StudentType>>((acc, student) => {
    acc[student.id] = student;
    return acc;
  }, {});

  return locations.map((location) => ({
    ...location,
    student: studentMap[location.student_id] || null,
  }));
};

// Function to map staff locations to students
const mapStaffLocationsToStudents = (staffLocations: StaffLocationType[], students: StudentType[]): Record<string, boolean> => {
  const staffMap: Record<string, boolean> = {};
  staffLocations.forEach((location) => {
    staffMap[location.student_id] = location.confirmed;
  });
  return staffMap;
};

export default function StudentTable() {
  const { data: students = [], error: studentsError, loading: studentsLoading } = useFetchData("students/all");
  const { data: locations = [], error: locationsError, loading: locationsLoading } = useFetchData("locationbyday/all");
  const { data: staffLocations = [], error: staffError, loading: staffLoading } = useFetchData("stafflocationbyday/all");

  const locationsWithStudents = mapLocationsToStudents(locations, students);
  const staffLocationMap = mapStaffLocationsToStudents(staffLocations, students);

  // Prepare a map of students that are in regular locations for quick lookup
  const locationStudentIds = new Set(locationsWithStudents.map(location => location.student_id));

  // Combine both locations and staff data
  const formattedLocations: FormattedLocationType[] = students.map((student) => {
    const location = locationsWithStudents.find(loc => loc.student_id === student.id);

    return {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      parentStatus: location ? (location.confirmed ? "Arrived" : "Not Arrived") : "Not Arrived",
      staffStatus: staffLocationMap[student.id] ? "Arrived" : "Not Arrived",
    };
  });

  if (studentsLoading || locationsLoading || staffLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (studentsError || locationsError || staffError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: FormattedLocationType }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={[styles.cell, item.parentStatus === "Arrived" ? styles.arrived : styles.notArrived]}>
        {item.parentStatus}
      </Text>
      <Text style={[styles.cell, item.staffStatus === "Arrived" ? styles.arrived : styles.notArrived]}>
        {item.staffStatus}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Student Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Parent Status</Text>
        <Text style={[styles.cell, styles.headerText]}>Staff Status</Text>
      </View>
      <FlatList
        data={formattedLocations}
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
    fontSize: 14,
    color: "#333",
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
  },
  arrived: {
    color: "green",
    fontWeight: "bold",
  },
  notArrived: {
    color: "red",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
});
