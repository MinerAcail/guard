import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const AudioPlayer = ({ soundURI }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  // Simulate loading sound and setting duration
  useEffect(() => {
    if (soundURI) {
      // Simulate loading sound
      setAudioDuration(300000); // 5 minutes in milliseconds
    }
  }, [soundURI]);

  // Simulate play/pause functionality
  const playPauseSound = () => {
    setIsPlaying((prev) => !prev);
  };

  // Simulate progress update
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress((prev) => (prev + 1000) % audioDuration);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getDuration = () => {
    const minutes = Math.floor(audioDuration / (60 * 1000));
    const seconds = Math.floor((audioDuration % (60 * 1000)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.sendAudioContainer}>
      <Pressable onPress={playPauseSound}>
        <Feather name={isPlaying ? "pause" : "play"} size={24} color="gray" />
      </Pressable>

      <View style={styles.audioProgressBG}>
        <View
          style={[styles.audioProgressFG, { width: `${(audioProgress / audioDuration) * 100}%` }]}
        />
      </View>

      <Text>{getDuration()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sendAudioContainer: {
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    backgroundColor: "white",
  },
  audioProgressBG: {
    height: 3,
    flex: 1,
    backgroundColor: "lightgray",
    borderRadius: 5,
    margin: 10,
  },
  audioProgressFG: {
    height: 3,
    backgroundColor: "#3777f0",
  },
});

export default AudioPlayer;
