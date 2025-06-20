import React, { useState, useEffect } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import { Button } from '@/components/ui/button';
import electricityDataService from '../../services/electricityDataService';
import electricityDatabaseService from '../../services/electricityDatabaseService';
// Import test for debugging
import { testElectricityService } from '../../services/testElectricityService';
import ExcelTest from '../ExcelTest';
import { 
  Zap, 
  DollarSign, 
  BarChart3, 
  Activity,
  Filter,
  Download,
  Brain,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ElectricityModule = () => {
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAssetType, setSelectedAssetType] = useState('All Asset Types');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [electricityData, setElectricityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Load electricity data from Excel file
  useEffect(() => {
    loadElectricityData();
  }, []);

  const loadElectricityData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading electricity database with 0.025 OMR/kWh pricing...');
      
      // Test the service first
      console.log('🧪 Testing database service directly...');
      await testElectricityService();
      
      // Use the new database service with actual SQL data
      const data = await electricityDatabaseService.getData();
      setElectricityData(data);
      
      console.log('✅ Database loaded successfully:', {
        totalConsumption: data.totalConsumption?.toFixed(2),
        totalCost: data.totalCost?.toFixed(2),
        activeMeters: data.activeMeters,
        pricePerKWH: data.pricePerKWH
      });
    } catch (err) {
      setError('Failed to load electricity database');
      console.error('Error loading electricity database:', err);
      // Use fallback from database service
      setElectricityData(await electricityDatabaseService.getData());
    } finally {
      setLoading(false);
    }
  };

  // Get filtered data based on current filter selections
  const getFilteredData = () => {
    const baseData = electricityData || { 
      totalConsumption: 0, 
      totalCost: 0, 
      activeMeters: 0, 
      averageConsumption: 0,
      pricePerKWH: 0.025,
      consumptionTrend: [],
      consumptionByCategory: {},
      topConsumers: [],
      categoryPerformance: [],
      detailedRecords: []
    };

    // If no filters are applied, return original data
    if (selectedMonth === 'All Months' && 
        selectedCategory === 'All Categories' && 
        selectedAssetType === 'All Asset Types' && 
        selectedZone === 'All Zones') {
      return baseData;
    }

    // Apply filters to detailed records
    let filteredRecords = baseData.detailedRecords || [];
    
    // Filter by asset type
    if (selectedAssetType !== 'All Asset Types') {
      filteredRecords = filteredRecords.filter(record => record.Type === selectedAssetType);
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      const categoryTypeMap = {
        'Pumping Station': 'PS',
        'Lifting Station': 'LS', 
        'Irrigation Tank': 'IRR',
        'Development Building': 'D_Building',
        'Street Light': 'Street Light',
        'Landscape Lights': 'FP-Landscape Lights Z3',
        'Commercial/Retail': 'Retail'
      };
      const targetType = categoryTypeMap[selectedCategory];
      if (targetType) {
        filteredRecords = filteredRecords.filter(record => record.Type === targetType);
      }
    }

    // Calculate metrics for filtered data
    const monthColumns = [
      'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24',
      'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25'
    ];

    let filteredData = {
      ...baseData,
      totalConsumption: 0,
      totalCost: 0,
      activeMeters: 0,
      consumptionByMonth: {},
      consumptionTrend: [],
      topConsumers: [],
      categoryPerformance: []
    };

    // Initialize monthly data
    monthColumns.forEach(month => {
      filteredData.consumptionByMonth[month] = 0;
    });

    // Process filtered records
    filteredRecords.forEach(record => {
      if (record.totalConsumption > 0) {
        filteredData.activeMeters++;
        filteredData.totalConsumption += record.totalConsumption;
        filteredData.totalCost += record.totalCost;

        // Add to monthly data (for single month filter)
        if (selectedMonth !== 'All Months' && record.monthlyConsumption) {
          filteredData.consumptionByMonth[selectedMonth] += record.monthlyConsumption[selectedMonth] || 0;
        } else if (selectedMonth === 'All Months' && record.monthlyConsumption) {
          monthColumns.forEach(month => {
            filteredData.consumptionByMonth[month] += record.monthlyConsumption[month] || 0;
          });
        }

        // Add to top consumers
        filteredData.topConsumers.push({
          name: record.Name,
          meter: record['Meter Account No.'],
          type: record.Type,
          category: record.category,
          consumption: record.totalConsumption,
          cost: record.totalCost,
          efficiency: record.efficiency || 85
        });
      }
    });

    // Calculate averages
    filteredData.averageConsumption = filteredData.activeMeters > 0 ? 
      filteredData.totalConsumption / filteredData.activeMeters : 0;
    filteredData.averageCost = filteredData.activeMeters > 0 ? 
      filteredData.totalCost / filteredData.activeMeters : 0;

    // Sort top consumers
    filteredData.topConsumers.sort((a, b) => b.consumption - a.consumption);

    // Generate consumption trend for filtered data
    if (selectedMonth !== 'All Months') {
      // Single month view
      filteredData.consumptionTrend = [{
        month: selectedMonth,
        consumption: Math.round(filteredData.consumptionByMonth[selectedMonth] || 0),
        cost: parseFloat(((filteredData.consumptionByMonth[selectedMonth] || 0) * baseData.pricePerKWH).toFixed(2))
      }];
    } else {
      // All months view
      filteredData.consumptionTrend = monthColumns.map(month => ({
        month,
        consumption: Math.round(filteredData.consumptionByMonth[month] || 0),
        cost: parseFloat(((filteredData.consumptionByMonth[month] || 0) * baseData.pricePerKWH).toFixed(2))
      }));
    }

    return filteredData;
  };

  // Get current data (filtered or unfiltered)
  const getCurrentData = () => {
    return getFilteredData();
  };

  const currentData = getCurrentData();

  // Chart colors matching the design
  const pieChartColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6b46c1'];

  const filterOptions = {
    months: ['All Months', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25'],
    categories: ['All Categories', 'Pumping Station', 'Lifting Station', 'Irrigation Tank', 'Development Building', 'Street Light', 'Landscape Lights', 'Commercial/Retail'],
    assetTypes: ['All Asset Types', 'PS', 'LS', 'IRR', 'DB', 'D_Building', 'Street Light', 'FP-Landscape Lights Z3', 'Retail'],
    zones: ['All Zones', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 8']
  };

  if (loading && !electricityData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-lg text-gray-600">Loading electricity data from database...</p>
        </div>
      </div>
    );
  }

  // Category data for pie chart (filtered)
  const categoryData = Object.entries(currentData.consumptionByCategory || {}).map(([name, data], index) => ({
    name,
    value: data.total || data,
    color: pieChartColors[index % pieChartColors.length]
  }));

  // Top consumers data from Excel
  const topConsumers = currentData.topConsumers || [];
  
  // Pagination logic
  const totalConsumers = topConsumers.length;
  const totalPages = Math.ceil(totalConsumers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsumers = topConsumers.slice(startIndex, endIndex);
  
  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Category performance data from Excel
  const categoryPerformance = currentData.categoryPerformance || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Online</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-sm">Muscat Bay Utilities & Services Overview</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              className="bg-[#4E4456] hover:bg-[#3d3742] text-white px-3 py-2 h-auto min-w-fit whitespace-nowrap"
              style={{ backgroundColor: '#4E4456', width: 'auto' }}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Page Header with Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Enhanced Electricity System - Complete Database</h2>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Asset Types: PS, LS, DB, OL & Building, etc...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Categories: Complete classification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Zones: Infrastructure, Development, Zone 3, etc...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Rate: 0.025 OMR/kWh</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={loadElectricityData}
              disabled={loading}
              className="bg-[#4E4456] hover:bg-[#3d3742] text-white px-3 py-2 h-auto min-w-fit whitespace-nowrap disabled:bg-gray-400"
              style={{ backgroundColor: loading ? '#9ca3af' : '#4E4456', width: 'auto' }}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              AI Analysis
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by Month</span>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {filterOptions.months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by Category</span>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {filterOptions.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by Zone</span>
                <select 
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {filterOptions.zones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button 
              variant="outline"
              onClick={() => {
                setSelectedMonth('All Months');
                setSelectedCategory('All Categories');
                setSelectedAssetType('All Asset Types');
                setSelectedZone('All Zones');
              }}
              className="bg-gray-800 text-white hover:bg-gray-900"
            >
              Reset All
            </Button>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            <span className="flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              {currentData.activeMeters} assets shown
            </span>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Consumption */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Consumption</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(currentData.totalConsumption || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500">kWh</p>
                <p className="text-xs text-gray-400 mt-1">Overall</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Total Est. Cost */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Est. Cost</p>
                <p className="text-2xl font-bold text-gray-900">{(currentData.totalCost || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500">OMR</p>
                <p className="text-xs text-gray-400 mt-1">Based on selection</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Avg. Consumption/Unit */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Consumption/Unit</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(currentData.averageConsumption || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500">kWh</p>
                <p className="text-xs text-gray-400 mt-1">Overall</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Active Meters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Meters</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.activeMeters || 0}</p>
                <p className="text-sm text-gray-500">units</p>
                <p className="text-xs text-gray-400 mt-1">In selection</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Consumption Trend Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Consumption Trend (14 Months)</h3>
                <p className="text-sm text-gray-600">Complete data coverage: Apr-24 to May-25 • Filters: All Categories, All Types, All Zones</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.consumptionTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} kWh`, 'Total kWh']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#6b46c1" 
                    strokeWidth={3}
                    dot={{ fill: '#6b46c1', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#6b46c1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Consumption by Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Consumption by Category</h3>
                <p className="text-sm text-gray-600">For all data</p>
              </div>
            </div>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toLocaleString()} kWh`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold text-gray-900">{Math.round(currentData.totalConsumption || 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total kWh</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Electricity Consumers */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Top Electricity Consumers</h3>
                  <p className="text-sm text-gray-600">Performance ranking for overall period</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{totalConsumers}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Sort by:</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm bg-white">
                  <option>Consumption ↓</option>
                  <option>Name</option>
                </select>
                <span className="ml-auto">Showing {startIndex + 1}-{Math.min(endIndex, totalConsumers)} of {totalConsumers}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-3 text-sm font-medium text-gray-700">Unit Details</th>
                    <th className="pb-3 text-sm font-medium text-gray-700">Category</th>
                    <th className="pb-3 text-sm font-medium text-gray-700">Consumption</th>
                    <th className="pb-3 text-sm font-medium text-gray-700">Est. Cost</th>
                    <th className="pb-3 text-sm font-medium text-gray-700">Performance</th>
                    <th className="pb-3 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentConsumers.map((consumer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">{consumer.name}</div>
                          <div className="text-sm text-gray-500">Meter: {consumer.meter} • Type: {consumer.type}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          {consumer.category || 'Development Building'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{Math.round(consumer.consumption).toLocaleString()}</div>
                          <div className="text-gray-500">kWh</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{consumer.cost.toFixed(2)}</div>
                          <div className="text-gray-500">OMR</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gray-600 h-2 rounded-full" 
                              style={{ width: `${consumer.efficiency || 85}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{consumer.efficiency || 85}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <Button variant="outline" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>Showing {startIndex + 1} to {Math.min(endIndex, totalConsumers)} of {totalConsumers} consumers</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-2 py-1 rounded text-xs ${
                      currentPage === pageNumber 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance Overview</h3>
            <p className="text-sm text-gray-600">Consumption breakdown by category for all data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Actuator DB', units: 6, total: '5,715.1 kWh', average: '1519 kWh', color: 'bg-gray-800' },
              { name: 'Commercial/Retail', units: 2, total: '188,577 kWh', average: '93289 kWh', color: 'bg-purple-600' },
              { name: 'Development Building', units: 36, total: '1,188,681 kWh', average: '42643 kWh', color: 'bg-red-500' },
              { name: 'Irrigation Tank', units: 1, total: '69,773.2 kWh', average: '17643 kWh', color: 'bg-gray-800' },
              { name: 'Landscape Light (Zone 3)', units: 1, total: '648 kWh', average: '216 kWh', color: 'bg-gray-800' },
              { name: 'Lifting Station', units: 4, total: '58,142 kWh', average: '14536 kWh', color: 'bg-cyan-500' },
              { name: 'Pumping Station', units: 4, total: '85,752.1 kWh', average: '21438 kWh', color: 'bg-gray-600' },
              { name: 'Street Light', units: 5, total: '138,748 kWh', average: '27750 kWh', color: 'bg-green-500' }
            ].map((category, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units:</span>
                    <span className="font-medium">{category.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{category.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average:</span>
                    <span className="font-medium">{category.average}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityModule;

