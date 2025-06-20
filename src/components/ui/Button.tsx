import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-accent text-white hover:bg-accent/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};