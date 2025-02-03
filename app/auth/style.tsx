import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    disabledInput: {
      backgroundColor: '#f0f0f0',
      opacity: 0.8,
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
      fontSize: 19,
      //fontWeight: "bold",
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
    rotatingIcon: {
      transform: [{ rotate: "360deg" }],
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      width: 24, // Adjust the width and height as needed
      height: 24,
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