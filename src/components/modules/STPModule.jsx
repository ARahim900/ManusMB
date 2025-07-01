import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorBoundary from '../ui/ErrorBoundary';
import SubNavigation from '../ui/SubNavigation';
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

// Import STP data service with complete user database
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
} from '../../services/stpCleanDataService';

// STP data imported from service

const STPModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);
  
  // Add refs for cancellation and debouncing
  const abortControllerRef = useRef(null);
  const tabSwitchTimeoutRef = useRef(null);
  
  // Get the most recent month with data as default
  const defaultMonth = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return '2025-06';
      }
      const sortedMonths = [...monthlyPerformanceData].sort((a, b) => new Date(b.monthKey) - new Date(a.monthKey));
      return sortedMonths[0]?.monthKey || '2025-06';
    } catch (error) {
      console.error('Error getting default month:', error);
      return '2025-06';
    }
  }, []);
  
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // Debounced tab switching to prevent conflicts
  const handleTabSwitch = useCallback((tabId) => {
    // Cancel any existing operation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Clear any pending tab switch
    if (tabSwitchTimeoutRef.current) {
      clearTimeout(tabSwitchTimeoutRef.current);
    }
    
    setTabLoading(true);
    
    // Create new abort controller for this operation
    abortControllerRef.current = new AbortController();
    
    // Debounce tab switching to prevent rapid clicking issues
    tabSwitchTimeoutRef.current = setTimeout(() => {
      try {
        if (!abortControllerRef.current?.signal.aborted) {
          setActiveTab(tabId);
          setTabLoading(false);
        }
      } catch (error) {
        console.error('Error switching tabs:', error);
        setError('Failed to switch tabs. Please try again.');
        setTabLoading(false);
      }
    }, 150); // Small delay to prevent rapid clicking
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (tabSwitchTimeoutRef.current) {
        clearTimeout(tabSwitchTimeoutRef.current);
      }
    };
  }, []);

  // Get available months dynamically with error handling - MEMOIZED
  const availableMonths = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return [{ value: '2025-06', label: 'June 2025' }];
      }
      return [...monthlyPerformanceData]
        .sort((a, b) => new Date(b.monthKey) - new Date(a.monthKey))
        .map(month => ({
          value: month.monthKey,
          label: month.month
        }));
    } catch (error) {
      console.error('Error processing available months:', error);
      return [{ value: '2025-06', label: 'June 2025' }];
    }
  }, [monthlyPerformanceData]);

  // Get current month data with error handling - OPTIMIZED
  const currentMonthData = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return null;
      }
      return monthlyPerformanceData.find(m => m.monthKey === selectedMonth) || monthlyPerformanceData[0];
    } catch (error) {
      console.error('Error getting current month data:', error);
      return null;
    }
  }, [selectedMonth, monthlyPerformanceData]);

  // Get annual summary with error handling - CACHED
  const annualSummary = useMemo(() => {
    try {
      return getAnnualSummary() || {};
    } catch (error) {
      console.error('Error getting annual summary:', error);
      return {};
    }
  }, []); // Remove dynamic dependencies that cause unnecessary recalculations

  // Prepare chart data for monthly trends with error handling - OPTIMIZED
  const monthlyTrendData = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return [];
      }
      
      const trends = monthlyPerformanceData.map(month => ({
        month: month.month ? month.month.split(' ')[0] : 'Unknown',
        treated: month.totalTreatedWater || 0,
        tse: month.totalTSEWater || 0,
        processed: month.totalProcessedWater || 0,
        efficiency: month.treatmentEfficiency || 0,
        benefit: month.totalFinancialBenefit || 0,
        tankers: month.totalTankers || 0,
        capacityUtilization: month.avgDailyTSE ? (month.avgDailyTSE / STP_DESIGN_CAPACITY) * 100 : 0
      }));
      return trends;
    } catch (error) {
      console.error('Error processing monthly trend data:', error);
      return [];
    }
  }, [monthlyPerformanceData]);

  // STP Key Performance Metrics with error handling - OPTIMIZED DEPENDENCIES
  const stpMetrics = useMemo(() => {
    if (!currentMonthData) return [];
    
    try {
      return [
        {
          title: 'Total Water Treated',
          value: (currentMonthData.totalTreatedWater || 0).toLocaleString(),
          unit: 'm³',
          subtitle: `Avg: ${currentMonthData.avgDailyTreated || 0} m³/day | ${currentMonthData.operatingDays || 0} operating days`,
          icon: Droplets,
          iconColor: 'text-blue-500',
          trend: (currentMonthData.treatmentEfficiency || 0) > 110 ? 'up' : 'stable'
        },
        {
          title: 'TSE Water Output',
          value: (currentMonthData.totalTSEWater || 0).toLocaleString(),
          unit: 'm³',
          subtitle: `Avg: ${currentMonthData.avgDailyTSE || 0} m³/day | Capacity: ${(((currentMonthData.avgDailyTSE || 0) / STP_DESIGN_CAPACITY) * 100).toFixed(1)}%`,
          icon: CheckCircle,
          iconColor: 'text-green-500',
          trend: (currentMonthData.avgDailyTSE || 0) > 500 ? 'up' : 'down'
        },
        {
          title: 'Treatment Efficiency',
          value: (currentMonthData.treatmentEfficiency || 0).toFixed(1),
          unit: '%',
          subtitle: 'TSE/Treated Water Ratio',
          icon: TrendingUp,
          iconColor: 'text-emerald-500',
          trend: (currentMonthData.treatmentEfficiency || 0) > 110 ? 'up' : 'stable'
        },
        {
          title: 'Financial Benefit',
          value: (currentMonthData.totalFinancialBenefit || 0).toLocaleString(),
          unit: 'OMR',
          subtitle: `Tanker: ${(currentMonthData.tankerIncome || 0).toLocaleString()} + TSE: ${(currentMonthData.tseWaterSavings || 0).toLocaleString()}`,
          icon: DollarSign,
          iconColor: 'text-amber-500',
          trend: (currentMonthData.totalFinancialBenefit || 0) > 20000 ? 'up' : 'down'
        },
        {
          title: 'Tanker Operations',
          value: (currentMonthData.totalTankers || 0).toLocaleString(),
          unit: 'trips',
          subtitle: `Avg: ${(currentMonthData.avgDailyTankers || 0).toFixed(1)} trips/day`,
          icon: Trash2,
          iconColor: 'text-purple-500',
          trend: (currentMonthData.avgDailyTankers || 0) > 8 ? 'up' : 'down'
        },
        {
          title: 'Capacity Utilization',
          value: (((currentMonthData.avgDailyTSE || 0) / STP_DESIGN_CAPACITY) * 100).toFixed(1),
          unit: '%',
          subtitle: `Design Capacity: ${STP_DESIGN_CAPACITY} m³/day`,
          icon: Gauge,
          iconColor: 'text-indigo-500',
          trend: (currentMonthData.avgDailyTSE || 0) > 500 ? 'up' : 'stable'
        }
      ];
    } catch (error) {
      console.error('Error processing STP metrics:', error);
      return [];
    }
  }, [currentMonthData]);

  // Financial breakdown for pie chart with error handling - STABLE DEPENDENCIES
  const financialBreakdown = useMemo(() => {
    if (!currentMonthData) {
      return [];
    }
    
    try {
      const breakdown = [
        { name: 'TSE Water Savings', value: currentMonthData.tseWaterSavings || 0, color: '#10b981' },
        { name: 'Tanker Revenue', value: currentMonthData.tankerIncome || 0, color: '#f59e0b' }
      ];
      return breakdown;
    } catch (error) {
      console.error('Error processing financial breakdown:', error);
      return [];
    }
  }, [currentMonthData]);

  // Enhanced data for interactive charts with error handling - PERFORMANCE OPTIMIZED
  const enhancedMonthlyData = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return [];
      }
      
      const enhanced = monthlyPerformanceData.map(month => {
        // Calculate estimated tanker volume (assuming 20m³ per tanker trip)
        const estimatedTankerVolume = (month.totalTankers || 0) * 20;
        // Calculate direct sewage as the difference
        const directSewageVolume = (month.totalProcessedWater || 0) - estimatedTankerVolume;
        
        return {
          month: month.month || 'Unknown',
          monthShort: month.month ? month.month.split(' ')[0] : 'Unknown',
          monthKey: month.monthKey || '',
          totalProcessedWater: month.totalProcessedWater || 0,
          totalTSEWater: month.totalTSEWater || 0,
          totalTreatedWater: month.totalTreatedWater || 0,
          tankerVolume: estimatedTankerVolume,
          directSewageVolume: Math.max(0, directSewageVolume),
          tankerPercentage: month.totalProcessedWater ? ((estimatedTankerVolume / month.totalProcessedWater) * 100).toFixed(1) : '0',
          directSewagePercentage: month.totalProcessedWater ? ((directSewageVolume / month.totalProcessedWater) * 100).toFixed(1) : '0',
          treatmentEfficiency: month.treatmentEfficiency || 0,
          operatingDays: month.operatingDays || 0,
          avgDailyProcessed: month.avgDailyProcessed || 0,
          avgDailyTSE: month.avgDailyTSE || 0
        };
      });
      
      return enhanced;
    } catch (error) {
      console.error('Error processing enhanced monthly data:', error);
      return [];
    }
  }, [monthlyPerformanceData]);

  // Filtered data for selected months range
  const [monthRange, setMonthRange] = useState({ start: 0, end: 2 });
  
  const filteredChartData = useMemo(() => {
    try {
      if (!enhancedMonthlyData || enhancedMonthlyData.length === 0) {
        return [];
      }
      return enhancedMonthlyData.slice(monthRange.start, monthRange.end + 1);
    } catch (error) {
      console.error('Error filtering chart data:', error);
      return [];
    }
  }, [enhancedMonthlyData, monthRange]);

  // Update month range when data changes
  React.useEffect(() => {
    setMonthRange({ start: 0, end: Math.max(0, enhancedMonthlyData.length - 1) });
  }, [enhancedMonthlyData.length]);

  // Define tabs for navigation with updated structure for SubNavigation
  const subSections = useMemo(() => [
    { id: 'dashboard', name: 'Dashboard', icon: Factory, shortName: 'Home' },
    { id: 'analytics', name: 'Advanced Analytics', icon: BarChart3, shortName: 'Analytics' },
    { id: 'monthly', name: 'Monthly Analysis', icon: Calendar, shortName: 'Monthly' },
    { id: 'financial', name: 'Financial Overview', icon: DollarSign, shortName: 'Finance' },
    { id: 'annual', name: 'Annual Summary', icon: Target, shortName: 'Annual' }
  ], []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Error Loading STP Data</h3>
          <p className="text-gray-500 mt-2">{error}</p>
          <Button onClick={() => {
            setError(null);
            window.location.reload();
          }} className="mt-4">
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // MEMOIZED TAB CONTENT COMPONENTS FOR PERFORMANCE
  const DashboardContent = React.memo(() => {
    console.log('Dashboard Render - monthlyTrendData:', monthlyTrendData);
    console.log('Dashboard Render - financialBreakdown:', financialBreakdown);
    console.log('Dashboard Render - currentMonthData:', currentMonthData);
    console.log('Dashboard Render - monthlyPerformanceData:', monthlyPerformanceData);
    
    return (
    <div className="space-y-6">
      {/* Chart Controls & Filters - Positioned under navigation bar */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-600" />
            Chart Controls & Filters
          </h3>
          <p className="text-sm text-gray-600 mt-1">Filter data by month range for detailed analysis</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Month</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={monthRange.start}
                onChange={(e) => setMonthRange(prev => ({ ...prev, start: parseInt(e.target.value) }))}
              >
                {enhancedMonthlyData.map((month, index) => (
                  <option key={index} value={index}>{month.month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Month</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={monthRange.end}
                onChange={(e) => setMonthRange(prev => ({ ...prev, end: parseInt(e.target.value) }))}
              >
                {enhancedMonthlyData.map((month, index) => (
                  <option key={index} value={index}>{month.month}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                onClick={() => setMonthRange({ start: 0, end: enhancedMonthlyData.length - 1 })}
                className="w-full"
              >
                Reset to All Data
              </Button>
              <div className="text-sm text-gray-600 text-center">
                Showing data from <span className="font-medium">{enhancedMonthlyData[monthRange.start]?.month || 'Unknown'}</span> to <span className="font-medium">{enhancedMonthlyData[monthRange.end]?.month || 'Unknown'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          {filteredChartData && filteredChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthShort" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="totalTreatedWater" fill="#3b82f6" name="Treated Water (m³)" />
                <Bar yAxisId="left" dataKey="totalTSEWater" fill="#10b981" name="TSE Water (m³)" />
                <Line yAxisId="right" type="monotone" dataKey="treatmentEfficiency" stroke="#f59e0b" strokeWidth={2} name="Efficiency %" />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No trend data available</p>
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Financial Benefit Distribution" className="h-80">
          {filteredChartData && filteredChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { 
                      name: 'TSE Water Savings', 
                      value: filteredChartData.reduce((sum, item) => sum + (item.totalTSEWater * TSE_SAVING_PER_M3 || 0), 0), 
                      color: '#10b981' 
                    },
                    { 
                      name: 'Tanker Revenue', 
                      value: filteredChartData.reduce((sum, item) => sum + (item.tankerVolume * TANKER_INCOME_PER_TRIP / 20 || 0), 0), 
                      color: '#f59e0b' 
                    }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'TSE Water Savings', value: filteredChartData.reduce((sum, item) => sum + (item.totalTSEWater * TSE_SAVING_PER_M3 || 0), 0), color: '#10b981' },
                    { name: 'Tanker Revenue', value: filteredChartData.reduce((sum, item) => sum + (item.tankerVolume * TANKER_INCOME_PER_TRIP / 20 || 0), 0), color: '#f59e0b' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toLocaleString()} OMR`, '']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No financial data available</p>
              </div>
            </div>
          )}
        </ChartCard>
      </div>
    </div>
    );
  });

  const AdvancedAnalyticsContent = React.memo(() => (
    <div className="space-y-6">

      {/* Modern Line Chart: Water Processing vs TSE Generation */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Water Processing vs TSE Generation Trend
          </h3>
          <p className="text-sm text-gray-600 mt-1">Interactive analysis of water treatment efficiency over time</p>
        </div>
        <div className="p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="tseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="monthShort" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    `${value.toLocaleString()} m³`,
                    name === 'totalProcessedWater' ? 'Total Processed Water' : 'Total TSE Water Generated'
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalProcessedWater" 
                  stackId="1"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#processedGradient)"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalTSEWater" 
                  stackId="2"
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#tseGradient)"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredChartData && filteredChartData.length > 0 
                  ? filteredChartData.reduce((sum, item) => sum + (item.totalProcessedWater || 0), 0).toLocaleString()
                  : '0'
                }
              </div>
              <div className="text-sm text-gray-500">Total Processed (m³)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredChartData && filteredChartData.length > 0 
                  ? filteredChartData.reduce((sum, item) => sum + (item.totalTSEWater || 0), 0).toLocaleString()
                  : '0'
                }
              </div>
              <div className="text-sm text-gray-500">Total TSE Generated (m³)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredChartData && filteredChartData.length > 0 
                  ? (filteredChartData.reduce((sum, item) => sum + (item.treatmentEfficiency || 0), 0) / filteredChartData.length).toFixed(1)
                  : '0.0'
                }%
              </div>
              <div className="text-sm text-gray-500">Average Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {filteredChartData && filteredChartData.length > 0 
                  ? filteredChartData.reduce((sum, item) => sum + (item.operatingDays || 0), 0)
                  : '0'
                }
              </div>
              <div className="text-sm text-gray-500">Total Operating Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Sources Analysis Chart */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-amber-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
            Input Sources Analysis: Tanker vs Direct Sewage
          </h3>
          <p className="text-sm text-gray-600 mt-1">Breakdown of water input sources by volume and percentage</p>
        </div>
        <div className="p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <pattern id="tankerPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                    <rect width="4" height="4" fill="#8b5cf6" opacity="0.1"/>
                    <path d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2" stroke="#8b5cf6" strokeWidth="1"/>
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="monthShort" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="left"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="percentage"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  label={{ value: 'Percentage (%)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name, props) => {
                    if (name.includes('Percentage')) {
                      return [`${value}%`, name];
                    }
                    return [`${value.toLocaleString()} m³`, name];
                  }}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar 
                  yAxisId="volume"
                  dataKey="tankerVolume" 
                  name="Tanker Volume"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="volume"
                  dataKey="directSewageVolume" 
                  name="Direct Sewage Volume"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="percentage"
                  type="monotone" 
                  dataKey="tankerPercentage" 
                  name="Tanker Percentage"
                  stroke="#7c3aed" 
                  strokeWidth={3}
                  dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#7c3aed', strokeWidth: 2 }}
                />
                <Line 
                  yAxisId="percentage"
                  type="monotone" 
                  dataKey="directSewagePercentage" 
                  name="Direct Sewage Percentage"
                  stroke="#d97706" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#d97706', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Input Sources Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-purple-800">Tanker Input</h4>
                  <div className="text-2xl font-bold text-purple-600 mt-1">
                    {filteredChartData && filteredChartData.length > 0 
                      ? filteredChartData.reduce((sum, item) => sum + (item.tankerVolume || 0), 0).toLocaleString()
                      : '0'
                    } m³
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    Avg: {filteredChartData && filteredChartData.length > 0 
                      ? (filteredChartData.reduce((sum, item) => sum + parseFloat(item.tankerPercentage || 0), 0) / filteredChartData.length).toFixed(1)
                      : '0.0'
                    }%
                  </div>
                </div>
                <Trash2 className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Direct Sewage</h4>
                  <div className="text-2xl font-bold text-amber-600 mt-1">
                    {filteredChartData && filteredChartData.length > 0 
                      ? filteredChartData.reduce((sum, item) => sum + (item.directSewageVolume || 0), 0).toLocaleString()
                      : '0'
                    } m³
                  </div>
                  <div className="text-sm text-amber-600 mt-1">
                    Avg: {filteredChartData && filteredChartData.length > 0 
                      ? (filteredChartData.reduce((sum, item) => sum + parseFloat(item.directSewagePercentage || 0), 0) / filteredChartData.length).toFixed(1)
                      : '0.0'
                    }%
                  </div>
                </div>
                <Factory className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Total Input</h4>
                  <div className="text-2xl font-bold text-blue-600 mt-1">
                    {filteredChartData && filteredChartData.length > 0 
                      ? filteredChartData.reduce((sum, item) => sum + (item.totalProcessedWater || 0), 0).toLocaleString()
                      : '0'
                    } m³
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    {filteredChartData ? filteredChartData.length : 0} months selected
                  </div>
                </div>
                <Droplets className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const MonthlyAnalysisContent = React.memo(() => (
    <div className="space-y-6">
      {/* Monthly Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance Summary</h3>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of operational and financial performance</p>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <span>Tanker Income</span>
                    <span className="text-xs font-normal text-gray-400">(4.5 OMR/trip)</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <span>TSE Water Savings</span>
                    <span className="text-xs font-normal text-gray-400">(1.32 OMR/m³)</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex flex-col">
                    <span>Total Financial Benefit</span>
                    <span className="text-xs font-normal text-gray-400">(OMR)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyPerformanceData && monthlyPerformanceData.length > 0 ? (
                monthlyPerformanceData.map((month, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month || 'Unknown'}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.operatingDays || 0}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{(month.totalProcessedWater || 0).toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{(month.totalTreatedWater || 0).toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{(month.totalTSEWater || 0).toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        (month.treatmentEfficiency || 0) > 110 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {(month.treatmentEfficiency || 0).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{month.totalTankers || 0}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium text-purple-600">
                          {(month.tankerIncome || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({month.totalTankers || 0} trips)
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium text-blue-600">
                          {(month.tseWaterSavings || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({(month.totalTSEWater || 0).toLocaleString()} m³)
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-bold text-green-600">
                        {(month.totalFinancialBenefit || 0).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
            {/* Summary Row */}
            {monthlyPerformanceData && monthlyPerformanceData.length > 0 && (
              <tfoot className="bg-gray-100 border-t-2 border-gray-300">
                <tr className="font-semibold">
                  <td className="px-4 py-4 text-sm text-gray-900">TOTAL</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.operatingDays || 0), 0)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.totalProcessedWater || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.totalTreatedWater || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.totalTSEWater || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {(monthlyPerformanceData.reduce((sum, month) => sum + (month.treatmentEfficiency || 0), 0) / monthlyPerformanceData.length).toFixed(1)}%
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.totalTankers || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-purple-600 font-bold">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.tankerIncome || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-blue-600 font-bold">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.tseWaterSavings || 0), 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-green-600 font-bold">
                    {monthlyPerformanceData.reduce((sum, month) => sum + (month.totalFinancialBenefit || 0), 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        
        {/* Financial Breakdown Summary Cards */}
        <div className="px-4 py-4 bg-gray-50 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-600">Tanker Operations</p>
                  <div className="flex items-baseline">
                    <p className="text-xl font-bold text-gray-900">
                      {monthlyPerformanceData ? monthlyPerformanceData.reduce((sum, month) => sum + (month.tankerIncome || 0), 0).toLocaleString() : '0'} OMR
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {monthlyPerformanceData ? Math.round((monthlyPerformanceData.reduce((sum, month) => sum + (month.tankerIncome || 0), 0) / monthlyPerformanceData.reduce((sum, month) => sum + (month.totalFinancialBenefit || 0), 0)) * 100) : 0}% of total income
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">TSE Water Generation</p>
                  <div className="flex items-baseline">
                    <p className="text-xl font-bold text-gray-900">
                      {monthlyPerformanceData ? monthlyPerformanceData.reduce((sum, month) => sum + (month.tseWaterSavings || 0), 0).toLocaleString() : '0'} OMR
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {monthlyPerformanceData ? Math.round((monthlyPerformanceData.reduce((sum, month) => sum + (month.tseWaterSavings || 0), 0) / monthlyPerformanceData.reduce((sum, month) => sum + (month.totalFinancialBenefit || 0), 0)) * 100) : 0}% of total income
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Total Financial Benefit</p>
                  <div className="flex items-baseline">
                    <p className="text-xl font-bold text-gray-900">
                      {monthlyPerformanceData ? monthlyPerformanceData.reduce((sum, month) => sum + (month.totalFinancialBenefit || 0), 0).toLocaleString() : '0'} OMR
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Combined revenue streams
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capacity Utilization Chart */}
      <ChartCard title="Monthly Capacity Utilization vs Design Capacity" className="h-80">
        {monthlyTrendData && monthlyTrendData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 'dataMax + 10']} />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)}%`, 'Capacity Utilization']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar 
                dataKey="capacityUtilization" 
                fill="#6366f1" 
                name="Capacity Utilization %" 
                radius={[4, 4, 0, 0]}
              />
              {/* Reference line indicator for 100% capacity */}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No chart data available</p>
            </div>
          </div>
        )}
      </ChartCard>
    </div>
  ));

  const FinancialOverviewContent = React.memo(() => (
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
  ));

  const AnnualSummaryContent = React.memo(() => (
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
  ));

  // RENDER TAB CONTENT WITH LOADING OVERLAY
  const renderTabContent = () => {
    if (tabLoading) {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <LoadingSpinner size="large" />
          </div>
          <div className="filter blur-sm pointer-events-none">
            {/* Render placeholder content */}
            <div className="space-y-6">
              <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AdvancedAnalyticsContent />;
      case 'monthly':
        return <MonthlyAnalysisContent />;
      case 'financial':
        return <FinancialOverviewContent />;
      case 'annual':
        return <AnnualSummaryContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 p-6 bg-background-primary dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-2 transition-colors duration-300">STP Plant Management System</h1>
          <p className="text-secondary dark:text-gray-300 transition-colors duration-300">Sewage Treatment Plant Operations & Performance Monitoring</p>
        </div>

        {/* Sub Navigation with optimized change handler */}
        <SubNavigation 
          sections={subSections}
          activeSection={activeTab}
          onSectionChange={handleTabSwitch}
        />

        {/* Tab Content with error boundary */}
        <ErrorBoundary>
          {renderTabContent()}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default STPModule;