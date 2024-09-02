// SideMenu.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavBox } from '../data/navdata';
// import { NavBox } from '@/app';

// Define props for SideMenu
interface SideMenuProps {
  menuVisible: boolean;
  toggleMenu: () => void;
}



const SideMenu: React.FC<SideMenuProps> = ({ menuVisible, toggleMenu }) => {
  const navigation = useNavigation();

  if (!menuVisible) return null;

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
    toggleMenu();
  };
console.log(NavBox);

  return (
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
  );
};

const styles = StyleSheet.create({
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
    // paddingVertical: 10,
    padding: 10,
    margin: 10,
    // backgroundColor:"red"
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default SideMenu;
