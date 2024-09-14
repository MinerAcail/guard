import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Adjust the import path as needed

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1D4ED8', // Example background color
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10, // Adjust spacing between text and icon
  },
  rotatingIcon: {
    width: 24, // Adjust the width and height as needed
    height: 24,
  },
});

export default function Loader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    rotate.start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotatingStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <Animated.View style={[styles.rotatingIcon, rotatingStyle]}>
    <AntDesign name="loading2" size={24} color="#fff" />
  </Animated.View>
  );
}
