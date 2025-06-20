import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopHeader = ({ onMenuClick }) => {
  return (
    <header className="header flex items-center justify-between h-16 px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-2"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" style={{ color: 'var(--muscat-primary)' }} />
        </Button>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>Muscat Bay</span>
          <span>/</span>
          <span className="font-medium" style={{ color: 'var(--muscat-navy)' }}>Dashboard</span>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ 
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--muscat-white)',
                color: 'var(--muscat-navy)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--muscat-primary)';
                e.target.style.boxShadow = `0 0 0 2px rgba(95, 81, 104, 0.2)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" style={{ color: 'var(--muscat-primary)' }} />
          <span 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--muscat-teal)' }}
          ></span>
        </Button>

        {/* User Avatar */}
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--muscat-teal-light)' }}
          >
            <User className="w-4 h-4" style={{ color: 'var(--muscat-primary)' }} />
          </div>
          <span className="hidden md:block text-sm font-medium" style={{ color: 'var(--muscat-navy)' }}>Admin</span>
        </Button>
      </div>
    </header>
  );
};

export default TopHeader;

