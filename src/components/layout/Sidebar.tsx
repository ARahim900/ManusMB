import React from 'react';
import { Zap, Droplets, Combine, UserCheck, Wallet, Power, Menu } from 'lucide-react';
import { COLORS } from '@/utils/constants';
import { MainSection } from '@/types';

interface SidebarProps {
  activeMainSection: string;
  setActiveMainSection: (section: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeMainSection, 
  setActiveMainSection, 
  isCollapsed, 
  toggleSidebar, 
  isDarkMode 
}) => {
  const mainSections: MainSection[] = [
    { name: 'Electricity System', icon: Zap, sectionId: 'ElectricitySystem' },
    { name: 'Water Analysis', icon: Droplets, sectionId: 'WaterAnalysis' },
    { name: 'STP Plant', icon: Combine, sectionId: 'STPPlant' },
    { name: 'Contractor Tracker', icon: UserCheck, sectionId: 'ContractorTracker' },
    { name: 'Reserve Fund', icon: Wallet, sectionId: 'ReserveFund' },
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-16' : 'w-64'} text-slate-100 p-5 space-y-8 min-h-screen shadow-2xl print:hidden transition-all duration-300 ease-in-out relative`} 
      style={{backgroundColor: isDarkMode ? '#1e1e2e' : COLORS.primaryDark}}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-200"
        style={{ color: COLORS.primary }}
      >
        <Menu size={16} />
      </button>

      {/* Logo */}
      <div className={`text-3xl font-bold flex items-center space-x-3 text-white ${isCollapsed ? 'justify-center' : ''}`}>
        <Power size={32} style={{ color: COLORS.primaryLight }} className="animate-pulse flex-shrink-0"/> 
        {!isCollapsed && <span>Muscat Bay OMS</span>}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {mainSections.map(section => (
          <button
            key={section.sectionId}
            onClick={() => setActiveMainSection(section.sectionId)}
            style={section.sectionId === activeMainSection ? { backgroundColor: COLORS.primary, color: 'white' } : {color: 'white'}}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg transition-all duration-200 ease-in-out group hover:text-white relative`}
            onMouseOver={(e) => { if (section.sectionId !== activeMainSection) e.currentTarget.style.backgroundColor = COLORS.primaryLight; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { if (section.sectionId !== activeMainSection) {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white';}}}
            title={isCollapsed ? section.name : ''}
          >
            <section.icon size={22} className={`group-hover:scale-110 transition-transform text-white flex-shrink-0`} />
            {!isCollapsed && <span className="font-medium">{section.name}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="mt-auto p-4 bg-slate-700 bg-opacity-30 rounded-lg text-center border" style={{borderColor: COLORS.primaryLight}}>
          <p className="text-sm" style={{color: COLORS.primaryLight}}>Operations Management Suite</p>
          <button 
              className="mt-3 w-full text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-lg transition-all"
              style={{ backgroundColor: COLORS.primary }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}
          >
            Global Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;