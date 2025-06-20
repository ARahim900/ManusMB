import React, { useState, useMemo } from 'react';
import { CalendarDays, Building, Filter, Sparkles, LayoutDashboard, TrendingUp, BarChart2, List } from 'lucide-react';
import { COLORS, OMR_PER_KWH } from '@/utils/constants';
import { parseElectricityData } from '@/utils/dataParser';
import { rawElectricityDataString } from '@/data/electricity-raw';
import ElectricityDashboard from './components/ElectricityDashboard';
import ElectricityPerformance from './components/ElectricityPerformance';
import ElectricityAnalytics from './components/ElectricityAnalytics';
import ElectricityUnitDetails from './components/ElectricityUnitDetails';
import StyledSelect from '@/components/ui/StyledSelect';

interface ElectricitySystemModuleProps {
  isDarkMode: boolean;
}

const ElectricitySystemModule: React.FC<ElectricitySystemModuleProps> = ({ isDarkMode }) => {
  const [activeSubSection, setActiveSubSection] = useState('Dashboard');
  const [selectedMonth, setSelectedMonth] = useState("All Months"); 
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Parse electricity data
  const initialElectricityData = useMemo(() => parseElectricityData(rawElectricityDataString), []);
  const availableMonths = Object.keys(initialElectricityData[0]?.consumption || {});

  const distinctCategories = useMemo(() => 
    [...new Set(initialElectricityData.map(d => d.category))].sort(), 
    [initialElectricityData]
  );

  const filteredElectricityData = useMemo(() => {
    return initialElectricityData.filter(item => {
      const categoryMatch = selectedCategory === "All Categories" || item.category === selectedCategory;
      return categoryMatch; 
    });
  }, [initialElectricityData, selectedCategory]);

  const kpiAndTableData = useMemo(() => {
    if (selectedMonth === "All Months") {
        return filteredElectricityData.map(item => ({ ...item, }));
    }
    return filteredElectricityData.map(item => ({ 
      ...item, 
      totalConsumption: item.consumption[selectedMonth] || 0, 
    }));
  }, [filteredElectricityData, selectedMonth]);

  // KPI Calculations
  const totalConsumptionKWh = useMemo(() => kpiAndTableData.reduce((acc, curr) => acc + curr.totalConsumption, 0), [kpiAndTableData]);
  const totalCostOMR = useMemo(() => totalConsumptionKWh * OMR_PER_KWH, [totalConsumptionKWh]);
  const averageConsumptionPerUnit = useMemo(() => kpiAndTableData.length > 0 ? totalConsumptionKWh / kpiAndTableData.length : 0, [totalConsumptionKWh, kpiAndTableData]);
  const activeMeters = useMemo(() => kpiAndTableData.filter(d => d.meterAccountNo !== 'N/A' && d.meterAccountNo !== 'MISSING_METER' && d.totalConsumption > 0).length, [kpiAndTableData]);

  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult("");
    
    setTimeout(() => {
      setAiAnalysisResult(`AI Analysis Results for ${selectedMonth === "All Months" ? "All Months" : selectedMonth}:

• Beachwell shows significant consumption variation across months - from 40 kWh in March to 38,168 kWh in January, indicating potential equipment cycling or seasonal demand.

• Central Park consumption peaks at 22,819 kWh in January, suggesting higher lighting/irrigation needs during winter months.

• CIF Kitchen maintains consistently high consumption (14,971-18,446 kWh), indicating steady operational demand.

• Several Pumping Stations show increasing trend from November to April, particularly PS01 (1,629 to 3,940 kWh).

• Apartment units in Zone 3 show relatively stable consumption patterns, ranging 500-2,000 kWh monthly.

Recommendations:
• Investigate Beachwell's consumption patterns for potential optimization
• Monitor Central Park seasonal variations for efficiency improvements
• Consider load balancing strategies for high-consuming infrastructure units`);
      setIsAiLoading(false);
    }, 2000);
  };

  // Sub-navigation for electricity module
  const ElectricitySubNav = () => {
    const subSections = [
        { name: 'Dashboard', id: 'Dashboard', icon: LayoutDashboard },
        { name: 'Performance', id: 'Performance', icon: TrendingUp },
        { name: 'Analytics', id: 'Analytics', icon: BarChart2 },
        { name: 'Unit Details', id: 'UnitDetails', icon: List },
    ];
    
    return (
      <div className="mb-6 print:hidden flex justify-center">
        <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200">
          {subSections.map((tab) => {
            const isActive = activeSubSection === tab.id;
            return ( 
              <button 
                key={tab.id} 
                onClick={() => setActiveSubSection(tab.id)} 
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`} 
                style={{ backgroundColor: isActive ? COLORS.primary : 'transparent', color: isActive ? 'white' : COLORS.primaryDark, }} 
                onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = COLORS.primaryLight; if(!isActive) e.currentTarget.style.color = 'white';}} 
                onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; if(!isActive) e.currentTarget.style.color = COLORS.primaryDark;}}
              > 
                <tab.icon size={18} style={{ color: isActive ? 'white' : COLORS.primary }}/> 
                <span>{tab.name}</span> 
              </button> 
            );
          })}
        </div>
      </div>
    );
  };

  // Filter Bar
  const FilterBar = () => {
    const monthOptions = [{ value: "All Months", label: "All Months" }, ...availableMonths.map(m => ({ value: m, label: m }))];
    const categoryOptions = [{ value: "All Categories", label: "All Categories" }, ...distinctCategories.map(c => ({ value: c, label: c }))];
    
    return (
      <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden sticky top-[110px] md:top-[88px] z-10 border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <StyledSelect 
            id="monthFilter" 
            label="Filter by Month" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)} 
            options={monthOptions} 
            icon={CalendarDays}
          />
          <StyledSelect 
            id="categoryFilter" 
            label="Filter by Unit Category" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            options={categoryOptions} 
            icon={List}
          />
          <button 
            onClick={() => { setSelectedMonth("All Months"); setSelectedCategory("All Categories"); }} 
            className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto hover:shadow-lg" 
            style={{ backgroundColor: COLORS.primaryDark }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primary} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark}
          > 
            <Filter size={16}/> 
            <span>Reset Filters</span> 
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ElectricitySubNav />
      
      {activeSubSection === 'Dashboard' && <FilterBar />}
      
      {activeSubSection === 'Dashboard' && (
        <ElectricityDashboard
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
          kpiAndTableData={kpiAndTableData}
          filteredElectricityData={filteredElectricityData}
          totalConsumptionKWh={totalConsumptionKWh}
          totalCostOMR={totalCostOMR}
          averageConsumptionPerUnit={averageConsumptionPerUnit}
          activeMeters={activeMeters}
          availableMonths={availableMonths}
          handleAiAnalysis={handleAiAnalysis}
          isAiModalOpen={isAiModalOpen}
          setIsAiModalOpen={setIsAiModalOpen}
          aiAnalysisResult={aiAnalysisResult}
          isAiLoading={isAiLoading}
        />
      )}

      {activeSubSection === 'Performance' && (
        <ElectricityPerformance
          kpiAndTableData={kpiAndTableData}
          filteredElectricityData={filteredElectricityData}
          selectedMonth={selectedMonth}
        />
      )}

      {activeSubSection === 'Analytics' && (
        <ElectricityAnalytics
          kpiAndTableData={kpiAndTableData}
          filteredElectricityData={filteredElectricityData}
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
        />
      )}

      {activeSubSection === 'UnitDetails' && (
        <ElectricityUnitDetails
          kpiAndTableData={kpiAndTableData}
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default ElectricitySystemModule;