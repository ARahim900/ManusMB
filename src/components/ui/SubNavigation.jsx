import React from 'react';

const SubNavigation = ({ sections, activeSection, onSectionChange, className = "" }) => {
  return (
    <div className={`mb-6 print:hidden flex justify-center ${className}`}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return ( 
            <button 
              key={section.id} 
              onClick={() => onSectionChange(section.id)} 
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isActive 
                  ? 'bg-primary text-white dark:bg-blue-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            > 
              <section.icon size={18} className={isActive ? 'text-white' : 'text-primary dark:text-blue-400'}/> 
              <span>{section.name}</span> 
            </button> 
          );
        })}
      </div>
    </div>
  );
};

export default SubNavigation; 