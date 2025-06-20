import React, { useState } from 'react';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  AlertTriangle, 
  TrendingDown,
  Calendar,
  Brain,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const WaterModule = () => {
  const [selectedMonth, setSelectedMonth] = useState('May 25');

  // Water metrics based on the Excel data structure
  const waterMetrics = [
    {
      title: 'A1: Main Bulk (L1)',
      value: '58,425',
      unit: 'm³',
      subtitle: 'For May-25 • Historical data',
      icon: Droplets,
      iconColor: 'text-blue-500'
    },
    {
      title: 'A2: Billed Bulk (L2+DC)',
      value: '63,270',
      unit: 'm³',
      subtitle: 'For May-25 • Historical data',
      icon: Droplets,
      iconColor: 'text-green-500'
    },
    {
      title: 'A3: Billed Indiv. (L3+DC)',
      value: '44,497',
      unit: 'm³',
      subtitle: 'For May-25 • Historical data',
      icon: Droplets,
      iconColor: 'text-orange-500'
    }
  ];

  // Water loss metrics with alert indicators
  const lossMetrics = [
    {
      title: 'Loss 1 (A1-A2)',
      value: '-4,845',
      unit: 'm³',
      subtitle: '8.3% of A1',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      status: 'critical'
    },
    {
      title: 'Loss 2 (A2-A3)',
      value: '18,773',
      unit: 'm³',
      subtitle: '29.7% of A2',
      icon: AlertTriangle,
      iconColor: 'text-orange-500',
      status: 'warning'
    },
    {
      title: 'Total Apparent Loss',
      value: '13,928',
      unit: 'm³',
      subtitle: '23.8% of total supply',
      icon: TrendingDown,
      iconColor: 'text-red-500',
      status: 'critical'
    }
  ];

  // Sample loss trend data
  const lossTrendData = [
    { month: 'Dec-24', loss1: -3200, loss2: 15400, totalLoss: 12200 },
    { month: 'Jan-25', loss1: -3800, loss2: 16800, totalLoss: 13000 },
    { month: 'Feb-25', loss1: -4200, loss2: 17200, totalLoss: 13000 },
    { month: 'Mar-25', loss1: -4500, loss2: 18000, totalLoss: 13500 },
    { month: 'Apr-25', loss1: -4600, loss2: 18500, totalLoss: 13900 },
    { month: 'May-25', loss1: -4845, loss2: 18773, totalLoss: 13928 }
  ];

  // Sample water flow data by level
  const waterFlowData = [
    { month: 'Dec-24', a1: 55000, a2: 58200, a3: 41800 },
    { month: 'Jan-25', a1: 56200, a2: 60000, a3: 43200 },
    { month: 'Feb-25', a1: 57000, a2: 61200, a3: 44000 },
    { month: 'Mar-25', a1: 57500, a2: 62000, a3: 44000 },
    { month: 'Apr-25', a1: 58000, a2: 62600, a3: 44100 },
    { month: 'May-25', a1: 58425, a2: 63270, a3: 44497 }
  ];

  // Zone analysis data
  const zoneData = [
    { zone: 'Zone 1', meters: 45, consumption: 12500, efficiency: 85 },
    { zone: 'Zone 2', meters: 62, consumption: 15800, efficiency: 78 },
    { zone: 'Zone 3A', meters: 89, consumption: 18200, efficiency: 72 },
    { zone: 'Zone 3B', meters: 34, consumption: 8900, efficiency: 88 },
    { zone: 'Zone 4', meters: 56, consumption: 14200, efficiency: 82 },
    { zone: 'Zone 5', meters: 42, consumption: 11400, efficiency: 90 }
  ];

  const months = [
    'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25'
  ];

  return (
    <div className="water-module space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Water Analysis - Complete System Overview</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive water infrastructure and quality management
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            AI Analysis
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
            Dashboard
          </button>
          <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
            Zone Analysis
          </button>
          <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
            Category Analysis
          </button>
          <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
            Performance Metrics
          </button>
        </nav>
      </div>

      {/* Key Water Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {waterMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Water Loss Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lossMetrics.map((metric, index) => (
          <div key={index} className={`p-6 rounded-lg border-2 ${
            metric.status === 'critical' ? 'border-red-200 bg-red-50' :
            metric.status === 'warning' ? 'border-orange-200 bg-orange-50' :
            'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${
                    metric.status === 'critical' ? 'text-red-700' :
                    metric.status === 'warning' ? 'text-orange-700' :
                    'text-gray-900'
                  }`}>
                    {metric.value}
                  </span>
                  {metric.unit && <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>}
                </div>
                {metric.subtitle && (
                  <p className="text-xs text-gray-600 mt-1">{metric.subtitle}</p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                metric.status === 'critical' ? 'bg-red-100' :
                metric.status === 'warning' ? 'bg-orange-100' :
                'bg-gray-100'
              }`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Loss Trend Analysis */}
        <ChartCard 
          title="Loss Trend Analysis (m³)"
          subtitle="Monthly water loss patterns"
          actions={
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lossTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                `${value.toLocaleString()} m³`, 
                name === 'loss1' ? 'Loss 1 (m³)' :
                name === 'loss2' ? 'Loss 2 (m³)' : 'Total Loss (m³)'
              ]} />
              <Line 
                type="monotone" 
                dataKey="loss1" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="loss1"
              />
              <Line 
                type="monotone" 
                dataKey="loss2" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="loss2"
              />
              <Line 
                type="monotone" 
                dataKey="totalLoss" 
                stroke="#6b7280" 
                strokeWidth={2}
                name="totalLoss"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Water Flow by Level */}
        <ChartCard 
          title="Water Flow by Level (Last 6 Months)"
          subtitle="System hierarchy analysis"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                `${value.toLocaleString()} m³`,
                name === 'a1' ? 'A1 (Main Bulk)' :
                name === 'a2' ? 'A2 (Billed Bulk)' : 'A3 (Billed Indiv.)'
              ]} />
              <Bar dataKey="a1" fill="#4b5563" name="a1" />
              <Bar dataKey="a2" fill="#10b981" name="a2" />
              <Bar dataKey="a3" fill="#8b5cf6" name="a3" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Zone Performance Analysis */}
      <ChartCard 
        title="Zone Performance Analysis"
        subtitle="Water distribution efficiency by zone"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Zone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Active Meters</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Consumption (m³)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {zoneData.map((zone, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{zone.zone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{zone.meters}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{zone.consumption.toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-20">
                        <div 
                          className={`h-2 rounded-full ${
                            zone.efficiency >= 85 ? 'bg-green-500' :
                            zone.efficiency >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${zone.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{zone.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      zone.efficiency >= 85 ? 'bg-green-100 text-green-800' :
                      zone.efficiency >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {zone.efficiency >= 85 ? 'Optimal' :
                       zone.efficiency >= 75 ? 'Warning' : 'Critical'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Water Quality Alerts */}
      <ChartCard 
        title="Water Quality & System Alerts"
        subtitle="Real-time monitoring and alerts"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Active Alerts</h4>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium text-red-800">High Loss Rate - Zone 3A</p>
                  <p className="text-sm text-red-600">Loss rate exceeds 30% threshold</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                <div>
                  <p className="font-medium text-orange-800">Meter Reading Anomaly</p>
                  <p className="text-sm text-orange-600">Unusual consumption pattern detected</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">System Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm font-medium">Main Distribution</span>
                <span className="text-green-600 text-sm">Operational</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm font-medium">Pressure Monitoring</span>
                <span className="text-green-600 text-sm">Normal</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm font-medium">Zone 3A Network</span>
                <span className="text-yellow-600 text-sm">Attention Required</span>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default WaterModule;

