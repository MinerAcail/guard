import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Picker

const grades = [
  { label: 'Select grade', value: '' },
  { label: '1st', value: '1' },
  { label: '2nd', value: '2' },
  { label: '3rd', value: '3' },
  { label: '4th', value: '4' },
  { label: '5th', value: '5' },
  { label: '6th', value: '6' },
  { label: '7th', value: '7' },
  { label: '8th', value: '8' },
  { label: '9th', value: '9' },
  { label: '10th', value: '10' },
  { label: '11th', value: '11' },
  { label: '12th', value: '12' }
];

const positions = [
  { label: 'Select position', value: '' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Admin', value: 'admin' },
  { label: 'Maintenance', value: 'maintenance' },
];

export default function Signup() {
  const [grade, setGrade] = useState("");
  const [stuff, setStuff] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [position, setPosition] = useState("");
  const [superviseGrade, setSuperviseGrade] = useState("");
  const [isGradeSelected, setIsGradeSelected] = useState(true); // Toggle state for switch
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useRouter();

  const toggleSwitch = () => setIsGradeSelected(previousState => !previousState);
// Simple validation example
const handleRegister = () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  // Proceed with registration logic
  console.log("Registered successfully");
};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>School Registration</Text>
          <Text style={styles.subtitle}>
            Enter your information to register for school.
          </Text>
        </View>
        <View style={styles.form}>
          {/* Common Fields */}
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput style={styles.input} placeholder="John" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput style={styles.input} placeholder="Doe" />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="m@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="(123) 456-7890"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="123 Main St, Anytown USA"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <Picker
              style={styles.picker}
              selectedValue=""
              onValueChange={(itemValue) => console.log(itemValue)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            
            </Picker>
          </View>

          {/* Switch between Student and Staff */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Toggle between student and Staff</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#1D4ED8" }}
              thumbColor={isGradeSelected ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isGradeSelected}
            />
          </View>

          {/* Conditionally render Student-specific Fields */}
          {isGradeSelected ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Grade</Text>
                <Picker
                  selectedValue={grade}
                  onValueChange={(itemValue) => setGrade(itemValue)}
                  style={styles.picker}
                >
                  {grades.map((gradeOption) => (
                    <Picker.Item
                      key={gradeOption.value}
                      label={gradeOption.label}
                      value={gradeOption.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Parent/Guardian Contact</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Parent/Guardian contact info"
                  value={parentContact}
                  onChangeText={setParentContact}
                />
              </View>
            </>
          ) : (
            <>
              {/* Conditionally render Staff-specific Fields */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={[styles.input, styles.inputConfirm]}
                  placeholder="Confirm password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Position/Role</Text>
                <Picker
                  selectedValue={position}
                  onValueChange={(itemValue) => setPosition(itemValue)}
                  style={styles.picker}
                >
                  {positions.map((positionOption) => (
                    <Picker.Item
                      key={positionOption.value}
                      label={positionOption.label}
                      value={positionOption.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Supervise Which Grade</Text>
                <Picker
                  selectedValue={superviseGrade}
                  onValueChange={(itemValue) => setSuperviseGrade(itemValue)}
                  style={styles.picker}
                >
                  {grades.map((gradeOption) => (
                    <Picker.Item
                      key={gradeOption.value}
                      label={gradeOption.label}
                      value={gradeOption.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Register pressed")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => navigation.push("/auth/signin")}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 15,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
  },
  form: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    marginBottom: 16,
    marginHorizontal: 4,
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputConfirm: {
    marginTop: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  link: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
});
