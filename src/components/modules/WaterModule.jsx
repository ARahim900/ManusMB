import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Area
} from 'recharts';
import { 
  Droplets, CalendarDays, Building, Filter, CheckCircle, AlertCircle, 
  TrendingUp, Users2, Sparkles, X, LayoutDashboard, BarChart2, Database
} from 'lucide-react';
import { 
  waterSystemData, 
  waterMonthsAvailable, 
  getA1Supply, 
  getA2Total, 
  getA3Total, 
  calculateWaterLoss,
  zoneData,
  getZoneAnalysis,
  getAvailableZones
} from '../../../Database/waterDatabase.js';
import {
  getZoneWiseConsumption,
  getZoneLossAnalysis,
  getZoneStats,
  getZoneCustomerDetails,
  getAvailableZoneDetails,
  getAvailableMonths
} from '../../services/zoneDetailsService.js';
import {
  getMonthlyOverviewStats,
  getYearlyOverviewStats,
  getLossTrendData,
  getWaterFlowData,
  getConsumerCategoryData,
  getOverviewMonths,
  getOverviewYears
} from '../../services/waterOverviewService.js';
import GaugeChart from '../ui/GaugeChart';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import { Button } from '@/components/ui/button';

// Design System Colors
const COLORS = {
  primary: '#4E4456',
  primaryLight: '#7E708A',
  primaryDark: '#3B3241',
  accent: '#6A5ACD',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  error: '#EF4444',
  chart: ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4', '#32CD32', '#FF6347', '#4169E1']
};

const WaterAnalysisModule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWaterMonth, setSelectedWaterMonth] = useState('May-25');
  const [activeWaterSubSection, setActiveWaterSubSection] = useState('Overview');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedZoneForAnalysis, setSelectedZoneForAnalysis] = useState('Zone_FM');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Zone Details Analysis state
  const [selectedZoneDetails, setSelectedZoneDetails] = useState('ZONE_FM');
  const [selectedDetailsMonth, setSelectedDetailsMonth] = useState('May-25');
  
  // Water Distribution Overview state
  const [selectedOverviewMonth, setSelectedOverviewMonth] = useState('May-25');
  const [selectedOverviewYear, setSelectedOverviewYear] = useState('2025');

  // Reset pagination when zone changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedZoneForAnalysis]);

  // Water System Calculations based on hierarchical structure
  const waterCalculations = useMemo(() => {
    const monthData = selectedWaterMonth;
    const lossData = calculateWaterLoss(monthData);
    
    // Get meter collections for detailed analysis
    const zoneBulkMeters = waterSystemData.filter(item => item.label === 'L2');
    const directConnections = waterSystemData.filter(item => item.label === 'DC');
    const endUserMeters = waterSystemData.filter(item => item.label === 'L3');
    
    const L2_total = zoneBulkMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const L3_total = endUserMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const DC_total = directConnections.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);

    return {
      A1_totalSupply: lossData.A1_supply,
      A2_total: lossData.A2_total,
      A3_total: lossData.A3_total,
      L2_total,
      L3_total,
      DC_total,
      stage1Loss: lossData.stage1Loss,
      stage2Loss: lossData.stage2Loss,
      totalLoss: lossData.totalLoss,
      stage1LossPercent: lossData.stage1LossPercent,
      stage2LossPercent: lossData.stage2LossPercent,
      totalLossPercent: lossData.totalLossPercent,
      systemEfficiency: lossData.systemEfficiency,
      zoneBulkMeters,
      directConnections,
      endUserMeters
    };
  }, [selectedWaterMonth]);

  // Monthly trend data for water flow - A1, A2, A3 levels
  const monthlyWaterTrendData = useMemo(() => {
    const data = waterMonthsAvailable.map(month => {
      const A1_supply = getA1Supply(month);
      const A2_total = getA2Total(month);
      const A3_total = getA3Total(month);

      return {
        name: month.replace('-24', '').replace('-25', ''),
        'A1 - Main Source (NAMA)': A1_supply,
        'A2 - Primary Distribution (L2+DC)': A2_total,
        'A3 - End-User Consumption (L3+DC)': A3_total,
        'Water Loss': A1_supply - A3_total
      };
    });
    
    return data;
  }, []);

  // Zone-wise consumption data
  const zoneConsumptionData = useMemo(() => {
    const monthData = selectedWaterMonth;
    const zoneData = {};
    
    // Group L2 meters by zone for bulk consumption
    const L2_meters = waterSystemData.filter(item => item.label === 'L2');
    L2_meters.forEach(meter => {
      const zone = meter.zone;
      if (!zoneData[zone]) {
        zoneData[zone] = { zone, consumption: 0, type: 'Zone Bulk' };
      }
      zoneData[zone].consumption += meter.consumption[monthData] || 0;
    });

    return Object.values(zoneData).map(zone => ({
      ...zone,
      consumption: parseFloat(zone.consumption.toFixed(1))
    })).sort((a, b) => b.consumption - a.consumption);
  }, [selectedWaterMonth]);

  // Zone Analysis calculations
  const zoneAnalysisData = useMemo(() => {
    const analysis = getZoneAnalysis(selectedZoneForAnalysis, selectedWaterMonth);
    if (!analysis) return null;

    // For Direct Connection, we handle it differently
    if (selectedZoneForAnalysis === 'Direct_Connection') {
      const mainBulkConsumption = getA1Supply(selectedWaterMonth);
      const totalDirectConnections = analysis.totalIndividualConsumption;
      
      return {
        ...analysis,
        zoneBulkConsumption: mainBulkConsumption,
        mainBulkUsagePercent: mainBulkConsumption > 0 ? (totalDirectConnections / mainBulkConsumption) * 100 : 0,
        isDirectConnection: true
      };
    }

    return {
      ...analysis,
      isDirectConnection: false
    };
  }, [selectedZoneForAnalysis, selectedWaterMonth]);

  // Top water consumers
  const topWaterConsumers = useMemo(() => {
    const monthData = selectedWaterMonth;
    return waterSystemData
      .filter(item => item.consumption[monthData] > 0)
      .map(item => ({
        name: item.meterLabel,
        consumption: item.consumption[monthData] || 0,
        type: item.type,
        zone: item.zone,
        label: item.label
      }))
      .sort((a, b) => b.consumption - a.consumption)
      .slice(0, 10);
  }, [selectedWaterMonth]);

  // Water Quality Parameters (sample data)
  const waterQualityParameters = [
    { parameter: 'pH Level', value: 7.2, unit: '', status: 'normal', range: '6.5-8.5' },
    { parameter: 'Turbidity', value: 0.8, unit: 'NTU', status: 'good', range: '<1.0' },
    { parameter: 'Chlorine', value: 0.5, unit: 'mg/L', status: 'normal', range: '0.2-0.6' },
    { parameter: 'TDS', value: 245, unit: 'mg/L', status: 'normal', range: '<500' },
    { parameter: 'Temperature', value: 24.5, unit: '°C', status: 'normal', range: '20-30' },
    { parameter: 'Pressure', value: 2.1, unit: 'bar', status: 'good', range: '1.5-3.0' }
  ];

  // AI Analysis Handler
  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult("");
    
    setTimeout(() => {
      setAiAnalysisResult(`🚀 Water Module Implementation Complete!

📊 HIERARCHICAL WATER DISTRIBUTION MONITORING for ${selectedWaterMonth}:

A1 Level (L1): Main water source from NAMA
• Supply: ${waterCalculations.A1_totalSupply.toLocaleString()} m³

A2 Level (L2 + DC): Primary distribution through zone bulk meters and direct connections  
• Total Distribution: ${waterCalculations.A2_total.toLocaleString()} m³
• Zone Bulk Meters (L2): ${waterCalculations.L2_total.toLocaleString()} m³
• Direct Connections (DC): ${waterCalculations.DC_total.toLocaleString()} m³

A3 Level (L3 + DC): End-user consumption including individual meters
• Total Consumption: ${waterCalculations.A3_total.toLocaleString()} m³ 
• Individual Meters (L3): ${waterCalculations.L3_total.toLocaleString()} m³
• Direct Connections (DC): ${waterCalculations.DC_total.toLocaleString()} m³

💧 WATER LOSS ANALYSIS:

Stage 1 Loss: Trunk main loss between A1 and A2
• Loss: ${waterCalculations.stage1Loss.toFixed(0)} m³ (${waterCalculations.stage1LossPercent.toFixed(1)}%)
${waterCalculations.stage1Loss > 0 ? '• Indicates loss in main distribution network' : '• Negative indicates meter reading variance or measurement timing differences'}

Stage 2 Loss: Distribution loss within zones (L2 to L3)  
• Loss: ${waterCalculations.stage2Loss.toFixed(0)} m³ (${waterCalculations.stage2LossPercent.toFixed(1)}%)
• Loss within zone distribution networks

Total System Loss: Overall water loss calculation with efficiency metrics
• Total Variance: ${waterCalculations.totalLoss.toFixed(0)} m³ (${Math.abs(waterCalculations.totalLossPercent).toFixed(1)}%)
• System Efficiency: ${waterCalculations.systemEfficiency.toFixed(1)}%

🎯 KEY INSIGHTS:

• Top Consuming Zones:
  ${zoneConsumptionData.slice(0, 3).map((zone, idx) => 
    `\n  ${idx + 1}. ${zone.zone}: ${zone.consumption.toLocaleString()} m³`
  ).join('')}

• Critical Observations:
  ${waterCalculations.totalLossPercent > 25 ? '- High water loss detected - immediate investigation required' : 
    waterCalculations.totalLossPercent > 15 ? '- Moderate water loss - consider infrastructure review' : 
    '- Water loss within acceptable range'}
  ${waterCalculations.stage1Loss < 0 ? '\n  - Meter calibration check recommended due to negative variance' : ''}

📈 RECOMMENDATIONS:

1. ${waterCalculations.stage2LossPercent > 30 ? 'URGENT: Investigate zone distribution networks for leaks' :
     waterCalculations.stage2LossPercent > 20 ? 'Schedule infrastructure inspection for distribution networks' :
     'Continue regular maintenance schedule'}

2. ${waterCalculations.DC_total > waterCalculations.L2_total ? 'High direct connection usage - consider zone metering expansion' :
     'Zone metering coverage is adequate'}

3. Focus areas for improvement:
   - Monitor ${topWaterConsumers[0]?.name || 'high consumption areas'} (${topWaterConsumers[0]?.consumption.toLocaleString() || 0} m³)
   - ${waterCalculations.systemEfficiency < 80 ? 'Implement water conservation measures' : 'Maintain current conservation practices'}

💡 SYSTEM PERFORMANCE: ${waterCalculations.systemEfficiency > 85 ? 'EXCELLENT' : 
                        waterCalculations.systemEfficiency > 75 ? 'GOOD' : 
                        waterCalculations.systemEfficiency > 65 ? 'FAIR' : 'NEEDS IMPROVEMENT'}`);
      setIsAiLoading(false);
    }, 2000);
  };

  // Water Sub-navigation
  const WaterSubNav = () => {
    const subSections = [
      { name: 'Overview', id: 'Overview', icon: LayoutDashboard },
      { name: 'Water Loss Analysis', id: 'WaterLoss', icon: TrendingUp },
      { name: 'Zone Analysis', id: 'ZoneAnalysis', icon: BarChart2 },
      { name: 'Zone Details', id: 'ZoneDetails', icon: Database },
      { name: 'Main Database', id: 'MainDatabase', icon: Database },
      { name: 'Overview', id: 'Overview_New', icon: CheckCircle },
    ];
    
    return (
      <div className="mb-6 print:hidden flex justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
          {subSections.map((tab) => {
            const isActive = activeWaterSubSection === tab.id;
            return ( 
              <button 
                key={tab.id} 
                onClick={() => setActiveWaterSubSection(tab.id)} 
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActive 
                    ? 'bg-primary text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              > 
                <tab.icon size={18} className={isActive ? 'text-white' : 'text-primary dark:text-blue-400'}/> 
                <span>{tab.name}</span> 
              </button> 
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-background-primary dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-2 transition-colors duration-300">Muscat Bay Water Analysis System</h1>
        <p className="text-secondary dark:text-gray-300 transition-colors duration-300">Real Hierarchical Water Distribution Monitoring & Loss Analysis</p>
      </div>

      <WaterSubNav />

      {activeWaterSubSection === 'Overview' && (
        <>
          {/* AI Analysis Button */}
          <div className="mb-6 text-center">
            <Button 
              onClick={handleAiAnalysis}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              disabled={isAiLoading}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isAiLoading ? 'Analyzing...' : 'AI Water System Analysis'}
            </Button>
          </div>

          {/* First Layer KPI Cards - A1, A2, A3 Levels */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-300">Water System Hierarchy Levels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                title="A1 - Main Source (L1)" 
                value={waterCalculations.A1_totalSupply.toLocaleString()} 
                unit="m³" 
                icon={Droplets} 
                subtitle="Main Bulk (NAMA) - Single Entry Point" 
                iconColor="text-blue-600" 
              />
              <MetricCard 
                title="A2 - Primary Distribution" 
                value={waterCalculations.A2_total.toLocaleString()} 
                unit="m³" 
                icon={Building} 
                subtitle="Zone Bulk + Direct Connections (L2 + DC)" 
                iconColor="text-yellow-600" 
              />
              <MetricCard 
                title="A3 - End-User Consumption" 
                value={waterCalculations.A3_total.toLocaleString()} 
                unit="m³" 
                icon={Users2} 
                subtitle="End-Users + Direct Connections (L3 + DC)" 
                iconColor="text-green-600" 
              />
            </div>
          </div>

          {/* Second Layer KPI Cards - Loss Analysis */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-300">Water Loss Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                title="Stage 1 Loss (Trunk Main)" 
                value={Math.abs(waterCalculations.stage1Loss).toFixed(0)} 
                unit="m³" 
                icon={AlertCircle} 
                subtitle={`A1 - A2: ${Math.abs(waterCalculations.stage1LossPercent).toFixed(1)}%`} 
                iconColor={waterCalculations.stage1Loss < 0 ? "text-orange-600" : "text-red-600"} 
              />
              <MetricCard 
                title="Stage 2 Loss (Distribution)" 
                value={waterCalculations.stage2Loss.toFixed(0)} 
                unit="m³" 
                icon={TrendingUp} 
                subtitle={`L2 - L3: ${waterCalculations.stage2LossPercent.toFixed(1)}%`} 
                iconColor="text-orange-600" 
              />
              <MetricCard 
                title="Total System Loss" 
                value={Math.abs(waterCalculations.totalLoss).toFixed(0)} 
                unit="m³" 
                icon={CheckCircle} 
                subtitle={`A1 - A3: ${Math.abs(waterCalculations.totalLossPercent).toFixed(1)}%`} 
                iconColor="text-green-600" 
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Water System Hierarchy Trends" subtitle="A1, A2, A3 flow analysis by month">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyWaterTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="A1 - Main Source (NAMA)" stroke={COLORS.info} name="A1 - Main Source (m³)" strokeWidth={3} />
                  <Line type="monotone" dataKey="A2 - Primary Distribution (L2+DC)" stroke={COLORS.warning} name="A2 - Primary Distribution (m³)" strokeWidth={3} />
                  <Line type="monotone" dataKey="A3 - End-User Consumption (L3+DC)" stroke={COLORS.success} name="A3 - End-User Consumption (m³)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Zone Bulk Consumption" subtitle={`Zone distribution for ${selectedWaterMonth}`}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={zoneConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill={COLORS.primary} name="Consumption (m³)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Top Consumers Table */}
          <ChartCard title="Top Water Consumers" subtitle={`Highest consumption for ${selectedWaterMonth}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-200">Rank</th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-200">Meter Label</th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-200">Type</th>
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-200">Zone</th>
                    <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-200">Consumption (m³)</th>
                    <th className="text-center p-3 font-semibold text-gray-700 dark:text-gray-200">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {topWaterConsumers.map((consumer, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="p-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                          index < 3 ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-800 dark:text-gray-200">{consumer.name}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{consumer.type}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{consumer.zone}</td>
                      <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">{consumer.consumption.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          consumer.label === 'L1' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                          consumer.label === 'L2' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          consumer.label === 'L3' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }`}>
                          {consumer.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </>
      )}

      {activeWaterSubSection === 'WaterLoss' && (
        <>
          {/* Water Loss Filter Bar */}
          <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mb-6 print:hidden border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">Select Month for Analysis</label>
                <div className="relative">
                  <select 
                    value={selectedWaterMonth} 
                    onChange={(e) => setSelectedWaterMonth(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-300"
                  >
                    {waterMonthsAvailable.map(month => ( 
                      <option key={month} value={month}>{month}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
                    <CalendarDays size={16} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedWaterMonth('May-25')} 
                className="bg-primary dark:bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full sm:w-auto hover:shadow-lg hover:bg-opacity-90"
              > 
                <Filter size={16}/> 
                <span>Reset to Latest</span> 
              </button>
            </div>
          </div>

          {/* Water Loss Analysis Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Water Loss Analysis for {selectedWaterMonth}</h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Comprehensive analysis of water distribution efficiency and system losses</p>
          </div>

          {/* Water Loss Analysis Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard 
              title="System Efficiency" 
              value={waterCalculations.systemEfficiency.toFixed(1)} 
              unit="%" 
              icon={CheckCircle} 
              subtitle="Overall system performance" 
              iconColor="text-green-600" 
            />
            <MetricCard 
              title="Stage 1 Loss" 
              value={Math.abs(waterCalculations.stage1Loss).toFixed(0)} 
              unit="m³" 
              icon={AlertCircle} 
              subtitle={waterCalculations.stage1Loss < 0 ? "Meter Variance" : "Trunk Main Loss"} 
              iconColor={waterCalculations.stage1Loss < 0 ? "text-orange-600" : "text-red-600"} 
            />
            <MetricCard 
              title="Stage 2 Loss" 
              value={Math.abs(waterCalculations.stage2Loss).toFixed(0)} 
              unit="m³" 
              icon={TrendingUp} 
              subtitle="Within zone distribution" 
              iconColor="text-orange-600" 
            />
            <MetricCard 
              title="Total System Loss" 
              value={Math.abs(waterCalculations.totalLoss).toFixed(0)} 
              unit="m³" 
              icon={Droplets} 
              subtitle={`${Math.abs(waterCalculations.totalLossPercent).toFixed(1)}% total variance`} 
              iconColor={Math.abs(waterCalculations.totalLossPercent) > 15 ? "text-red-600" : "text-yellow-600"} 
            />
          </div>

          {/* Water Loss Breakdown Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Loss Percentage Breakdown */}
            <ChartCard title="Water Loss Breakdown" subtitle="Percentage distribution of losses">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { 
                        name: 'Revenue Water (A3)', 
                        value: waterCalculations.A3_total, 
                        fill: COLORS.success 
                      },
                      { 
                        name: waterCalculations.stage1Loss < 0 ? 'Meter Variance' : 'Stage 1 Loss', 
                        value: Math.abs(waterCalculations.stage1Loss), 
                        fill: waterCalculations.stage1Loss < 0 ? COLORS.warning : COLORS.error 
                      },
                      { 
                        name: 'Stage 2 Loss', 
                        value: Math.abs(waterCalculations.stage2Loss), 
                        fill: COLORS.accent 
                      }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} m³`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Monthly Loss Trend */}
            <ChartCard title="Monthly Loss Trend" subtitle="Water loss patterns over time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyWaterTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Water Loss" 
                    stroke={COLORS.error} 
                    name="Total Water Loss (m³)" 
                    strokeWidth={3} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Water Balance Diagram */}
          <ChartCard title="Water System Balance Analysis" subtitle={`Hierarchical flow analysis for ${selectedWaterMonth}`}>
            <div className="space-y-6 p-4">
              {/* Level A1 */}
              <div className="text-center">
                <div className="inline-block bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold text-blue-800 text-lg">A1 - Main Source (NAMA)</h3>
                  <p className="text-3xl font-bold text-blue-900">{waterCalculations.A1_totalSupply.toLocaleString()} m³</p>
                  <p className="text-sm text-blue-700">Total Water Supply</p>
                </div>
              </div>

              {/* Stage 1 Analysis */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className={`text-center p-4 rounded-lg border-2 ${waterCalculations.stage1Loss < 0 ? 'bg-orange-50 border-orange-300' : 'bg-red-50 border-red-300'}`}>
                    <div className={`text-lg font-semibold ${waterCalculations.stage1Loss < 0 ? 'text-orange-800' : 'text-red-800'}`}>
                      Stage 1 Analysis
                    </div>
                    <div className={`text-2xl font-bold ${waterCalculations.stage1Loss < 0 ? 'text-orange-900' : 'text-red-900'}`}>
                      {Math.abs(waterCalculations.stage1Loss).toFixed(0)} m³
                    </div>
                    <div className={`text-sm ${waterCalculations.stage1Loss < 0 ? 'text-orange-700' : 'text-red-700'}`}>
                      {Math.abs(waterCalculations.stage1LossPercent).toFixed(1)}% of A1 Supply
                    </div>
                    {waterCalculations.stage1Loss < 0 && (
                      <div className="text-xs text-orange-600 mt-1">*Indicates meter reading variance</div>
                    )}
                  </div>
                </div>
                <div className="text-center text-slate-400 text-3xl">↓</div>
              </div>

              {/* Level A2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-yellow-100 p-6 rounded-lg border-2 border-yellow-300">
                    <h3 className="font-bold text-yellow-800 text-lg">Zone Bulk Meters (L2)</h3>
                    <p className="text-2xl font-bold text-yellow-900">{waterCalculations.L2_total.toLocaleString()} m³</p>
                    <p className="text-sm text-yellow-700">{waterCalculations.zoneBulkMeters.length} Zone Meters</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      {((waterCalculations.L2_total / waterCalculations.A1_totalSupply) * 100).toFixed(1)}% of A1 Supply
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 p-6 rounded-lg border-2 border-purple-300">
                    <h3 className="font-bold text-purple-800 text-lg">Direct Connections (DC)</h3>
                    <p className="text-2xl font-bold text-purple-900">{waterCalculations.DC_total.toLocaleString()} m³</p>
                    <p className="text-sm text-purple-700">{waterCalculations.directConnections.length} DC Meters</p>
                    <p className="text-xs text-purple-600 mt-1">
                      {((waterCalculations.DC_total / waterCalculations.A1_totalSupply) * 100).toFixed(1)}% of A1 Supply
                    </p>
                  </div>
                </div>
              </div>

              {/* Stage 2 Loss */}
              <div className="text-center">
                <div className="inline-block bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                  <div className="text-lg font-semibold text-orange-800">Stage 2 Loss (Within Zones)</div>
                  <div className="text-2xl font-bold text-orange-900">{Math.abs(waterCalculations.stage2Loss).toFixed(0)} m³</div>
                  <div className="text-sm text-orange-700">
                    {Math.abs(waterCalculations.stage2LossPercent).toFixed(1)}% of Zone Bulk Distribution
                  </div>
                </div>
                <div className="text-center text-slate-400 text-3xl mt-4">↓</div>
              </div>

              {/* Level A3 */}
              <div className="text-center">
                <div className="inline-block bg-green-100 p-6 rounded-lg border-2 border-green-300">
                  <h3 className="font-bold text-green-800 text-lg">A3 - End-User Consumption</h3>
                  <p className="text-3xl font-bold text-green-900">{waterCalculations.A3_total.toLocaleString()} m³</p>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-green-700">
                    <div>
                      <p className="font-medium">Individual Meters (L3)</p>
                      <p className="text-lg font-bold">{waterCalculations.L3_total.toLocaleString()} m³</p>
                    </div>
                    <div>
                      <p className="font-medium">Direct Connections (DC)</p>
                      <p className="text-lg font-bold">{waterCalculations.DC_total.toLocaleString()} m³</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Revenue Water: {waterCalculations.systemEfficiency.toFixed(1)}% of A1 Supply
                  </p>
                </div>
              </div>
            </div>
          </ChartCard>
        </>
      )}

      {activeWaterSubSection === 'ZoneAnalysis' && (
        <>
          {/* Zone Analysis Filter */}
          <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Month</label>
                <div className="relative">
                  <select 
                    value={selectedWaterMonth} 
                    onChange={(e) => setSelectedWaterMonth(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {waterMonthsAvailable.map(month => ( 
                      <option key={month} value={month}>{month}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <CalendarDays size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Zone</label>
                <div className="relative">
                  <select 
                    value={selectedZoneForAnalysis} 
                    onChange={(e) => setSelectedZoneForAnalysis(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {getAvailableZones().map(zone => ( 
                      <option key={zone.key} value={zone.key}>{zone.name}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <Building size={16} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedWaterMonth('May-25');
                  setSelectedZoneForAnalysis('Zone_FM');
                }} 
                className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full hover:shadow-lg" 
                style={{ backgroundColor: COLORS.primaryDark }} 
              > 
                <Filter size={16}/> 
                <span>Reset Filters</span> 
              </button>
            </div>
          </div>

          {zoneAnalysisData && (
            <>
              {/* Zone Analysis Header */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {zoneAnalysisData.zone.name} Analysis for {selectedWaterMonth}
                </h2>
                <p className="text-slate-600">
                  {zoneAnalysisData.isDirectConnection ? 
                    'Direct connection meters analysis with Main Bulk reference' : 
                    'Zone bulk vs individual meters consumption analysis'
                  }
                </p>
              </div>

              {/* Gauge Charts Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Water Consumption Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow border border-slate-200">
                  {zoneAnalysisData.isDirectConnection ? (
                    <>
                      {/* For Direct Connection - show Main Bulk vs Direct Connections */}
                      <GaugeChart
                        percentage={100}
                        value={zoneAnalysisData.zoneBulkConsumption}
                        title="Main Bulk (NAMA)"
                        subtitle="Total Water Supply"
                        color="#3b82f6"
                        size={140}
                      />
                      <GaugeChart
                        percentage={zoneAnalysisData.mainBulkUsagePercent}
                        value={zoneAnalysisData.totalIndividualConsumption}
                        title="Direct Connections"
                        subtitle="Total DC Consumption"
                        color="#10b981"
                        size={140}
                      />
                      <GaugeChart
                        percentage={100 - zoneAnalysisData.mainBulkUsagePercent}
                        value={zoneAnalysisData.zoneBulkConsumption - zoneAnalysisData.totalIndividualConsumption}
                        title="Other Zones Usage"
                        subtitle="Remaining Consumption"
                        color="#6b7280"
                        size={140}
                      />
                    </>
                  ) : (
                    <>
                      {/* For regular zones - show Zone Bulk vs Individual meters */}
                      <GaugeChart
                        percentage={100}
                        value={zoneAnalysisData.zoneBulkConsumption}
                        title="Zone Bulk Consumption"
                        subtitle={`${zoneAnalysisData.zone.name} Total`}
                        color="#4e4456"
                        size={140}
                      />
                      <GaugeChart
                        percentage={zoneAnalysisData.efficiency}
                        value={zoneAnalysisData.totalIndividualConsumption}
                        title="Sum of Individual Meters"
                        subtitle="Total L3 Consumption"
                        color="#10b981"
                        size={140}
                      />
                      <GaugeChart
                        percentage={Math.abs(zoneAnalysisData.lossPercentage)}
                        value={Math.abs(zoneAnalysisData.difference)}
                        title={zoneAnalysisData.difference < 0 ? "Meter Variance" : "Distribution Loss"}
                        subtitle={`${Math.abs(zoneAnalysisData.lossPercentage).toFixed(1)}% Difference`}
                        color={zoneAnalysisData.difference < 0 ? "#f59e0b" : "#ef4444"}
                        size={140}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Zone Details Table */}
              <div className="bg-white shadow rounded-lg border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {zoneAnalysisData.zone.name} - Meter Details for {selectedWaterMonth}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {zoneAnalysisData.individualMetersData.length} meters in this {zoneAnalysisData.isDirectConnection ? 'connection group' : 'zone'}
                        {zoneAnalysisData.individualMetersData.length > itemsPerPage && (
                          <span className="ml-2 text-blue-600">• Paginated view ({itemsPerPage} per page)</span>
                        )}
                      </p>
                    </div>
                    {zoneAnalysisData.individualMetersData.length > itemsPerPage && (
                      <div className="text-right">
                        <p className="text-sm text-slate-500">
                          Page {currentPage} of {Math.ceil(zoneAnalysisData.individualMetersData.length / itemsPerPage)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-slate-700">Meter Label</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Account #</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Type</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Consumption (m³)</th>
                        <th className="text-center p-4 font-semibold text-slate-700">% of {zoneAnalysisData.isDirectConnection ? 'Total DC' : 'Zone Total'}</th>
                        <th className="text-center p-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Zone Bulk Meter Row (if not Direct Connection) */}
                      {!zoneAnalysisData.isDirectConnection && (
                        <tr className="border-b border-slate-100 bg-blue-50">
                          <td className="p-4 font-semibold text-blue-800">{zoneAnalysisData.zone.bulk}</td>
                          <td className="p-4 text-blue-700">{zoneAnalysisData.zone.bulkAccount}</td>
                          <td className="p-4 text-blue-700">Zone Bulk</td>
                          <td className="p-4 text-right font-semibold text-blue-800">
                            {zoneAnalysisData.zoneBulkConsumption.toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              100.0%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              L2 - Zone Bulk
                            </span>
                          </td>
                        </tr>
                      )}
                      
                      {/* Individual Meters with Pagination */}
                      {(() => {
                        const sortedMeters = zoneAnalysisData.individualMetersData.sort((a, b) => b.consumption - a.consumption);
                        const totalItems = sortedMeters.length;
                        const totalPages = Math.ceil(totalItems / itemsPerPage);
                        const startIndex = (currentPage - 1) * itemsPerPage;
                        const endIndex = startIndex + itemsPerPage;
                        const currentPageItems = sortedMeters.slice(startIndex, endIndex);
                        
                        return currentPageItems.map((meter, index) => {
                          const percentage = zoneAnalysisData.isDirectConnection ? 
                            (zoneAnalysisData.totalIndividualConsumption > 0 ? (meter.consumption / zoneAnalysisData.totalIndividualConsumption) * 100 : 0) :
                            (zoneAnalysisData.zoneBulkConsumption > 0 ? (meter.consumption / zoneAnalysisData.zoneBulkConsumption) * 100 : 0);
                          
                          return (
                            <tr key={meter.account} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="p-4 font-medium text-slate-800">{meter.label}</td>
                              <td className="p-4 text-slate-600">{meter.account}</td>
                              <td className="p-4 text-slate-600">{meter.type}</td>
                              <td className="p-4 text-right font-semibold text-slate-800">
                                {meter.consumption.toLocaleString()}
                              </td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  percentage > 20 ? 'bg-red-100 text-red-800' :
                                  percentage > 10 ? 'bg-yellow-100 text-yellow-800' :
                                  percentage > 5 ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {percentage.toFixed(1)}%
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  meter.consumption === 0 ? 'bg-gray-100 text-gray-800' :
                                  meter.consumption > 1000 ? 'bg-red-100 text-red-800' :
                                  meter.consumption > 500 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {meter.consumption === 0 ? 'No Usage' :
                                   meter.consumption > 1000 ? 'High' :
                                   meter.consumption > 500 ? 'Medium' : 'Normal'}
                                </span>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {(() => {
                  const sortedMeters = zoneAnalysisData.individualMetersData.sort((a, b) => b.consumption - a.consumption);
                  const totalItems = sortedMeters.length;
                  const totalPages = Math.ceil(totalItems / itemsPerPage);
                  
                  if (totalPages > 1) {
                    return (
                      <div className="p-4 border-t border-slate-200 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} meters
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className={`px-3 py-1 rounded text-sm ${
                                currentPage === 1 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              Previous
                            </button>
                            
                            {/* Page Numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`px-3 py-1 rounded text-sm ${
                                    currentPage === pageNum
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                            
                            <button
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                              className={`px-3 py-1 rounded text-sm ${
                                currentPage === totalPages 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Summary Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">
                        {zoneAnalysisData.isDirectConnection ? 'Total DC Consumption' : 'Zone Individual Total'}
                      </p>
                      <p className="text-xl font-bold text-blue-600">
                        {zoneAnalysisData.totalIndividualConsumption.toLocaleString()} m³
                      </p>
                    </div>
                    {!zoneAnalysisData.isDirectConnection && (
                      <>
                        <div className="text-center">
                          <p className="font-semibold text-slate-800">Zone Efficiency</p>
                          <p className="text-xl font-bold text-green-600">
                            {zoneAnalysisData.efficiency.toFixed(1)}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-slate-800">
                            {zoneAnalysisData.difference < 0 ? 'Meter Variance' : 'Zone Loss'}
                          </p>
                          <p className={`text-xl font-bold ${zoneAnalysisData.difference < 0 ? 'text-orange-600' : 'text-red-600'}`}>
                            {Math.abs(zoneAnalysisData.difference).toFixed(0)} m³
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {activeWaterSubSection === 'Overview_New' && (
        <>
          {/* Overview Filter Section */}
          <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Month</label>
                <div className="relative">
                  <select 
                    value={selectedOverviewMonth} 
                    onChange={(e) => setSelectedOverviewMonth(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {getOverviewMonths().map(month => ( 
                      <option key={month} value={month}>{month}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <CalendarDays size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Year</label>
                <div className="relative">
                  <select 
                    value={selectedOverviewYear} 
                    onChange={(e) => setSelectedOverviewYear(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {getOverviewYears().map(year => ( 
                      <option key={year} value={year}>{year}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <CalendarDays size={16} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedOverviewMonth('May-25');
                  setSelectedOverviewYear('2025');
                }} 
                className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full hover:shadow-lg" 
                style={{ backgroundColor: COLORS.primaryDark }} 
              > 
                <Filter size={16}/> 
                <span>Reset Filters</span> 
              </button>
            </div>
          </div>

          {/* Monthly and Yearly Gauge Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Statistics */}
            {(() => {
              const monthlyStats = getMonthlyOverviewStats(selectedOverviewMonth);
              if (!monthlyStats) return null;

              return (
                <ChartCard title={`${selectedOverviewMonth} Statistics`} subtitle="Monthly water distribution overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <GaugeChart
                      percentage={100}
                      value={monthlyStats.mainBulk}
                      title="A1: Main Bulk"
                      subtitle="Total Supply (L1)"
                      color="#22c55e"
                      size={120}
                    />
                    <GaugeChart
                      percentage={monthlyStats.mainBulk > 0 ? (monthlyStats.billedBulk / monthlyStats.mainBulk) * 100 : 0}
                      value={monthlyStats.billedBulk}
                      title="A2: Billed Bulk"
                      subtitle="Distribution (L2+DC)"
                      color="#f97316"
                      size={120}
                    />
                    <GaugeChart
                      percentage={monthlyStats.mainBulk > 0 ? (monthlyStats.billedIndividual / monthlyStats.mainBulk) * 100 : 0}
                      value={monthlyStats.billedIndividual}
                      title="A3: Billed Individual"
                      subtitle="Consumption (L3+DC)"
                      color="#3b82f6"
                      size={120}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Loss 1 (A1-A2)</p>
                      <p className="text-lg font-bold text-red-600">{monthlyStats.loss1.toLocaleString()} m³</p>
                      <p className="text-xs text-red-500">{monthlyStats.loss1Percent.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-800">Loss 2 (A2-A3)</p>
                      <p className="text-lg font-bold text-orange-600">{monthlyStats.loss2.toLocaleString()} m³</p>
                      <p className="text-xs text-orange-500">{monthlyStats.loss2Percent.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Total Loss</p>
                      <p className="text-lg font-bold text-red-600">{monthlyStats.totalLoss.toLocaleString()} m³</p>
                      <p className="text-xs text-red-500">{monthlyStats.totalLossPercent.toFixed(1)}%</p>
                    </div>
                  </div>
                </ChartCard>
              );
            })()}

            {/* Yearly Statistics */}
            {(() => {
              const yearlyStats = getYearlyOverviewStats(selectedOverviewYear);
              if (!yearlyStats) return null;

              return (
                <ChartCard title={`${selectedOverviewYear} Related Year`} subtitle="Annual water distribution overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <GaugeChart
                      percentage={100}
                      value={yearlyStats.mainBulk}
                      title="Annual Main Bulk"
                      subtitle="Total Supply (L1)"
                      color="#16a34a"
                      size={120}
                    />
                    <GaugeChart
                      percentage={yearlyStats.mainBulk > 0 ? (yearlyStats.billedBulk / yearlyStats.mainBulk) * 100 : 0}
                      value={yearlyStats.billedBulk}
                      title="Annual Billed Bulk"
                      subtitle="Distribution (L2+DC)"
                      color="#ea580c"
                      size={120}
                    />
                    <GaugeChart
                      percentage={yearlyStats.mainBulk > 0 ? (yearlyStats.billedIndividual / yearlyStats.mainBulk) * 100 : 0}
                      value={yearlyStats.billedIndividual}
                      title="Annual Individual"
                      subtitle="Consumption (L3+DC)"
                      color="#2563eb"
                      size={120}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Annual Loss 1</p>
                      <p className="text-lg font-bold text-red-600">{yearlyStats.loss1.toLocaleString()} m³</p>
                      <p className="text-xs text-red-500">{yearlyStats.loss1Percent.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-800">Annual Loss 2</p>
                      <p className="text-lg font-bold text-orange-600">{yearlyStats.loss2.toLocaleString()} m³</p>
                      <p className="text-xs text-orange-500">{yearlyStats.loss2Percent.toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Annual Total Loss</p>
                      <p className="text-lg font-bold text-red-600">{yearlyStats.totalLoss.toLocaleString()} m³</p>
                      <p className="text-xs text-red-500">{yearlyStats.totalLossPercent.toFixed(1)}%</p>
                    </div>
                  </div>
                </ChartCard>
              );
            })()}
          </div>

          {/* Loss Trend Analysis and Water Flow Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Loss Trend Analysis (m³)" subtitle="Loss progression over last 6 months">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={getLossTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Loss 1 (A1-A2)" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    dot={{ fill: '#dc2626', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Loss 2 (A2-A3)" 
                    stroke="#ea580c" 
                    strokeWidth={3}
                    dot={{ fill: '#ea580c', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Total Apparent Loss" 
                    stroke="#991b1b" 
                    strokeWidth={4}
                    dot={{ fill: '#991b1b', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Water Flow by Level (Last 6 Months)" subtitle="Water distribution hierarchy trends">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getWaterFlowData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="A1: Main Bulk (L1)" 
                    fill="#22c55e" 
                    name="A1: Main Bulk (L1)"
                  />
                  <Bar 
                    dataKey="A2: Billed Bulk (L2+DC)" 
                    fill="#f97316" 
                    name="A2: Billed Bulk (L2+DC)"
                  />
                  <Bar 
                    dataKey="A3: Billed Indiv. (L3+DC)" 
                    fill="#3b82f6" 
                    name="A3: Billed Indiv. (L3+DC)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Consumer Category Distribution */}
          <ChartCard title="Consumer Category Distribution" subtitle={`Distribution of consumption by customer type for ${selectedOverviewMonth}`}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={getConsumerCategoryData(selectedOverviewMonth)} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="category" width={120} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Percentage']} />
                <Bar dataKey="value" fill={COLORS.accent} name="Distribution %" />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Consumer Distribution Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {getConsumerCategoryData(selectedOverviewMonth).map((item, index) => (
                <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700">{item.category}</p>
                  <p className="text-xl font-bold text-blue-600">{item.value.toFixed(1)}%</p>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </>
      )}

      {activeWaterSubSection === 'ZoneDetails' && (
        <>
          {/* Zone Details Filter Section */}
          <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Month</label>
                <div className="relative">
                  <select 
                    value={selectedDetailsMonth} 
                    onChange={(e) => setSelectedDetailsMonth(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {getAvailableMonths().map(month => ( 
                      <option key={month} value={month}>{month}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <CalendarDays size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Zone</label>
                <div className="relative">
                  <select 
                    value={selectedZoneDetails} 
                    onChange={(e) => setSelectedZoneDetails(e.target.value)} 
                    className="appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700"
                  >
                    {getAvailableZoneDetails().map(zone => ( 
                      <option key={zone.key} value={zone.key}>{zone.name}</option> 
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <Building size={16} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedDetailsMonth('May-25');
                  setSelectedZoneDetails('ZONE_FM');
                }} 
                className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full hover:shadow-lg" 
                style={{ backgroundColor: COLORS.primaryDark }} 
              > 
                <Filter size={16}/> 
                <span>Reset Filters</span> 
              </button>
            </div>
          </div>

          {/* Zone-wise Consumption Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Zone-wise Consumption" subtitle={`Water consumption by zone for ${selectedDetailsMonth}`}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getZoneWiseConsumption(selectedDetailsMonth)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="zone" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill={COLORS.primary} name="Consumption (m³)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Zone Loss Analysis" subtitle={`Loss percentage by zone for ${selectedDetailsMonth}`}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getZoneLossAnalysis(selectedDetailsMonth)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="zone" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Loss Percentage']} />
                  <Bar dataKey="systemLossContribution" fill={COLORS.error} name="System Loss Contribution (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Zone Statistics Gauges */}
          {(() => {
            const zoneStats = getZoneStats(selectedZoneDetails, selectedDetailsMonth);
            if (!zoneStats) return null;

            return (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {zoneStats.zone} Statistics for {selectedDetailsMonth}
                  </h2>
                  <p className="text-slate-600">
                    Bulk Meter: {zoneStats.bulkMeter}
                  </p>
                </div>

                {/* Monthly Stats */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow border border-slate-200">
                    <GaugeChart
                      percentage={100}
                      value={zoneStats.monthly.bulkSupply}
                      title="Total Bulk Supply"
                      subtitle="Zone Bulk Consumption"
                      color="#3b82f6"
                      size={140}
                    />
                    <GaugeChart
                      percentage={zoneStats.monthly.bulkSupply > 0 ? (zoneStats.monthly.individualTotal / zoneStats.monthly.bulkSupply) * 100 : 0}
                      value={zoneStats.monthly.individualTotal}
                      title="Individual Total"
                      subtitle="Sum of Individual Meters"
                      color="#10b981"
                      size={140}
                    />
                    <GaugeChart
                      percentage={Math.abs(zoneStats.monthly.lossPercent)}
                      value={Math.abs(zoneStats.monthly.loss)}
                      title="Zone Loss"
                      subtitle={`${Math.abs(zoneStats.monthly.lossPercent).toFixed(1)}% Loss`}
                      color={zoneStats.monthly.loss < 0 ? "#f59e0b" : "#ef4444"}
                      size={140}
                    />
                  </div>
                </div>

                {/* Yearly Stats */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">Yearly Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow border border-slate-200">
                    <GaugeChart
                      percentage={100}
                      value={zoneStats.yearly.bulkSupply}
                      title="Yearly Bulk Supply"
                      subtitle="Total Zone Supply"
                      color="#6366f1"
                      size={140}
                    />
                    <GaugeChart
                      percentage={zoneStats.yearly.bulkSupply > 0 ? (zoneStats.yearly.individualTotal / zoneStats.yearly.bulkSupply) * 100 : 0}
                      value={zoneStats.yearly.individualTotal}
                      title="Yearly Individual Total"
                      subtitle="Sum of All Customers"
                      color="#8b5cf6"
                      size={140}
                    />
                    <GaugeChart
                      percentage={Math.abs(zoneStats.yearly.lossPercent)}
                      value={Math.abs(zoneStats.yearly.loss)}
                      title="Yearly Loss"
                      subtitle={`${Math.abs(zoneStats.yearly.lossPercent).toFixed(1)}% Annual Loss`}
                      color={zoneStats.yearly.loss < 0 ? "#f59e0b" : "#dc2626"}
                      size={140}
                    />
                  </div>
                </div>
              </>
            );
          })()}

          {/* Customer Details Table */}
          {(() => {
            const customerDetails = getZoneCustomerDetails(selectedZoneDetails, selectedDetailsMonth);
            if (!customerDetails) return null;

            return (
              <div className="bg-white shadow rounded-lg border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Customer Details - {customerDetails.zone} for {customerDetails.month}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Bulk Meter: {customerDetails.bulkMeter} • {customerDetails.customers.length} customers
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-slate-700">Parent Meter</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Account</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Customer</th>
                        <th className="text-right p-4 font-semibold text-slate-700">Consumption (m³)</th>
                        <th className="text-center p-4 font-semibold text-slate-700">Type</th>
                        <th className="text-center p-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerDetails.customers.map((customer, index) => (
                        <tr key={customer.account} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-4 text-slate-600">{customerDetails.bulkMeter}</td>
                          <td className="p-4 font-medium text-slate-800">{customer.account}</td>
                          <td className="p-4 text-slate-600">{customer.name}</td>
                          <td className="p-4 text-right font-semibold text-slate-800">
                            {customer.currentConsumption.toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              customer.type === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                              customer.type === 'Residential' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {customer.type}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              customer.currentConsumption === 0 ? 'bg-gray-100 text-gray-800' :
                              customer.currentConsumption > 200 ? 'bg-red-100 text-red-800' :
                              customer.currentConsumption > 100 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {customer.currentConsumption === 0 ? 'No Usage' :
                               customer.currentConsumption > 200 ? 'High' :
                               customer.currentConsumption > 100 ? 'Medium' : 'Normal'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">Total Customers</p>
                      <p className="text-xl font-bold text-blue-600">
                        {customerDetails.customers.length}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">Total Consumption</p>
                      <p className="text-xl font-bold text-green-600">
                        {customerDetails.customers.reduce((sum, customer) => sum + customer.currentConsumption, 0).toLocaleString()} m³
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">Average per Customer</p>
                      <p className="text-xl font-bold text-purple-600">
                        {customerDetails.customers.length > 0 ? 
                          (customerDetails.customers.reduce((sum, customer) => sum + customer.currentConsumption, 0) / customerDetails.customers.length).toFixed(1) : 
                          0
                        } m³
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* Main Database Section */}
      {activeWaterSubSection === 'MainDatabase' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Main Water Database</h2>
                  <p className="text-sm text-slate-600 dark:text-gray-300">Comprehensive water system data management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Airtable Embed */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-slate-200 dark:border-gray-600 transition-colors duration-300 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Water System Database
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">
                Real-time water system data and analytics
              </p>
            </div>
            
            <div className="relative" style={{ minHeight: '600px' }}>
              <iframe 
                className="airtable-embed w-full h-full border-0" 
                src="https://airtable.com/embed/appwGy1JHL1UYsO2W/shrjrIEpBjAANAxZy?viewControls=on" 
                style={{ 
                  background: 'transparent',
                  width: '100%',
                  height: '533px',
                  minHeight: '533px'
                }}
                title="Water System Main Database"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Database Features
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Real-time water consumption monitoring
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Zone-wise water distribution tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Customer billing and account management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                  Water loss analysis and reporting
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Maintenance and operational logs
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-slate-200 dark:border-gray-600 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Database Access
              </h4>
              <div className="space-y-3 text-sm text-slate-600 dark:text-gray-300">
                <p>
                  This database contains comprehensive water system data including meter readings, 
                  customer information, and operational metrics.
                </p>
                <p>
                  Use the embedded interface above to view, filter, and analyze the water system data. 
                  The database supports real-time updates and collaborative data management.
                </p>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-200 text-xs">
                    <strong>Note:</strong> Data is synchronized with the main water management system 
                    and updates automatically to reflect current system status.
                  </p>
                </div>
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
              <h3 className="text-xl font-semibold text-purple-800">🧠 AI Water System Analysis</h3>
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200">
                <X size={20} className="text-slate-600"/>
              </button>
            </div>
            {isAiLoading ? (
              <div className="text-center py-8">
                <Droplets size={48} className="mx-auto animate-pulse text-blue-500" />
                <p className="mt-2 text-slate-600">AI is analyzing water system data...</p>
              </div>
            ) : (
              <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap">
                {aiAnalysisResult ? (
                  aiAnalysisResult.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))
                ) : (
                  <p>No analysis available or an error occurred.</p>
                )}
              </div>
            )}
            <div className="mt-6 text-right">
              <Button
                onClick={() => setIsAiModalOpen(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterAnalysisModule;
