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
  ComposedChart,
} from 'recharts';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart2,
  Combine,
  Droplets,
  Recycle,
  Activity,
  Database,
  Gauge,
  Power,
  Target,
  CalendarDays,
  Sparkles,
  X,
  FlaskConical,
} from 'lucide-react';

import { COLORS } from '../../utils/constants';
import { STPSubSection } from '../../types/navigation';
import { SummaryCard } from '../../components/ui/SummaryCard';
import { ChartWrapper } from '../../components/ui/ChartWrapper';
import { StyledSelect } from '../../components/ui/StyledSelect';
import { stpData, PLANT_DESIGN_CAPACITY } from '../../data/stpData';

export const STPModule: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState<STPSubSection>('Dashboard');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract available months from the data
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    stpData.forEach(item => {
      if (item.parsedDate) {
        const monthYear = item.parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthsSet.add(monthYear);
      }
    });
    return Array.from(monthsSet).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }, []);

  // Data processing for selected month
  const filteredStpData = useMemo(() => {
    if (selectedMonth === 'All Months') {
      return stpData;
    }

    return stpData.filter(item => {
      if (!item.parsedDate) return false;
      const itemMonth = item.parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return itemMonth === selectedMonth;
    });
  }, [selectedMonth]);

  // KPI Calculations
  const kpiData = useMemo(() => {
    const data = filteredStpData;
    const totalDays = data.length;

    if (totalDays === 0) {
      return {
        avgTreatedWater: 0,
        avgTseOutput: 0,
        avgEfficiency: 0,
        totalTankersDischarge: 0,
        avgTankerPercentage: 0,
        capacityUtilization: 0,
        totalDays: 0,
        totalTreatedWater: 0,
        totalTseOutput: 0,
        totalInputProcess: 0,
        avgTotalInput: 0,
      };
    }

    const totalTreatedWater = data.reduce((acc, curr) => acc + curr.treatedWater, 0);
    const totalTseOutput = data.reduce((acc, curr) => acc + curr.tseOutput, 0);
    const totalInputProcess = data.reduce((acc, curr) => acc + curr.totalInlet, 0);
    const avgTreatedWater = totalTreatedWater / totalDays;
    const avgTseOutput = totalTseOutput / totalDays;
    const avgTotalInput = totalInputProcess / totalDays;
    const avgEfficiency = data.reduce((acc, curr) => acc + curr.treatmentEfficiency, 0) / totalDays;
    const totalTankersDischarge = data.reduce((acc, curr) => acc + curr.tankersDischarge, 0);
    const avgTankerPercentage = data.reduce((acc, curr) => acc + curr.tankerPercentage, 0) / totalDays;
    const capacityUtilization = (avgTreatedWater / PLANT_DESIGN_CAPACITY) * 100;

    return {
      avgTreatedWater: Math.round(avgTreatedWater),
      avgTseOutput: Math.round(avgTseOutput),
      avgEfficiency: Math.round(avgEfficiency * 10) / 10,
      totalTankersDischarge,
      avgTankerPercentage: Math.round(avgTankerPercentage * 10) / 10,
      capacityUtilization: Math.round(capacityUtilization * 10) / 10,
      totalDays,
      totalTreatedWater: Math.round(totalTreatedWater),
      totalTseOutput: Math.round(totalTseOutput),
      totalInputProcess: Math.round(totalInputProcess),
      avgTotalInput: Math.round(avgTotalInput),
    };
  }, [filteredStpData]);

  // Recent 15 days trend data
  const trendData = useMemo(() => {
    return filteredStpData.slice(-15).map(item => ({
      date: item.date ? item.date.substring(0, 5) : 'N/A', // Show MM/DD
      treated: item.treatedWater || 0,
      tse: item.tseOutput || 0,
      inlet: item.totalInlet || 0,
      efficiency: Math.round((item.treatmentEfficiency || 0) * 10) / 10,
      tankers: item.tankersDischarge || 0,
    }));
  }, [filteredStpData]);

  // Process efficiency breakdown
  const processEfficiencyData = useMemo(() => {
    const data = filteredStpData;
    if (data.length === 0) {
      return [
        { name: 'Treatment Efficiency', value: 0, color: COLORS.success },
        { name: 'Irrigation Efficiency', value: 0, color: COLORS.info },
        { name: 'Tanker Input Ratio', value: 0, color: COLORS.warning },
        { name: 'Direct Sewage Ratio', value: 0, color: COLORS.accent },
      ];
    }

    const avgTreatmentEff = data.reduce((acc, curr) => acc + (curr.treatmentEfficiency || 0), 0) / data.length;
    const avgIrrigationEff = data.reduce((acc, curr) => acc + (curr.irrigationEfficiency || 0), 0) / data.length;
    const avgTankerRatio = data.reduce((acc, curr) => acc + (curr.tankerPercentage || 0), 0) / data.length;

    return [
      { name: 'Treatment Efficiency', value: Math.round(avgTreatmentEff * 10) / 10, color: COLORS.success },
      { name: 'Irrigation Efficiency', value: Math.round(avgIrrigationEff * 10) / 10, color: COLORS.info },
      { name: 'Tanker Input Ratio', value: Math.round(avgTankerRatio * 10) / 10, color: COLORS.warning },
      { name: 'Direct Sewage Ratio', value: Math.round((100 - avgTankerRatio) * 10) / 10, color: COLORS.accent },
    ];
  }, [filteredStpData]);

  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult('');

    setTimeout(() => {
      const monthText = selectedMonth === 'All Months' ? 'All Available Data' : selectedMonth;
      const remainingCapacity = Math.max(0, PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater);
      const performanceStatus =
        kpiData.capacityUtilization > 85
          ? 'NEAR CAPACITY'
          : kpiData.capacityUtilization > 70
          ? 'HIGH UTILIZATION'
          : kpiData.capacityUtilization > 50
          ? 'MODERATE UTILIZATION'
          : 'LOW UTILIZATION';

      setAiAnalysisResult(
        `🔬 AI Analysis Results for STP Plant (${monthText}):\n\n` +
          `📊 PERFORMANCE SUMMARY:\n` +
          `• Plant Design Capacity: ${PLANT_DESIGN_CAPACITY} m³/day\n` +
          `• Period: ${
            selectedMonth === 'All Months' ? `${kpiData.totalDays} days total` : `${selectedMonth} (${kpiData.totalDays} days)`
          }\n` +
          `• Total Water Treated: ${kpiData.totalTreatedWater.toLocaleString()} m³\n` +
          `• Total Input Processed: ${kpiData.totalInputProcess.toLocaleString()} m³\n` +
          `• Total TSE Production: ${kpiData.totalTseOutput.toLocaleString()} m³\n` +
          `• Current Avg Production: ${kpiData.avgTreatedWater} m³/day\n` +
          `• Capacity Utilization: ${kpiData.capacityUtilization}% (${performanceStatus})\n\n` +
          `🎯 CAPACITY ANALYSIS:\n` +
          `• ${
            kpiData.capacityUtilization > 80
              ? 'HIGH DEMAND: Operating near design limits'
              : kpiData.capacityUtilization > 60
              ? 'MODERATE DEMAND: Good operational range'
              : 'LOW DEMAND: Significant spare capacity available'
          }\n` +
          `• Remaining Daily Capacity: ${remainingCapacity} m³/day\n` +
          `• Treatment Efficiency: ${kpiData.avgEfficiency}% (Target: >90%)\n` +
          `• TSE Recovery Rate: ${
            kpiData.avgTreatedWater > 0 ? Math.round((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) : 0
          }%\n` +
          `• Tanker Operations: ${kpiData.totalTankersDischarge} units (${kpiData.avgTankerPercentage.toFixed(
            1
          )}% of input)\n\n` +
          `💡 STRATEGIC RECOMMENDATIONS:\n` +
          `• CAPACITY: ${
            kpiData.capacityUtilization > 85
              ? 'URGENT - Consider expansion planning, operating near design limits'
              : kpiData.capacityUtilization < 50
              ? 'OPPORTUNITY - Significant spare capacity for growth'
              : 'OPTIMAL - Good utilization range for efficient operations'
          }\n` +
          `• EFFICIENCY: ${
            kpiData.avgEfficiency < 85
              ? 'CRITICAL - Investigate treatment process efficiency, equipment maintenance required'
              : 'MAINTAIN - Current operational standards meeting targets'
          }\n` +
          `• TSE UTILIZATION: ${
            kpiData.totalTseOutput > 0
              ? `${kpiData.totalTseOutput.toLocaleString()} m³ TSE available for irrigation - optimize reuse programs`
              : 'Monitor TSE production for irrigation opportunities'
          }`
      );
      setIsAiLoading(false);
    }, 2500);
  };

  // Sub-navigation for STP module
  const StpSubNav = () => {
    const subSections = [
      { name: 'Dashboard', id: 'Dashboard' as STPSubSection, icon: LayoutDashboard },
      { name: 'Performance', id: 'Performance' as STPSubSection, icon: TrendingUp },
      { name: 'Process Flow', id: 'ProcessFlow' as STPSubSection, icon: Combine },
      { name: 'Analytics', id: 'Analytics' as STPSubSection, icon: BarChart2 },
    ];

    return (
      <div className="mb-6 print:hidden flex justify-center">
        <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200">
          {subSections.map(tab => {
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
                onMouseOver={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = COLORS.primaryLight;
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={e => {
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

  // Filter Bar
  const FilterBar = () => {
    const monthOptions = [
      { value: 'All Months', label: 'All Months' },
      ...availableMonths.map(m => ({ value: m, label: m })),
    ];

    return (
      <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden sticky top-[110px] md:top-[88px] z-10 border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <StyledSelect
            id="monthFilter"
            label="Select Month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            options={monthOptions}
            icon={CalendarDays}
          />
          <div></div>
          <button
            onClick={handleAiAnalysis}
            className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto hover:shadow-lg"
            style={{ backgroundColor: COLORS.accent }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = COLORS.primary)}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = COLORS.accent)}
            disabled={isAiLoading}
          >
            <Sparkles size={16} />
            <span>{isAiLoading ? 'Analyzing...' : '🧠 AI Analysis'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">STP Plant Operations</h1>
        <p className="text-slate-600">Sewage Treatment Plant Performance Analytics</p>
      </div>

      <StpSubNav />

      {activeSubSection === 'Dashboard' && <FilterBar />}

      {activeSubSection === 'Dashboard' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <SummaryCard
              title={selectedMonth === 'All Months' ? 'Total Treated Water' : `${selectedMonth} Total`}
              value={kpiData.totalTreatedWater.toLocaleString()}
              unit="m³"
              icon={Droplets}
              trend={`${kpiData.avgTreatedWater} m³/day avg`}
              trendColor="text-slate-500"
              iconBgColor={COLORS.info}
              isLoading={isLoading}
            />
            <SummaryCard
              title={selectedMonth === 'All Months' ? 'Total Input Process' : `${selectedMonth} Input`}
              value={kpiData.totalInputProcess.toLocaleString()}
              unit="m³"
              icon={Activity}
              trend={`${kpiData.avgTotalInput} m³/day avg`}
              trendColor="text-slate-600"
              iconBgColor={COLORS.accent}
              isLoading={isLoading}
            />
            <SummaryCard
              title={selectedMonth === 'All Months' ? 'Total TSE Production' : `${selectedMonth} TSE`}
              value={kpiData.totalTseOutput.toLocaleString()}
              unit="m³"
              icon={Recycle}
              trend={`${kpiData.avgTseOutput} m³/day avg`}
              trendColor="text-green-600"
              iconBgColor={COLORS.warning}
              isLoading={isLoading}
            />
            <SummaryCard
              title="Capacity Utilization"
              value={kpiData.capacityUtilization}
              unit="%"
              icon={Gauge}
              trend={`${Math.max(0, PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater)} m³/day spare`}
              trendColor="text-slate-600"
              iconBgColor={COLORS.primary}
              isLoading={isLoading}
            />
            <SummaryCard
              title={selectedMonth === 'All Months' ? 'Total Tankers' : `${selectedMonth} Tankers`}
              value={kpiData.totalTankersDischarge}
              unit="units"
              icon={Database}
              trend={`${kpiData.avgTankerPercentage.toFixed(1)}% of input`}
              trendColor="text-slate-600"
              iconBgColor={COLORS.success}
              isLoading={isLoading}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartWrapper
                title="Daily Treatment Performance"
                subtitle={`Recent 15 days - ${selectedMonth === 'All Months' ? 'Latest Data' : selectedMonth}`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar yAxisId="left" dataKey="treated" fill={COLORS.chart[0]} name="Treated Water (m³)" />
                    <Bar yAxisId="left" dataKey="tse" fill={COLORS.chart[1]} name="TSE Output (m³)" />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke={COLORS.success} strokeWidth={3} name="Efficiency %" />
                    {/* Design capacity reference line */}
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey={() => PLANT_DESIGN_CAPACITY}
                      stroke={COLORS.error}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Design Capacity (750 m³)"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            <ChartWrapper title="Performance Metrics" subtitle={`${selectedMonth} efficiency breakdown`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processEfficiencyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    cornerRadius={3}
                  >
                    {processEfficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      value={`${Math.round(processEfficiencyData[0]?.value || 0)}%`}
                      position="centerBottom"
                      dy={-5}
                      className="text-xl font-bold fill-slate-700"
                    />
                    <Label value="Avg Efficiency" position="centerTop" dy={10} className="text-xs fill-slate-500" />
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        </>
      )}

      {activeSubSection === 'ProcessFlow' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-semibold text-slate-700 mb-6 text-center">STP Process Flow Diagram</h3>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Input Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Droplets size={32} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">Raw Sewage Input</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>Tankers: {kpiData.avgTankerPercentage.toFixed(1)}%</p>
                  <p>Direct Line: {(100 - kpiData.avgTankerPercentage).toFixed(1)}%</p>
                  <p className="font-medium text-slate-800">
                    {selectedMonth === 'All Months'
                      ? `${kpiData.totalInputProcess.toLocaleString()} m³ total`
                      : `${kpiData.totalInputProcess.toLocaleString()} m³`}
                  </p>
                  <p className="text-xs text-blue-600">Avg: {kpiData.avgTotalInput} m³/day</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-slate-400 lg:w-16"></div>
                <div className="w-3 h-3 bg-slate-400 transform rotate-45 -ml-2"></div>
              </div>

              {/* Treatment Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Combine size={32} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">Treatment Process</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>Efficiency: {kpiData.avgEfficiency}%</p>
                  <p>Capacity: {kpiData.capacityUtilization}%</p>
                  <p className="font-medium text-slate-800">{kpiData.avgTreatedWater} m³/day</p>
                  <p className="text-xs text-green-600">
                    Remaining: {PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater} m³/day
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-slate-400 lg:w-16"></div>
                <div className="w-3 h-3 bg-slate-400 transform rotate-45 -ml-2"></div>
              </div>

              {/* Output Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Recycle size={32} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">TSE for Irrigation</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>
                    Recovery:{' '}
                    {kpiData.avgTreatedWater > 0
                      ? Math.round((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100)
                      : 0}
                    %
                  </p>
                  <p>Quality: Excellent</p>
                  <p className="font-medium text-slate-800">
                    {selectedMonth === 'All Months'
                      ? `${kpiData.totalTseOutput.toLocaleString()} m³ total`
                      : `${kpiData.totalTseOutput.toLocaleString()} m³`}
                  </p>
                  <p className="text-xs text-purple-600">Avg: {kpiData.avgTseOutput} m³/day</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h5 className="font-semibold text-blue-800 mb-2">Primary Treatment</h5>
                <p className="text-sm text-blue-600">
                  Physical separation of solids and liquids through screening and settling
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h5 className="font-semibold text-green-800 mb-2">Secondary Treatment</h5>
                <p className="text-sm text-green-600">
                  Biological treatment using activated sludge process for organic matter removal
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h5 className="font-semibold text-purple-800 mb-2">Tertiary Treatment</h5>
                <p className="text-sm text-purple-600">
                  Advanced filtration and disinfection producing high-quality TSE water
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold" style={{ color: COLORS.primary }}>
                🧠 AI STP Plant Analysis
              </h3>
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200">
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            {isAiLoading ? (
              <div className="text-center py-8">
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <Combine size={48} className="animate-pulse" style={{ color: COLORS.primaryLight }} />
                  <FlaskConical size={48} className="animate-bounce" style={{ color: COLORS.accent }} />
                </div>
                <p className="mt-2 text-slate-600">AI is analyzing STP performance data...</p>
                <p className="text-sm text-slate-500 mt-1">
                  Evaluating treatment efficiency, flow patterns, and operational metrics
                </p>
              </div>
            ) : (
              <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap font-mono">
                {aiAnalysisResult ? (
                  aiAnalysisResult.split('\n').map((line, index) => {
                    if (line.startsWith('📊') || line.startsWith('🎯') || line.startsWith('⚡') || line.startsWith('💡')) {
                      return (
                        <h4 key={index} className="font-bold text-lg mt-4 mb-2" style={{ color: COLORS.primary }}>
                          {line}
                        </h4>
                      );
                    }
                    if (line.startsWith('•')) {
                      return (
                        <p key={index} className="ml-4 text-slate-700">
                          {line}
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-slate-700">
                        {line}
                      </p>
                    );
                  })
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
                onMouseOver={e => (e.currentTarget.style.backgroundColor = COLORS.primaryDark)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = COLORS.primary)}
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};