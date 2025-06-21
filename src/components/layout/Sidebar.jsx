import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users, 
  BarChart3,
  X,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      path: '/',
      color: 'text-muscat-teal',
      shortLabel: 'Dashboard'
    },
    {
      icon: Zap,
      label: 'Electricity System',
      path: '/electricity',
      color: 'text-muscat-primary',
      shortLabel: 'Electricity'
    },
    {
      icon: Droplets,
      label: 'Water Analysis',
      path: '/water',
      color: 'text-muscat-teal',
      shortLabel: 'Water'
    },
    {
      icon: Factory,
      label: 'STP Plant',
      path: '/stp',
      color: 'text-green-400',
      shortLabel: 'STP'
    },
    {
      icon: DollarSign,
      label: 'Reserve Fund',
      path: '/reserve-fund',
      color: 'text-muscat-gold',
      badge: 'NEW',
      shortLabel: 'Reserve'
    },
    {
      icon: Users,
      label: 'Contractor Tracker',
      path: '/contractor',
      color: 'text-muscat-gold',
      shortLabel: 'Contractor'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:flex-col sidebar transition-all duration-300 ease-in-out ${
        isCollapsed ? 'md:w-20' : 'md:w-72'
      }`}>
        {/* Logo */}
        <div 
          className="flex items-center justify-center h-16 px-6 border-b border-white border-opacity-10 relative"
          style={{ borderBottomColor: 'var(--muscat-primary)' }}
        >
          {!isCollapsed ? (
            <h1 className="text-xl font-bold transition-opacity duration-300" style={{ color: 'var(--muscat-white)' }}>
              Muscat Bay
            </h1>
          ) : (
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: 'var(--muscat-teal)' }}
            >
              <span className="text-lg font-bold" style={{ color: 'var(--muscat-navy)' }}>MB</span>
            </div>
          )}
          
          {/* Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:bg-opacity-10 ${
              isCollapsed ? 'right-2' : 'right-2'
            }`}
            style={{ color: 'var(--muscat-white)' }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className={`sidebar-nav-item flex items-center px-4 py-3 rounded-lg group relative transition-all duration-300 ${
                    isActive ? 'active' : ''
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${item.color} transition-all duration-300`} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="font-medium transition-opacity duration-300">{item.label}</span>
                      {item.badge && (
                        <span 
                          className="ml-auto text-white text-xs px-2 py-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: 'var(--muscat-teal)' }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {isCollapsed && item.badge && (
                    <span 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--muscat-teal)' }}
                    />
                  )}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item.path && (
                  <div 
                    className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap transition-all duration-200"
                    style={{ 
                      backgroundColor: 'var(--muscat-navy)', 
                      color: 'var(--muscat-white)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span 
                        className="ml-2 text-white text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--muscat-teal)' }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Tooltip arrow */}
                    <div 
                      className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0"
                      style={{
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '6px solid var(--muscat-navy)'
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div 
          className={`p-4 border-t border-white border-opacity-10 transition-all duration-300 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}
          style={{ borderTopColor: 'var(--muscat-primary)' }}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCollapsed ? 'w-10 h-10' : 'w-8 h-8'
              }`}
              style={{ backgroundColor: 'var(--muscat-teal)' }}
              title={isCollapsed ? 'Admin User' : ''}
            >
              <span className="text-xs font-bold" style={{ color: 'var(--muscat-navy)' }}>A</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 transition-opacity duration-300">
                <p className="text-sm font-medium" style={{ color: 'var(--muscat-white)' }}>Admin User</p>
                <p className="text-xs" style={{ color: 'var(--sidebar-text-muted)' }}>admin@muscatbay.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 sidebar transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close Button */}
        <div 
          className="flex items-center justify-between h-16 px-6 border-b border-white border-opacity-10"
          style={{ borderBottomColor: 'var(--muscat-primary)' }}
        >
          <h1 className="text-xl font-bold" style={{ color: 'var(--muscat-white)' }}>
            Muscat Bay
          </h1>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`sidebar-nav-item flex items-center px-4 py-4 rounded-lg group transition-all duration-200 ${
                  isActive ? 'active' : ''
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span 
                    className="ml-auto text-white text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--muscat-teal)' }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div 
          className="p-4 border-t border-white border-opacity-10"
          style={{ borderTopColor: 'var(--muscat-primary)' }}
        >
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--muscat-teal)' }}
            >
              <span className="text-xs font-bold" style={{ color: 'var(--muscat-navy)' }}>A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium" style={{ color: 'var(--muscat-white)' }}>Admin User</p>
              <p className="text-xs" style={{ color: 'var(--sidebar-text-muted)' }}>admin@muscatbay.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

