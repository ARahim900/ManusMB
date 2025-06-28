import React, { useState, useEffect } from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  mobileLayout = 'stack',
  tabletLayout = 'grid',
  desktopLayout = 'grid',
  spacing = 'md',
  maxWidth = '7xl',
  fullHeight = false
}) => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [orientation, setOrientation] = useState('landscape');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else if (width < 1280) setScreenSize('laptop');
      else setScreenSize('desktop');

      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getLayoutClasses = () => {
    const spacingMap = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    };

    const layoutMap = {
      stack: 'flex flex-col',
      grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      flex: 'flex flex-wrap',
      masonry: 'columns-1 sm:columns-2 lg:columns-3'
    };

    let layout;
    if (screenSize === 'mobile') layout = layoutMap[mobileLayout];
    else if (screenSize === 'tablet') layout = layoutMap[tabletLayout];
    else layout = layoutMap[desktopLayout];

    return `${layout} ${spacingMap[spacing]}`;
  };

  const containerClasses = `
    responsive-container
    ${fullHeight ? 'min-h-screen' : ''}
    ${maxWidth ? `max-w-${maxWidth} mx-auto` : ''}
    px-4 sm:px-6 lg:px-8
    ${getLayoutClasses()}
    ${className}
  `.trim();

  return (
    <div 
      className={containerClasses}
      data-screen-size={screenSize}
      data-orientation={orientation}
    >
      {children}
    </div>
  );
};

// Hook for responsive behavior
export const useResponsive = () => {
  const [screenInfo, setScreenInfo] = useState({
    size: 'desktop',
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: true,
    orientation: 'landscape',
    touchDevice: false
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isLaptop = width >= 1024 && width < 1280;
      const isDesktop = width >= 1280;
      
      const size = isMobile ? 'mobile' : isTablet ? 'tablet' : isLaptop ? 'laptop' : 'desktop';
      
      setScreenInfo({
        size,
        width,
        height,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        orientation: width > height ? 'landscape' : 'portrait',
        touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  return screenInfo;
};

export default ResponsiveContainer; 