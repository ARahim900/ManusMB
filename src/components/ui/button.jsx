import React from 'react';

const Button = ({ 
  label, 
  variant = 'primary',
  size = 'default',
  icon, 
  action, 
  children,
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const sizeClasses = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={action}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}
      <span>{label || children}</span>
    </button>
  );
};

export { Button };
export default Button; 