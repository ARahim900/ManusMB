import React, { useState } from 'react';
import { MoreHorizontal, Home, Zap, Droplets, Factory, DollarSign, Users, Wind, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './button';

const MobileNavigation = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard', color: 'var(--text-primary)' },
    { path: '/electricity', icon: Zap, label: 'Electricity', color: '#f59e0b' },
    { path: '/water', icon: Droplets, label: 'Water', color: '#3b82f6' },
    { path: '/stp', icon: Factory, label: 'STP', color: '#10b981' },
  ];

  const secondaryItems = [
    { path: '/reserve-fund', icon: DollarSign, label: 'Reserve Fund', color: '#06b6d4' },
    { path: '/contractor', icon: Users, label: 'Contractor', color: '#f59e0b' },
    { path: '/hvac', icon: Wind, label: 'HVAC', color: '#8b5cf6' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMoreClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background-secondary/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center justify-center p-2 min-h-12 transition-all duration-200 rounded-lg ${
                  active 
                    ? 'bg-primary-50 dark:bg-primary-900/20' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleNavigation(item.path)}
                style={{
                  backgroundColor: active ? 'rgba(95, 81, 104, 0.1)' : 'transparent'
                }}
              >
                <Icon 
                  className="w-5 h-5 mb-1" 
                  style={{ 
                    color: active ? 'var(--accent-teal)' : item.color 
                  }} 
                />
                <span 
                  className="text-xs font-medium truncate max-w-16"
                  style={{ 
                    color: active ? 'var(--accent-teal)' : 'var(--text-secondary)' 
                  }}
                >
                  {item.label}
                </span>
              </Button>
            );
          })}
          
          {/* More Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center p-2 min-h-12 transition-all duration-200 rounded-lg ${
              showSubmenu 
                ? 'bg-primary-50 dark:bg-primary-900/20' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={handleMoreClick}
            style={{
              backgroundColor: showSubmenu ? 'rgba(95, 81, 104, 0.1)' : 'transparent'
            }}
          >
            <div className="relative">
              <MoreHorizontal 
                className="w-5 h-5 mb-1" 
                style={{ 
                  color: showSubmenu ? 'var(--accent-teal)' : 'var(--text-primary)' 
                }} 
              />
              <ChevronDown 
                className={`w-3 h-3 absolute -bottom-1 -right-1 transition-transform duration-200 ${
                  showSubmenu ? 'rotate-180' : ''
                }`}
                style={{ 
                  color: showSubmenu ? 'var(--accent-teal)' : 'var(--text-secondary)' 
                }} 
              />
            </div>
            <span 
              className="text-xs font-medium"
              style={{ 
                color: showSubmenu ? 'var(--accent-teal)' : 'var(--text-secondary)' 
              }}
            >
              More
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Submenu Overlay */}
      {showSubmenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSubmenu(false)}
          />
          
          {/* Submenu */}
          <div className="absolute bottom-16 left-0 right-0 mx-4 mb-2">
            <div className="bg-background-secondary dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-2">
                <div className="grid grid-cols-3 gap-2">
                  {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <Button
                        key={item.path}
                        variant="ghost"
                        size="sm"
                        className={`flex flex-col items-center justify-center p-3 h-16 transition-all duration-200 rounded-xl ${
                          active 
                            ? 'bg-primary-50 dark:bg-primary-900/20' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          handleNavigation(item.path);
                          setShowSubmenu(false);
                        }}
                        style={{
                          backgroundColor: active ? 'rgba(95, 81, 104, 0.1)' : 'transparent'
                        }}
                      >
                        <Icon 
                          className="w-6 h-6 mb-1" 
                          style={{ 
                            color: active ? 'var(--accent-teal)' : item.color 
                          }} 
                        />
                        <span 
                          className="text-xs font-medium text-center"
                          style={{ 
                            color: active ? 'var(--accent-teal)' : 'var(--text-primary)' 
                          }}
                        >
                          {item.label}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safe area for content above mobile navigation */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileNavigation; 