import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import Breadcrumbs from '../ui/Breadcrumbs';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize collapsed state from localStorage
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState !== null) {
      setSidebarCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse on smaller desktop screens (768-1024px)
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
      
      // Close mobile sidebar when switching to desktop
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent background scrolling on iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobile, sidebarOpen]);

  // Save collapsed state to localStorage
  const handleToggleCollapse = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
  };

  // Smart collapse behavior - auto-expand on hover when collapsed
  const [isHoveringCollapsed, setIsHoveringCollapsed] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleSidebarMouseEnter = () => {
    if (sidebarCollapsed && !isMobile) {
      const timeout = setTimeout(() => {
        setIsHoveringCollapsed(true);
      }, 300); // Delay to prevent accidental expansion
      setHoverTimeout(timeout);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHoveringCollapsed(false);
  };

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        className="relative"
      >
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed && !isHoveringCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </div>
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isMobile ? 'ml-0' : sidebarCollapsed && !isHoveringCollapsed ? 'ml-20' : 'ml-72'
      }`} style={{ minHeight: '100vh' }}>
        {/* Top Header */}
        <TopHeader 
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed && !isHoveringCollapsed}
          onToggleCollapse={handleToggleCollapse}
          isMobile={isMobile}
        />
        
        {/* Content Area with proper padding for fixed header */}
        <main className="overflow-auto content-area bg-background-primary dark:bg-gray-900 transition-colors duration-300 pt-14 sm:pt-16" 
          style={{ 
            minHeight: '100vh',
            paddingTop: isMobile ? '56px' : '64px' // Account for header height
          }}
        >
          <div className="page-container px-3 sm:px-4 md:px-6 py-4 sm:py-6">
            {/* Breadcrumbs - Only show on larger screens to save space */}
            <div className="hidden sm:block">
              <Breadcrumbs />
            </div>
            
            {/* Main Content */}
            <div className="content-wrapper">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay - Enhanced for better UX */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          style={{ 
            touchAction: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
        />
      )}
    </div>
  );
};

export default AppLayout;
