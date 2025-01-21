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
  import { Picker } from "@react-native-picker/picker";
  import { Student, Staff ,Parent} from "./types"; // Adjust the import path as needed
  import { useApiPostRequest } from "@/Request/useApiPostRequest";
  import { AntDesign } from "@expo/vector-icons";
  import Loader from "@/components/Animation/rotateLoader";
  import moment from "moment";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import { styles } from "./style";
  import { useFetchData } from "@/Fetch/useFetchStudents";
  // import DateTimePicker from '@react-native-community/datetimepicker';
  // Define your options outside of the component to avoid recreating them on every render
  const grades = [
    { label: "Select grade", value: "" },
    { label: "1st", value: "1" },
    { label: "2nd", value: "2" },
    { label: "3rd", value: "3" },
    { label: "4th", value: "4" },
    { label: "5th", value: "5" },
    { label: "6th", value: "6" },
    { label: "7th", value: "7" },
    { label: "8th", value: "8" },
    { label: "9th", value: "9" },
    { label: "10th", value: "10" },
    { label: "11th", value: "11" },
    { label: "12th", value: "12" },
  ];

  const positions = [
    { label: "Select position", value: "" },
    { label: "Teacher", value: "teacher" },
    { label: "Admin", value: "admin" },
    { label: "Parent", value: "parent" },
    { label: "Transport", value: "transport" },
  ];

  interface InputFieldProps {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    secureTextEntry?: boolean;
  }

  const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  interface PickerFieldProps {
    label: string;
    selectedValue: string;
    onValueChange: (value: string) => void;
    items: { label: string; value: string }[];
  }

  const PickerField: React.FC<PickerFieldProps> = ({
    label,
    selectedValue,
    onValueChange,
    items,
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );

  export default function Signup() {
    const [position, setPosition] = useState<string>("");
    const [superviseGrade, setSuperviseGrade] = useState<string>("");
    const [studentid, setStudentid] = useState<string>("");
    const [isGradeSelected, setIsGradeSelected] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDateConfirm = (date: Date) => {
      setDateOfBirth(moment(date).format("MM/DD/YYYY")); // Format the date as needed
      handleInputChange("dateOfBirth", moment(date).format("MM/DD/YYYY"));
      setDatePickerVisibility(false);
    };
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      gender: "",
      grade: "",
      parentContact: "",
    });

    const { data, loading, error, postRequest } = useApiPostRequest({
      url: isGradeSelected ? "students" : position =="parent" ?"parents": "staffs",
    });
    const { data:studentsData} = useFetchData("students/all");


    const navigation = useRouter();

    const toggleSwitch = () => setIsGradeSelected((prev) => !prev);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

    const handleRegister = async () => {
      if (isSubmitting) return;
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        address,
        grade,
        parentContact,
      } = formData;
    
      // Validation for required fields
      if (
        !firstName ||
        !lastName ||
        !email || // Ensure the user has entered an email
        !phoneNumber ||
        !dateOfBirth ||
        !address ||
        (isGradeSelected && (!grade || !parentContact)) // Student-specific validation
      ) {
        alert("Please fill out all required fields");
        return;
      }
    
      if (isGradeSelected) {
        const studentData: Student = {
          ...formData,
          gender: formData.gender as "male" | "female" | undefined,
        };
    
        try {
          await postRequest(studentData);
          console.log("Student registered successfully:", data);
          alert("Student registration successful!");
          navigation.push("/");
        } catch (error) {
          alert("There was an error submitting the student form.");
        }
      }
    
      if (!isGradeSelected) {
        // Check if passwords match
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
    
        const staffData: Staff = {
          ...formData,
          position: position as "teacher" | "admin" | "maintenance",
          superviseGrade,
          password,
          gender: formData.gender as "male" | "female" | undefined,
        };
        setIsSubmitting(true);
        try {
          await postRequest(staffData);
          console.log("Staff registered successfully:", data);
          alert("Staff registration successful!");
          navigation.push("/");
        } catch (error) {
          alert("There was an error submitting the staff form.");
        }
      }
    
      if (position === "parent") {
        // Check if passwords match
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
    
        const parentData: Parent = {
          ...formData,
          position: position as "teacher",
          supervise: [studentid],
          password,
          gender: formData.gender as "male" | "female" | undefined,
        };
        console.log("parentData", parentData);
    
        try {
          await postRequest(parentData);
          console.log("Parent registered successfully:", data);
          alert("Parent registration successful!");
        } catch (error) {
          alert("There was an error submitting the parent form.");
        } finally {
          setIsSubmitting(false);
        }
      }
    };
    
    

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Please enter the required information before submitting.
            </Text>
          </View>
          <View style={styles.form}>
            {/* Common Fields */}
            <View style={styles.inputRow}>
              <InputField
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
              />
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) => handleInputChange("lastName", text)}
              />
            </View>
            <InputField
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              label="Email"
              placeholder="m@example.com"
              keyboardType="email-address"
            />
            <InputField
              label="Phone Number"
              placeholder="(123) 456-7890"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={styles.inputRow}
              >
                <Text style={styles.input}>
                  Date of Birth: {dateOfBirth || "MM/DD/YYYY"}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />

            <InputField
              label="Address"
              placeholder="123 Main St, Anytown USA"
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
            />

            <PickerField
              label="Gender"
              selectedValue={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            {/* Switch between Student and Staff */}
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Toggle between student and (Staff / Parent)</Text>
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
                <PickerField
                  label="Grade"
                  selectedValue={formData.grade}
                  onValueChange={(value) => handleInputChange("grade", value)}
                  items={grades}
                />
                <InputField
                  label="Parent/Guardian Contact"
                  placeholder="Parent/Guardian contact info"
                  value={formData.parentContact}
                  onChangeText={(text) =>
                    handleInputChange("parentContact", text)
                  }
                />
              </>
            ) : (
              <>
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <InputField
                  label="Confirm Password"
                  placeholder="Confirm password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <PickerField
                  label="Position/Role"
                  selectedValue={position}
                  onValueChange={setPosition}
                  items={positions}
                />
                {position == "parent" && (
                  <PickerField
                    label="Students / Child"
                    selectedValue={studentid}
                    onValueChange={setStudentid}
                  
                    items={studentsData.map((student) => ({
                      label: `${student.firstName} ${student.lastName}`,
                      value: student.id,
                    }))}
                  />
                )}
                {position !== "parent" && position !== "transport" && (
                  <PickerField
                    label="Supervise Which Grade"
                    selectedValue={superviseGrade}
                    onValueChange={setSuperviseGrade}
                    items={grades}
                  />
                )}
              </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              {loading ? (
                <Loader />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.push("/auth/signin")}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
