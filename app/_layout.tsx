import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import TouchButton from "@/components/touchButton";
import { FontAwesome } from "@expo/vector-icons";
import useToggleMenu from "@/hooks/useToggleMenu";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SideMenu from "@/components/sideMenu";
import { screens } from "@/components/data/navdata";
import { ApiProvider } from "@/context/ApiContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { toggleMenu, menuAnimation, menuVisible } = useToggleMenu();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally, return a loading indicator or splash screen.
  }

  const commonHeaderOptions = (title: string) => ({
    title: "",
    headerStyle: commonStyles.headerStyle,
    headerTitleAlign: "left" as const,
    headerRight: () => (
      <Text style={commonStyles.headerRightText}>{title}</Text>
    ),
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ApiProvider>
        <SideMenu menuVisible={menuVisible} toggleMenu={toggleMenu} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitleStyle: { fontFamily: "SpaceMono" },
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchButton href={"/"} onPress={toggleMenu}>
                  <FontAwesome name="bars" size={24} color="black" />
                </TouchButton>
              ),
              headerRight: () => (
                <TouchButton style={commonStyles.headerRightButton} href={"/notification/notification"} >
                  <View style={commonStyles.badgeContainer}>
                    <Text style={commonStyles.badgeText}>3</Text>
                  </View>
                  <FontAwesome name="bell" size={24} color="black" />
                </TouchButton>
              ),
              title: "Home",
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="SwitchForm/teacher"
            options={{
              headerTitleStyle: { fontFamily: "SpaceMono" },
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchButton href="/auth/signup">
                  <FontAwesome name="address-card-o" size={24} color="black" />
                </TouchButton>
              ),
              title: "Teachers",
            }}
          />
          <Stack.Screen
            name="table/table"
            options={{
              headerTitleStyle: { fontFamily: "SpaceMono" },
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchButton href="/communication/chart">
                  <FontAwesome name="comments" size={24} color="black" />
                </TouchButton>
              ),
              title: "Student Arrival",
            }}
          />
          {/* Dynamically render the Stack screens */}
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={commonHeaderOptions(screen.title)}
            />
          ))}
        </Stack>
      </ApiProvider>
    </ThemeProvider>
  );
}

const commonStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#d9eef0",
  },
  headerRightText: {
    fontFamily: "SpaceMono",
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    paddingRight: 15,
  },
  headerRightButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "#ff3b30",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: -12,
    top: -10,
    zIndex:1
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});
