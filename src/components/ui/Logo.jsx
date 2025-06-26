import React, { useState } from 'react';

/**
 * Logo Component for Muscat Bay Management System
 * Displays the MB 1.png logo if available, with fallback to text logo
 */
const Logo = ({ 
  collapsed = false, 
  className = '', 
  showText = true,
  size = 'default' // 'small', 'default', 'large'
}) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    small: collapsed ? 'w-8 h-8' : 'w-10 h-10',
    default: collapsed ? 'w-10 h-10' : 'w-12 h-12',
    large: collapsed ? 'w-12 h-12' : 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-xl',
    large: 'text-2xl'
  };

  const logoImagePath = '/mb-logo.png'; // Path to the MB 1.png file in public folder

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex items-center transition-all duration-300 ${className}`}>
      {/* Logo Image or Fallback */}
      <div 
        className={`${sizeClasses[size]} flex items-center justify-center transition-all duration-300`}
        style={{ 
          borderRadius: '12px'
        }}
      >
        {!imageError ? (
          <img
            src={logoImagePath}
            alt="Muscat Bay Logo"
            className={`${sizeClasses[size]} object-contain transition-all duration-300`}
            onError={handleImageError}
            style={{
              borderRadius: '8px',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
        ) : (
          // Fallback to styled text logo
          <div 
            className={`${sizeClasses[size]} rounded-lg flex items-center justify-center transition-all duration-300`}
            style={{ 
              backgroundColor: '#A8D5E3',
              borderRadius: '12px'
            }}
          >
            <span 
              className={`font-bold transition-all duration-300 ${
                collapsed ? 'text-sm' : 'text-lg'
              }`}
              style={{ 
                color: '#5f5168',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '700'
              }}
            >
              MB
            </span>
          </div>
        )}
      </div>

      {/* Logo Text */}
      {!collapsed && showText && (
        <div className="ml-3 transition-opacity duration-300">
          <h1 
            className={`${textSizes[size]} font-bold transition-all duration-300`}
            style={{ 
              color: '#F2F0EA',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            Muscat Bay
          </h1>
          <p 
            className="text-xs opacity-75 transition-all duration-300"
            style={{ 
              color: '#BFA181',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: '400'
            }}
          >
            Management System
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo; 