import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LayoutDashboard, TrendingUp, BarChart2, CheckCircle, Droplets, Building, CalendarDays, Filter, Activity, AlertCircle, Users2 } from 'lucide-react';
import { waterRawData } from '../../data/waterData';
import { parseWaterSystemData } from '../../data/waterParser';
import { COLORS } from '../../utils/constants';
import { SummaryCard } from '../../components/charts/SummaryCard';
import { ChartWrapper } from '../../components/charts/ChartWrapper';
import { Select } from '../../components/ui/Select';

const WaterModule: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWaterMonth, setSelectedWaterMonth] = useState('Mar-25');
  const [activeWaterSubSection, setActiveWaterSubSection] = useState('Overview');
  const [selectedZone, setSelectedZone] = useState('All Zones');

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const waterSystemData = useMemo(() => parseWaterSystemData(waterRawData), []);
  const waterMonthsAvailable = Object.keys(waterSystemData[0]?.consumption || {});

  // Water System Calculations based on hierarchical structure
  const waterCalculations = useMemo(() => {
    const monthData = selectedWaterMonth;
    
    // Level A1 (L1) - Main Source
    const mainBulkMeter = waterSystemData.find(item => item.label === 'L1');
    const A1_totalSupply = mainBulkMeter ? mainBulkMeter.consumption[monthData] || 0 : 0;

    // Level A2 = L2 + DC - Primary Distribution  
    const zoneBulkMeters = waterSystemData.filter(item => item.label === 'L2');
    const directConnections = waterSystemData.filter(item => item.label === 'DC');
    const L2_total = zoneBulkMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const DC_total = directConnections.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const A2_total = L2_total + DC_total;

    // Level A3 = L3 + DC - End-User Consumption
    const endUserMeters = waterSystemData.filter(item => item.label === 'L3');
    const L3_total = endUserMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const A3_total = L3_total + DC_total; // DC appears in both A2 and A3

    // Water Loss Calculations
    const stage1Loss = A1_totalSupply - A2_total; // Trunk Main Loss
    const stage2Loss = L2_total - L3_total; // Distribution Loss (within zones)
    const totalLoss = A1_totalSupply - A3_total;
    
    // Percentage calculations
    const stage1LossPercent = A1_totalSupply > 0 ? (stage1Loss / A1_totalSupply) * 100 : 0;
    const stage2LossPercent = L2_total > 0 ? (stage2Loss / L2_total) * 100 : 0;
    const totalLossPercent = A1_totalSupply > 0 ? (totalLoss / A1_totalSupply) * 100 : 0;
    const systemEfficiency = 100 - Math.abs(totalLossPercent);

    return {
      A1_totalSupply,
      A2_total,
      A3_total,
      L2_total,
      L3_total,
      DC_total,
      stage1Loss,
      stage2Loss,
      totalLoss,
      stage1LossPercent,
      stage2LossPercent,
      totalLossPercent,
      systemEfficiency,
      zoneBulkMeters,
      directConnections,
      endUserMeters
    };
  }, [selectedWaterMonth, waterSystemData]);

  // Monthly trend data for water flow - A1, A2, A3 levels
  const monthlyWaterTrendData = useMemo(() => {
    return waterMonthsAvailable.map(month => {
      // A1 (L1) - Main Source
      const mainBulkMeter = waterSystemData.find(item => item.label === 'L1');
      const A1_supply = mainBulkMeter ? mainBulkMeter.consumption[month] || 0 : 0;
      
      // A2 = L2 + DC
      const L2_meters = waterSystemData.filter(item => item.label === 'L2');
      const DC_meters = waterSystemData.filter(item => item.label === 'DC');
      const L2_total = L2_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const DC_total = DC_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const A2_total = L2_total + DC_total;

      // A3 = L3 + DC
      const L3_meters = waterSystemData.filter(item => item.label === 'L3');
      const L3_total = L3_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const A3_total = L3_total + DC_total;

      return {
        name: month.replace('-24', '').replace('-25', ''),
        A1: A1_supply,
        A2: A2_total,
        A3: A3_total
      };
    });
  }, [waterSystemData, waterMonthsAvailable]);

  // Zone-wise consumption data
  const zoneConsumptionData = useMemo(() => {
    const monthData = selectedWaterMonth;
    const zoneData: Record<string, { zone: string; consumption: number; type: string }> = {};
    
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
  }, [selectedWaterMonth, waterSystemData]);

  // Water Sub-navigation
  const WaterSubNav = () => {
    const subSections = [
      { name: 'Overview', id: 'Overview', icon: LayoutDashboard },
      { name: 'Water Loss Analysis', id: 'WaterLoss', icon: TrendingUp },
      { name: 'Zone Analysis', id: 'ZoneAnalysis', icon: BarChart2 },
      { name: 'Quality Metrics', id: 'Quality', icon: CheckCircle },
    ];
    
    return (
      <div className="mb-6 print:hidden flex justify-center">
        <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200">
          {subSections.map((tab) => {
            const isActive = activeWaterSubSection === tab.id;
            return ( 
              <button 
                key={tab.id} 
                onClick={() => setActiveWaterSubSection(tab.id)} 
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

  // Water Filter Bar
  const WaterFilterBar = () => {
    const monthOptions = waterMonthsAvailable.map(m => ({ value: m, label: m }));
    const distinctZones = [...new Set(waterSystemData.map(item => item.zone))].filter(zone => zone !== 'MAIN');
    const zoneOptions = [{ value: 'All Zones', label: 'All Zones' }, ...distinctZones.map(z => ({ value: z, label: z }))];
    
    return (
      <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <Select 
            id="waterMonthFilter" 
            label="Select Month" 
            value={selectedWaterMonth} 
            onChange={(e) => setSelectedWaterMonth(e.target.value)} 
            options={monthOptions} 
            icon={CalendarDays}
          />
          <Select 
            id="zoneFilter" 
            label="Filter by Zone" 
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)} 
            options={zoneOptions} 
            icon={Building}
          />
          <button 
            onClick={() => { setSelectedWaterMonth('Mar-25'); setSelectedZone('All Zones'); }} 
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
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Muscat Bay Water Analysis System</h1>
        <p className="text-slate-600">Real Hierarchical Water Distribution Monitoring & Loss Analysis</p>
      </div>

      <WaterSubNav />
      <WaterFilterBar />

      {activeWaterSubSection === 'Overview' && (
        <>
          {/* First Layer KPI Cards - A1, A2, A3 Levels */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Water System Hierarchy Levels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard 
                title="A1 - Main Source (L1)" 
                value={waterCalculations.A1_totalSupply.toLocaleString()} 
                unit="m³" 
                icon={Droplets} 
                trend="Main Bulk (NAMA) - Single Entry Point" 
                trendColor="text-blue-600" 
                iconBgColor={COLORS.info}
                isLoading={isLoading}
              />
              <SummaryCard 
                title="A2 - Primary Distribution" 
                value={waterCalculations.A2_total.toLocaleString()} 
                unit="m³" 
                icon={Building} 
                trend="Zone Bulk + Direct Connections (L2 + DC)" 
                trendColor="text-yellow-600" 
                iconBgColor={COLORS.warning}
                isLoading={isLoading}
              />
              <SummaryCard 
                title="A3 - End-User Consumption" 
                value={waterCalculations.A3_total.toLocaleString()} 
                unit="m³" 
                icon={Users2} 
                trend="End-Users + Direct Connections (L3 + DC)" 
                trendColor="text-green-600" 
                iconBgColor={COLORS.success}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Second Layer KPI Cards - Loss Analysis */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">Water Loss Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard 
                title="Stage 1 Loss (Trunk Main)" 
                value={Math.abs(waterCalculations.stage1Loss).toFixed(0)} 
                unit="m³" 
                icon={AlertCircle} 
                trend={`A1 - A2: ${Math.abs(waterCalculations.stage1LossPercent).toFixed(1)}%`} 
                trendColor={waterCalculations.stage1Loss < 0 ? "text-orange-600" : "text-red-600"} 
                iconBgColor={waterCalculations.stage1Loss < 0 ? COLORS.warning : COLORS.error}
                isLoading={isLoading}
              />
              <SummaryCard 
                title="Stage 2 Loss (Distribution)" 
                value={waterCalculations.stage2Loss.toFixed(0)} 
                unit="m³" 
                icon={TrendingUp} 
                trend={`L2 - L3: ${waterCalculations.stage2LossPercent.toFixed(1)}%`} 
                trendColor="text-orange-600" 
                iconBgColor={COLORS.warning}
                isLoading={isLoading}
              />
              <SummaryCard 
                title="Total System Loss" 
                value={Math.abs(waterCalculations.totalLoss).toFixed(0)} 
                unit="m³" 
                icon={CheckCircle} 
                trend={`A1 - A3: ${Math.abs(waterCalculations.totalLossPercent).toFixed(1)}%`} 
                trendColor="text-green-600" 
                iconBgColor={COLORS.success}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper title="Water System Hierarchy Trends" subtitle="A1, A2, A3 flow analysis by month">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyWaterTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="A1" stroke={COLORS.info} name="A1 - Main Source (m³)" strokeWidth={3} />
                  <Line type="monotone" dataKey="A2" stroke={COLORS.warning} name="A2 - Primary Distribution (m³)" strokeWidth={3} />
                  <Line type="monotone" dataKey="A3" stroke={COLORS.success} name="A3 - End-User Consumption (m³)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <ChartWrapper title="Zone Bulk Consumption" subtitle={`Zone distribution for ${selectedWaterMonth}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill={COLORS.primary} name="Consumption (m³)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        </>
      )}

      {activeWaterSubSection === 'Quality' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper title="Water Quality Parameters" subtitle="Current quality metrics">
            <div className="space-y-4 mt-4">
              {[
                { parameter: 'pH Level', value: 7.2, unit: '', status: 'normal', range: '6.5-8.5' },
                { parameter: 'Turbidity', value: 0.8, unit: 'NTU', status: 'good', range: '<1.0' },
                { parameter: 'Chlorine', value: 0.5, unit: 'mg/L', status: 'normal', range: '0.2-0.6' },
                { parameter: 'TDS', value: 245, unit: 'mg/L', status: 'normal', range: '<500' },
                { parameter: 'Temperature', value: 24.5, unit: '°C', status: 'normal', range: '20-30' },
                { parameter: 'Pressure', value: 2.1, unit: 'bar', status: 'good', range: '1.5-3.0' }
              ].map((param, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-700">{param.parameter}</h4>
                    <p className="text-sm text-slate-500">Range: {param.range}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">{param.value} {param.unit}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      param.status === 'good' ? 'bg-green-100 text-green-800' :
                      param.status === 'normal' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {param.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartWrapper>

          <ChartWrapper title="System Performance Indicators" subtitle="Key operational metrics">
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-slate-700">System Efficiency</h4>
                  <span className="text-lg font-bold text-green-600">{waterCalculations.systemEfficiency.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(waterCalculations.systemEfficiency, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </ChartWrapper>
        </div>
      )}
    </div>
  );
};

export default WaterModule;