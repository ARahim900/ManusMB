import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users, 
  BarChart3,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      path: '/',
      color: 'text-muscat-teal'
    },
    {
      icon: Zap,
      label: 'Electricity System',
      path: '/electricity',
      color: 'text-muscat-primary'
    },
    {
      icon: Droplets,
      label: 'Water Analysis',
      path: '/water',
      color: 'text-muscat-teal'
    },
    {
      icon: Factory,
      label: 'STP Plant',
      path: '/stp',
      color: 'text-green-400'
    },
    {
      icon: DollarSign,
      label: 'Reserve Fund',
      path: '/reserve-fund',
      color: 'text-muscat-gold',
      badge: 'NEW'
    },
    {
      icon: Users,
      label: 'Contractor Tracker',
      path: '/contractor',
      color: 'text-muscat-gold'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-72 sidebar">
        {/* Logo */}
        <div 
          className="flex items-center justify-center h-16 px-6 border-b border-white border-opacity-10"
          style={{ borderBottomColor: 'var(--muscat-primary)' }}
        >
          <h1 className="text-xl font-bold" style={{ color: 'var(--muscat-white)' }}>
            Muscat Bay
          </h1>
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
                className={`sidebar-nav-item flex items-center px-4 py-3 rounded-lg group ${
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
            className="text-white hover:text-gray-300"
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
                className={`sidebar-nav-item flex items-center px-4 py-4 rounded-lg group ${
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

