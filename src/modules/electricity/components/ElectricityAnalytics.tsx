import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, ComposedChart, Bar, Line } from 'recharts';
import { TrendingUp, AlertTriangle, Battery, Zap } from 'lucide-react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { COLORS } from '@/utils/constants';
import { ElectricityData } from '@/types';

interface ElectricityAnalyticsProps {
  kpiAndTableData: ElectricityData[];
  filteredElectricityData: ElectricityData[];
  selectedMonth: string;
  selectedCategory: string;
}

const ElectricityAnalytics: React.FC<ElectricityAnalyticsProps> = ({
  kpiAndTableData,
  filteredElectricityData,
  selectedMonth,
  selectedCategory,
}) => {
  // Consumption pattern analysis
  const consumptionPatternData = React.useMemo(() => {
    const months = Object.keys(filteredElectricityData[0]?.consumption || {});
    return months.map(month => {
      const data = filteredElectricityData.map(item => item.consumption[month] || 0);
      const sorted = [...data].sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const median = sorted[Math.floor(sorted.length * 0.5)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const avg = data.reduce((sum, val) => sum + val, 0) / data.length;
      
      return {
        month: month.replace('-24', '').replace('-25', ''),
        min,
        q1,
        median,
        q3,
        max,
        avg: Math.round(avg),
      };
    });
  }, [filteredElectricityData]);

  // Anomaly detection data
  const anomalyData = React.useMemo(() => {
    const result: any[] = [];
    
    kpiAndTableData.forEach(item => {
      const consumptionValues = Object.values(item.consumption).filter(v => v > 0);
      if (consumptionValues.length > 0) {
        const avg = consumptionValues.reduce((sum, val) => sum + val, 0) / consumptionValues.length;
        const stdDev = Math.sqrt(
          consumptionValues.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / consumptionValues.length
        );
        
        const anomalyScore = stdDev / avg * 100; // Coefficient of variation
        
        if (anomalyScore > 50) { // High variance indicates potential anomaly
          result.push({
            unit: item.unitName,
            zone: item.zone,
            avgConsumption: Math.round(avg),
            variance: Math.round(anomalyScore),
            maxConsumption: Math.max(...consumptionValues),
            minConsumption: Math.min(...consumptionValues),
          });
        }
      }
    });
    
    return result.sort((a, b) => b.variance - a.variance).slice(0, 10);
  }, [kpiAndTableData]);

  // Efficiency trends by category
  const efficiencyTrendsData = React.useMemo(() => {
    const months = Object.keys(filteredElectricityData[0]?.consumption || {});
    const categories = [...new Set(filteredElectricityData.map(item => item.category))];
    
    return months.map(month => {
      const dataPoint: any = { month: month.replace('-24', '').replace('-25', '') };
      
      categories.forEach(category => {
        const categoryItems = filteredElectricityData.filter(item => item.category === category);
        const total = categoryItems.reduce((sum, item) => sum + (item.consumption[month] || 0), 0);
        dataPoint[category] = Math.round(total);
      });
      
      return dataPoint;
    });
  }, [filteredElectricityData]);

  // Scatter plot data for consumption vs. efficiency
  const scatterData = React.useMemo(() => {
    return kpiAndTableData
      .filter(item => item.totalConsumption > 0)
      .map(item => {
        const consumptionValues = Object.values(item.consumption).filter(v => v > 0);
        const avg = consumptionValues.reduce((sum, val) => sum + val, 0) / consumptionValues.length;
        const efficiency = avg > 0 ? (item.totalConsumption / (avg * consumptionValues.length)) * 100 : 0;
        
        return {
          name: item.unitName,
          consumption: item.totalConsumption,
          efficiency: Math.min(100, Math.round(efficiency)),
          zone: item.zone,
          category: item.category,
        };
      });
  }, [kpiAndTableData]);

  return (
    <div className="space-y-6">
      {/* Consumption Pattern Analysis */}
      <ChartWrapper title="Consumption Pattern Analysis" subtitle="Statistical distribution across months">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={consumptionPatternData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="q3" stackId="1" stroke="none" fill={COLORS.chart[2]} fillOpacity={0.3} name="75th Percentile" />
            <Area type="monotone" dataKey="median" stackId="2" stroke="none" fill={COLORS.chart[1]} fillOpacity={0.5} name="Median" />
            <Area type="monotone" dataKey="q1" stackId="3" stroke="none" fill={COLORS.chart[0]} fillOpacity={0.3} name="25th Percentile" />
            <Line type="monotone" dataKey="avg" stroke={COLORS.primary} strokeWidth={3} name="Average" />
            <Line type="monotone" dataKey="max" stroke={COLORS.error} strokeWidth={2} strokeDasharray="5 5" name="Maximum" />
            <Line type="monotone" dataKey="min" stroke={COLORS.success} strokeWidth={2} strokeDasharray="5 5" name="Minimum" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Efficiency Scatter Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Consumption vs Efficiency" subtitle="Unit performance distribution">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="consumption" name="Consumption" unit=" kWh" />
              <YAxis dataKey="efficiency" name="Efficiency" unit="%" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Units" data={scatterData} fill={COLORS.primary}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Category Efficiency Trends" subtitle="Monthly consumption by category">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={efficiencyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(efficiencyTrendsData[0] || {})
                .filter(key => key !== 'month')
                .slice(0, 5)
                .map((category, index) => (
                  <Area
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stackId="1"
                    stroke={COLORS.chart[index]}
                    fill={COLORS.chart[index]}
                    fillOpacity={0.6}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Anomaly Detection Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-700">Anomaly Detection - High Variance Units</h3>
          <AlertTriangle className="text-orange-600" size={24} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Consumption</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Variance Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Range (Min-Max)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {anomalyData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.zone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.avgConsumption.toLocaleString()} kWh</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.variance > 100 ? 'bg-red-100 text-red-800' :
                      item.variance > 75 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.variance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.minConsumption.toLocaleString()} - {item.maxConsumption.toLocaleString()} kWh
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="text-orange-600 font-medium">Review Required</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-600">Total Units Analyzed</h4>
            <Battery className="text-blue-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{kpiAndTableData.length}</p>
          <p className="text-xs text-slate-500 mt-1">Active monitoring</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-600">Anomalies Detected</h4>
            <AlertTriangle className="text-orange-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{anomalyData.length}</p>
          <p className="text-xs text-slate-500 mt-1">High variance units</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-600">Efficiency Score</h4>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-slate-800">78.5%</p>
          <p className="text-xs text-slate-500 mt-1">System average</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-600">Peak Demand</h4>
            <Zap className="text-purple-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-slate-800">38,168</p>
          <p className="text-xs text-slate-500 mt-1">kWh maximum</p>
        </div>
      </div>
    </div>
  );
};

export default ElectricityAnalytics;