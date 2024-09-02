import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,

} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavBox } from "@/components/data/navdata";




const descriptions = [
  "Academic Calendar",
  "Announcement",
  "Direct Communication",
];

function Home() {
 


  return (
    <View style={styles.container}>
     

      {/* Main Content */}
      <View style={styles.menuContainer}>
        <View style={styles.menuWrapper}>
          {/* Central Rounded Circle */}
          <View style={styles.centralCircle}>
            <View style={styles.innerCircle} />
          </View>

          {/* Navigation Boxes */}
          {NavBox.map((item, index) => (
            <TouchableOpacity key={index} style={styles.navBox}>
              <FontAwesome
                name={item.icon}
                style={styles.icons}
                size={30}
                color="black"
              />
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
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#fff",
    elevation: 5,
    zIndex: 2,
    padding: 20,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sideMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  sideMenuTitle: {
    marginLeft: 10,
    fontSize: 18,
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
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navTitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
  icons: {
    textAlign: "center",
  },
  descriptionSection: {
    marginBottom: 20,
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
