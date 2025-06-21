import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

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
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-primary)' }}>
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
          sidebarCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          isMobile={isMobile}
        />
        
        {/* Content Area */}
        <main className="overflow-auto content-area" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="page-container">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          style={{ touchAction: 'none' }}
        />
      )}
    </div>
  );
};

export default AppLayout;

