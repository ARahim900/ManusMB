import React, { useState, useEffect } from 'react';
import { Search, Menu, User, ChevronLeft, ChevronRight, X, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '../ui/DarkModeToggle';
import { useLocation } from 'react-router-dom';

const TopHeader = ({ onMenuClick, sidebarCollapsed, onToggleCollapse, isMobile }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const pathMap = {
      '/': 'Dashboard',
      '/electricity': 'Electricity',
      '/water': 'Water',
      '/stp': 'STP Plant',
      '/reserve-fund': 'Reserve Fund',
      '/contractor': 'Contractor',
      '/hvac': 'HVAC'
    };
    return pathMap[location.pathname] || 'Dashboard';
  };

  // Close mobile search when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileSearch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search:', searchValue);
    if (isMobile) {
      setShowMobileSearch(false);
    }
  };

  return (
    <>
      <header className="header sticky top-0 z-40 flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6 shadow-sm bg-background-secondary/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* Left Section */}
        <div className="flex items-center min-w-0 flex-1 lg:flex-none">
          {!isMobile ? (
            // Desktop Collapse Button
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg"
              onClick={onToggleCollapse}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </Button>
          ) : (
            // Mobile Menu Button
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg"
              onClick={onMenuClick}
            >
              <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </Button>
          )}

          {/* Breadcrumb - Responsive */}
          <nav className="flex items-center space-x-2 text-sm min-w-0" style={{ color: 'var(--text-secondary)' }}>
            <span className="hidden sm:inline">Muscat Bay</span>
            <span className="hidden sm:inline">/</span>
            <span className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {getCurrentPageTitle()}
            </span>
          </nav>
        </div>

        {/* Center Section - Page Title for Mobile */}
        <div className="flex-1 md:hidden text-center">
          <h1 className="text-lg font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
            {getCurrentPageTitle()}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 xl:w-80 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-teal)';
                  e.target.style.boxShadow = `0 0 0 2px rgba(168, 213, 227, 0.2)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </form>
          </div>

          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg"
            title="Settings"
          >
            <Settings className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </Button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <DarkModeToggle />
          </div>

          {/* User Avatar */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg min-w-0"
            title="User Profile"
          >
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: 'var(--accent-teal)' }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--text-primary)' }} />
            </div>
            <span className="hidden lg:block text-sm font-medium truncate max-w-20" style={{ color: 'var(--text-primary)' }}>
              Admin
            </span>
          </Button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="bg-background-secondary dark:bg-gray-800 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-base"
                    style={{ 
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--background-secondary)',
                      color: 'var(--text-primary)'
                    }}
                    autoFocus
                  />
                </div>
              </form>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg"
                onClick={() => setShowMobileSearch(false)}
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopHeader;

