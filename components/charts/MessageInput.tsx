import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  SimpleLineIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}
const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          Alert.alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onPress = () => {
   if (message) {
      sendMessage();
    } else {
      console.warn("On plus clicked");
    }
  };

  const resetFields = () => {
    setMessage("");
    setIsEmojiPickerOpen(false);
    setProgress(0);
  };








  const sendMessage = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
    // Here you would send the text message
    console.log("Message sent", message);

    resetFields();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
   
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() =>
              setIsEmojiPickerOpen((currentValue) => !currentValue)
            }
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Signal message..."
          />

         

        </View>

        <Pressable
         disabled={!message.trim() || disabled}
        onPress={onPress} style={styles.buttonContainer}>
          {message ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) =>
            setMessage((currentMessage) => currentMessage + emoji)
          }
          columns={8}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#3777f0",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 5,
  },
  sendImageContainer: {
    position: "relative", 
    marginBottom: 10,
  },
  imageDescription: {
    marginTop: 5,
    color: "#595959",
    fontSize: 12,
  },
});

export default MessageInput;
