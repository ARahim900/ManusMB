import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ElectricitySystemModule from './modules/electricity/ElectricitySystemModule';
import WaterAnalysisModule from './modules/water/WaterAnalysisModule';
import STPPlantModule from './modules/stp/STPPlantModule';
import ContractorTrackerModule from './modules/contractors/ContractorTrackerModule';
import ReserveFundModule from './modules/reserve/ReserveFundModule';
import { Columns } from 'lucide-react';
import { COLORS } from './utils/constants';

const App: React.FC = () => {
  const [activeMainSection, setActiveMainSection] = useState<string>('ElectricitySystem');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderMainContent = () => {
    switch(activeMainSection) {
      case 'ElectricitySystem':
        return <ElectricitySystemModule isDarkMode={isDarkMode} />;
      case 'WaterAnalysis': 
        return <WaterAnalysisModule />;
      case 'STPPlant': 
        return <STPPlantModule />;
      case 'ContractorTracker': 
        return <ContractorTrackerModule />;
      case 'ReserveFund': 
        return <ReserveFundModule />;
      default: 
        return (
          <div className="flex-1 p-8 space-y-8"> 
            <div className="bg-white p-10 rounded-xl shadow-lg text-center border border-slate-200"> 
              <h2 className="text-3xl font-bold text-slate-700 mb-4">Module Not Found</h2> 
              <p className="text-slate-500">The requested module could not be found.</p> 
              <Columns size={48} className="mx-auto mt-6 text-slate-400" style={{color: COLORS.primaryLight}}/> 
            </div> 
          </div>
        );
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} font-sans transition-colors duration-300`} style={{'--selection-bg': COLORS.primaryLight, '--selection-text': 'white'} as React.CSSProperties}>
      <style>{`::selection { background-color: var(--selection-bg); color: var(--selection-text); }`}</style>
      
      <Sidebar 
        activeMainSection={activeMainSection} 
        setActiveMainSection={setActiveMainSection} 
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
      />
      
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          isCollapsed={isCollapsed}
        />
        
        <main className={`flex-1 p-6 md:p-8 space-y-6 md:space-y-8 ${isDarkMode ? 'bg-slate-900' : ''}`}>
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default App;