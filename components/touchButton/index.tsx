import { LinkProps, useRouter } from 'expo-router';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ReactNode } from 'react';

interface TouchButtonProps extends TouchableOpacityProps {
  href: LinkProps<string | object>['href'];  // Correct type for href
  children: ReactNode;
}

function TouchButton({ children, href, style, ...props }: TouchButtonProps) {
  const router = useRouter();

  // Create a function to handle navigation
  const handlePress = () => {
    if (typeof href === 'string') {
      router.push(href);
    } else {
    //   router.push(href.routeName, href.params);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props} style={style}>
      {children}
    </TouchableOpacity>
  );
}

export default TouchButton;
