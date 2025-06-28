import React from 'react';
import { useResponsive } from './ResponsiveContainer';

const AdaptiveGrid = ({ 
  children, 
  minItemWidth = 280,
  maxItemWidth = 400,
  gap = 'md',
  className = '',
  equalHeight = false,
  centeredOnSmall = true
}) => {
  const { width, isMobile, isTablet } = useResponsive();

  const getGridClasses = () => {
    const gapMap = {
      xs: 'gap-2',
      sm: 'gap-4', 
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    };

    // Calculate optimal columns based on container width and item constraints
    const getOptimalCols = () => {
      if (isMobile) return 1;
      if (isTablet) return 2;
      
      const availableWidth = width - 64; // Account for padding
      const itemWithGap = minItemWidth + (gap === 'xs' ? 8 : gap === 'sm' ? 16 : gap === 'md' ? 24 : gap === 'lg' ? 32 : 48);
      const maxCols = Math.floor(availableWidth / itemWithGap);
      
      return Math.min(maxCols, 4); // Cap at 4 columns for readability
    };

    const cols = getOptimalCols();
    
    const baseClasses = [
      'adaptive-grid',
      'grid',
      gapMap[gap],
      equalHeight ? 'items-stretch' : 'items-start',
      centeredOnSmall && isMobile ? 'justify-items-center' : '',
      className
    ];

    // Use CSS Grid auto-fit for fluid responsive behavior
    const gridStyle = {
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : `repeat(auto-fit, minmax(${minItemWidth}px, ${maxItemWidth}px))`,
      justifyContent: 'center'
    };

    return { classes: baseClasses.filter(Boolean).join(' '), style: gridStyle };
  };

  const { classes, style } = getGridClasses();

  return (
    <div 
      className={classes}
      style={style}
    >
      {children}
    </div>
  );
};

// Specific grid variants for common use cases
export const MetricsGrid = ({ children, ...props }) => (
  <AdaptiveGrid 
    minItemWidth={260}
    maxItemWidth={320}
    gap="lg"
    equalHeight={true}
    {...props}
  >
    {children}
  </AdaptiveGrid>
);

export const ChartsGrid = ({ children, ...props }) => (
  <AdaptiveGrid 
    minItemWidth={400}
    maxItemWidth={600}
    gap="xl"
    equalHeight={false}
    {...props}
  >
    {children}
  </AdaptiveGrid>
);

export const CardsGrid = ({ children, ...props }) => (
  <AdaptiveGrid 
    minItemWidth={280}
    maxItemWidth={380}
    gap="md"
    equalHeight={true}
    {...props}
  >
    {children}
  </AdaptiveGrid>
);

export default AdaptiveGrid; 