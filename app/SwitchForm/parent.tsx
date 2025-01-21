import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { SearchableFlatList } from "@/components/SearchableFlatList";
import { useFetchData } from "@/Fetch/useFetchStudents";
import { useAuth } from "@/context/middleware/authContext";
import { useApiPostRequest } from "@/Request/useApiPostRequest";
import { useApi } from "@/context/ApiContext";

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

interface ToggleLog {
  student_id: string;
  parent_id?: string;
  confirmed: boolean;
}


export default function ParentChild() {
  const { user } = useAuth();
  const apiUrl = useApi();
  
  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data: studentsData, loading: studentsLoading, error: studentsError } = useFetchData("students/all");

  // Post request function
  const postRequest = async (requestData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/addsupervise`, {
        method: "PUT", // Use PUT as the HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      setData(result);  
      return result;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = selectedStudents.map((studentId) => ({
        studentId,
      }));
      console.log('payload', payload);
      console.log('selectedStudents', selectedStudents);

      // Send the array of students to the backend
      await postRequest(payload);
      alert("Students successfully added to supervision!");
    } catch (err) {
      console.error("Error adding supervision:", err);
      alert("Failed to add students to supervision.");
    }
  };

  if (studentsLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (studentsError) {
    return <Text style={styles.errorText}>Error loading students: {studentsError.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Students to Supervise</Text>
      {studentsData?.map((student: { id: string; firstName: string; lastName: string }) => (
        <View key={student.id} style={styles.studentContainer}>
          <Text>{`${student.firstName} ${student.lastName}`}</Text>
          <Switch
            value={selectedStudents.includes(student.id)}
            onValueChange={() => handleCheckboxChange(student.id)}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Supervise" onPress={handleSubmit} />
      </View>
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
  buttonContainer: {
    marginTop: 20,
  },
});
