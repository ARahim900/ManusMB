import React from 'react';
import { Search, Menu, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '../ui/DarkModeToggle';

const TopHeader = ({ onMenuClick, sidebarCollapsed, onToggleCollapse, isMobile }) => {
  return (
    <header className="header flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6 shadow-sm bg-background-secondary dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Left Section */}
      <div className="flex items-center">
        {!isMobile ? (
          // Desktop Collapse Button
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex mr-1 sm:mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
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
            className="md:hidden mr-1 sm:mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </Button>
        )}

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>Muscat Bay</span>
          <span>/</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Dashboard</span>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
        <Button variant="ghost" size="sm" className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Search className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </Button>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <DarkModeToggle />
        </div>

        {/* User Avatar */}
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: 'var(--accent-teal)' }}
          >
            <User className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'var(--text-primary)' }} />
          </div>
          <span className="hidden md:block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Admin</span>
        </Button>
      </div>
    </header>
  );
};

export default TopHeader;

