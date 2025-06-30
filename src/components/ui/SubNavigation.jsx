import React, { useState, useCallback } from 'react';

const SubNavigation = ({ sections, activeSection, onSectionChange, className = "" }) => {
  const [isChanging, setIsChanging] = useState(false);

  // Debounced section change to prevent rapid clicking issues
  const handleSectionChange = useCallback((sectionId) => {
    if (isChanging || activeSection === sectionId) {
      return; // Prevent rapid clicks or clicking same section
    }
    
    setIsChanging(true);
    
    // Add small delay to show visual feedback
    setTimeout(() => {
      onSectionChange(sectionId);
      setIsChanging(false);
    }, 50);
  }, [onSectionChange, activeSection, isChanging]);

  return (
    <div className={`mb-6 print:hidden ${className}`}>
      {/* Mobile optimized navigation */}
      <div className="w-full">
        {/* Mobile version - horizontal scroll */}
        <div className="block sm:hidden">
          <div className="flex space-x-2 pb-2 px-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return ( 
                <button 
                  key={section.id} 
                  onClick={() => handleSectionChange(section.id)}
                  disabled={isChanging}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium flex flex-col items-center justify-center min-w-[70px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                > 
                  <section.icon 
                    size={18} 
                    className={`${isActive ? 'text-white' : 'text-primary'} ${isChanging ? 'animate-pulse' : ''} mb-1`}
                  /> 
                  <span className="text-[10px] leading-tight text-center">
                    {section.shortName || section.name}
                  </span>
                </button> 
              );
            })}
          </div>
        </div>

        {/* Desktop version - centered navigation */}
        <div className="hidden sm:block">
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 flex space-x-1 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return ( 
                  <button 
                    key={section.id} 
                    onClick={() => handleSectionChange(section.id)}
                    disabled={isChanging}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${
                      isActive 
                        ? 'bg-primary text-white dark:bg-blue-600' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  > 
                    <section.icon 
                      size={16} 
                      className={`${isActive ? 'text-white' : 'text-primary dark:text-blue-400'} ${isChanging ? 'animate-pulse' : ''} flex-shrink-0`}
                    /> 
                    <span>{section.name}</span>
                  </button> 
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavigation;