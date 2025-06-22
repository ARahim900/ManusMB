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
  FileText,
  BarChart3,
  Target,
  Activity,
  Gauge
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
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { 
  monthlyPerformanceData, 
  financialAnalysisSummary, 
  getDataByMonth, 
  getMonthlyData, 
  getPerformanceMetrics, 
  getAnnualSummary,
  TANKER_INCOME_PER_TRIP, 
  TSE_SAVING_PER_M3, 
  STP_DESIGN_CAPACITY 
} from '../../services/stpMonthlyDataService';

const STPModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Get the most recent month with data as default
  const defaultMonth = useMemo(() => {
    const sortedMonths = monthlyPerformanceData.sort((a, b) => new Date(b.monthKey) - new Date(a.monthKey));
    return sortedMonths[0]?.monthKey || '2025-06';
  }, []);
  
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // Get available months dynamically
  const availableMonths = useMemo(() => {
    return monthlyPerformanceData
      .sort((a, b) => new Date(b.monthKey) - new Date(a.monthKey))
      .map(month => ({
        value: month.monthKey,
        label: month.month
      }));
  }, []);

  // Get current month data
  const currentMonthData = useMemo(() => {
    return monthlyPerformanceData.find(m => m.monthKey === selectedMonth);
  }, [selectedMonth]);

  // Get annual summary
  const annualSummary = useMemo(() => {
    return getAnnualSummary();
  }, []);

  // Prepare chart data for monthly trends
  const monthlyTrendData = useMemo(() => {
    return monthlyPerformanceData.map(month => ({
      month: month.month.split(' ')[0], // Just month name
      treated: month.totalTreatedWater,
      tse: month.totalTSEWater,
      processed: month.totalProcessedWater,
      efficiency: month.treatmentEfficiency,
      benefit: month.totalFinancialBenefit,
      tankers: month.totalTankers,
      capacityUtilization: (month.avgDailyTSE / STP_DESIGN_CAPACITY) * 100
    }));
  }, []);

  // STP Key Performance Metrics
  const stpMetrics = currentMonthData ? [
    {
      title: 'Total Water Treated',
      value: currentMonthData.totalTreatedWater.toLocaleString(),
      unit: 'm³',
      subtitle: `Avg: ${currentMonthData.avgDailyTreated} m³/day | ${currentMonthData.operatingDays} operating days`,
      icon: Droplets,
      iconColor: 'text-blue-500',
      trend: currentMonthData.treatmentEfficiency > 110 ? 'up' : 'stable'
    },
    {
      title: 'TSE Water Output',
      value: currentMonthData.totalTSEWater.toLocaleString(),
      unit: 'm³',
      subtitle: `Avg: ${currentMonthData.avgDailyTSE} m³/day | Capacity: ${((currentMonthData.avgDailyTSE / STP_DESIGN_CAPACITY) * 100).toFixed(1)}%`,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      trend: currentMonthData.avgDailyTSE > 500 ? 'up' : 'down'
    },
    {
      title: 'Treatment Efficiency',
      value: currentMonthData.treatmentEfficiency.toFixed(1),
      unit: '%',
      subtitle: 'TSE/Treated Water Ratio',
      icon: TrendingUp,
      iconColor: 'text-emerald-500',
      trend: currentMonthData.treatmentEfficiency > 110 ? 'up' : 'stable'
    },
    {
      title: 'Financial Benefit',
      value: currentMonthData.totalFinancialBenefit.toLocaleString(),
      unit: 'OMR',
      subtitle: `Tanker: ${currentMonthData.tankerIncome.toLocaleString()} + TSE: ${currentMonthData.tseWaterSavings.toLocaleString()}`,
      icon: DollarSign,
      iconColor: 'text-amber-500',
      trend: currentMonthData.totalFinancialBenefit > 20000 ? 'up' : 'down'
    },
    {
      title: 'Tanker Operations',
      value: currentMonthData.totalTankers.toLocaleString(),
      unit: 'trips',
      subtitle: `Avg: ${currentMonthData.avgDailyTankers.toFixed(1)} trips/day`,
      icon: Trash2,
      iconColor: 'text-purple-500',
      trend: currentMonthData.avgDailyTankers > 8 ? 'up' : 'down'
    },
    {
      title: 'Capacity Utilization',
      value: ((currentMonthData.avgDailyTSE / STP_DESIGN_CAPACITY) * 100).toFixed(1),
      unit: '%',
      subtitle: `Design Capacity: ${STP_DESIGN_CAPACITY} m³/day`,
      icon: Gauge,
      iconColor: 'text-indigo-500',
      trend: currentMonthData.avgDailyTSE > 500 ? 'up' : 'stable'
    }
  ] : [];

  // Financial breakdown for pie chart
  const financialBreakdown = currentMonthData ? [
    { name: 'TSE Water Savings', value: currentMonthData.tseWaterSavings, color: '#10b981' },
    { name: 'Tanker Revenue', value: currentMonthData.tankerIncome, color: '#f59e0b' }
  ] : [];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'monthly', label: 'Monthly Analysis' },
    { id: 'financial', label: 'Financial Overview' },
    { id: 'annual', label: 'Annual Summary' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stpMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            subtitle={metric.subtitle}
            icon={metric.icon}
            iconColor={metric.iconColor}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Water Treatment Trend" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="treated" fill="#3b82f6" name="Treated Water (m³)" />
              <Bar yAxisId="left" dataKey="tse" fill="#10b981" name="TSE Water (m³)" />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="Efficiency %" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Financial Benefit Distribution" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={financialBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {financialBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toLocaleString()} OMR`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );

  const renderMonthlyAnalysis = () => (
    <div className="space-y-6">
      {/* Monthly Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operating Days</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed (m³)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treated (m³)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TSE (m³)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency (%)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tankers</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Benefit (OMR)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyPerformanceData.map((month, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.operatingDays}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.totalProcessedWater.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.totalTreatedWater.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.totalTSEWater.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      month.treatmentEfficiency > 110 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {month.treatmentEfficiency.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.totalTankers}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                    {month.totalFinancialBenefit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Capacity Utilization Chart */}
      <ChartCard title="Monthly Capacity Utilization vs Design Capacity" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="capacityUtilization" fill="#6366f1" name="Capacity Utilization %" />
            <Line y={100} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );

  const renderFinancialOverview = () => (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Financial Benefit</dt>
                <dd className="text-2xl font-bold text-gray-900">{financialAnalysisSummary.totalFinancialBenefit.total.toLocaleString()} OMR</dd>
                <dd className="text-sm text-gray-500">Monthly Avg: {financialAnalysisSummary.totalFinancialBenefit.monthlyAverage.toLocaleString()} OMR</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">TSE Water Savings</dt>
                <dd className="text-2xl font-bold text-gray-900">{financialAnalysisSummary.tseWaterSavings.total.toLocaleString()} OMR</dd>
                <dd className="text-sm text-gray-500">{financialAnalysisSummary.tseWaterSavings.percentage}% of total benefit</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Trash2 className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Tanker Revenue</dt>
                <dd className="text-2xl font-bold text-gray-900">{financialAnalysisSummary.tankerDischargeRevenue.total.toLocaleString()} OMR</dd>
                <dd className="text-sm text-gray-500">{financialAnalysisSummary.tankerDischargeRevenue.percentage}% of total benefit</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Financial Trend */}
      <ChartCard title="Monthly Financial Benefit Trend" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area dataKey="benefit" fill="#10b981" fillOpacity={0.3} stroke="#10b981" name="Total Benefit (OMR)" />
            <Bar dataKey="tankers" fill="#8b5cf6" name="Tanker Trips" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );

  const renderAnnualSummary = () => (
    <div className="space-y-6">
      {/* Annual Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Operating Days</p>
              <p className="text-2xl font-bold text-gray-900">{annualSummary.totalOperatingDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <Droplets className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total TSE Water</p>
              <p className="text-2xl font-bold text-gray-900">{annualSummary.totalTSEWater.toLocaleString()}</p>
              <p className="text-xs text-gray-500">m³</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-emerald-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overall Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">{annualSummary.overallTreatmentEfficiency.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-amber-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Benefit</p>
              <p className="text-2xl font-bold text-gray-900">{annualSummary.totalFinancialBenefit.toLocaleString()}</p>
              <p className="text-xs text-gray-500">OMR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Performance Summary Table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Water Treatment Performance</h4>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Processed Water:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.totalProcessedWater.toLocaleString()} m³</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Treated Water:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.totalTreatedWater.toLocaleString()} m³</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Average Daily TSE:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.avgDailyTSE.toFixed(0)} m³/day</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Capacity Utilization:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.capacityUtilization.toFixed(1)}%</dd>
              </div>
            </dl>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Financial Performance</h4>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Tanker Operations:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.totalTankers.toLocaleString()} trips</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Average Daily Tankers:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.avgDailyTankers.toFixed(1)} trips/day</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Average Monthly Benefit:</dt>
                <dd className="text-sm font-medium text-gray-900">{annualSummary.avgMonthlyFinancialBenefit.toLocaleString()} OMR</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Design Capacity:</dt>
                <dd className="text-sm font-medium text-gray-900">{STP_DESIGN_CAPACITY} m³/day</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="stp-module space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">STP Plant Operations</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive monitoring of Sewage Treatment Plant performance based on actual operational data
          </p>
          <div className="flex items-center space-x-6 mt-3">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Design Capacity:</span>
              <span className="text-blue-600 font-semibold ml-1">{STP_DESIGN_CAPACITY} m³/day TSE</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Revenue Model:</span>
              <span className="text-green-600 font-semibold ml-1">{TANKER_INCOME_PER_TRIP} OMR/trip + {TSE_SAVING_PER_M3} OMR/m³ TSE</span>
            </div>
          </div>
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
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'monthly' && renderMonthlyAnalysis()}
        {activeTab === 'financial' && renderFinancialOverview()}
        {activeTab === 'annual' && renderAnnualSummary()}
      </div>
    </div>
  );
};

export default STPModule; 