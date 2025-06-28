import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useResponsive } from './ResponsiveContainer';

const ResponsiveModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  mobileFullScreen = true,
  className = ''
}) => {
  const { isMobile, isTablet } = useResponsive();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    if (isMobile && mobileFullScreen) {
      return 'w-full h-full rounded-none';
    }

    const sizeMap = {
      sm: isMobile ? 'w-11/12 max-w-sm' : 'w-full max-w-sm',
      md: isMobile ? 'w-11/12 max-w-md' : 'w-full max-w-md', 
      lg: isMobile ? 'w-11/12 max-w-lg' : 'w-full max-w-2xl',
      xl: isMobile ? 'w-11/12 max-w-xl' : 'w-full max-w-4xl',
      '2xl': isMobile ? 'w-11/12 max-w-2xl' : 'w-full max-w-6xl'
    };

    return `${sizeMap[size]} ${isMobile ? 'rounded-2xl' : 'rounded-xl'}`;
  };

  const modalClasses = `
    fixed inset-0 z-50 flex items-center justify-center p-4
    ${isMobile && mobileFullScreen ? 'p-0' : ''}
  `;

  const contentClasses = `
    relative bg-white dark:bg-gray-800 shadow-2xl
    ${getSizeClasses()}
    ${isMobile && mobileFullScreen ? '' : 'max-h-[90vh] overflow-y-auto'}
    transform transition-all duration-300 ease-out
    ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
    ${className}
  `;

  const backdropClasses = `
    fixed inset-0 bg-black transition-opacity duration-300
    ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'}
  `;

  return (
    <div className={modalClasses}>
      {/* Backdrop */}
      <div 
        className={backdropClasses}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      
      {/* Modal Content */}
      <div className={contentClasses}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`
            flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700
            ${isMobile && mobileFullScreen ? 'bg-white dark:bg-gray-800 sticky top-0 z-10' : ''}
          `}>
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                  transition-colors touch-target
                  ${isMobile ? 'w-10 h-10' : 'w-8 h-8'}
                `}
                aria-label="Close modal"
              >
                <X className={`${isMobile ? 'w-6 h-6' : 'w-4 h-4'} text-gray-500`} />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={`
          ${isMobile && mobileFullScreen ? 'flex-1 overflow-y-auto' : 'p-6'}
          ${!title && !showCloseButton ? 'pt-6' : ''}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal; 