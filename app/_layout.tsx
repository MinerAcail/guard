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
import { StyleSheet, Text } from "react-native";
import SideMenu from "@/components/sideMenu";
import { screens } from "@/components/data/navdata";

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
              <TouchButton href="/auth/signup">
                <FontAwesome name="bell" size={24} color="black" />
              </TouchButton>
            ),
            title: "Home",
          }}
        />
        <Stack.Screen name="+not-found" />
        
        {/* Dynamically render the Stack screens */}
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={commonHeaderOptions(screen.title)}
          />
        ))}
        
      </Stack>
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
});