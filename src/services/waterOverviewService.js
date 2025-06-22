// Water Distribution Overview Service
// Based on the Grafana dashboard SQL queries for comprehensive water distribution analysis

// Sample data structure based on the SQL queries from the Grafana dashboard
export const waterOverviewData = {
  // Monthly statistics (matching the gauge panels)
  monthlyStats: {
    'Jan-25': {
      mainBulk: 32580,        // A1: Main Bulk (L1)
      billedBulk: 30245,      // A2: Billed Bulk (L2+DC)
      billedIndividual: 28567, // A3: Billed Indiv. (L3+DC)
      loss1: 2335,            // Loss 1 (A1-A2)
      loss2: 1678,            // Loss 2 (A2-A3)
      totalLoss: 4013         // Total Apparent Loss
    },
    'Feb-25': {
      mainBulk: 44043,
      billedBulk: 41234,
      billedIndividual: 38945,
      loss1: 2809,
      loss2: 2289,
      totalLoss: 5098
    },
    'Mar-25': {
      mainBulk: 34915,
      billedBulk: 32567,
      billedIndividual: 30123,
      loss1: 2348,
      loss2: 2444,
      totalLoss: 4792
    },
    'Apr-25': {
      mainBulk: 46039,
      billedBulk: 43234,
      billedIndividual: 40567,
      loss1: 2805,
      loss2: 2667,
      totalLoss: 5472
    },
    'May-25': {
      mainBulk: 58425,
      billedBulk: 54876,
      billedIndividual: 51234,
      loss1: 3549,
      loss2: 3642,
      totalLoss: 7191
    }
  },

  // Yearly aggregated statistics
  yearlyStats: {
    '2025': {
      mainBulk: 216002,      // Total for year
      billedBulk: 202156,    // Total billed bulk
      billedIndividual: 189436, // Total billed individual
      loss1: 13846,          // Total Loss 1
      loss2: 12720,          // Total Loss 2
      totalLoss: 26566       // Total apparent loss
    }
  },

  // Loss trend data for time series
  lossTrendData: [
    { month: 'Jan-25', date: '2025-01-01', loss1: 2335, loss2: 1678, totalLoss: 4013 },
    { month: 'Feb-25', date: '2025-02-01', loss1: 2809, loss2: 2289, totalLoss: 5098 },
    { month: 'Mar-25', date: '2025-03-01', loss1: 2348, loss2: 2444, totalLoss: 4792 },
    { month: 'Apr-25', date: '2025-04-01', loss1: 2805, loss2: 2667, totalLoss: 5472 },
    { month: 'May-25', date: '2025-05-01', loss1: 3549, loss2: 3642, totalLoss: 7191 }
  ],

  // Water flow by level data for time series
  waterFlowData: [
    { 
      month: 'Jan-25', 
      date: '2025-01-01', 
      a1MainBulk: 32580, 
      a2BilledBulk: 30245, 
      a3BilledIndividual: 28567 
    },
    { 
      month: 'Feb-25', 
      date: '2025-02-01', 
      a1MainBulk: 44043, 
      a2BilledBulk: 41234, 
      a3BilledIndividual: 38945 
    },
    { 
      month: 'Mar-25', 
      date: '2025-03-01', 
      a1MainBulk: 34915, 
      a2BilledBulk: 32567, 
      a3BilledIndividual: 30123 
    },
    { 
      month: 'Apr-25', 
      date: '2025-04-01', 
      a1MainBulk: 46039, 
      a2BilledBulk: 43234, 
      a3BilledIndividual: 40567 
    },
    { 
      month: 'May-25', 
      date: '2025-05-01', 
      a1MainBulk: 58425, 
      a2BilledBulk: 54876, 
      a3BilledIndividual: 51234 
    }
  ],

  // Consumer category distribution data
  consumerCategoryData: {
    'Jan-25': {
      building: 0.15,           // 15%
      residentialApart: 0.25,   // 25%
      residentialVilla: 0.45,   // 45%
      retail: 0.15              // 15%
    },
    'Feb-25': {
      building: 0.18,
      residentialApart: 0.27,
      residentialVilla: 0.42,
      retail: 0.13
    },
    'Mar-25': {
      building: 0.16,
      residentialApart: 0.26,
      residentialVilla: 0.43,
      retail: 0.15
    },
    'Apr-25': {
      building: 0.17,
      residentialApart: 0.28,
      residentialVilla: 0.41,
      retail: 0.14
    },
    'May-25': {
      building: 0.19,
      residentialApart: 0.29,
      residentialVilla: 0.38,
      retail: 0.14
    }
  }
};

// Get monthly statistics for gauge display
export const getMonthlyOverviewStats = (month = 'May-25') => {
  const stats = waterOverviewData.monthlyStats[month];
  if (!stats) return null;

  return {
    mainBulk: stats.mainBulk,
    billedBulk: stats.billedBulk,
    billedIndividual: stats.billedIndividual,
    loss1: stats.loss1,
    loss2: stats.loss2,
    totalLoss: stats.totalLoss,
    // Calculate percentages
    loss1Percent: (stats.loss1 / stats.mainBulk) * 100,
    loss2Percent: (stats.loss2 / stats.billedBulk) * 100,
    totalLossPercent: (stats.totalLoss / stats.mainBulk) * 100,
    efficiency: ((stats.billedIndividual / stats.mainBulk) * 100)
  };
};

// Get yearly statistics for gauge display
export const getYearlyOverviewStats = (year = '2025') => {
  const stats = waterOverviewData.yearlyStats[year];
  if (!stats) return null;

  return {
    mainBulk: stats.mainBulk,
    billedBulk: stats.billedBulk,
    billedIndividual: stats.billedIndividual,
    loss1: stats.loss1,
    loss2: stats.loss2,
    totalLoss: stats.totalLoss,
    // Calculate percentages
    loss1Percent: (stats.loss1 / stats.mainBulk) * 100,
    loss2Percent: (stats.loss2 / stats.billedBulk) * 100,
    totalLossPercent: (stats.totalLoss / stats.mainBulk) * 100,
    efficiency: ((stats.billedIndividual / stats.mainBulk) * 100)
  };
};

// Get loss trend data for time series chart
export const getLossTrendData = () => {
  return waterOverviewData.lossTrendData.map(item => ({
    name: item.month.replace('-25', ''),
    date: item.date,
    'Loss 1 (A1-A2)': item.loss1,
    'Loss 2 (A2-A3)': item.loss2,
    'Total Apparent Loss': item.totalLoss
  }));
};

// Get water flow data for time series chart
export const getWaterFlowData = () => {
  return waterOverviewData.waterFlowData.map(item => ({
    name: item.month.replace('-25', ''),
    date: item.date,
    'A1: Main Bulk (L1)': item.a1MainBulk,
    'A2: Billed Bulk (L2+DC)': item.a2BilledBulk,
    'A3: Billed Indiv. (L3+DC)': item.a3BilledIndividual
  }));
};

// Get consumer category distribution for bar gauge
export const getConsumerCategoryData = (month = 'May-25') => {
  const data = waterOverviewData.consumerCategoryData[month];
  if (!data) return [];

  return [
    { category: 'Building', percentage: data.building, value: data.building * 100 },
    { category: 'Residential (Apart)', percentage: data.residentialApart, value: data.residentialApart * 100 },
    { category: 'Residential (Villa)', percentage: data.residentialVilla, value: data.residentialVilla * 100 },
    { category: 'Retail', percentage: data.retail, value: data.retail * 100 }
  ].sort((a, b) => b.percentage - a.percentage);
};

// Get available months for dropdown
export const getOverviewMonths = () => {
  return Object.keys(waterOverviewData.monthlyStats);
};

// Get available years for dropdown
export const getOverviewYears = () => {
  return Object.keys(waterOverviewData.yearlyStats);
}; 