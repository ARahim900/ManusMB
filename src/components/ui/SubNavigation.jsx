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
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200 dark:border-gray-600 transition-colors duration-300 min-w-max">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return ( 
            <button 
              key={section.id} 
              onClick={() => handleSectionChange(section.id)}
              disabled={isChanging}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${
                isActive 
                  ? 'bg-primary text-white dark:bg-blue-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            > 
              <section.icon 
                size={16} 
                className={`${isActive ? 'text-white' : 'text-primary dark:text-blue-400'} ${isChanging ? 'animate-pulse' : ''} flex-shrink-0`}
              /> 
              <span className="hidden sm:inline">{section.name}</span>
              <span className="sm:hidden">{section.shortName || section.name}</span>
            </button> 
          );
        })}
      </div>
    </div>
  );
};

export default SubNavigation;