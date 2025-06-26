import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users, 
  BarChart3,
  Settings,
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
      shortLabel: 'Dashboard'
    },
    {
      icon: Zap,
      label: 'Electricity System',
      path: '/electricity',
      shortLabel: 'Electricity'
    },
    {
      icon: Droplets,
      label: 'Water Analysis',
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
      label: 'Contractor Tracker',
      path: '/contractor',
      shortLabel: 'Contractor'
    },
    {
      icon: Settings,
      label: 'HVAC Tracker',
      path: '/hvac',
      shortLabel: 'HVAC'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`sidebar-container hidden md:flex md:flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20' : 'md:w-72'
        } bg-sidebar-bg dark:bg-gray-800 text-sidebar-text dark:text-gray-200`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 30,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          height: '100vh',
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        {/* Logo */}
        <div 
          className="flex items-center justify-center h-16 px-6 border-b relative flex-shrink-0"
          style={{ 
            borderBottomColor: 'rgba(242, 240, 234, 0.2)',
            padding: '24px'
          }}
        >
          {!isCollapsed ? (
            <h1 
              className="text-xl font-bold transition-opacity duration-300"
              style={{ 
                color: '#F2F0EA',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.25rem',
                fontWeight: '600'
              }}
            >
              Muscat Bay
            </h1>
          ) : (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ 
                backgroundColor: '#A8D5E3',
                borderRadius: '12px'
              }}
            >
              <span 
                className="text-lg font-bold"
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
          
          {/* Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:bg-opacity-10 ${
              isCollapsed ? 'right-2' : 'right-2'
            }`}
            style={{ color: '#F2F0EA' }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav 
          className="flex-1 px-4 py-6 space-y-2 overflow-y-auto"
          style={{ padding: '24px 16px' }}
        >
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
                  className={`flex items-center px-4 py-3 rounded-lg group relative transition-all duration-300 ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#5f5168' : '#F2F0EA',
                    borderRadius: '12px',
                    padding: '16px',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} transition-all duration-300`} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="font-medium transition-opacity duration-300">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span 
                          className="ml-auto text-white text-xs px-2 py-1 rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: '#A8D5E3',
                            color: '#5f5168',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {isCollapsed && item.badge && (
                    <span 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#A8D5E3' }}
                    />
                  )}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item.path && (
                  <div 
                    className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap transition-all duration-200"
                    style={{ 
                      backgroundColor: '#0A1828',
                      color: '#F2F0EA',
                      fontSize: '0.875rem',
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span 
                        className="ml-2 text-white text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: '#A8D5E3',
                          color: '#5f5168',
                          borderRadius: '12px'
                        }}
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
                        borderRight: '6px solid #0A1828'
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
          className={`p-4 border-t transition-all duration-300 flex-shrink-0 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}
          style={{ 
            borderTopColor: 'rgba(242, 240, 234, 0.2)',
            padding: isCollapsed ? '16px 8px' : '16px'
          }}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCollapsed ? 'w-10 h-10' : 'w-8 h-8'
              }`}
              style={{ 
                backgroundColor: '#A8D5E3',
                borderRadius: '12px'
              }}
              title={isCollapsed ? 'Admin User' : ''}
            >
              <span 
                className="text-xs font-bold"
                style={{ 
                  color: '#5f5168',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '700'
                }}
              >
                A
              </span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 transition-opacity duration-300">
                <p 
                  className="text-sm font-medium"
                  style={{ 
                    color: '#F2F0EA',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Admin User
                </p>
                <p 
                  className="text-xs"
                  style={{ 
                    color: '#BFA181',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: '400'
                  }}
                >
                  admin@muscatbay.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`sidebar-mobile fixed top-0 left-0 w-72 z-50 md:hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-sidebar-bg dark:bg-gray-800 text-sidebar-text dark:text-gray-200`}
        style={{
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        {/* Mobile Header */}
        <div 
          className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0"
          style={{ 
            borderBottomColor: 'rgba(242, 240, 234, 0.2)',
            padding: '24px'
          }}
        >
          <h1 
            className="text-xl font-bold"
            style={{ 
              color: '#F2F0EA',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.25rem',
              fontWeight: '600'
            }}
          >
            Muscat Bay
          </h1>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-colors"
            style={{ color: '#F2F0EA' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          className="flex-1 px-4 py-6 space-y-2 overflow-y-auto"
          style={{ padding: '24px 16px' }}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#5f5168' : '#F2F0EA',
                  borderRadius: '12px',
                  padding: '16px',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span 
                    className="ml-auto text-white text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#A8D5E3',
                      color: '#5f5168',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div 
          className="p-4 border-t flex-shrink-0"
          style={{ 
            borderTopColor: 'rgba(242, 240, 234, 0.2)',
            padding: '16px'
          }}
        >
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: '#A8D5E3',
                borderRadius: '12px'
              }}
            >
              <span 
                className="text-xs font-bold"
                style={{ 
                  color: '#5f5168',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '700'
                }}
              >
                A
              </span>
            </div>
            <div className="ml-3">
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: '#F2F0EA',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Admin User
              </p>
              <p 
                className="text-xs"
                style={{ 
                  color: '#BFA181',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: '400'
                }}
              >
                admin@muscatbay.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

