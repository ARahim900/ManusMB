import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const DarkModeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex items-center justify-center
        w-14 h-8 rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800
        ${isDarkMode 
          ? 'bg-blue-600 focus:ring-blue-500' 
          : 'bg-gray-300 focus:ring-blue-500'
        }
        hover:shadow-lg transform hover:scale-105
        group
        ${className}
      `}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Toggle Track */}
      <span className="sr-only">Toggle dark mode</span>
      
      {/* Toggle Button */}
      <span
        className={`
          absolute inline-block w-6 h-6 rounded-full
          bg-white shadow-lg transform transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
          group-hover:shadow-xl
        `}
      >
        {/* Icon */}
        {isDarkMode ? (
          <Moon className="w-3.5 h-3.5 text-blue-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun 
          className={`w-3 h-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-60 text-amber-600'
          }`} 
        />
        <Moon 
          className={`w-3 h-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-60 text-white' : 'opacity-0'
          }`} 
        />
      </div>
    </button>
  );
};

export default DarkModeToggle; 