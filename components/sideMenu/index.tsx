import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  BackHandler,
} from "react-native";
import Animated from "react-native-reanimated";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavBox } from "../data/navdata"; // Adjust import as needed
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useAuth } from "@/context/middleware/authContext";

// Define props for SideMenu
interface SideMenuProps {
  menuVisible: boolean;
  toggleMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuVisible, toggleMenu }) => {
  const navigation = useNavigation();
  const { isAuthenticated, user, logout } = useAuth();
  useEffect(() => {
    const handleBackPress = () => {
      if (menuVisible) {
        toggleMenu();
        return true; // Prevent the default back action
      }
      return false; // Allow default back action
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [menuVisible, toggleMenu]);

  if (!menuVisible) return null;

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
    toggleMenu();
  };

  const handleGestureEvent = () => {
    toggleMenu();
  };

  return (
    <GestureHandlerRootView style={styles.overlay}>
      <PanGestureHandler onEnded={handleGestureEvent}>
        <Animated.View style={styles.sideMenu}>
          <View style={styles.menuHeader}>
            <TouchableOpacity onPress={toggleMenu}>
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={NavBox}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => {
              if (item.type && !item.type.includes(user?.position)) {
                return null;
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
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={logout} // Call the logout function when pressed
                  >
                    <FontAwesome5
                      name={item.icon as any}
                      size={24}
                      color="black"
                    />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.screen)}
                >
                  <FontAwesome5
                    name={item.icon as any}
                    size={24}
                    color="black"
                  />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    zIndex: 1,
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default SideMenu;
