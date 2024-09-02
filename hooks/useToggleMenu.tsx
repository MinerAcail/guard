// In useToggleMenu hook
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const useToggleMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useState(new Animated.Value(-250))[0]; // Assuming menu width is 250

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -250 : 0, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return { menuVisible, menuAnimation, toggleMenu };
};

export default useToggleMenu;
