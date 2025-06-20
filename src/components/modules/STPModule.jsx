import React, { useState, useMemo } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import { Button } from '@/components/ui/button';
import { 
  Factory, 
  Droplets, 
  TrendingUp, 
  Trash2,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Settings,
  Filter,
  FileText
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { stpRealData, getDataByMonth, getPerformanceMetrics, TANKER_INCOME_PER_TRIP, TSE_SAVING_PER_M3 } from '../../services/stpRealDataService';

const STPModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Get the most recent month with data as default
  const defaultMonth = useMemo(() => {
    const months = new Set();
    stpRealData.forEach(item => {
      months.add(item.date.substring(0, 7));
    });
    const sortedMonths = Array.from(months).sort().reverse();
    return sortedMonths[0] || '2025-06';
  }, []);
  
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // Get available months dynamically based on actual data
  const availableMonths = useMemo(() => {
    const months = new Set();
    stpRealData.forEach(item => {
      months.add(item.date.substring(0, 7));
    });
    
    const sortedMonths = Array.from(months).sort().reverse();
    return sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return {
        value: month,
        label: `${monthNames[parseInt(monthNum) - 1]} ${year}`
      };
    });
  }, []);

  // Filter data based on selected month
  const filteredData = useMemo(() => {
    return getDataByMonth(selectedMonth);
  }, [selectedMonth]);

  // Auto-correct selected month if no data is available
  React.useEffect(() => {
    if (filteredData.length === 0 && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0].value);
    }
  }, [filteredData.length, availableMonths]);

  // Calculate metrics for the selected period
  const metrics = useMemo(() => {
    return getPerformanceMetrics(filteredData);
  }, [filteredData]);

  // STP Key Performance Metrics
  const stpMetrics = [
    {
      title: 'Total Water Treated',
      value: metrics.totalTreated?.toFixed(0) || '0',
      unit: 'm³',
      subtitle: `Avg: ${metrics.avgTreated?.toFixed(0) || '0'} m³/day`,
      icon: Droplets,
      iconColor: 'text-blue-500'
    },
    {
      title: 'TSE Water Output',
      value: metrics.totalTSE?.toFixed(0) || '0',
      unit: 'm³',
      subtitle: `Avg: ${metrics.avgTSE?.toFixed(0) || '0'} m³/day`,
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    {
      title: 'Treatment Efficiency',
      value: metrics.treatmentEfficiency?.toFixed(1) || '0',
      unit: '%',
      subtitle: 'TSE/Treated Ratio',
      icon: TrendingUp,
      iconColor: 'text-emerald-500'
    },
    {
      title: 'Financial Impact',
      value: metrics.totalFinancialImpact?.toFixed(0) || '0',
      unit: 'OMR',
      subtitle: `Income: ${metrics.tankerIncome?.toFixed(0) || '0'} + Savings: ${metrics.tseSavings?.toFixed(0) || '0'}`,
      icon: DollarSign,
      iconColor: 'text-amber-500'
    }
  ];

  // Recent maintenance activities
  const recentMaintenance = useMemo(() => {
    return stpRealData
      .filter(item => item.maintenance1 || item.maintenance2 || item.maintenance3)
      .slice(-10)
      .map(item => ({
        date: item.date,
        actions: [item.maintenance1, item.maintenance2, item.maintenance3].filter(Boolean)
      }));
  }, []);

  // Monthly comparison data
  const monthlyData = useMemo(() => {
    const months = {};
    stpRealData.forEach(item => {
      const month = item.date.substring(0, 7);
      if (!months[month]) {
        months[month] = { month, treated: 0, tse: 0, tankers: 0, days: 0 };
      }
      months[month].treated += item.treated;
      months[month].tse += item.tse;
      months[month].tankers += item.tankers;
      months[month].days += 1;
    });

    return Object.values(months).map(month => ({
      ...month,
      income: month.tankers * TANKER_INCOME_PER_TRIP,
      savings: month.tse * TSE_SAVING_PER_M3,
      efficiency: (month.tse / month.treated * 100).toFixed(1)
    }));
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'operational', label: 'Operational Data' },
    { id: 'financial', label: 'Financial Analysis' },
    { id: 'maintenance', label: 'Maintenance Log' }
  ];

  return (
    <div className="stp-module space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">STP Plant Operations</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive monitoring of Sewage Treatment Plant performance with real operational data
          </p>
          {filteredData.length > 0 && filteredData.length < 25 && (
            <p className="text-amber-600 mt-1 text-sm">
              ⚠️ Partial data: {filteredData.length} days available for {availableMonths.find(opt => opt.value === selectedMonth)?.label}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Plant Operational</span>
          </div>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {availableMonths.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Data Availability Check */}
      {filteredData.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No Data Available</h3>
          <p className="text-yellow-700 mb-4">
            No operational data is available for {availableMonths.find(opt => opt.value === selectedMonth)?.label || selectedMonth}.
          </p>
          <p className="text-sm text-yellow-600">
            Available data periods: {availableMonths.map(opt => opt.label).join(', ')}
          </p>
        </div>
      )}

      {/* Key Metrics */}
      {filteredData.length > 0 && (
        <div className="metrics-grid">
          {stpMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      )}

      {activeTab === 'dashboard' && filteredData.length > 0 && (
        <>
          {/* Operational Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Daily Treatment Performance"
              subtitle={`${selectedMonth} - Water treatment and TSE output`}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => value.split('-')[2]}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} m³`,
                      name === 'treated' ? 'Water Treated' :
                      name === 'tse' ? 'TSE Output' : 'Inlet Sewage'
                    ]}
                    labelFormatter={(value) => `Date: ${value}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inlet" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="treated" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.8}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tse" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.9}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard 
              title="Tanker Operations & Financial Impact"
              subtitle="Daily tanker discharges and revenue generation"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => value.split('-')[2]}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'tankers' ? `${value} trips` : `${(value * TANKER_INCOME_PER_TRIP).toFixed(1)} OMR`,
                      name === 'tankers' ? 'Tanker Trips' : 'Revenue'
                    ]}
                  />
                  <Bar 
                    dataKey="tankers" 
                    fill="#8b5cf6"
                    name="tankers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Monthly Performance Comparison */}
          <ChartCard 
            title="Monthly Performance Comparison"
            subtitle="Treatment efficiency and financial performance over time"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name.includes('efficiency') ? `${value}%` :
                    name.includes('income') || name.includes('savings') ? `${parseFloat(value).toFixed(0)} OMR` :
                    `${parseFloat(value).toFixed(0)} m³`,
                    name === 'treated' ? 'Water Treated' :
                    name === 'tse' ? 'TSE Output' :
                    name === 'income' ? 'Tanker Income' :
                    name === 'savings' ? 'TSE Savings' : 'Efficiency'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="treated" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="treated"
                />
                <Line 
                  type="monotone" 
                  dataKey="tse" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="tse"
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="income"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}

      {activeTab === 'operational' && filteredData.length > 0 && (
        <div className="space-y-6">
          <ChartCard 
            title="Detailed Operational Data"
            subtitle={`Complete operational records for ${selectedMonth}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Treated (m³)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">TSE Output (m³)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Inlet (m³)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Tankers</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Direct Sewage (m³)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Efficiency %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{record.date}</td>
                      <td className="py-3 px-4">{record.treated}</td>
                      <td className="py-3 px-4">{record.tse}</td>
                      <td className="py-3 px-4">{record.inlet}</td>
                      <td className="py-3 px-4">{record.tankers}</td>
                      <td className="py-3 px-4">{record.directSewage}</td>
                      <td className="py-3 px-4">{(record.tse / record.treated * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      )}

      {activeTab === 'financial' && filteredData.length > 0 && (
        <div className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">Tanker Revenue</h3>
                  <p className="text-2xl font-bold text-green-700 mt-1">{metrics.tankerIncome?.toFixed(0) || '0'} OMR</p>
                  <p className="text-sm text-green-600">{metrics.totalTankers || '0'} trips @ 4.5 OMR each</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">TSE Irrigation Savings</h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{metrics.tseSavings?.toFixed(0) || '0'} OMR</p>
                  <p className="text-sm text-blue-600">{metrics.totalTSE?.toFixed(0) || '0'} m³ @ 1.32 OMR/m³</p>
                </div>
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-900">Total Financial Impact</h3>
                  <p className="text-2xl font-bold text-purple-700 mt-1">{metrics.totalFinancialImpact?.toFixed(0) || '0'} OMR</p>
                  <p className="text-sm text-purple-600">Combined revenue & savings</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Financial Trends Chart */}
          <ChartCard 
            title="Monthly Financial Performance"
            subtitle="Revenue from tanker operations and savings from TSE irrigation"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${parseFloat(value).toFixed(0)} OMR`,
                    name === 'income' ? 'Tanker Revenue' : 'TSE Savings'
                  ]}
                />
                <Bar 
                  dataKey="income" 
                  fill="#10b981"
                  name="income"
                />
                <Bar 
                  dataKey="savings" 
                  fill="#3b82f6"
                  name="savings"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'maintenance' && filteredData.length > 0 && (
        <div className="space-y-6">
          <ChartCard 
            title="Recent Maintenance Activities"
            subtitle="Maintenance actions performed on the STP system"
          >
            <div className="space-y-4">
              {recentMaintenance.slice(0, 15).map((record, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{record.date}</h4>
                    <span className="text-sm text-gray-500">
                      {record.actions.length} action{record.actions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {record.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="p-2 bg-gray-50 rounded text-sm">
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {/* System Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-green-900">Plant Status</h3>
              <p className="text-lg font-bold text-green-700 mt-1">Operational</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Avg Treatment Rate</h3>
              <p className="text-lg font-bold text-blue-700 mt-1">{metrics.avgTreated?.toFixed(0) || '0'} m³/day</p>
            </div>
            <Factory className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-purple-900">Avg TSE Output</h3>
              <p className="text-lg font-bold text-purple-700 mt-1">{metrics.avgTSE?.toFixed(0) || '0'} m³/day</p>
            </div>
            <Droplets className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-amber-900">Avg Tankers/Day</h3>
              <p className="text-lg font-bold text-amber-700 mt-1">{metrics.avgTankers?.toFixed(1) || '0'}</p>
            </div>
            <Trash2 className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default STPModule; 