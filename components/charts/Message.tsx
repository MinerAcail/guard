    import React, { useState, useEffect } from "react";
    import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Pressable,
    Alert,
    } from "react-native";

    import { useWindowDimensions } from "react-native";
    import { Ionicons } from "@expo/vector-icons";
    import { useActionSheet } from "@expo/react-native-action-sheet";



    const blue = "#3777f0";
    const grey = "lightgrey";

    const Message = (props) => {
    const { setAsMessageReply, message: propMessage } = props;

    const [message, setMessage] = useState<MessageModel>(propMessage);
    const [decryptedContent, setDecryptedContent] = useState("");
    const [repliedTo, setRepliedTo] = useState<MessageModel | undefined>(
        undefined
    );
    const [user, setUser] = useState<User | undefined>();
    const [isMe, setIsMe] = useState<boolean | null>(null);
    const [soundURI, setSoundURI] = useState<any>(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const { width } = useWindowDimensions();
    const { showActionSheetWithOptions } = useActionSheet();


    useEffect(() => {
        setMessage(propMessage);
    }, [propMessage]);


    useEffect(() => {
        setAsRead();
    }, [isMe, message]);

    useEffect(() => {
        if (message.audio) {
        
        }
    }, [message]);

    useEffect(() => {
        const checkIfMe = async () => {
        if (!user) {
            return;
        }
        
        
        };
        checkIfMe();
    }, [user]);

    useEffect(() => {
        if (!message?.content || !user?.publicKey) {
        return;
        }

    
    }, [message, user]);

    const setAsRead = async () => {
        
    };

    const deleteMessage = async () => {
        await DataStore.delete(message);
    };

    const confirmDelete = () => {
        Alert.alert(
        "Confirm delete",
        "Are you sure you want to delete the message?",
        [
            {
            text: "Delete",
            onPress: deleteMessage,
            style: "destructive",
            },
            {
            text: "Cancel",
            },
        ]
        );
    };

    const onActionPress = (index) => {
        if (index === 0) {
        setAsMessageReply();
        } else if (index === 1) {
        if (isMe) {
            confirmDelete();
        } else {
            Alert.alert("Can't perform action", "This is not your message");
        }
        }
    };

    const openActionMenu = () => {
        const options = ["Reply", "Delete", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
        {
            options,
            destructiveButtonIndex,
            cancelButtonIndex,
        },
        onActionPress
        );
    };

    if (!user) {
        return <ActivityIndicator />;
    }

    return (
        <Pressable
        onLongPress={openActionMenu}
        style={[
            styles.container,
            isMe ? styles.rightContainer : styles.leftContainer,
            { width: soundURI ? "75%" : "auto" },
        ]}
        >
        {repliedTo && <MessageReply message={repliedTo} />}
        <View style={styles.row}>
            
        
            {!!decryptedContent && (
            <Text style={{ color: isMe ? "black" : "white" }}>
                {isDeleted ? "message deleted" : decryptedContent}
            </Text>
            )}

            {isMe && !!message.status && message.status !== "SENT" && (
            <Ionicons
                name={
                message.status === "DELIVERED" ? "checkmark" : "checkmark-done"
                }
                size={16}
                color="gray"
                style={{ marginHorizontal: 5 }}
            />
            )}
        </View>
        </Pressable>
    );
    };

    const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: "75%",
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    messageReply: {
        backgroundColor: "gray",
        padding: 5,
        borderRadius: 5,
    },
    leftContainer: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor: grey,
        marginLeft: "auto",
        marginRight: 10,
        alignItems: "flex-end",
    },
    });

    export default Message;