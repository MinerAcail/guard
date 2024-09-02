// SideMenu.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Pressable, BackHandler } from 'react-native';
import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavBox } from '../data/navdata'; // Adjust import as needed

// Define props for SideMenu
interface SideMenuProps {
  menuVisible: boolean;
  toggleMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuVisible, toggleMenu }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      if (menuVisible) {
        toggleMenu();
        return true; // Prevent the default back action
      }
      return false; // Allow default back action
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [menuVisible, toggleMenu]);

  if (!menuVisible) return null;

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
    toggleMenu();
  };

  return (
    <Pressable style={styles.overlay} onPress={toggleMenu}>
      <Animated.View style={styles.sideMenu}>
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={toggleMenu}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={NavBox}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => handleNavigation(item.screen)}
            >
              <FontAwesome name={item.icon as any} size={24} color="black" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    zIndex: 1,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 2,
    padding: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default SideMenu;
