import React from 'react';
import { Wallet, TrendingUp, DollarSign, PiggyBank, Calendar, Target, AlertCircle, FileText } from 'lucide-react';
import SummaryCard from '@/components/ui/SummaryCard';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { COLORS } from '@/utils/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ReserveFundModule: React.FC = () => {
  // Sample data for demonstration
  const fundAllocation = [
    { name: 'Emergency Reserve', value: 2500000, percentage: 40 },
    { name: 'Capital Improvements', value: 1875000, percentage: 30 },
    { name: 'Maintenance Reserve', value: 1250000, percentage: 20 },
    { name: 'Insurance Deductible', value: 625000, percentage: 10 },
  ];

  const monthlyContributions = [
    { month: 'Jan', contribution: 85000, expense: 45000, balance: 5800000 },
    { month: 'Feb', contribution: 85000, expense: 62000, balance: 5823000 },
    { month: 'Mar', contribution: 85000, expense: 38000, balance: 5870000 },
    { month: 'Apr', contribution: 85000, expense: 51000, balance: 5904000 },
    { month: 'May', contribution: 85000, expense: 42000, balance: 5947000 },
  ];

  const plannedProjects = [
    { project: 'Infrastructure Upgrade', budget: 450000, priority: 'High', timeline: 'Q3 2025' },
    { project: 'Road Resurfacing', budget: 320000, priority: 'Medium', timeline: 'Q4 2025' },
    { project: 'Lighting System', budget: 280000, priority: 'Medium', timeline: 'Q1 2026' },
    { project: 'Security Enhancement', budget: 180000, priority: 'High', timeline: 'Q2 2025' },
  ];

  const totalFund = fundAllocation.reduce((sum, item) => sum + item.value, 0);
  const currentBalance = 6250000;
  const targetBalance = 8000000;
  const monthlyTarget = 85000;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Reserve Fund Management</h2>
        <p className="text-slate-600 mt-1">Monitor and manage community reserve funds for long-term sustainability</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Current Balance"
          value={currentBalance.toLocaleString()}
          unit="OMR"
          icon={Wallet}
          trend="+2.5% from last month"
          trendColor="text-green-600"
          iconBgColor={COLORS.primary}
        />
        <SummaryCard
          title="Monthly Contribution"
          value={monthlyTarget.toLocaleString()}
          unit="OMR"
          icon={TrendingUp}
          trend="Target achieved"
          trendColor="text-green-600"
          iconBgColor={COLORS.success}
        />
        <SummaryCard
          title="Fund Adequacy"
          value={Math.round((currentBalance / targetBalance) * 100)}
          unit="%"
          icon={Target}
          trend="Of target reserve"
          trendColor="text-blue-600"
          iconBgColor={COLORS.info}
        />
        <SummaryCard
          title="Planned Projects"
          value={plannedProjects.length}
          unit="projects"
          icon={FileText}
          trend="OMR 1.23M allocated"
          trendColor="text-orange-600"
          iconBgColor={COLORS.warning}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fund Allocation Pie Chart */}
        <ChartWrapper title="Fund Allocation" subtitle="Current reserve distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fundAllocation}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {fundAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.chart[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `OMR ${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Monthly Contributions Chart */}
        <ChartWrapper title="Monthly Cash Flow" subtitle="Contributions vs Expenses">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyContributions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `OMR ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="contribution" fill={COLORS.success} name="Contributions" />
              <Bar dataKey="expense" fill={COLORS.error} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Balance Trend */}
      <ChartWrapper title="Reserve Fund Balance Trend" subtitle="6-month projection">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyContributions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `OMR ${value.toLocaleString()}`} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke={COLORS.primary} 
              strokeWidth={3}
              name="Fund Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {/* Planned Projects Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Planned Projects & Expenditures</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {plannedProjects.map((project, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">OMR {project.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.priority === 'High' ? 'bg-red-100 text-red-800' :
                      project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{project.timeline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Planned</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Health Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-700">Fund Health Score</h4>
            <PiggyBank size={24} className="text-green-600" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">85/100</div>
            <p className="text-sm text-slate-600">Excellent financial position</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-700">Months of Coverage</h4>
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">18.5</div>
            <p className="text-sm text-slate-600">Operating expense coverage</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-700">Collection Rate</h4>
            <DollarSign size={24} className="text-orange-600" />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">97.2%</div>
            <p className="text-sm text-slate-600">Monthly contribution collection</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Reserve Fund Recommendations</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Current reserve level is at 78% of target. Consider increasing monthly contributions by 10%.</li>
              <li>Infrastructure upgrade project scheduled for Q3 2025 requires additional funding allocation.</li>
              <li>Review investment strategy to optimize returns on idle reserve funds.</li>
              <li>Consider establishing a separate contingency fund for unexpected major repairs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveFundModule;