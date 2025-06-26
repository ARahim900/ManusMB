import React, { useState, useMemo, useCallback } from 'react';
import { useMetrics } from '@hooks/useMetrics';
import { useChartData } from '@hooks/useChartData';
import LineChartEnhanced from '@components/charts/LineChartEnhanced';
import MetricCard from '@components/ui/MetricCard';
import ChartCard from '@components/ui/ChartCard';
import { Button } from '@components/ui/button';
import electricityDataService from '@services/electricityDataService';
import waterOverviewService from '@services/waterOverviewService';
import {
  Zap, Droplets, TrendingUp, AlertCircle,
  RefreshCw, Download, Brain, Filter
} from 'lucide-react';

/**
 * Enhanced Dashboard Module demonstrating Context7 best practices
 * - Custom hooks for data management
 * - Optimized rendering with React.memo
 * - Modern Tailwind CSS patterns
 * - Enhanced chart components
 */
const EnhancedDashboard = () => {
  // State management
  const [selectedPeriod, setSelectedPeriod] = useState('last-6-months');
  const [activeMetric, setActiveMetric] = useState('all');

  // Use custom hooks for data fetching
  const electricityMetrics = useMetrics(electricityDataService, { period: selectedPeriod });
  const waterMetrics = useMetrics(waterOverviewService, { period: selectedPeriod });

  // Memoized calculations
  const totalConsumption = useMemo(() => {
    if (!electricityMetrics.data || !waterMetrics.data) return 0;
    return electricityMetrics.data.totalConsumption + (waterMetrics.data.totalSupply || 0);
  }, [electricityMetrics.data, waterMetrics.data]);

  // Chart data transformation
  const combinedTrendData = useChartData(
    useMemo(() => {
      if (!electricityMetrics.data?.consumptionTrend || !waterMetrics.data?.monthlyTrend) return [];
      
      return electricityMetrics.data.consumptionTrend.map((item, index) => ({
        month: item.month,
        electricity: item.consumption,
        water: waterMetrics.data.monthlyTrend[index]?.consumption || 0,
        total: item.consumption + (waterMetrics.data.monthlyTrend[index]?.consumption || 0)
      }));
    }, [electricityMetrics.data, waterMetrics.data]),
    'line',
    { xKey: 'month', yKeys: ['electricity', 'water', 'total'] }
  );

  // Callbacks
  const handleRefresh = useCallback(() => {
    electricityMetrics.refresh();
    waterMetrics.refresh();
  }, [electricityMetrics, waterMetrics]);

  const handleExport = useCallback(() => {
    // Export logic with proper data formatting
    const exportData = {
      timestamp: new Date().toISOString(),
      period: selectedPeriod,
      electricity: electricityMetrics.data,
      water: waterMetrics.data,
      totalConsumption
    };
    
    // Convert to CSV and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedPeriod, electricityMetrics.data, waterMetrics.data, totalConsumption]);

  // Loading state
  const isLoading = electricityMetrics.loading || waterMetrics.loading;
  const hasError = electricityMetrics.error || waterMetrics.error;

  // Render loading state
  if (isLoading && !electricityMetrics.data && !waterMetrics.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center animate-fade-in">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <header className="mb-8 animate-slide-down">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Enhanced Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time monitoring with Context7 enhancements
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              className="hover:animate-scale-in"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="primary"
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-gradient-primary hover:shadow-glow"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {hasError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-700 dark:text-red-300">
            {electricityMetrics.error || waterMetrics.error}
          </p>
        </div>
      )}

      {/* Period Filter */}
      <div className="mb-6 flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-soft animate-slide-up">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="last-month">Last Month</option>
          <option value="last-3-months">Last 3 Months</option>
          <option value="last-6-months">Last 6 Months</option>
          <option value="last-year">Last Year</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <MetricCard
            title="Electricity Consumption"
            value={electricityMetrics.data?.totalConsumption?.toLocaleString() || '0'}
            unit="kWh"
            icon={Zap}
            iconColor="text-electricity"
            subtitle="Total usage"
            trend={{
              value: 5.2,
              direction: 'up'
            }}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <MetricCard
            title="Water Supply"
            value={waterMetrics.data?.totalSupply?.toLocaleString() || '0'}
            unit="m³"
            icon={Droplets}
            iconColor="text-water"
            subtitle="Total supply"
            trend={{
              value: 3.8,
              direction: 'down'
            }}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <MetricCard
            title="System Efficiency"
            value={waterMetrics.data?.systemEfficiency?.toFixed(1) || '0'}
            unit="%"
            icon={TrendingUp}
            iconColor="text-success"
            subtitle="Overall performance"
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <MetricCard
            title="Active Alerts"
            value="3"
            icon={AlertCircle}
            iconColor="text-warning"
            subtitle="Requires attention"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-slide-up">
          <ChartCard 
            title="Combined Resource Consumption" 
            subtitle="Electricity and water usage trends"
          >
            <LineChartEnhanced
              data={combinedTrendData}
              lines={[
                { dataKey: 'electricity', name: 'Electricity (kWh)', color: '#5f5168' },
                { dataKey: 'water', name: 'Water (m³)', color: '#3b82f6' },
                { dataKey: 'total', name: 'Total', color: '#10b981', strokeDasharray: '5 5' }
              ]}
              height={350}
              showBrush={combinedTrendData?.length > 10}
              tooltipFormatter={(value, name) => {
                if (name.includes('Electricity')) return `${value.toLocaleString()} kWh`;
                if (name.includes('Water')) return `${value.toLocaleString()} m³`;
                return value.toLocaleString();
              }}
            />
          </ChartCard>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <ChartCard 
            title="Resource Distribution" 
            subtitle="Breakdown by category"
          >
            {/* Placeholder for pie chart */}
            <div className="h-[350px] flex items-center justify-center text-gray-500">
              <p>Pie chart implementation here</p>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="mt-8 p-6 bg-gradient-primary text-white rounded-2xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6" />
          <h3 className="text-xl font-semibold">AI Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-effect p-4 rounded-lg">
            <p className="text-sm opacity-90 mb-1">Optimization Potential</p>
            <p className="text-2xl font-bold">15.3%</p>
            <p className="text-xs opacity-75 mt-1">Estimated savings possible</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <p className="text-sm opacity-90 mb-1">Anomaly Detection</p>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs opacity-75 mt-1">Unusual patterns detected</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <p className="text-sm opacity-90 mb-1">Predictive Maintenance</p>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs opacity-75 mt-1">Assets need attention soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export memoized component for performance
export default React.memo(EnhancedDashboard); 