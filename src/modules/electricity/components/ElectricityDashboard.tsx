import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label, Area } from 'recharts';
import { Zap, DollarSign, BarChart2, Users2, Sparkles, X } from 'lucide-react';
import SummaryCard from '@/components/ui/SummaryCard';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { COLORS } from '@/utils/constants';
import { ElectricityData } from '@/types';

interface ElectricityDashboardProps {
  selectedMonth: string;
  selectedCategory: string;
  kpiAndTableData: ElectricityData[];
  filteredElectricityData: ElectricityData[];
  totalConsumptionKWh: number;
  totalCostOMR: number;
  averageConsumptionPerUnit: number;
  activeMeters: number;
  availableMonths: string[];
  handleAiAnalysis: () => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  aiAnalysisResult: string;
  isAiLoading: boolean;
}

const ElectricityDashboard: React.FC<ElectricityDashboardProps> = ({
  selectedMonth,
  selectedCategory,
  kpiAndTableData,
  filteredElectricityData,
  totalConsumptionKWh,
  totalCostOMR,
  averageConsumptionPerUnit,
  activeMeters,
  availableMonths,
  handleAiAnalysis,
  isAiModalOpen,
  setIsAiModalOpen,
  aiAnalysisResult,
  isAiLoading,
}) => {
  // Monthly trend data
  const monthlyTrendForAllMonths = React.useMemo(() => {
    return availableMonths.map(month => {
      const total = filteredElectricityData.reduce((acc, curr) => acc + (curr.consumption[month] || 0), 0);
      return { name: month.replace('-24', '').replace('-25', ''), total: parseFloat(total.toFixed(2)) };
    });
  }, [filteredElectricityData, availableMonths]);

  // Consumption by type data
  const consumptionByTypeChartData = React.useMemo(() => {
    const typeData: Record<string, number> = {};
    kpiAndTableData.forEach(d => { 
      typeData[d.type] = (typeData[d.type] || 0) + d.totalConsumption; 
    });
    return Object.entries(typeData)
      .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
      .filter(item => item.value > 0)
      .sort((a,b) => b.value - a.value);
  }, [kpiAndTableData]);

  // Top consumers data
  const topConsumersChartData = React.useMemo(() => {
    return kpiAndTableData
      .slice()
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .filter(d => d.totalConsumption > 0)
      .slice(0, 7)
      .map(d => ({ 
        name: d.unitName, 
        consumption: d.totalConsumption
      }));
  }, [kpiAndTableData]);

  return (
    <>
      <div className="mb-6"> 
        <button 
          onClick={handleAiAnalysis} 
          className="flex items-center justify-center space-x-2 text-white py-2.5 px-5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto" 
          style={{ backgroundColor: COLORS.primary }} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark} 
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primary} 
          disabled={isAiLoading}
        > 
          <Sparkles size={18} /> 
          <span>{isAiLoading ? 'Analyzing...' : '✨ Analyze Consumption with AI'}</span> 
        </button> 
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Consumption" 
          value={totalConsumptionKWh.toLocaleString(undefined, {maximumFractionDigits:0})} 
          unit="kWh" 
          icon={Zap} 
          trend={selectedMonth === "All Months" ? "Overall" : `For ${selectedMonth}`} 
          trendColor={"text-slate-500 font-medium"} 
          iconBgColor={COLORS.primary} 
        />
        <SummaryCard 
          title="Total Est. Cost" 
          value={totalCostOMR.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} 
          unit="OMR" 
          icon={DollarSign} 
          trend="Based on selection" 
          trendColor="text-slate-500 font-medium" 
          iconBgColor={COLORS.success} 
        />
        <SummaryCard 
          title="Avg. Consumption/Unit" 
          value={averageConsumptionPerUnit.toLocaleString(undefined, {maximumFractionDigits:0})} 
          unit="kWh" 
          icon={BarChart2} 
          trend={selectedMonth === "All Months" ? "Overall" : `For ${selectedMonth}`} 
          trendColor={"text-slate-500 font-medium"} 
          iconBgColor={COLORS.warning} 
        />
        <SummaryCard 
          title="Active Meters" 
          value={activeMeters} 
          unit="units" 
          icon={Users2} 
          trend="In selection" 
          trendColor="text-slate-500 font-medium" 
          iconBgColor={COLORS.info} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3"> 
          <ChartWrapper title="Consumption Trend (All Months)" subtitle={`For category: ${selectedCategory}`}> 
            <ResponsiveContainer width="100%" height="100%"> 
              <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}> 
                <defs> 
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"> 
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/> 
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/> 
                  </linearGradient> 
                </defs> 
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> 
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} /> 
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} /> 
                <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} itemStyle={{color: '#334155'}} labelStyle={{color: '#0f172a', fontWeight: 'bold'}}/> 
                <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/> 
                <Area type="monotone" dataKey="total" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorTotal)" /> 
                <Line type="monotone" dataKey="total" stroke={COLORS.primary} strokeWidth={3} activeDot={{ r: 7, strokeWidth: 2, fill: COLORS.primary }} dot={{r:4, fill: COLORS.primary}} name="Total kWh" /> 
              </LineChart> 
            </ResponsiveContainer> 
          </ChartWrapper> 
        </div>
        <div className="lg:col-span-2"> 
          <ChartWrapper title="Consumption by Type" subtitle={`For ${selectedMonth}`}> 
            <ResponsiveContainer width="100%" height="100%"> 
              <PieChart> 
                <Pie data={consumptionByTypeChartData} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={2} cornerRadius={5}> 
                  {consumptionByTypeChartData.map((entry, index) => ( 
                    <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} className="focus:outline-none hover:opacity-80 transition-opacity" stroke="none"/> 
                  ))} 
                  <Label value={`${consumptionByTypeChartData.reduce((sum, item) => sum + item.value, 0).toLocaleString(undefined, {maximumFractionDigits:0})}`} position="centerBottom" dy={-5} className="text-2xl font-bold fill-slate-700"/> 
                  <Label value="Total kWh" position="centerTop" dy={10} className="text-xs fill-slate-500"/> 
                </Pie> 
                <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}}/> 
                <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '15px'}}/> 
              </PieChart> 
            </ResponsiveContainer> 
          </ChartWrapper> 
        </div>
      </div>

      <ChartWrapper title="Top Electricity Consumers" subtitle={`${selectedMonth} - Highest consumption units`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topConsumersChartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} />
            <Bar dataKey="consumption" fill={COLORS.primary} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* AI Analysis Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"> 
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"> 
            <div className="flex justify-between items-center mb-4"> 
              <h3 className="text-xl font-semibold" style={{color: COLORS.primary}}>✨ AI Consumption Analysis</h3> 
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200"> 
                <X size={20} className="text-slate-600"/> 
              </button> 
            </div> 
            {isAiLoading ? ( 
              <div className="text-center py-8"> 
                <Sparkles size={48} className="mx-auto animate-pulse" style={{color: COLORS.primaryLight}} /> 
                <p className="mt-2 text-slate-600">AI is analyzing data, please wait...</p> 
              </div> 
            ) : ( 
              <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap"> 
                {aiAnalysisResult ? ( 
                  aiAnalysisResult.split('\n').map((line, index) => ( 
                    <p key={index}>{line.startsWith('* ') || line.startsWith('- ') ? `• ${line.substring(2)}` : line}</p> 
                  )) 
                ) : ( 
                  <p>No analysis available or an error occurred.</p> 
                )} 
              </div> 
            )} 
            <div className="mt-6 text-right"> 
              <button 
                onClick={() => setIsAiModalOpen(false)} 
                className="text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors" 
                style={{ backgroundColor: COLORS.primary }} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}
              > 
                Close 
              </button> 
            </div> 
          </div> 
        </div>
      )}
    </>
  );
};

export default ElectricityDashboard;