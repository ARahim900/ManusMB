import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { FinancialPlanResults } from '../lib/financialCalculations';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface FinancialPlanDisplayProps {
  results: FinancialPlanResults;
  onReset: () => void;
}

export function FinancialPlanDisplay({ results, onReset }: FinancialPlanDisplayProps) {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for monthly budget pie chart
  const budgetData = [
    { name: 'Essential Expenses', value: results.monthlyBudget.expenses },
    { name: 'Savings', value: results.monthlyBudget.savings },
    { name: 'Discretionary', value: results.monthlyBudget.discretionary },
  ];

  // Prepare data for investment allocation pie chart
  const investmentData = [
    { name: 'Conservative', value: results.investmentAllocation.conservative },
    { name: 'Moderate', value: results.investmentAllocation.moderate },
    { name: 'Aggressive', value: results.investmentAllocation.aggressive },
  ];

  // Prepare data for savings allocation bar chart
  const savingsData = [
    { 
      name: 'Emergency Fund', 
      current: results.emergencyFund.current, 
      target: results.emergencyFund.recommended 
    },
    { 
      name: 'Retirement', 
      current: results.retirementFund.recommended * 0.1, // Simplified for visualization
      target: results.retirementFund.recommended 
    },
    { 
      name: 'General Savings', 
      current: results.generalSavings.current, 
      target: results.generalSavings.recommended 
    },
  ];

  // Add education funds to savings data if there are children
  if (results.educationFunds.length > 0) {
    results.educationFunds.forEach((fund) => {
      savingsData.push({
        name: `Child ${fund.childNumber} Education`,
        current: fund.currentAllocation,
        target: fund.totalNeeded
      });
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Financial Plan</CardTitle>
          <CardDescription>
            Based on your inputs, we've created a personalized financial plan to help you achieve your goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {budgetData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Income:</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyBudget.income)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Essential Expenses:</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyBudget.expenses)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Savings Contributions:</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyBudget.savings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discretionary Spending:</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyBudget.discretionary)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recommended Investment Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={investmentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {investmentData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        This allocation is based on general financial principles and your estimated age. 
                        Conservative investments focus on capital preservation, moderate investments balance 
                        growth and stability, while aggressive investments prioritize long-term growth.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Savings Tab */}
            <TabsContent value="savings" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Emergency Fund</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Emergency Fund:</span>
                      <span className="font-semibold">{formatCurrency(results.emergencyFund.current)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommended Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.emergencyFund.recommended)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span className="font-semibold">
                        {Math.min(100, Math.round((results.emergencyFund.current / results.emergencyFund.recommended) * 100))}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(100, Math.round((results.emergencyFund.current / results.emergencyFund.recommended) * 100))} 
                    className="h-2"
                  />
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      Your emergency fund should cover 6 months of essential expenses. We recommend a monthly 
                      contribution of {formatCurrency(results.emergencyFund.monthlyContribution)}.
                      {results.emergencyFund.timeToReach > 0 && 
                        ` At this rate, you'll reach your goal in approximately ${results.emergencyFund.timeToReach} months.`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Savings Goals Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={savingsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="current" name="Current Amount" fill="#8884d8" />
                        <Bar dataKey="target" name="Target Amount" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      This chart shows your progress toward various savings goals. Focus on building your 
                      emergency fund first, then work on retirement and education savings simultaneously.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">General Savings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current General Savings:</span>
                      <span className="font-semibold">{formatCurrency(results.generalSavings.current)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommended Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.generalSavings.recommended)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommended Monthly Contribution:</span>
                      <span className="font-semibold">{formatCurrency(results.generalSavings.monthlyContribution)}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      General savings can be used for major purchases, vacations, or other life goals. 
                      We recommend saving approximately 15% of your income for these purposes after 
                      your emergency fund is established.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              {results.educationFunds.length > 0 ? (
                results.educationFunds.map((fund, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Child {fund.childNumber} Education Fund (Age {fund.childAge})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Years Until College:</span>
                          <span className="font-semibold">{fund.yearsToCollege}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Estimated Cost:</span>
                          <span className="font-semibold">{formatCurrency(fund.totalNeeded)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Allocation:</span>
                          <span className="font-semibold">{formatCurrency(fund.currentAllocation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended Monthly Contribution:</span>
                          <span className="font-semibold">{formatCurrency(fund.monthlyContribution)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Progress:</span>
                          <span className="font-semibold">
                            {Math.min(100, Math.round((fund.currentAllocation / fund.totalNeeded) * 100))}%
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(100, Math.round((fund.currentAllocation / fund.totalNeeded) * 100))} 
                        className="h-2"
                      />
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">
                          {fund.yearsToCollege <= 0 ? (
                            "Your child is at or near college age. Consider maintaining this fund for ongoing education expenses."
                          ) : (
                            `With ${fund.yearsToCollege} years until college, consistent monthly contributions of ${formatCurrency(fund.monthlyContribution)} will help you reach your education savings goal.`
                          )}
                          {" "}Consider tax-advantaged education savings accounts like 529 plans.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg
(Content truncated due to size limit. Use line ranges to read in chunks)