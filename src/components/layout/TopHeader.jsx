import React, { useState } from 'react';
import { Search, Menu, User, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '../ui/DarkModeToggle';

const TopHeader = ({ onMenuClick, sidebarCollapsed, onToggleCollapse, isMobile }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <header className="header flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 shadow-sm bg-background-secondary dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 relative z-20">
        {/* Left Section */}
        <div className="flex items-center min-w-0 flex-1 md:flex-none">
          {!isMobile ? (
            // Desktop Collapse Button
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
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
              className="md:hidden mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </Button>
          )}

          {/* Breadcrumb - Responsive */}
          <nav className="hidden sm:flex items-center space-x-2 text-sm min-w-0" style={{ color: 'var(--text-secondary)' }}>
            <span className="truncate">Muscat Bay</span>
            <span className="flex-shrink-0">/</span>
            <span className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>Dashboard</span>
          </nav>
          
          {/* Mobile Title */}
          <div className="sm:hidden min-w-0 flex-1">
            <h1 className="text-lg font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              Muscat Bay
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
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
            <span className="hidden lg:block text-sm font-medium max-w-20 truncate" style={{ color: 'var(--text-primary)' }}>Admin</span>
          </Button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-background-secondary dark:bg-gray-800 z-50 flex flex-col">
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
