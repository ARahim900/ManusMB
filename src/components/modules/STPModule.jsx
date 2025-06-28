import React, { useState, useMemo } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Gauge,
  Wrench,
  AlertCircle,
  CheckSquare,
  Zap,
  Shield,
  Leaf,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  Beaker,
  Thermometer,
  Waves,
  RotateCcw
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
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

// Import Enhanced STP data service
import { 
  enhancedMonthlyData,
  maintenanceCategories,
  equipmentMetrics,
  performanceMetrics,
  getMonthlyData,
  getLatestMonth,
  getDataByMonth,
  getDailyAnalytics,
  getEfficiencyTrends,
  getFinancialForecast,
  TANKER_INCOME_PER_TRIP,
  TSE_SAVING_PER_M3,
  STP_DESIGN_CAPACITY
} from '../../services/stpEnhancedDataService';

const STPModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState(getLatestMonth()?.monthKey || '2025-06');
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);

  // Get current month data
  const currentMonthData = useMemo(() => {
    return getDataByMonth(selectedMonth) || getLatestMonth();
  }, [selectedMonth]);

  // Get available months for selector
  const availableMonths = useMemo(() => {
    return enhancedMonthlyData.map(month => ({
      value: month.monthKey,
      label: month.monthName
    }));
  }, []);

  // Enhanced metrics for cards - using water module style
  const stpMetrics = useMemo(() => {
    if (!currentMonthData) return [];
    
    return [
      {
        title: 'Water Treatment Capacity',
        value: currentMonthData.capacityUtilization.toFixed(1),
        unit: '%',
        subtitle: `${currentMonthData.avgDailyTSE.toFixed(0)} m³/day | Design: ${STP_DESIGN_CAPACITY} m³/day`,
        icon: Gauge,
        iconColor: currentMonthData.capacityUtilization > 80 ? 'text-red-500' : currentMonthData.capacityUtilization > 60 ? 'text-yellow-500' : 'text-green-500'
      },
      {
        title: 'Treatment Efficiency',
        value: currentMonthData.treatmentEfficiency.toFixed(1),
        unit: '%',
        subtitle: `TSE Output: ${currentMonthData.totalTSEOutput.toLocaleString()} m³`,
        icon: CheckCircle,
        iconColor: currentMonthData.treatmentEfficiency > 85 ? 'text-green-500' : currentMonthData.treatmentEfficiency > 80 ? 'text-yellow-500' : 'text-red-500'
      },
      {
        title: 'Financial Performance',
        value: (currentMonthData.totalFinancialBenefit / 1000).toFixed(1),
        unit: 'K OMR',
        subtitle: `Tanker: ${currentMonthData.tankerIncome.toLocaleString()} | TSE: ${currentMonthData.tseWaterSavings.toLocaleString()}`,
        icon: DollarSign,
        iconColor: 'text-amber-500'
      },
      {
        title: 'Total Sewage Processed',
        value: currentMonthData.totalInletSewage.toLocaleString(),
        unit: 'm³',
        subtitle: `Avg: ${currentMonthData.avgDailyTreated.toFixed(0)} m³/day | ${currentMonthData.operatingDays} operating days`,
        icon: Droplets,
        iconColor: 'text-blue-600'
      },
      {
        title: 'TSE Water Generated',
        value: currentMonthData.totalTSEOutput.toLocaleString(),
        unit: 'm³',
        subtitle: `Avg: ${currentMonthData.avgDailyTSE.toFixed(0)} m³/day | ${((currentMonthData.avgDailyTSE / STP_DESIGN_CAPACITY) * 100).toFixed(1)}% capacity`,
        icon: Waves,
        iconColor: 'text-green-600'
      },
      {
        title: 'Tanker Discharging',
        value: currentMonthData.totalTankers.toLocaleString(),
        unit: 'trips',
        subtitle: `Avg: ${currentMonthData.avgDailyTankers.toFixed(1)} trips/day | Revenue: ${currentMonthData.tankerIncome.toLocaleString()} OMR`,
        icon: Trash2,
        iconColor: 'text-purple-600'
      }
    ];
  }, [currentMonthData]);

  // Equipment status summary
  const equipmentStatus = useMemo(() => {
    return Object.entries(equipmentMetrics).map(([key, equipment]) => ({
      id: key,
      name: equipment.name,
      efficiency: equipment.efficiency,
      status: equipment.status,
      alerts: equipment.alerts,
      trend: equipment.performanceTrend,
      nextMaintenance: equipment.nextMaintenance,
      statusColor: equipment.status === 'Excellent' ? 'text-green-500' : 
                   equipment.status === 'Operational' ? 'text-blue-500' : 'text-yellow-500'
    }));
  }, []);

  // Chart data preparation
  const chartData = useMemo(() => {
    const trends = getEfficiencyTrends();
    return {
      monthlyTrends: trends,
      capacityTrend: trends.map(t => ({
        month: t.month,
        capacity: t.capacity,
        efficiency: t.efficiency,
        target: 75 // Target capacity utilization
      })),
      financialTrend: trends.map(t => ({
        month: t.month,
        financial: t.financial / 1000, // Convert to thousands
        tankerIncome: enhancedMonthlyData.find(m => m.monthKey === t.monthKey)?.tankerIncome / 1000 || 0,
        tseIncome: enhancedMonthlyData.find(m => m.monthKey === t.monthKey)?.tseWaterSavings / 1000 || 0
      }))
    };
  }, []);

  // Daily analytics for selected month
  const dailyAnalytics = useMemo(() => {
    return getDailyAnalytics(selectedMonth);
  }, [selectedMonth]);

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Month Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">STP Plant Overview</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {availableMonths.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
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
          />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Trend */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Treatment efficiency and capacity utilization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData.capacityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="capacity" fill="#3b82f6" name="Capacity Utilization %" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="Treatment Efficiency %" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={2} name="Target %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Financial Performance */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-amber-500" />
              <span>Financial Performance</span>
            </CardTitle>
            <CardDescription>Revenue breakdown: Tanker operations vs TSE water savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.financialTrend}>
                  <defs>
                    <linearGradient id="tankerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="tseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" label={{ value: 'Revenue (K OMR)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [`${value.toFixed(1)}K OMR`, name]}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tseIncome"
                    stackId="1"
                    stroke="#10b981"
                    fill="url(#tseGradient)"
                    name="TSE Water Savings"
                  />
                  <Area
                    type="monotone"
                    dataKey="tankerIncome"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="url(#tankerGradient)"
                    name="Tanker Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Status Grid */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-indigo-500" />
            <span>Equipment Status Monitor</span>
          </CardTitle>
          <CardDescription>Real-time status of critical STP equipment systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipmentStatus.map((equipment) => (
              <div key={equipment.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{equipment.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    equipment.status === 'Excellent' ? 'bg-green-500' :
                    equipment.status === 'Operational' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Efficiency:</span>
                    <span className="font-medium">{equipment.efficiency}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={equipment.statusColor}>{equipment.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Alerts:</span>
                    <span className={equipment.alerts > 0 ? 'text-red-500' : 'text-green-500'}>
                      {equipment.alerts}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Next maintenance: {new Date(equipment.nextMaintenance).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h2>
      </div>

      {/* Daily Performance Chart */}
      {dailyAnalytics && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Daily Performance - {dailyAnalytics.monthName}</span>
            </CardTitle>
            <CardDescription>Day-by-day analysis of treatment efficiency and output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyAnalytics.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis yAxisId="volume" orientation="left" stroke="#6b7280" />
                  <YAxis yAxisId="efficiency" orientation="right" stroke="#6b7280" />
                  <Tooltip />
                  <Bar yAxisId="volume" dataKey="treated" fill="#3b82f6" name="Treated Water (m³)" />
                  <Bar yAxisId="volume" dataKey="tse" fill="#10b981" name="TSE Output (m³)" />
                  <Line yAxisId="efficiency" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="Efficiency %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Input Source Analysis</CardTitle>
            <CardDescription>Breakdown of sewage input sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Tanker Input', value: currentMonthData?.totalTankers * 20 || 0, fill: '#8b5cf6' },
                      { name: 'Direct Sewage', value: currentMonthData?.totalDirectSewage || 0, fill: '#f59e0b' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} m³`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quality Compliance Trend</CardTitle>
            <CardDescription>Monthly quality compliance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis domain={[90, 100]} stroke="#6b7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="compliance" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Quality Compliance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Management</h2>
        <Button 
          onClick={() => setShowMaintenanceDetails(!showMaintenanceDetails)}
          variant="outline"
        >
          <Wrench className="h-4 w-4 mr-2" />
          {showMaintenanceDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>

      {/* Maintenance Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(maintenanceCategories).map(([key, category]) => (
          <Card key={key} className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                {key === 'daily' && <Clock className="h-5 w-5 text-blue-500" />}
                {key === 'weekly' && <Calendar className="h-5 w-5 text-green-500" />}
                {key === 'monthly' && <RotateCcw className="h-5 w-5 text-purple-500" />}
                {key === 'emergency' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                <span>{category.name}</span>
              </CardTitle>
              <CardDescription>{category.frequency}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Compliance:</span>
                  <span className={`font-medium ${
                    category.compliance > 95 ? 'text-green-500' : 
                    category.compliance > 90 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {category.compliance}%
                  </span>
                </div>
                {key === 'emergency' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Incidents:</span>
                    <span className="font-medium text-orange-500">{category.incidents}</span>
                  </div>
                )}
                {showMaintenanceDetails && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-2">Activities:</h4>
                    <ul className="text-xs space-y-1">
                      {category.activities.map((activity, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckSquare className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Calendar/Schedule */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Maintenance Schedule Overview</span>
          </CardTitle>
          <CardDescription>Upcoming maintenance activities and compliance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(equipmentMetrics).map(([key, equipment]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    equipment.status === 'Excellent' ? 'bg-green-500' :
                    equipment.status === 'Operational' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{equipment.name}</h4>
                    <p className="text-sm text-gray-500">Last: {new Date(equipment.lastMaintenance).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Next: {new Date(equipment.nextMaintenance).toLocaleDateString()}
                  </p>
                  <p className={`text-xs ${
                    new Date(equipment.nextMaintenance) - new Date() < 7 * 24 * 60 * 60 * 1000 
                      ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {Math.ceil((new Date(equipment.nextMaintenance) - new Date()) / (24 * 60 * 60 * 1000))} days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Reports</h2>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span>Water Treatment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Treated:</span>
                <span className="font-bold">{(performanceMetrics.overall.totalTreatedWater / 1000).toFixed(1)}K m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total TSE:</span>
                <span className="font-bold">{(performanceMetrics.overall.totalTSEOutput / 1000).toFixed(1)}K m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Efficiency:</span>
                <span className="font-bold">{performanceMetrics.overall.avgEfficiency.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>Financial Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Benefit:</span>
                <span className="font-bold">{(performanceMetrics.overall.totalFinancialBenefit / 1000).toFixed(0)}K OMR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly Avg:</span>
                <span className="font-bold">{(performanceMetrics.overall.totalFinancialBenefit / enhancedMonthlyData.length / 1000).toFixed(1)}K OMR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI:</span>
                <span className="font-bold text-green-600">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span>Environmental</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Water Recycled:</span>
                <span className="font-bold">{(performanceMetrics.environmental.waterRecycled / 1000).toFixed(0)}K m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Waste Processed:</span>
                <span className="font-bold">{(performanceMetrics.environmental.wasteReduced / 1000).toFixed(0)}K m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sustainability:</span>
                <span className="font-bold text-green-600">{performanceMetrics.environmental.sustainabilityScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annual Forecast */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-500" />
            <span>12-Month Financial Forecast</span>
          </CardTitle>
          <CardDescription>Projected financial benefits based on current performance trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getFinancialForecast(12)}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'Revenue (OMR)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} OMR`, '']} />
                <Area
                  type="monotone"
                  dataKey="projected"
                  stroke="#8b5cf6"
                  fill="url(#forecastGradient)"
                  name="Projected Monthly Benefit"
                />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Cumulative Benefit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          STP Plant Management System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive Sewage Treatment Plant Operations & Performance Monitoring
        </p>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Factory className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center space-x-2">
            <Wrench className="h-4 w-4" />
            <span>Maintenance</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {renderAnalytics()}
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          {renderMaintenance()}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {renderReports()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default STPModule; 