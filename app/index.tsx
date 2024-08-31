import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const navBox = [
  {
    title: "Home",
    icon: "home",
    screen: "HomeScreen",
  },
  {
    title: "Parent",
    icon: "comments",
    screen: "MessagesScreen",
  },
  {
    title: "Profile",
    icon: "user",
    screen: "ProfileScreen",
  },
  {
    title: "Settings",
    icon: "cog",
    screen: "SettingsScreen",
  },
];

const descriptions = ["Academic Calendar", "Announcement", "Direct Communication"];

function Home() {
  return (
    <View style={styles.container}>
      {/* Header Icons */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu Boxes with Central Rounded Circle */}
      <View style={styles.menuContainer}>
        <View style={styles.menuWrapper}>
          {/* Central Rounded Circle */}
          <View style={styles.centralCircle}>
            <View style={styles.innerCircle} />
          </View>

          {/* Navigation Boxes */}
          {navBox.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navBox}
            >
              <FontAwesome name={item.icon} style={styles.icons} size={30} color="black" />
              <Text style={styles.navTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description Sections */}
      <View style={styles.descriptionSection}>
        {descriptions.map((item, index) => (
          <View key={index} style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{item}</Text>
            
            <View style={styles.descriptionLine} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6de3d8",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  centralCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6de3d8",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "31%",
    zIndex: 1,
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  navBox: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "white",
    margin: 10,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navTitle: {
    marginTop: 8, // Adjusted margin
    fontSize: 16,
    textAlign: "center", // Center text
  },
  icons: {
   
    textAlign: "center", // Center text
  },
  descriptionSection: {
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  descriptionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  descriptionLine: {
    height: 2,
    backgroundColor: "black",
    width: "60%",
    alignSelf: "center",
    marginTop: 5,
  },
});

export default Home;
