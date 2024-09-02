import { useState } from 'react';
import { Animated } from 'react-native';

const useToggleMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useState(new Animated.Value(-250))[0]; // Start off-screen

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -250 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };
<Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuAnimation }] },
        ]}
      >
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={toggleMenu}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {navBox.map((item, index) => (
          <TouchableOpacity key={index} style={styles.sideMenuItem}>
            <FontAwesome name={item.icon} size={24} color="black" />
            <Text style={styles.sideMenuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
  return {
    
      toggleMenu,
      navBox
      
  };
 
};

export default useToggleMenu;
