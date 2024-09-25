import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavBox } from "@/components/data/navdata";
import TouchButton from "@/components/touchButton";
import { useAuth } from "@/context/middleware/authContext";

function Home() {
  const { isAuthenticated, user, logout } = useAuth();
const type = user?.position
console.log("type",user );

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
          {NavBox.map((item, index) => {
            // Skip items that don't match the user's position
            if (item.type && !item.type.includes(type)) {
              return null;
            }
            if (item.title === "Announcement" && type =="parent") {
              return (
                <TouchButton href={"/communication/viewChart"} key={index} style={styles.navBox}>
                  <FontAwesome5
                    size={30}
                    name={item.icon}
                    style={styles.icons}
                    color="black"
                  />
                  <Text style={styles.navTitle}>Announcement</Text>
                </TouchButton>
              );
            }
            // Skip "Sign Out" if the user is not authenticated
            if (item.title === "Sign Out" && !isAuthenticated) {
              return null;
            }

            // Skip "Sign In" if the user is already authenticated
            if (item.title === "Sign In" && isAuthenticated) {
              return null;
            }
           

            // Render "Sign Out" with the logout function
            if (item.title === "Sign Out") {
              return (
                <TouchButton
                  key={index}
                  style={styles.navBox}
                  onPress={logout} // Call the logout function when pressed
                >
                  <FontAwesome5
                    size={30}
                    name={item.icon}
                    style={styles.icons}
                    color="black"
                  />
                  <Text style={styles.navTitle}>{item.title}</Text>
                </TouchButton>
              );
            }

            // Render other navigation items
            return (
              <TouchButton href={item.screen} key={index} style={styles.navBox}>
                <FontAwesome5
                  size={30}
                  name={item.icon}
                  style={styles.icons}
                  color="black"
                />
                <Text style={styles.navTitle}>{item.title}</Text>
              </TouchButton>
            );
          })}
        </View>
      </View>
    </View>
  );
}
  export const styles = StyleSheet.create({
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
