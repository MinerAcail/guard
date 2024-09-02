import { Link, LinkProps } from 'expo-router';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ReactNode } from 'react';

interface TouchButtonProps extends TouchableOpacityProps {
  href: LinkProps<string | object >['href'];  // Provide the correct generic type
  children: ReactNode;
}

function TouchButton({ children, href, ...props }: TouchButtonProps) {
  return (
    <Link href={href}>
      <TouchableOpacity {...props}>
        {children}
      </TouchableOpacity>
    </Link>
  );
}

export default TouchButton;
