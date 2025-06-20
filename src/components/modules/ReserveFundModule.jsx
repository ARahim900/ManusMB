import React, { useState, useMemo } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
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
  Users
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
    lightBeige: '#F2F0EA',
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
    .sort((a, b) => b.avgContribution - a.avgContribution)
    .map(unitType => ({
      unitType: unitType.unitType.replace(' Villa', '').replace(' Apt', ''),
      avgContribution: Math.round(unitType.avgContribution),
      totalContribution: unitType.totalContribution,
      unitCount: unitType.unitCount,
      avgBUA: Math.round(unitType.avgBUA)
    }));

  // Enhanced filtering logic
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

  // Get unique sectors and unit types for filters
  const availableSectors = ['all', ...new Set(reserveFundData.map(unit => unit.sector))];
  const availableUnitTypes = ['all', ...new Set(reserveFundData.map(unit => unit.unitType))];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sectors', label: 'Sector Analysis' },
    { id: 'units', label: 'Unit Analysis' },
    { id: 'trends', label: 'Trends & Forecast' },
    { id: 'data-quality', label: 'Data Quality' }
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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#5f5168] text-[#5f5168]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Advanced Filtering Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter & Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Units</label>
            <input
              type="text"
              placeholder="Search by unit number, sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
            <select
              value={selectedUnitType}
              onChange={(e) => setSelectedUnitType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f5168] focus:border-transparent"
            >
              {availableUnitTypes.map(unitType => (
                <option key={unitType} value={unitType}>
                  {unitType === 'all' ? 'All Unit Types' : unitType}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Results Summary */}
          <div className="flex flex-col justify-end">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Showing {validFilteredData.length} units</p>
              <p className="text-xs">
                {missingDataFilteredUnits.length > 0 && 
                  `${missingDataFilteredUnits.length} with missing data`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Reserve Fund Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reserveMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Sector Filter */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700">Filter by Sector:</label>
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5f5168]"
        >
          <option value="all">All Sectors</option>
          {sectorData.map(sector => (
            <option key={sector.sector} value={sector.sector}>
              {sector.sector} ({sector.unitCount} units)
            </option>
          ))}
        </select>
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
                <BarChart data={unitTypeChartData.slice(0, 8)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="unitType" width={100} />
                  <Tooltip formatter={(value, name) => [
                    `${value.toLocaleString()} OMR`,
                    name === 'avgContribution' ? 'Average Contribution' : name
                  ]} />
                  <Bar dataKey="avgContribution" fill={brandColors.primary} />
                </BarChart>
              </ResponsiveContainer>
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

      {/* Detailed Unit Table - Always visible */}
      <ChartCard 
        title={`Unit Contribution Details ${selectedSector !== 'all' ? `- ${selectedSector} Sector` : ''}`}
        subtitle={`Showing ${validFilteredData.length} units with contribution data`}
        actions={
          <Button variant="outline" size="sm" className="border-[#5f5168] text-[#5f5168] hover:bg-[#5f5168] hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Unit No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Sector</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Unit Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">BUA (sqm)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Zone Contrib.</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Master Contrib.</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total 2025</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {validFilteredData.map((unit, index) => (
                <tr key={`${unit.unitNo}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
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
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{unit.unitType}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{unit.bua?.toLocaleString() || 'N/A'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{unit.zoneContrib?.toLocaleString() || 'N/A'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{unit.masterContrib?.toLocaleString() || 'N/A'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#5f5168]">{unit.totalContrib?.toLocaleString() || 'N/A'} OMR</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-gray-600">{unit.notes || '-'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
};

export default ReserveFundModule;

