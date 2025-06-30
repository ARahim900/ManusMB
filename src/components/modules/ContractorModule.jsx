import React, { useState } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import SubNavigation from '../ui/SubNavigation';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Star,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Shield
} from 'lucide-react';
import { 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const ContractorModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Contractor metrics based on the Excel data structure - Updated June 24, 2025
  const contractorMetrics = [
    {
      title: 'Active Contracts',
      value: '14',
      unit: 'contracts',
      subtitle: 'Ongoing',
      icon: FileText,
      iconColor: 'text-orange-500'
    },
    {
      title: 'Expired Contracts',
      value: '7',
      unit: 'contracts',
      subtitle: 'Completed/Ended',
      icon: AlertTriangle,
      iconColor: 'text-red-500'
    },
    {
      title: 'Total Contract Value',
      value: '535,154',
      unit: 'OMR',
      subtitle: 'Annual (Active)',
      icon: DollarSign,
      iconColor: 'text-green-500'
    },
    {
      title: 'Total Contractors',
      value: '21',
      unit: 'contractors',
      subtitle: '6 Updated | 3 New | 2 Status Changed',
      icon: Users,
      iconColor: 'text-blue-500'
    }
  ];

  // Updated contractor data - June 24, 2025 - 21 Total Contractors | 6 Updated | 3 New | 2 Status Changed
  const contractors = [
    {
      name: 'KONE Assarain LLC',
      service: 'Elevators AMC - 21 Nos',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-01-01',
      endDate: '2026-12-31',
      monthlyValue: '1,837.5 OMR',
      annualValue: '22,050.000 OMR (Inc VAT)',
      performance: 92,
      rating: 4.5,
      note: 'UPDATED - Updated from Nouf\'s email - 24 months duration'
    },
    {
      name: 'Oman Water Treatment Company (OWATCO)',
      service: 'Comprehensive STP Operation and Maintenance',
      status: 'Active',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '3,103.8 OMR',
      annualValue: '37,245.4 OMR (Inc VAT)',
      performance: 88,
      rating: 4.2,
      note: 'New contract due to early termination of previous Contract with Celar Company'
    },
    {
      name: 'Kalhat',
      service: 'Facility Management (FM)',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-07-05',
      endDate: '2030-06-05',
      monthlyValue: '32,200.8 OMR',
      annualValue: '386,409.718 OMR (Inc VAT)',
      performance: 85,
      rating: 4.0,
      note: 'New contract overlapping with COMO'
    },
    {
      name: 'Future Cities S.A.O.C (Tadoom)',
      service: 'SUPPLY AND INSTALLATION OF SMART WATER METERS, BILLING FOR WATER CONSUMPTION',
      status: 'Active',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '2.7 Per Meter Collection',
      annualValue: '184.3 OMR',
      performance: 95,
      rating: 4.8,
      note: 'New contract replacing OIFC'
    },
    {
      name: 'Muna Noor International LLC',
      service: 'Pest Control Services',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-01-07',
      endDate: '-',
      monthlyValue: '1,400 /Month Inc VAT',
      annualValue: '16,000 OMR (Inc VAT)',
      performance: 90,
      rating: 4.3,
      note: ''
    },
    {
      name: 'Celar Water',
      service: 'Comprehensive STP Operation and Maintenance',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '4,439 /Month',
      annualValue: '-',
      performance: 60,
      rating: 2.5,
      note: 'Transitioned to OWATCO before contract end'
    },
    {
      name: 'Gulf Expert',
      service: 'BMS AMC FM & Staff Accommodation',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2025-06-03',
      endDate: '2026-06-02',
      monthlyValue: '183.75 OMR',
      annualValue: '2,205.000 OMR (Inc VAT)',
      performance: 87,
      rating: 4.1,
      note: 'UPDATED - Updated from Nouf\'s email'
    },
    {
      name: 'Gulf Expert',
      service: 'CHILLERS AMC FM & Staff Accommodation',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2025-06-03',
      endDate: '2026-06-02',
      monthlyValue: '602.875 OMR',
      annualValue: '7,234.500 OMR (Inc VAT)',
      performance: 87,
      rating: 4.1,
      note: 'UPDATED - Updated from Nouf\'s email'
    },
    {
      name: 'Advanced Technology and Projects Company',
      service: 'BMS Non-Comprehensive Annual Maintenance',
      status: 'Expired',
      contractType: 'PO',
      startDate: '-',
      endDate: '-',
      monthlyValue: '3,800 /Year',
      annualValue: '-',
      performance: 75,
      rating: 3.5,
      note: ''
    },
    {
      name: 'Al Nabaa services',
      service: 'removal of general waste for 1 year',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-08-15',
      endDate: '2025-08-14',
      monthlyValue: '99.75 OMR',
      annualValue: '1,197.00 OMR (Inc VAT)',
      performance: 70,
      rating: 3.2,
      note: 'STATUS CHANGED - PO-SBJ-18-2329 - No need to extend – under JMB (Updated from Nouf\'s email)'
    },
    {
      name: 'Bahwan Engineering Company LLC',
      service: 'Fire alarm AMC',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-11-01',
      endDate: '2025-10-31',
      monthlyValue: '743.75 OMR',
      annualValue: '8,925.00 OMR (Inc VAT)',
      performance: 89,
      rating: 4.4,
      note: 'UPDATED - Updated from Nouf\'s email'
    },
    {
      name: 'Oman Pumps Manufacturing Co.',
      service: 'Supply, Installation, and Commissioning of Pumps',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 85,
      rating: 4.0,
      note: ''
    },
    {
      name: 'Rimal Global',
      service: 'Provision of Services',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 78,
      rating: 3.8,
      note: ''
    },
    {
      name: 'COMO',
      service: 'Facility Management (FM)',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 65,
      rating: 3.0,
      note: ''
    },
    {
      name: 'Muscat Electronics LLC',
      service: 'AMC for Daikin AC at sale center',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2025-06-03',
      endDate: '2026-06-02',
      monthlyValue: '72.65 OMR',
      annualValue: '871.820 OMR (Inc VAT)',
      performance: 80,
      rating: 3.8,
      note: 'STATUS CHANGED - PO-SBJ-18-2488 (Updated from Nouf\'s email - Status changed to Active)'
    },
    {
      name: 'Uni Gaz',
      service: 'Gas Refilling for Flame Operation at Muscat Bay Main Entrance',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 70,
      rating: 3.5,
      note: ''
    },
    {
      name: 'Genetcoo',
      service: 'York AC Chillers (Zone 01) Maintenance Services',
      status: 'Expired',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 75,
      rating: 3.6,
      note: ''
    },
    {
      name: 'NMC',
      service: 'Lagoon Main Two Drain Pipes Cleaning',
      status: 'Active',
      contractType: 'Contract',
      startDate: '-',
      endDate: '-',
      monthlyValue: '-',
      annualValue: '-',
      performance: 85,
      rating: 4.0,
      note: ''
    },
    {
      name: 'Iron mountain ARAMEX',
      service: 'offsite record storage',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      monthlyValue: 'Schedule of rates',
      annualValue: 'Schedule of rates',
      performance: 85,
      rating: 4.0,
      note: 'NEW - New contractor from Nouf\'s email'
    },
    {
      name: 'BUDGET',
      service: 'lease of vehicles for Muscat Bay - Outlander (3)',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2025-05-07',
      endDate: '2030-05-06',
      monthlyValue: '834.75 OMR',
      annualValue: '50,085.00 OMR (Inc VAT)',
      performance: 85,
      rating: 4.0,
      note: 'NEW - New contractor from Nouf\'s email - 60 months lease'
    },
    {
      name: 'National marine services LLC',
      service: 'service agreement - diving services (1 year)',
      status: 'Active',
      contractType: 'Contract',
      startDate: '2024-11-06',
      endDate: '2026-11-05',
      monthlyValue: '198.24 OMR',
      annualValue: '4,757.76 OMR (Inc VAT)',
      performance: 85,
      rating: 4.0,
      note: 'NEW - PO-SBJ-18-2384 - New contractor from Nouf\'s email - 24 months duration'
    }
  ];

  // Contract status data for pie chart - Updated June 24, 2025
  const contractStatusData = [
    { name: 'Active', value: 14, color: '#10b981' },
    { name: 'Expired', value: 7, color: '#ef4444' }
  ];

  // Performance rating data - Updated June 24, 2025
  const performanceRatingData = [
    { contractor: 'Future Cities', rating: 95 },
    { contractor: 'KONE Assarain', rating: 92 },
    { contractor: 'Muna Noor', rating: 90 },
    { contractor: 'Bahwan Eng.', rating: 89 },
    { contractor: 'OWATCO', rating: 88 },
    { contractor: 'Gulf Expert (BMS)', rating: 87 },
    { contractor: 'Gulf Expert (Chillers)', rating: 87 },
    { contractor: 'Kalhat', rating: 85 },
    { contractor: 'Iron mountain', rating: 85 },
    { contractor: 'BUDGET', rating: 85 },
    { contractor: 'Nat. Marine Svc.', rating: 85 },
    { contractor: 'NMC', rating: 85 }
  ];

  // Contract expiry tracking
  const expiringContracts = [
    { contractor: 'Gulf Expert', service: 'Chillers, BMS & Pressurisation Units', expiryDate: '2025-06-02', daysLeft: 160 },
    { contractor: 'Muna Noor International LLC', service: 'Pest Control Services', expiryDate: '2025-07-01', daysLeft: 190 },
    { contractor: 'KONE Assarain LLC', service: 'Lift Maintenance Services', expiryDate: 'TBD', daysLeft: 365 }
  ];

  // Recent contract activities - Updated June 24, 2025
  const recentActivities = [
    { date: '2025-06-24', activity: 'CONTRACT UPDATE - 6 contractors updated from Nouf\'s email', type: 'review' },
    { date: '2025-06-24', activity: 'NEW CONTRACTORS - Added Iron mountain ARAMEX, BUDGET, National marine services', type: 'new' },
    { date: '2025-06-24', activity: 'STATUS CHANGE - Al Nabaa services & Muscat Electronics changed to Active', type: 'renewal' },
    { date: '2025-06-03', activity: 'Updated contracts - Gulf Expert BMS & Chillers AMC', type: 'renewal' },
    { date: '2025-05-07', activity: 'New contract signed - BUDGET vehicle lease (60 months)', type: 'new' },
    { date: '2025-01-01', activity: 'New contract started - Iron mountain ARAMEX offsite storage', type: 'new' },
    { date: '2024-11-06', activity: 'New contract signed - National marine services diving services', type: 'new' },
    { date: '2024-11-01', activity: 'Updated contract - Bahwan Engineering Fire alarm AMC', type: 'renewal' }
  ];

  // Define sub-navigation sections
  const subSections = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, shortName: 'Home' },
    { id: 'contracts', name: 'Contract Management', icon: FileText, shortName: 'Contracts' },
    { id: 'performance', name: 'Performance Reviews', icon: TrendingUp, shortName: 'Reviews' },
    { id: 'compliance', name: 'Compliance & Documents', icon: Shield, shortName: 'Docs' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'bg-green-500';
    if (performance >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="contractor-module space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contractor Tracker</h1>
          <p className="text-gray-600 mt-2">
            Managing contractor performance, contracts, and compliance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Users className="w-4 h-4 mr-2" />
            Add Contractor
          </Button>
        </div>
      </div>

      {/* Sub Navigation */}
      <SubNavigation 
        sections={subSections}
        activeSection={activeTab}
        onSectionChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Contractor Metrics */}
          <div className="metrics-grid">
            {contractorMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Contractor Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard 
              title="Top Performing Contractors"
              subtitle="Based on recent performance reviews"
            >
              <div className="space-y-3">
                {performanceRatingData.slice(0, 5).map((contractor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{contractor.contractor}</div>
                      <div className="flex items-center mt-1">
                        {renderStars(contractor.rating / 20)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{contractor.rating}%</div>
                      <div className="text-sm text-gray-500">Performance</div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard 
              title="Contracts Nearing Expiry"
              subtitle="Contracts requiring attention"
            >
              <div className="space-y-3">
                {expiringContracts.map((contract, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    contract.daysLeft <= 60 ? 'border-red-200 bg-red-50' :
                    contract.daysLeft <= 120 ? 'border-yellow-200 bg-yellow-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="font-medium text-gray-900">{contract.contractor}</div>
                    <div className="text-sm text-gray-600">{contract.service}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Expires: {contract.expiryDate}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        contract.daysLeft <= 60 ? 'bg-red-100 text-red-800' :
                        contract.daysLeft <= 120 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.daysLeft} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard 
              title="Recent Activities"
              subtitle="Latest contract activities"
            >
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'new' ? 'bg-green-500' :
                      activity.type === 'renewal' ? 'bg-blue-500' :
                      activity.type === 'review' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Charts Section */}
          <div className="charts-grid">
            <ChartCard 
              title="Contract Value by Status"
              subtitle="Financial overview of contracts"
            >
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={contractStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                      fontSize={12}
                    >
                      {contractStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} contracts`, name]} 
                      contentStyle={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '6px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Legend */}
                <div className="flex justify-center space-x-6">
                  {contractStatusData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {entry.name}: {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">21</div>
                  <div className="text-sm text-gray-600">Total Contractors</div>
                </div>
              </div>
            </ChartCard>

            <ChartCard 
              title="Contractor Performance Ratings"
              subtitle="Based on recent reviews"
            >
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart 
                    data={performanceRatingData.slice(0, 10)} 
                    layout="vertical" 
                    margin={{ top: 5, right: 40, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      tickFormatter={(value) => `${value}%`}
                      fontSize={11}
                    />
                    <YAxis 
                      dataKey="contractor" 
                      type="category" 
                      width={115} 
                      fontSize={11}
                      tick={{ textAnchor: 'end' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Performance']}
                      contentStyle={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar 
                      dataKey="rating" 
                      fill="#f59e0b" 
                      radius={[0, 3, 3, 0]}
                      label={{
                        position: 'right',
                        formatter: (value) => `${value}%`,
                        fontSize: 10,
                        fill: '#374151'
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                
                {/* Performance Summary */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">95%</div>
                    <div className="text-xs text-gray-500">Highest</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">87%</div>
                    <div className="text-xs text-gray-500">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">85%</div>
                    <div className="text-xs text-gray-500">Lowest (shown)</div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="space-y-6">
          {/* Contract Management Table */}
          <ChartCard 
            title="All Contractors Overview"
            subtitle="Comprehensive contractor information and performance"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Contractor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Contract Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Monthly Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contractors.map((contractor, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{contractor.name}</div>
                          <div className="text-sm text-gray-500">{contractor.contractType}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-900 text-sm">{contractor.service}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(contractor.status)}`}>
                          {contractor.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{contractor.startDate}</div>
                          <div className="text-gray-500">to {contractor.endDate}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{contractor.monthlyValue}</div>
                        <div className="text-sm text-gray-500">{contractor.annualValue}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-20">
                            <div 
                              className={`h-2 rounded-full ${getPerformanceColor(contractor.performance)}`}
                              style={{ width: `${contractor.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{contractor.performance}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {renderStars(contractor.rating)}
                          <span className="ml-2 text-sm text-gray-600">{contractor.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-600 max-w-48">
                          {contractor.note || '-'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Contract Management Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-orange-900">Contract Renewals</h3>
                  <p className="text-2xl font-bold text-orange-700 mt-1">3</p>
                  <p className="text-sm text-orange-600">Due in next 60 days</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">Avg. Performance</h3>
                  <p className="text-2xl font-bold text-green-700 mt-1">89%</p>
                  <p className="text-sm text-green-600">Across all contractors</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Cost Savings</h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1">12%</p>
                  <p className="text-sm text-blue-600">vs. previous year</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-900">Compliance Rate</h3>
                  <p className="text-2xl font-bold text-purple-700 mt-1">96%</p>
                  <p className="text-sm text-purple-600">Documentation complete</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Avg. Performance</h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1">84%</p>
                  <p className="text-sm text-blue-600">All contractors</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">Top Performers</h3>
                  <p className="text-2xl font-bold text-green-700 mt-1">5</p>
                  <p className="text-sm text-green-600">Above 90%</p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-yellow-900">Needs Improvement</h3>
                  <p className="text-2xl font-bold text-yellow-700 mt-1">3</p>
                  <p className="text-sm text-yellow-600">Below 80%</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-900">Reviews Completed</h3>
                  <p className="text-2xl font-bold text-purple-700 mt-1">17</p>
                  <p className="text-sm text-purple-600">This quarter</p>
                </div>
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Top Performing Contractors"
              subtitle="Ranked by performance score"
            >
              <div className="space-y-3">
                {performanceRatingData.slice(0, 8).map((contractor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{contractor.contractor}</div>
                      <div className="flex items-center mt-1">
                        {renderStars(contractor.rating / 20)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">{contractor.rating}%</div>
                      <div className="text-sm text-gray-500">Performance</div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard 
              title="Performance Distribution"
              subtitle="Visual representation of contractor performance"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceRatingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="contractor" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                  <Bar dataKey="rating" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Performance Trends */}
          <ChartCard 
            title="Performance Review Summary"
            subtitle="Recent performance evaluations and trends"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Excellent Performance (90%+)</h4>
                <div className="space-y-2">
                  {contractors.filter(c => c.performance >= 90).map((contractor, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-900">{contractor.name}</div>
                      <div className="text-sm text-green-600">{contractor.performance}% - {contractor.service}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Good Performance (80-89%)</h4>
                <div className="space-y-2">
                  {contractors.filter(c => c.performance >= 80 && c.performance < 90).map((contractor, index) => (
                    <div key={index} className="p-2 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-900">{contractor.name}</div>
                      <div className="text-sm text-yellow-600">{contractor.performance}% - {contractor.service}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Needs Attention (Under 80%)</h4>
                <div className="space-y-2">
                  {contractors.filter(c => c.performance < 80).map((contractor, index) => (
                    <div key={index} className="p-2 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-900">{contractor.name}</div>
                      <div className="text-sm text-red-600">{contractor.performance}% - {contractor.service}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-green-900">Documentation Complete</h3>
                  <p className="text-2xl font-bold text-green-700 mt-1">15</p>
                  <p className="text-sm text-green-600">Contractors</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-yellow-900">Pending Updates</h3>
                  <p className="text-2xl font-bold text-yellow-700 mt-1">2</p>
                  <p className="text-sm text-yellow-600">Contractors</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Compliance Rate</h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1">96%</p>
                  <p className="text-sm text-blue-600">Overall</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-900">Non-Compliant</h3>
                  <p className="text-2xl font-bold text-red-700 mt-1">0</p>
                  <p className="text-sm text-red-600">Contractors</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Compliance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Compliance Status Overview"
              subtitle="Current compliance status by contractor"
            >
              <div className="space-y-3">
                {contractors.filter(c => c.status === 'Active').map((contractor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{contractor.name}</div>
                      <div className="text-sm text-gray-600">{contractor.service}</div>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                        Compliant
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard 
              title="Required Actions & Deadlines"
              subtitle="Upcoming compliance requirements"
            >
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-yellow-900">Insurance Certificate Renewal</div>
                      <div className="text-sm text-yellow-600">Gulf Expert</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-700">March 2025</div>
                      <div className="text-xs text-yellow-600">60 days</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-orange-900">Safety Compliance Review</div>
                      <div className="text-sm text-orange-600">Muna Noor International LLC</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-orange-700">February 2025</div>
                      <div className="text-xs text-orange-600">30 days</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-blue-900">Performance Evaluation</div>
                      <div className="text-sm text-blue-600">All Active Contractors</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-700">Quarterly</div>
                      <div className="text-xs text-blue-600">Ongoing</div>
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Documentation Status */}
          <ChartCard 
            title="Documentation & Contract Status"
            subtitle="Detailed compliance tracking by category"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Active Contracts</h4>
                <div className="space-y-2">
                  {contractors.filter(c => c.status === 'Active').map((contractor, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-green-900">{contractor.name}</div>
                      <div className="text-sm text-green-600">{contractor.contractType}</div>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-xs text-green-600">Documentation Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Expired Contracts</h4>
                <div className="space-y-2">
                  {contractors.filter(c => c.status === 'Expired').slice(0, 4).map((contractor, index) => (
                    <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-medium text-gray-900">{contractor.name}</div>
                      <div className="text-sm text-gray-600">{contractor.contractType}</div>
                      <div className="flex items-center mt-2">
                        <AlertTriangle className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-xs text-gray-600">Contract Ended</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Contract Transitions</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-900">COMO → Kalhat</div>
                    <div className="text-sm text-blue-600">Facility Management transition</div>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-xs text-blue-600">Successfully Transitioned</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="font-medium text-purple-900">Celar Water → OWATCO</div>
                    <div className="text-sm text-purple-600">STP Operations transition</div>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-xs text-purple-600">Successfully Transitioned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};

export default ContractorModule;

