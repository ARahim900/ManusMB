import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users, 
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu
} from 'lucide-react';

const TopNavigation = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  const navigationItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      path: '/',
      shortLabel: 'Dashboard'
    },
    {
      icon: Zap,
      label: 'Electricity',
      path: '/electricity',
      shortLabel: 'Electricity'
    },
    {
      icon: Droplets,
      label: 'Water',
      path: '/water',
      shortLabel: 'Water'
    },
    {
      icon: Factory,
      label: 'STP Plant',
      path: '/stp',
      shortLabel: 'STP'
    },
    {
      icon: DollarSign,
      label: 'Reserve Fund',
      path: '/reserve-fund',
      shortLabel: 'Reserve'
    },
    {
      icon: Users,
      label: 'Contractor',
      path: '/contractor',
      shortLabel: 'Contractor'
    },
    {
      icon: Settings,
      label: 'HVAC',
      path: '/hvac',
      shortLabel: 'HVAC'
    }
  ];

  // Get current active item
  const currentItem = navigationItems.find(item => item.path === location.pathname) || navigationItems[0];

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  if (isMobile) {
    // Mobile Dropdown Menu
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 touch-manipulation"
          style={{ minHeight: '48px' }} // Touch-friendly size
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900">
              <currentItem.icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {currentItem.shortLabel}
            </span>
          </div>
          {dropdownOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50 animate-slideDown">
            <nav className="py-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 touch-manipulation ${
                      isActive 
                        ? 'bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 text-teal-700 dark:text-teal-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                    style={{ minHeight: '48px' }} // Touch-friendly size
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                      isActive 
                        ? 'bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-800 dark:to-cyan-800' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    );
  }

  // Desktop Pill Navigation
  return (
    <nav className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-teal-700 dark:text-teal-300' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Icon className={`w-4 h-4 ${
              isActive ? 'text-teal-600 dark:text-teal-400' : ''
            }`} />
            <span className={`font-medium text-sm ${
              isActive ? 'block' : 'hidden xl:block'
            }`}>
              {item.shortLabel}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default TopNavigation;
