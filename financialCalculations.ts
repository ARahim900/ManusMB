// Financial planning calculation utilities

// Cost of living index by country (relative to US = 100)
// Source: Approximated values for demonstration purposes
const costOfLivingIndex: Record<string, number> = {
  "United States": 100,
  "Canada": 95,
  "United Kingdom": 105,
  "Australia": 110,
  "Germany": 102,
  "France": 100,
  "Japan": 115,
  "China": 75,
  "India": 45,
  "Brazil": 65,
  "Mexico": 55,
  "South Africa": 60,
  "Italy": 95,
  "Spain": 85,
  "Netherlands": 105,
  "Sweden": 115,
  "Norway": 125,
  "Singapore": 120,
  "New Zealand": 105
};

// Education cost estimates by country (annual cost in USD)
// Source: Approximated values for demonstration purposes
const educationCostByCountry: Record<string, { primary: number; secondary: number; university: number }> = {
  "United States": { primary: 10000, secondary: 15000, university: 25000 },
  "Canada": { primary: 8000, secondary: 12000, university: 20000 },
  "United Kingdom": { primary: 9000, secondary: 14000, university: 22000 },
  "Australia": { primary: 9500, secondary: 14500, university: 23000 },
  "Germany": { primary: 5000, secondary: 8000, university: 12000 },
  "France": { primary: 5500, secondary: 8500, university: 13000 },
  "Japan": { primary: 8000, secondary: 12000, university: 18000 },
  "China": { primary: 5000, secondary: 8000, university: 15000 },
  "India": { primary: 3000, secondary: 5000, university: 10000 },
  "Brazil": { primary: 4000, secondary: 6000, university: 12000 },
  "Mexico": { primary: 3500, secondary: 5500, university: 11000 },
  "South Africa": { primary: 4000, secondary: 6000, university: 12000 },
  "Italy": { primary: 5000, secondary: 8000, university: 15000 },
  "Spain": { primary: 4500, secondary: 7000, university: 14000 },
  "Netherlands": { primary: 6000, secondary: 9000, university: 16000 },
  "Sweden": { primary: 4000, secondary: 6000, university: 10000 },
  "Norway": { primary: 4500, secondary: 6500, university: 11000 },
  "Singapore": { primary: 9000, secondary: 14000, university: 22000 },
  "New Zealand": { primary: 7000, secondary: 11000, university: 19000 }
};

// Default values for US if country not found
const defaultEducationCost = { primary: 10000, secondary: 15000, university: 25000 };
const defaultCostOfLiving = 100;

// Interface for user input data
export interface FinancialInputData {
  location: string;
  monthlyIncome: string;
  savings: string;
  numberOfChildren: string;
  childrenAges: { id: number; age: string }[];
}

// Interface for financial plan results
export interface FinancialPlanResults {
  emergencyFund: {
    recommended: number;
    current: number;
    monthlyContribution: number;
    timeToReach: number;
  };
  retirementFund: {
    recommended: number;
    monthlyContribution: number;
    projectedAt65: number;
  };
  educationFunds: Array<{
    childNumber: number;
    childAge: number;
    yearsToCollege: number;
    totalNeeded: number;
    currentAllocation: number;
    monthlyContribution: number;
  }>;
  generalSavings: {
    recommended: number;
    current: number;
    monthlyContribution: number;
  };
  monthlyBudget: {
    income: number;
    expenses: number;
    savings: number;
    discretionary: number;
  };
  debtManagement?: {
    recommendedPayoff: number;
    monthlyPayment: number;
  };
  investmentAllocation: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
}

/**
 * Calculate emergency fund recommendations
 * Standard recommendation: 3-6 months of expenses
 */
export function calculateEmergencyFund(
  monthlyIncome: number,
  currentSavings: number,
  location: string
): { recommended: number; current: number; monthlyContribution: number; timeToReach: number } {
  // Adjust for cost of living
  const costIndex = costOfLivingIndex[location] || defaultCostOfLiving;
  const adjustmentFactor = costIndex / 100;
  
  // Estimate monthly expenses (typically 70% of income)
  const estimatedMonthlyExpenses = monthlyIncome * 0.7 * adjustmentFactor;
  
  // Recommend 6 months of expenses for emergency fund
  const recommendedEmergencyFund = estimatedMonthlyExpenses * 6;
  
  // Allocate portion of current savings to emergency fund (up to the recommended amount)
  const currentEmergencyFund = Math.min(currentSavings, recommendedEmergencyFund);
  
  // Calculate how much more is needed
  const additionalNeeded = Math.max(0, recommendedEmergencyFund - currentEmergencyFund);
  
  // Recommend 10% of monthly income toward emergency fund until goal is reached
  const monthlyContribution = additionalNeeded > 0 ? Math.min(monthlyIncome * 0.1, additionalNeeded) : 0;
  
  // Calculate months to reach goal
  const timeToReach = monthlyContribution > 0 ? Math.ceil(additionalNeeded / monthlyContribution) : 0;
  
  return {
    recommended: recommendedEmergencyFund,
    current: currentEmergencyFund,
    monthlyContribution,
    timeToReach
  };
}

/**
 * Calculate retirement fund recommendations
 * Based on replacing 80% of pre-retirement income
 */
export function calculateRetirementFund(
  age: number = 35, // Default age if not provided
  monthlyIncome: number,
  currentSavings: number,
  location: string
): { recommended: number; monthlyContribution: number; projectedAt65: number } {
  // Adjust for cost of living
  const costIndex = costOfLivingIndex[location] || defaultCostOfLiving;
  const adjustmentFactor = costIndex / 100;
  
  // Annual income
  const annualIncome = monthlyIncome * 12;
  
  // Years until retirement (assuming retirement at 65)
  const yearsToRetirement = Math.max(0, 65 - age);
  
  // Target retirement savings (to replace 80% of income for 25 years)
  const targetRetirementIncome = annualIncome * 0.8 * adjustmentFactor;
  const recommendedRetirementFund = targetRetirementIncome * 25;
  
  // Calculate required monthly contribution
  // Using simplified formula without compound interest for clarity
  const remainingToSave = Math.max(0, recommendedRetirementFund - currentSavings);
  const monthsToRetirement = yearsToRetirement * 12;
  
  // If already at retirement age, recommend maintenance contribution
  const monthlyContribution = monthsToRetirement > 0 
    ? remainingToSave / monthsToRetirement 
    : targetRetirementIncome / 12 * 0.05; // 5% of target income as maintenance
  
  // Project retirement savings at age 65
  // Simple projection with 7% annual return
  const annualReturn = 0.07;
  const projectedSavings = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement) + 
    monthlyContribution * 12 * ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn);
  
  return {
    recommended: recommendedRetirementFund,
    monthlyContribution,
    projectedAt65: projectedSavings
  };
}

/**
 * Calculate education fund recommendations for each child
 */
export function calculateEducationFunds(
  childrenAges: { id: number; age: string }[],
  currentSavings: number,
  location: string
): Array<{
  childNumber: number;
  childAge: number;
  yearsToCollege: number;
  totalNeeded: number;
  currentAllocation: number;
  monthlyContribution: number;
}> {
  // Get education costs for location
  const educationCosts = educationCostByCountry[location] || defaultEducationCost;
  
  // Sort children by age (youngest first)
  const sortedChildren = [...childrenAges]
    .map(child => ({ ...child, age: parseInt(child.age) || 0 }))
    .sort((a, b) => a.age - b.age);
  
  // Calculate total education needs
  let totalEducationNeeds = 0;
  const childEducationDetails = sortedChildren.map((child, index) => {
    // Years until college (assuming college starts at 18)
    const yearsToCollege = Math.max(0, 18 - child.age);
    
    // Total cost of college education (4 years)
    const totalCollegeCost = educationCosts.university * 4;
    
    // Add to total needs
    totalEducationNeeds += totalCollegeCost;
    
    return {
      childNumber: index + 1,
      childAge: child.age,
      yearsToCollege,
      totalNeeded: totalCollegeCost,
      currentAllocation: 0, // Will calculate after determining proportions
      monthlyContribution: 0 // Will calculate after determining proportions
    };
  });
  
  // Allocate current savings proportionally to education needs
  // Assume 30% of current savings is allocated to education, distributed by need
  const educationSavingsPool = currentSavings * 0.3;
  
  // Calculate monthly contributions and current allocations
  return childEducationDetails.map(child => {
    // Proportion of total education needs
    const proportion = child.totalNeeded / (totalEducationNeeds || 1);
    
    // Current allocation based on proportion
    const currentAllocation = educationSavingsPool * proportion;
    
    // Remaining amount needed
    const remainingNeeded = Math.max(0, child.totalNeeded - currentAllocation);
    
    // Monthly contribution needed
    // If years to college is 0, set a maintenance contribution
    const monthsToCollege = child.yearsToCollege * 12;
    const monthlyContribution = monthsToCollege > 0
      ? remainingNeeded / monthsToCollege
      : child.totalNeeded * 0.01; // 1% of total as maintenance
    
    return {
      ...child,
      currentAllocation,
      monthlyContribution
    };
  });
}

/**
 * Calculate general savings recommendations
 */
export function calculateGeneralSavings(
  monthlyIncome: number,
  currentSavings: number,
  emergencyFundAllocation: number,
  educationFundAllocation: number
): { recommended: number; current: number; monthlyContribution: number } {
  // Recommended general savings (1-2 years of income)
  const annualIncome = monthlyIncome * 12;
  const recommendedGeneralSavings = annualIncome * 1.5;
  
  // Current general savings (after emergency and education allocations)
  const remainingSavings = Math.max(0, currentSavings - emergencyFundAllocation - educationFundAllocation);
  
  // Monthly contribution (aim for 10-15% of income)
  const generalSavingsRate = 0.15;
  const monthlyContribution = monthlyIncome * generalSavingsRate;
  
  return {
    recommended: recommendedGeneralSavings,
    current: remainingSavings,
    monthlyContribution
  };
}

/**
 * Calculate monthly budget breakdown
 */
export function calculateMonthlyBudget(
  monthlyIncome: number,
  emergencyContribution: number,
  retirementContribution: number,
  educationContributions: number[],
  generalSavingsContribution: number,
  location: string
): { income: number; expenses: number; savings: number; discretionary: number } {
  // Adjust for cost of living
  const costIndex = costOfLivingIndex[location] || defaultCostOfLiving;
  const adjustmentFactor = costIndex / 100;
  
  // Total savings contributions
  const totalEducationContribution = educationContributions.reduce((sum, contribution) => sum + contribution, 0);
  const totalSavingsContribution = emergencyContribution + retirementContribution + 
    totalEducationContribution + generalSavingsContribution;
  
  // Estimated essential expenses (50-60% of income, adjusted for cost of living)
  const essentialExpensesRate = 0.55 * adjustmentFactor;
  const estimatedExpenses = monthlyIncome * essentialExpensesRate;
  
  // Discretionary income
  const discretionaryIncome = Math.max(0, monthlyIncome - estimatedExpenses - totalSavingsContribution);
  
  return {
    income: monthlyIncome,
    expenses: estimatedExpenses,
    savings: totalSavingsContribution,
    discretionary: discretionaryIncome
  };
}

/**
 * Calculate investment allocation recommendations
 * Based on age and risk tolerance
 */
export function calculateInvestmentAllocation(age: number = 35): { 
  conservative: number; 
  moderate: number; 
  aggressive: number 
} {
  // Basic age-based allocation (100 - age = equity percentage)
  const equityPercentage = Math.max(0, Math.min(90, 100 - age));
  const bondPercentage = 100 - equityPercentage;
  
  // Split into three categories
  return {
    conservative: Math.round(bondPercentage * 0.7), // Mostly bonds and stable investments
    moderate: Math.round(bondPercentage * 0.3 + equityPercentage * 0.4), // Balanced approach
    aggressive: Math.round(equityPercentage * 0.6) // Growth-focused equities
  };
}

/**
 * Generate complete financial plan based on user inputs
 */
export function generateFinancialPlan(data: FinancialInputData): FinancialPlanResults {
  // Parse numeric inputs
  const monthlyIncome = parseFloat(data.monthlyIncome) || 0;
  const currentSavings = parseFloat(data.savings) || 0;
  const location = data.location || "United States";
  
  // Calculate emergency fund
  const emergencyFund = calculateEmergencyFund(monthlyIncome, currentSavings, location);
  
  // Calculate education funds
  const educationFunds = calculateEducationFunds(data.childrenAges, currentSavings, location);
  
  // Calculate total education allocation from current savings
  const totalEducationAllocation = educationFunds.reduce(
    (sum, fund) => sum + fund.currentAllocation, 
    0
  );
  
  // Estimate user's age (default to 35 if not provided)
  const estimatedAge = 35;
  
  // Calculate retirement fund
  const retirementFund = calculateRetirementFund(
    estimatedAge, 
    monthlyIncome, 
    currentSavings * 0.4, // Allocate 40% of current savings to retirement
    location
  );
  
  // Calculate general savings
  const generalSavings = calculateGeneralSavings(
    monthlyIncome,
    currentSavings,
    emergencyFund.current,
    totalEducationAllocation
  );
  
  // Calculate monthly budget
  const educationContributions = educationFunds.map(fund => fund.monthlyContribution);
  const monthlyBudget = calculateMonthlyBudget(
    monthlyIncome,
    emergencyFund.monthlyContribution,
    retirementFund.monthlyContribution,
    educationContributions,
    generalSavings.monthlyContribution,
    location
  );
  
  // Calculate investment allocation
  const investmentAllocation = calculateInvestmentAllocation(estimatedAge);
  
  return {
    emergencyFund,
    retirementFund,
    educationFunds,
    generalSavings,
    monthlyBudget,
    investmentAllocation
  };
}
