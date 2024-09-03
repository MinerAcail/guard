import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import TouchButton from "@/components/touchButton";
import { FontAwesome } from "@expo/vector-icons";
import useToggleMenu from "@/hooks/useToggleMenu";
import Animated from "react-native-reanimated";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SideMenu from "@/components/sideMenu";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { toggleMenu, menuAnimation,menuVisible } = useToggleMenu();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Optionally, return a loading indicator or nothing while fonts are loading
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
     
      <SideMenu menuVisible={menuVisible} toggleMenu={toggleMenu}/>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitleStyle: {
              fontFamily: "SpaceMono",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchButton
                href={"/"}
                onPress={() => {
                  console.log("Toggle Menu button pressed");
                  toggleMenu();
                }}
              >
                <FontAwesome name="bars" size={24} color="black" />
              </TouchButton>
            ),
            headerRight: () => (
              <TouchButton href="/map/map">
                <FontAwesome name="bell" size={24} color="black" />
              </TouchButton>
            ),
            title: "Home",
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen  name="map/map" options={{
          presentation:"modal",
          title:"Map",
          headerStyle:{
            backgroundColor:"#f9f871"
          }
        }} />
      </Stack>
    </ThemeProvider>
  );
}

