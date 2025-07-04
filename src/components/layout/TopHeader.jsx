import React, { useState } from 'react';
import { Search, Menu, User, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '../ui/DarkModeToggle';
import TopNavigation from './TopNavigation';

const TopHeader = ({ onMenuClick, sidebarCollapsed, onToggleCollapse, isMobile }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <header className="header fixed top-0 right-0 left-0 z-20 flex items-center justify-between h-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-sm bg-background-secondary dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 md:ml-0"
        style={{
          // Adjust left margin based on sidebar state on desktop
          marginLeft: !isMobile ? (sidebarCollapsed ? '80px' : '288px') : '0',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        {/* Left Section - Navigation */}
        <div className="flex items-center min-w-0 flex-1">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden mr-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
              onClick={onMenuClick}
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </Button>
          )}

          {/* Top Navigation */}
          <div className="flex-1 max-w-3xl">
            <TopNavigation />
          </div>

          {/* Desktop Collapse Button */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
              onClick={onToggleCollapse}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </Button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0 ml-2 sm:ml-4">
          {/* Desktop Search */}
          <div className="hidden xl:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="xl:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
            onClick={() => setMobileSearchOpen(true)}
            aria-label="Open search"
          >
            <Search className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </Button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center flex-shrink-0">
            <DarkModeToggle />
          </div>

          {/* User Avatar - Optimized for mobile */}
          <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: 'var(--accent-teal)' }}
            >
              <User className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
            </div>
            <span className="hidden xl:block text-sm font-medium max-w-20 truncate" style={{ color: 'var(--text-primary)' }}>Admin</span>
          </Button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="xl:hidden fixed inset-0 bg-background-secondary dark:bg-gray-800 z-50 flex flex-col">
          {/* Search Header */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="pl-10 pr-4 py-3 w-full border rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--background-primary)',
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
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close search"
            >
              <X className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
            </Button>
          </div>
          
          {/* Search Results Area */}
          <div className="flex-1 p-4">
            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Start typing to search...
            </p>
            {/* Add search results here */}
          </div>
        </div>
      )}
    </>
  );
};

export default TopHeader;
