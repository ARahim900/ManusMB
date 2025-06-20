import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { COLORS } from '@/utils/constants';
import { ElectricityData } from '@/types';

interface ElectricityPerformanceProps {
  kpiAndTableData: ElectricityData[];
  filteredElectricityData: ElectricityData[];
  selectedMonth: string;
}

const ElectricityPerformance: React.FC<ElectricityPerformanceProps> = ({
  kpiAndTableData,
  filteredElectricityData,
  selectedMonth,
}) => {
  // Zone performance data
  const zonePerformanceData = React.useMemo(() => {
    const zoneData: Record<string, { consumption: number; meters: number }> = {};
    kpiAndTableData.forEach(item => {
      if (!zoneData[item.zone]) {
        zoneData[item.zone] = { consumption: 0, meters: 0 };
      }
      zoneData[item.zone].consumption += item.totalConsumption;
      zoneData[item.zone].meters += 1;
    });
    
    return Object.entries(zoneData)
      .map(([zone, data]) => ({
        zone,
        consumption: Math.round(data.consumption),
        avgConsumption: Math.round(data.consumption / data.meters),
        meters: data.meters,
      }))
      .sort((a, b) => b.consumption - a.consumption)
      .slice(0, 8);
  }, [kpiAndTableData]);

  // Category performance radar data
  const categoryRadarData = React.useMemo(() => {
    const categoryData: Record<string, number> = {};
    kpiAndTableData.forEach(item => {
      categoryData[item.category] = (categoryData[item.category] || 0) + item.totalConsumption;
    });
    
    return Object.entries(categoryData)
      .map(([category, consumption]) => ({
        category: category.length > 15 ? category.substring(0, 15) + '...' : category,
        value: Math.round(consumption),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [kpiAndTableData]);

  // Monthly growth comparison
  const monthlyGrowthData = React.useMemo(() => {
    const months = Object.keys(filteredElectricityData[0]?.consumption || {});
    const growthData = [];
    
    for (let i = 1; i < months.length; i++) {
      const currentMonth = months[i];
      const previousMonth = months[i - 1];
      
      const currentTotal = filteredElectricityData.reduce((sum, item) => sum + (item.consumption[currentMonth] || 0), 0);
      const previousTotal = filteredElectricityData.reduce((sum, item) => sum + (item.consumption[previousMonth] || 0), 0);
      
      const growth = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
      
      growthData.push({
        month: currentMonth.replace('-24', '').replace('-25', ''),
        growth: Math.round(growth * 10) / 10,
        consumption: Math.round(currentTotal),
      });
    }
    
    return growthData;
  }, [filteredElectricityData]);

  // Performance metrics by type
  const performanceMetrics = React.useMemo(() => {
    const metrics: Record<string, { count: number; total: number; highest: number; lowest: number }> = {};
    
    kpiAndTableData.forEach(item => {
      if (!metrics[item.type]) {
        metrics[item.type] = { count: 0, total: 0, highest: 0, lowest: Infinity };
      }
      metrics[item.type].count++;
      metrics[item.type].total += item.totalConsumption;
      metrics[item.type].highest = Math.max(metrics[item.type].highest, item.totalConsumption);
      metrics[item.type].lowest = Math.min(metrics[item.type].lowest, item.totalConsumption);
    });
    
    return Object.entries(metrics).map(([type, data]) => ({
      type,
      avgConsumption: Math.round(data.total / data.count),
      efficiency: Math.round((data.lowest / data.highest) * 100),
      variance: Math.round(((data.highest - data.lowest) / data.lowest) * 100),
    }));
  }, [kpiAndTableData]);

  return (
    <div className="space-y-6">
      {/* Zone Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Zone-wise Consumption" subtitle="Total consumption by zone">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zonePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} />
              <Bar dataKey="consumption" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Category Performance" subtitle="Consumption distribution by category">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={categoryRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
              <Radar name="Consumption" dataKey="value" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.6} />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Monthly Growth Analysis */}
      <ChartWrapper title="Month-over-Month Growth Rate" subtitle="Consumption growth percentage">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'growth' ? `${value}%` : `${value.toLocaleString()} kWh`,
                name === 'growth' ? 'Growth Rate' : 'Total Consumption'
              ]} 
            />
            <Legend />
            <Line type="monotone" dataKey="growth" stroke={COLORS.success} strokeWidth={3} name="Growth %" />
            <Line type="monotone" dataKey="consumption" stroke={COLORS.primary} strokeWidth={2} yAxisId="right" name="Consumption" />
            <YAxis yAxisId="right" orientation="right" />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Performance Metrics Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Performance Metrics by Type</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Consumption</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Efficiency Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {performanceMetrics.map((metric, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{metric.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{metric.avgConsumption.toLocaleString()} kWh</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-slate-900">{metric.efficiency}%</span>
                      <div className="ml-2 w-16 bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{
                            width: `${metric.efficiency}%`,
                            backgroundColor: metric.efficiency > 70 ? COLORS.success : metric.efficiency > 40 ? COLORS.warning : COLORS.error
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      metric.variance < 50 ? 'text-green-600' : 
                      metric.variance < 100 ? 'text-orange-600' : 
                      'text-red-600'
                    }`}>
                      {metric.variance > 0 ? '+' : ''}{metric.variance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {metric.efficiency > 70 ? (
                      <span className="flex items-center text-green-600">
                        <TrendingUp size={16} className="mr-1" /> Good
                      </span>
                    ) : metric.efficiency > 40 ? (
                      <span className="flex items-center text-orange-600">
                        <AlertCircle size={16} className="mr-1" /> Monitor
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <TrendingDown size={16} className="mr-1" /> Review
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="text-lg font-semibold text-green-900 mb-2">High Performers</h4>
          <p className="text-3xl font-bold text-green-600 mb-1">
            {performanceMetrics.filter(m => m.efficiency > 70).length}
          </p>
          <p className="text-sm text-green-700">Units with good efficiency</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h4 className="text-lg font-semibold text-orange-900 mb-2">Need Attention</h4>
          <p className="text-3xl font-bold text-orange-600 mb-1">
            {performanceMetrics.filter(m => m.efficiency > 40 && m.efficiency <= 70).length}
          </p>
          <p className="text-sm text-orange-700">Units requiring monitoring</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h4 className="text-lg font-semibold text-red-900 mb-2">Critical Review</h4>
          <p className="text-3xl font-bold text-red-600 mb-1">
            {performanceMetrics.filter(m => m.efficiency <= 40).length}
          </p>
          <p className="text-sm text-red-700">Units needing immediate review</p>
        </div>
      </div>
    </div>
  );
};

export default ElectricityPerformance;