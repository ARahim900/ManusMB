import React, { useState, useMemo } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import SubNavigation from '../ui/SubNavigation';
import { Button } from '../ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PiggyBank,
  Calculator,
  FileText,
  Download,
  AlertTriangle,
  Building2,
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  LayoutDashboard
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import {
  reserveFundData,
  getReserveFundSummary,
  getContributionsBySector,
  getContributionsByUnitType,
  getTopContributors,
  getMissingDataUnits,
  getContributionTrend
} from '../../services/reserveFundService';

const ReserveFundModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedUnitType, setSelectedUnitType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortField, setSortField] = useState('totalContrib');
  const [sortDirection, setSortDirection] = useState('desc');

  // Process data using the service functions
  const fundSummary = useMemo(() => getReserveFundSummary(), []);
  const sectorData = useMemo(() => getContributionsBySector(), []);
  const unitTypeData = useMemo(() => getContributionsByUnitType(), []);
  const topContributors = useMemo(() => getTopContributors(15), []);
  const missingDataUnits = useMemo(() => getMissingDataUnits(), []);
  const contributionTrend = useMemo(() => getContributionTrend(), []);

  // Muscat Bay brand colors
  const brandColors = {
    primary: '#5f5168',
    teal: '#A8D5E3',
    lightTeal: '#C3FBF4',
    beige: '#BFA181',
    lightBeige: '#fafafa',
    navy: '#0A1828',
    darkNavy: '#002349',
    white: '#ffffff'
  };

  // Color palette for charts
  const chartColors = [
    brandColors.primary,
    brandColors.teal,
    brandColors.beige,
    brandColors.navy,
    brandColors.lightTeal,
    '#8B5CF6',
    '#F59E0B',
    '#EF4444'
  ];

  // Reserve fund metrics based on actual data
  const reserveMetrics = [
    {
      title: 'Total 2025 Contributions',
      value: fundSummary.totalContributions.toLocaleString(),
      unit: 'OMR',
      subtitle: `From ${fundSummary.totalUnits} units`,
      icon: PiggyBank,
      iconColor: 'text-[#5f5168]'
    },
    {
      title: 'Zone Contributions',
      value: fundSummary.totalZoneContribution.toLocaleString(),
      unit: 'OMR',
      subtitle: 'Local zone funding',
      icon: Building2,
      iconColor: 'text-[#A8D5E3]'
    },
    {
      title: 'Master Contributions',
      value: fundSummary.totalMasterContribution.toLocaleString(),
      unit: 'OMR',
      subtitle: 'Master community funding',
      icon: Home,
      iconColor: 'text-[#BFA181]'
    },
    {
      title: 'Data Completeness',
      value: Math.round((fundSummary.totalUnits / (fundSummary.totalUnits + fundSummary.unitsWithMissingData)) * 100),
      unit: '%',
      subtitle: `${fundSummary.unitsWithMissingData} units missing data`,
      icon: AlertTriangle,
      iconColor: fundSummary.unitsWithMissingData > 0 ? 'text-red-500' : 'text-green-500'
    }
  ];

  // Prepare sector data for pie chart
  const sectorChartData = sectorData
    .filter(sector => sector.totalContribution > 0)
    .map((sector, index) => ({
      name: sector.sector,
      value: sector.totalContribution,
      percentage: ((sector.totalContribution / fundSummary.totalContributions) * 100).toFixed(1),
      color: chartColors[index % chartColors.length],
      unitCount: sector.unitCount
    }));

  // Prepare unit type data for bar chart
  const unitTypeChartData = unitTypeData
    .filter(unitType => unitType.avgContribution > 0) // Filter out any empty or zero contributions
    .sort((a, b) => b.avgContribution - a.avgContribution)
    .map(unitType => ({
      unitType: unitType.unitType.replace(' Villa', '').replace(' Apt', ''),
      avgContribution: Math.round(unitType.avgContribution),
      totalContribution: unitType.totalContribution,
      unitCount: unitType.unitCount,
      avgBUA: Math.round(unitType.avgBUA || 0)
    }));

  // Debug logging
  console.log('Unit Type Data:', unitTypeData);
  console.log('Unit Type Chart Data:', unitTypeChartData);

  // Enhanced filtering and sorting logic
  const filteredData = useMemo(() => {
    let filtered = reserveFundData;
    
    // Filter by sector
    if (selectedSector !== 'all') {
      filtered = filtered.filter(unit => unit.sector === selectedSector);
    }
    
    // Filter by unit type
    if (selectedUnitType !== 'all') {
      filtered = filtered.filter(unit => unit.unitType === selectedUnitType);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(unit => 
        unit.unitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.unitType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedSector, selectedUnitType, searchTerm]);

  const validFilteredData = filteredData.filter(unit => unit.totalContrib !== null);
  const missingDataFilteredUnits = filteredData.filter(unit => unit.totalContrib === null);

  // Sorting and pagination logic
  const sortedData = useMemo(() => {
    const dataToSort = [...validFilteredData];
    return dataToSort.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle null values
      if (aValue === null) aValue = 0;
      if (bValue === null) bValue = 0;
      
      // Handle string vs number comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return aValue < bValue ? -1 * multiplier : aValue > bValue ? 1 * multiplier : 0;
    });
  }, [validFilteredData, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSector('all');
    setSelectedUnitType('all');
    setSortField('totalContrib');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  // Pagination functions
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Get unique sectors and unit types for filters
  const availableSectors = ['all', ...new Set(reserveFundData.map(unit => unit.sector))];
  const availableUnitTypes = ['all', ...new Set(reserveFundData.map(unit => unit.unitType))];

  // Define sub-navigation sections with updated structure
  const subSections = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard, shortName: 'Home' },
    { id: 'sectors', name: 'Sector Analysis', icon: Building2, shortName: 'Sectors' },
    { id: 'units', name: 'Unit Analysis', icon: Home, shortName: 'Units' },
    { id: 'trends', name: 'Trends & Forecast', icon: TrendingUp, shortName: 'Trends' },
    { id: 'data-quality', name: 'Data Quality', icon: AlertTriangle, shortName: 'Quality' }
  ];

  return (
    <div className="reserve-module space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reserve Fund Management</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive analysis of 2025 reserve fund contributions across all sectors
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" style={{ borderColor: brandColors.primary, color: brandColors.primary }}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Projections
          </Button>
          <Button variant="outline" size="sm" style={{ borderColor: brandColors.teal, color: brandColors.teal }}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Sub Navigation */}
      <SubNavigation 
        sections={subSections}
        activeSection={activeTab}
        onSectionChange={setActiveTab}
      />

      {/* Key Reserve Fund Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reserveMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Contributions by Sector"
              subtitle="Total 2025 contributions breakdown"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [
                    `${value.toLocaleString()} OMR`, 
                    `${name} (${sectorChartData.find(s => s.name === name)?.percentage}%)`
                  ]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {sectorChartData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{item.percentage}%</span>
                      <div className="text-xs text-gray-500">{item.unitCount} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard 
              title="Average Contribution by Unit Type"
              subtitle="Per unit average contributions"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={unitTypeChartData.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value.toLocaleString()}`} />
                  <YAxis type="category" dataKey="unitType" width={120} />
                  <Tooltip formatter={(value, name) => [
                    `${value.toLocaleString()} OMR`,
                    name === 'avgContribution' ? 'Average Contribution' : name
                  ]} />
                  <Bar dataKey="avgContribution" fill={brandColors.primary} />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Data Debug Info - Remove this after fixing */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                <strong>Debug Info:</strong> {unitTypeChartData.length} unit types found
                {unitTypeChartData.slice(0, 3).map((item, i) => (
                  <div key={i}>{item.unitType}: {item.avgContribution} OMR ({item.unitCount} units)</div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-900">Total Units</h3>
                  <p className="text-2xl font-bold text-purple-700 mt-1">{reserveFundData.length}</p>
                  <p className="text-sm text-purple-600">{fundSummary.totalUnits} contributing</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-teal-900">Total BUA</h3>
                  <p className="text-2xl font-bold text-teal-700 mt-1">{Math.round(fundSummary.totalBUA).toLocaleString()}</p>
                  <p className="text-sm text-teal-600">sqm</p>
                </div>
                <Home className="w-8 h-8 text-teal-500" />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-amber-900">Avg. Contribution</h3>
                  <p className="text-2xl font-bold text-amber-700 mt-1">
                    {Math.round(fundSummary.totalContributions / fundSummary.totalUnits).toLocaleString()}
                  </p>
                  <p className="text-sm text-amber-600">OMR per unit</p>
                </div>
                <DollarSign className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">Collection Status</h3>
                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {fundSummary.unitsWithMissingData === 0 ? '100%' : '85%'}
                  </p>
                  <p className="text-sm text-green-600">Data complete</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sectors' && (
        <div className="space-y-6">
          <ChartCard 
            title="Sector Performance Analysis"
            subtitle="Detailed breakdown by sector"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {sectorData.map((sector, index) => (
                <div key={sector.sector} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{sector.sector}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {sector.unitCount} units
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Contribution:</span>
                      <span className="font-medium">{sector.totalContribution.toLocaleString()} OMR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average per Unit:</span>
                      <span className="font-medium">{Math.round(sector.avgContribution).toLocaleString()} OMR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Property Types:</span>
                      <span className="text-sm">{sector.types.join(', ')}</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(sector.totalContribution / fundSummary.totalContributions) * 100}%`,
                        backgroundColor: chartColors[index % chartColors.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {activeTab === 'units' && (
        <div className="space-y-6">
          {/* Top Contributors */}
          <ChartCard 
            title="Top Contributing Units"
            subtitle="Highest reserve fund contributors"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Unit No</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sector</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">BUA (sqm)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {topContributors.map((unit, index) => (
                    <tr key={unit.unitNo} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                          }`}>
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{unit.unitNo}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-[#A8D5E3] text-[#0A1828] text-xs rounded">
                          {unit.sector}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-900">{unit.type}</div>
                        <div className="text-sm text-gray-500">{unit.unitType}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{unit.bua?.toLocaleString() || 'N/A'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#5f5168]">{unit.totalContrib?.toLocaleString()} OMR</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Unit Type Analysis */}
          <ChartCard 
            title="Unit Type Performance"
            subtitle="Contribution analysis by unit type"
          >
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={unitTypeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unitType" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'avgContribution' ? `${value.toLocaleString()} OMR` : value,
                  name === 'avgContribution' ? 'Avg Contribution' : 
                  name === 'unitCount' ? 'Unit Count' : 'Avg BUA'
                ]} />
                <Bar yAxisId="left" dataKey="avgContribution" fill={brandColors.primary} />
                <Line yAxisId="right" type="monotone" dataKey="unitCount" stroke={brandColors.teal} strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-6">
          <ChartCard 
            title="Collection Trend Analysis"
            subtitle="Projected vs actual collection pattern"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={contributionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `${value.toLocaleString()} OMR`,
                  name === 'target' ? 'Target' : 'Collected'
                ]} />
                <Line type="monotone" dataKey="target" stroke={brandColors.navy} strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="collected" stroke={brandColors.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'data-quality' && (
        <div className="space-y-6">
          <ChartCard 
            title="Data Quality Assessment"
            subtitle="Units with missing or incomplete data"
          >
            {missingDataUnits.length > 0 ? (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 font-medium">
                      {missingDataUnits.length} units require data completion
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Unit No</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Sector</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Issue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {missingDataUnits.map((unit, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{unit.unitNo}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {unit.sector}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{unit.type}</td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              {unit.totalContrib === null && (
                                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded mr-1">
                                  Missing Contribution
                                </span>
                              )}
                              {unit.bua === null && (
                                <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded mr-1">
                                  Missing BUA
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{unit.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data Quality Excellent</h3>
                <p className="text-gray-600">All units have complete contribution data.</p>
              </div>
            )}
          </ChartCard>
        </div>
      )}

      {/* Enhanced Paginated Unit Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header with Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-[#5f5168]" />
                Reserve Fund Contributors
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive view of all units and their contributions
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-[#5f5168] text-[#5f5168] hover:bg-[#5f5168] hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
          
          {/* Filter and Search Controls */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search by unit number, sector, or type..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
              />
            </div>

            {/* Sector Filter */}
            <div>
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
              >
                {availableSectors.map(sector => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Type Filter */}
            <div>
              <select
                value={selectedUnitType}
                onChange={(e) => {
                  setSelectedUnitType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
              >
                {availableUnitTypes.map(unitType => (
                  <option key={unitType} value={unitType}>
                    {unitType === 'all' ? 'All Unit Types' : unitType}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Controls */}
            <div>
              <select
                value={`${sortField}_${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('_');
                  setSortField(field);
                  setSortDirection(direction);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
              >
                <option value="totalContrib_desc">Highest Contribution</option>
                <option value="totalContrib_asc">Lowest Contribution</option>
                <option value="unitNo_asc">Unit No A-Z</option>
                <option value="unitNo_desc">Unit No Z-A</option>
                <option value="bua_desc">Largest BUA</option>
                <option value="bua_asc">Smallest BUA</option>
              </select>
            </div>
          </div>

          {/* Results Summary and Reset */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{sortedData.length}</span> units found
              {(searchTerm || selectedSector !== 'all' || selectedUnitType !== 'all') && (
                <span className="ml-2">
                  • <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSector('all');
                      setSelectedUnitType('all');
                      setCurrentPage(1);
                    }}
                    className="text-[#5f5168] hover:underline"
                  >
                    Clear all filters
                  </button>
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}-{Math.min(endIndex, sortedData.length)}</span> of <span className="font-medium">{sortedData.length}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">
                   <button
                     onClick={() => handleSort('unitNo')}
                     className="flex items-center hover:text-[#5f5168] transition-colors"
                   >
                     Unit Details
                     {sortField === 'unitNo' && (
                       sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                     )}
                   </button>
                 </th>
                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">Category</th>
                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">
                   <button
                     onClick={() => handleSort('bua')}
                     className="flex items-center hover:text-[#5f5168] transition-colors"
                   >
                     BUA (sqm)
                     {sortField === 'bua' && (
                       sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                     )}
                   </button>
                 </th>
                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">
                   <button
                     onClick={() => handleSort('totalContrib')}
                     className="flex items-center hover:text-[#5f5168] transition-colors"
                   >
                     Total Contribution
                     {sortField === 'totalContrib' && (
                       sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                     )}
                   </button>
                 </th>
                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">Zone/Master</th>
                 <th className="text-left py-4 px-6 font-medium text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                             {currentPageData.map((unit, index) => (
                 <tr key={`${unit.unitNo}-${index}`} className="hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-6">
                     <div>
                       <div className="font-semibold text-gray-900">{unit.unitNo}</div>
                       <div className="text-sm text-gray-500">
                         {unit.type} • {unit.unitType}
                       </div>
                     </div>
                   </td>
                   <td className="py-4 px-6">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                       unit.sector === 'Zaha' ? 'bg-purple-100 text-purple-800' :
                       unit.sector === 'Nameer' ? 'bg-blue-100 text-blue-800' :
                       unit.sector === 'Wajd' ? 'bg-green-100 text-green-800' :
                       unit.sector === 'C Sector' ? 'bg-orange-100 text-orange-800' :
                       unit.sector === 'FM' ? 'bg-gray-100 text-gray-800' :
                       'bg-gray-100 text-gray-800'
                     }`}>
                       {unit.sector}
                     </span>
                   </td>
                   <td className="py-4 px-6">
                     <div>
                       <div className="text-sm font-medium text-gray-900">
                         {unit.bua ? `${unit.bua.toLocaleString()}` : 'N/A'}
                       </div>
                       <div className="text-sm text-gray-500">
                         {unit.bua ? 'sqm' : 'Missing'}
                       </div>
                     </div>
                   </td>
                   <td className="py-4 px-6">
                     <div>
                       <div className="text-lg font-bold text-[#5f5168]">
                         {unit.totalContrib ? `${unit.totalContrib.toLocaleString()}` : 'N/A'}
                       </div>
                       <div className="text-sm text-gray-500">
                         {unit.totalContrib ? 'OMR' : 'Missing'}
                       </div>
                     </div>
                   </td>
                   <td className="py-4 px-6">
                     <div className="text-xs space-y-1">
                       <div>Zone: {unit.zoneContrib ? `${unit.zoneContrib.toLocaleString()} OMR` : 'N/A'}</div>
                       <div>Master: {unit.masterContrib ? `${unit.masterContrib.toLocaleString()} OMR` : 'N/A'}</div>
                     </div>
                   </td>
                   <td className="py-4 px-6">
                     <Button
                       variant="ghost"
                       size="sm"
                       className="text-gray-400 hover:text-gray-600"
                     >
                       <ChevronRight className="w-4 h-4" />
                     </Button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>
                             <span className="text-sm text-gray-700">of {sortedData.length} units</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                          currentPage === page
                            ? 'bg-[#5f5168] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 py-1 text-gray-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveFundModule;

