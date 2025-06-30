import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../ui/MetricCard';
import DetailedCard from '../ui/DetailedCard';
import ChartCard from '../ui/ChartCard';
import AlertCard from '../ui/AlertCard';
import { Button } from '../ui/button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Bell,
  Activity,
  Calendar,
  BarChart3,
  Filter
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

// Import STP data for charts
import { 
  monthlyPerformanceData,
  getMonthlyData
} from '../../services/stpCleanDataService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // STP Chart filtering state
  const [monthRange, setMonthRange] = useState({ start: 0, end: 2 });

  // Simulate loading and update time
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Enhanced data for STP charts
  const enhancedMonthlyData = useMemo(() => {
    try {
      if (!monthlyPerformanceData || monthlyPerformanceData.length === 0) {
        return [];
      }
      
      const enhanced = monthlyPerformanceData.map(month => {
        const estimatedTankerVolume = (month.totalTankers || 0) * 20;
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
          avgDailyTSE: month.avgDailyTSE || 0,
          totalFinancialBenefit: month.totalFinancialBenefit || 0,
          tankerIncome: month.tankerIncome || 0,
          tseWaterSavings: month.tseWaterSavings || 0
        };
      });
      
      return enhanced;
    } catch (error) {
      console.error('Error processing enhanced monthly data:', error);
      return [];
    }
  }, [monthlyPerformanceData]);

  // Filtered data for selected months range
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
  useEffect(() => {
    if (enhancedMonthlyData.length > 0) {
      setMonthRange({ start: 0, end: Math.max(0, enhancedMonthlyData.length - 1) });
    }
  }, [enhancedMonthlyData.length]);

  // Prepare chart data for monthly trends
  const monthlyTrendData = useMemo(() => {
    try {
      if (!filteredChartData || filteredChartData.length === 0) {
        return [];
      }
      
      return filteredChartData.map(month => ({
        month: month.monthShort,
        treated: month.totalTreatedWater,
        tse: month.totalTSEWater,
        processed: month.totalProcessedWater,
        efficiency: month.treatmentEfficiency,
        benefit: month.totalFinancialBenefit
      }));
    } catch (error) {
      console.error('Error processing monthly trend data:', error);
      return [];
    }
  }, [filteredChartData]);

  // Financial breakdown for pie chart
  const financialBreakdown = useMemo(() => {
    try {
      if (!filteredChartData || filteredChartData.length === 0) {
        return [];
      }
      
      const totalTankerIncome = filteredChartData.reduce((sum, item) => sum + (item.tankerIncome || 0), 0);
      const totalTseSavings = filteredChartData.reduce((sum, item) => sum + (item.tseWaterSavings || 0), 0);
      
      return [
        { name: 'TSE Water Savings', value: totalTseSavings, color: '#10b981' },
        { name: 'Tanker Revenue', value: totalTankerIncome, color: '#f59e0b' }
      ];
    } catch (error) {
      console.error('Error processing financial breakdown:', error);
      return [];
    }
  }, [filteredChartData]);

  // KPI Cards data following components.json specification
  const kpiCards = [
    {
      title: "Total Energy Consumption",
      value: "1,738,034 kWh",
      isPrimary: true,
      tooltip: "Total electricity consumption across all systems for the current period. Includes residential, commercial, and infrastructure consumption."
    },
    {
      title: "Water System Efficiency", 
      value: "76.2%",
      isPrimary: false,
      tooltip: "Current water system efficiency based on input vs. output flow rates, leak detection, and distribution performance."
    },
    {
      title: "Current Balance",
      value: "$4,836.00",
      isPrimary: true,
      tooltip: "Available reserve funds balance including maintenance reserves, operational costs, and emergency funds."
    },
    {
      title: "Active Contracts",
      value: "25",
      isPrimary: false,
      tooltip: "Number of currently active maintenance and service contracts across all systems and facilities."
    }
  ];

  // Detailed Card data following components.json specification
  const detailedCardData = {
    icon: "🏢",
    title: "System Overview",
    mainValue: "$2,850",
    detailsLink: "See Details >",
    items: [
      { label: "Electricity", value: "$1,159" },
      { label: "Water", value: "$510" },
      { label: "Maintenance", value: "$340" },
      { label: "Reserve Fund", value: "$841" }
    ]
  };

  // System alerts data
  const systemAlerts = [
    {
      type: 'warning',
      message: 'High water loss detected in Zone 3A',
      time: '2 hours ago',
      icon: AlertTriangle,
      priority: 'high',
      action: () => {
        alert('Investigating Zone 3A water loss...\n\nRecommended Actions:\n• Check valve status\n• Inspect pipeline for leaks\n• Review flow meters\n• Schedule maintenance team');
      },
      actionLabel: 'Investigate'
    },
    {
      type: 'info',
      message: 'Monthly electricity report generated',
      time: '4 hours ago',
      icon: BarChart3,
      priority: 'medium',
      action: () => {
        alert('Opening electricity consumption report...');
        // In a real app: navigate to /electricity or open report modal
      },
      actionLabel: 'View Report'
    },
    {
      type: 'success',
      message: 'STP maintenance completed successfully',
      time: '1 day ago',
      icon: CheckCircle,
      priority: 'low',
      action: () => {
        alert('STP Maintenance Summary:\n• All systems checked\n• Filters replaced\n• Performance optimized\n• Next maintenance: 30 days');
      },
      actionLabel: 'View Details'
    }
  ];

  const quickActions = [
    { 
      label: 'View Reports', 
      icon: <BarChart3 className="w-4 h-4" />, 
      action: () => {
        // Navigate to a reports view or show reports modal
        alert('Reports functionality - Navigate to reports dashboard');
        // In a real app: navigate('/reports') or openReportsModal()
      }, 
      variant: 'primary' 
    },
    { 
      label: 'System Status', 
      icon: <Activity className="w-4 h-4" />, 
      action: () => {
        // Show system status information
        alert('System Status: All systems operational\n- Electricity: Online\n- Water: Online\n- STP: Online\n- Reserve Fund: Stable');
        // In a real app: openSystemStatusModal()
      }, 
      variant: 'secondary' 
    },
    { 
      label: 'Schedule Maintenance', 
      icon: <Calendar className="w-4 h-4" />, 
      action: () => {
        // Open maintenance scheduling interface
        alert('Maintenance Scheduling - Opening scheduler...');
        // In a real app: openMaintenanceScheduler()
      }, 
      variant: 'secondary' 
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Muscat Bay Management System
          </h1>
          <p className="page-subtitle">
            Welcome back! Here's what's happening with your systems today.
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="btn btn-secondary btn-sm">
            {currentTime.toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiCards.map((card, index) => (
          <MetricCard
            key={index}
            title={card.title}
            value={card.value}
            isPrimary={card.isPrimary}
            tooltip={card.tooltip}
          />
        ))}
      </div>

      {/* STP Chart Controls & Filters - Moved from Advanced Analytics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Chart Controls & Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Month</label>
            <select 
              value={monthRange.start} 
              onChange={(e) => setMonthRange(prev => ({ ...prev, start: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {enhancedMonthlyData.map((month, index) => (
                <option key={index} value={index}>{month.month}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Month</label>
            <select 
              value={monthRange.end} 
              onChange={(e) => setMonthRange(prev => ({ ...prev, end: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {enhancedMonthlyData.map((month, index) => (
                <option key={index} value={index}>{month.month}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => setMonthRange({ start: 0, end: enhancedMonthlyData.length - 1 })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Reset to All Months
            </button>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Showing data from <span className="font-medium">{enhancedMonthlyData[monthRange.start]?.month || 'Unknown'}</span> to <span className="font-medium">{enhancedMonthlyData[monthRange.end]?.month || 'Unknown'}</span>
        </div>
      </div>

      {/* STP Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Water Treatment Trend" className="h-80">
          {monthlyTrendData && monthlyTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'efficiency' ? `${value}%` : `${value.toLocaleString()} m³`,
                    name === 'treated' ? 'Treated Water' :
                    name === 'tse' ? 'TSE Water' :
                    name === 'efficiency' ? 'Efficiency' : name
                  ]}
                />
                <Bar yAxisId="left" dataKey="treated" fill="#3b82f6" name="treated" />
                <Bar yAxisId="left" dataKey="tse" fill="#10b981" name="tse" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="efficiency" />
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
          {financialBreakdown && financialBreakdown.length > 0 && financialBreakdown.some(item => item.value > 0) ? (
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

      {/* Detailed Card and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2">
          <DetailedCard {...detailedCardData} />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-h3">
            Quick Actions
          </h2>
          
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                label={action.label}
                icon={action.icon}
                variant={action.variant}
                action={action.action}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="chart-card">
        <div className="chart-card-header flex items-center justify-between">
          <h2 className="chart-card-title flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            System Alerts
          </h2>
          <Button
            label="View All"
            variant="secondary"
            size="sm"
            action={() => {}}
          />
        </div>
        
        <div className="space-y-4">
          {systemAlerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-gray-50"
              >
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'success' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-body-regular font-medium">
                    {alert.message}
                  </p>
                  <p className="text-body-small mt-1">
                    {alert.time}
                  </p>
                </div>
                {alert.action && (
                  <button
                    onClick={alert.action}
                    className="btn btn-sm btn-secondary ml-4"
                  >
                    {alert.actionLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

