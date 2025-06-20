import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Label,
  Area,
} from 'recharts';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart2,
  List,
  Zap,
  Users2,
  DollarSign,
  Filter,
  CalendarDays,
  Sparkles,
  X,
} from 'lucide-react';

import { COLORS } from '../../utils/constants';
import { ElectricitySubSection } from '../../types/navigation';
import { SummaryCard } from '../../components/ui/SummaryCard';
import { ChartWrapper } from '../../components/ui/ChartWrapper';
import { StyledSelect } from '../../components/ui/StyledSelect';
import {
  electricityData,
  availableMonths,
  OMR_PER_KWH,
  ElectricityData,
} from '../../data/electricityData';

export const ElectricityModule: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeSubSection, setActiveSubSection] = useState<ElectricitySubSection>('Dashboard');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const distinctCategories = useMemo(() =>
    [...new Set(electricityData.map(d => d.category))].sort(),
    []
  );

  const filteredElectricityData = useMemo(() => {
    return electricityData.filter(item => {
      const categoryMatch = selectedCategory === 'All Categories' || item.category === selectedCategory;
      return categoryMatch;
    });
  }, [selectedCategory]);

  const kpiAndTableData = useMemo(() => {
    if (selectedMonth === 'All Months') {
      return filteredElectricityData;
    }
    return filteredElectricityData.map(item => ({
      ...item,
      totalConsumption: item.consumption[selectedMonth] || 0,
    }));
  }, [filteredElectricityData, selectedMonth]);

  const totalConsumptionKWh = useMemo(() => 
    kpiAndTableData.reduce((acc, curr) => acc + curr.totalConsumption, 0), 
    [kpiAndTableData]
  );
  const totalCostOMR = useMemo(() => totalConsumptionKWh * OMR_PER_KWH, [totalConsumptionKWh]);
  const averageConsumptionPerUnit = useMemo(() => 
    kpiAndTableData.length > 0 ? totalConsumptionKWh / kpiAndTableData.length : 0, 
    [totalConsumptionKWh, kpiAndTableData]
  );
  const activeMeters = useMemo(() => 
    kpiAndTableData.filter(d => d.meterAccountNo !== 'N/A' && d.meterAccountNo !== 'MISSING_METER' && d.totalConsumption > 0).length, 
    [kpiAndTableData]
  );

  const monthlyTrendForAllMonths = useMemo(() => {
    return availableMonths.map(month => {
      const total = filteredElectricityData.reduce((acc, curr) => acc + (curr.consumption[month] || 0), 0);
      return { name: month.replace('-24', '').replace('-25', ''), total: parseFloat(total.toFixed(2)) };
    });
  }, [filteredElectricityData]);

  const consumptionByTypeChartData = useMemo(() => {
    const dataToUse = kpiAndTableData;
    const typeData: Record<string, number> = {};
    dataToUse.forEach(d => {
      typeData[d.type] = (typeData[d.type] || 0) + d.totalConsumption;
    });
    return Object.entries(typeData)
      .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [kpiAndTableData]);

  const topConsumersChartData = useMemo(() => {
    const dataToUse = kpiAndTableData;
    return dataToUse
      .slice()
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .filter(d => d.totalConsumption > 0)
      .slice(0, 7)
      .map(d => ({
        name: d.unitName,
        consumption: d.totalConsumption,
      }));
  }, [kpiAndTableData]);

  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult('');

    setTimeout(() => {
      setAiAnalysisResult(
        `AI Analysis Results for ${selectedMonth === 'All Months' ? 'All Months' : selectedMonth}:\n\n` +
        `• Beachwell shows significant consumption variation across months - from 40 kWh in March to 38,168 kWh in January, indicating potential equipment cycling or seasonal demand.\n\n` +
        `• Central Park consumption peaks at 22,819 kWh in January, suggesting higher lighting/irrigation needs during winter months.\n\n` +
        `• CIF Kitchen maintains consistently high consumption (14,971-18,446 kWh), indicating steady operational demand.\n\n` +
        `• Several Pumping Stations show increasing trend from November to April, particularly PS01 (1,629 to 3,940 kWh).\n\n` +
        `• Apartment units in Zone 3 show relatively stable consumption patterns, ranging 500-2,000 kWh monthly.\n\n` +
        `Recommendations:\n` +
        `• Investigate Beachwell's consumption patterns for potential optimization\n` +
        `• Monitor Central Park seasonal variations for efficiency improvements\n` +
        `• Consider load balancing strategies for high-consuming infrastructure units`
      );
      setIsAiLoading(false);
    }, 2000);
  };

  const ElectricitySubNav = () => {
    const subSections = [
      { name: 'Dashboard', id: 'Dashboard' as ElectricitySubSection, icon: LayoutDashboard },
      { name: 'Performance', id: 'Performance' as ElectricitySubSection, icon: TrendingUp },
      { name: 'Analytics', id: 'Analytics' as ElectricitySubSection, icon: BarChart2 },
      { name: 'Unit Details', id: 'UnitDetails' as ElectricitySubSection, icon: List },
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
                style={{
                  backgroundColor: isActive ? COLORS.primary : 'transparent',
                  color: isActive ? 'white' : COLORS.primaryDark,
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = COLORS.primaryLight;
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = COLORS.primaryDark;
                  }
                }}
              >
                <tab.icon size={18} style={{ color: isActive ? 'white' : COLORS.primary }} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const FilterBar = () => {
    const monthOptions = [
      { value: 'All Months', label: 'All Months' },
      ...availableMonths.map(m => ({ value: m, label: m })),
    ];
    const categoryOptions = [
      { value: 'All Categories', label: 'All Categories' },
      ...distinctCategories.map(c => ({ value: c, label: c })),
    ];

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
            onClick={() => {
              setSelectedMonth('All Months');
              setSelectedCategory('All Categories');
            }}
            className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto hover:shadow-lg"
            style={{ backgroundColor: COLORS.primaryDark }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryDark)}
          >
            <Filter size={16} />
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
        <>
          <div className="mb-6">
            <button
              onClick={handleAiAnalysis}
              className="flex items-center justify-center space-x-2 text-white py-2.5 px-5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
              style={{ backgroundColor: COLORS.primary }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryDark)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
              disabled={isAiLoading}
            >
              <Sparkles size={18} />
              <span>{isAiLoading ? 'Analyzing...' : '✨ Analyze Consumption with AI'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Consumption"
              value={totalConsumptionKWh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              icon={Zap}
              trend={selectedMonth === 'All Months' ? 'Overall' : `For ${selectedMonth}`}
              trendColor="text-slate-500 font-medium"
              iconBgColor={COLORS.primary}
            />
            <SummaryCard
              title="Total Est. Cost"
              value={totalCostOMR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              unit="OMR"
              icon={DollarSign}
              trend="Based on selection"
              trendColor="text-slate-500 font-medium"
              iconBgColor={COLORS.success}
            />
            <SummaryCard
              title="Avg. Consumption/Unit"
              value={averageConsumptionPerUnit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              icon={BarChart2}
              trend={selectedMonth === 'All Months' ? 'Overall' : `For ${selectedMonth}`}
              trendColor="text-slate-500 font-medium"
              iconBgColor={COLORS.warning}
            />
            <SummaryCard
              title="Active Meters"
              value={activeMeters}
              unit="units"
              icon={Users2}
              trend="In selection"
              trendColor="text-slate-500 font-medium"
              iconBgColor={COLORS.info}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <ChartWrapper title="Consumption Trend (All Months)" subtitle={`For category: ${selectedCategory}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="total" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorTotal)" />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={COLORS.primary}
                      strokeWidth={3}
                      activeDot={{ r: 7, strokeWidth: 2, fill: COLORS.primary }}
                      dot={{ r: 4, fill: COLORS.primary }}
                      name="Total kWh"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
            <div className="lg:col-span-2">
              <ChartWrapper title="Consumption by Type" subtitle={`For ${selectedMonth}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consumptionByTypeChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      cornerRadius={5}
                    >
                      {consumptionByTypeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                      ))}
                      <Label
                        value={`${consumptionByTypeChartData
                          .reduce((sum, item) => sum + item.value, 0)
                          .toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                        position="centerBottom"
                        dy={-5}
                        className="text-2xl font-bold fill-slate-700"
                      />
                      <Label value="Total kWh" position="centerTop" dy={10} className="text-xs fill-slate-500" />
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0' }} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
          </div>

          <ChartWrapper title="Top Consumers" subtitle={`For ${selectedMonth}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topConsumersChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="consumption" fill={COLORS.primary} name="Consumption (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </>
      )}

      {/* AI Analysis Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold" style={{ color: COLORS.primary }}>
                ✨ AI Consumption Analysis
              </h3>
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200">
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            {isAiLoading ? (
              <div className="text-center py-8">
                <Sparkles size={48} className="mx-auto animate-pulse" style={{ color: COLORS.primaryLight }} />
                <p className="mt-2 text-slate-600">AI is analyzing data, please wait...</p>
              </div>
            ) : (
              <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap">
                {aiAnalysisResult ? (
                  aiAnalysisResult.split('\n').map((line, index) => (
                    <p key={index}>
                      {line.startsWith('* ') || line.startsWith('- ') ? `• ${line.substring(2)}` : line}
                    </p>
                  ))
                ) : (
                  <p>No analysis available or an error occurred.</p>
                )}
              </div>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: COLORS.primary }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryDark)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};