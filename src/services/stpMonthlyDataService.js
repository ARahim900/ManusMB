// STP Monthly Performance Summary Service
// Based on actual operational data from July 2024 to June 2025
// STP Plant Design Capacity: 750 m³ TSE Water daily

const TANKER_INCOME_PER_TRIP = 4.5; // OMR per tanker trip
const TSE_SAVING_PER_M3 = 1.32; // OMR savings per m³ of TSE irrigation
const STP_DESIGN_CAPACITY = 750; // m³/day TSE production capacity

// Monthly Performance Summary Data - Actual Operational Results
export const monthlyPerformanceData = [
  {
    month: 'July 2024',
    monthKey: '2024-07',
    operatingDays: 33,
    totalProcessedWater: 16895, // m³
    avgDailyProcessed: 512, // m³
    totalTreatedWater: 18308, // m³
    avgDailyTreated: 555, // m³
    treatmentEfficiency: 108.4, // %
    totalTSEWater: 16067, // m³
    avgDailyTSE: 487, // m³
    totalTankers: 442,
    avgDailyTankers: 13.4,
    tankerIncome: 1989.00, // OMR
    tseWaterSavings: 21208.44, // OMR
    totalFinancialBenefit: 23197.44 // OMR
  },
  {
    month: 'August 2024',
    monthKey: '2024-08',
    operatingDays: 31,
    totalProcessedWater: 15641, // m³
    avgDailyProcessed: 505, // m³
    totalTreatedWater: 17372, // m³
    avgDailyTreated: 560, // m³
    treatmentEfficiency: 111.1, // %
    totalTSEWater: 15139, // m³
    avgDailyTSE: 488, // m³
    totalTankers: 378,
    avgDailyTankers: 12.2,
    tankerIncome: 1701.00, // OMR
    tseWaterSavings: 19983.48, // OMR
    totalFinancialBenefit: 21684.48 // OMR
  },
  {
    month: 'September 2024',
    monthKey: '2024-09',
    operatingDays: 32,
    totalProcessedWater: 13806, // m³
    avgDailyProcessed: 431, // m³
    totalTreatedWater: 14859, // m³
    avgDailyTreated: 464, // m³
    treatmentEfficiency: 107.6, // %
    totalTSEWater: 13196, // m³
    avgDailyTSE: 412, // m³
    totalTankers: 283,
    avgDailyTankers: 8.8,
    tankerIncome: 1273.50, // OMR
    tseWaterSavings: 17418.72, // OMR
    totalFinancialBenefit: 18692.22 // OMR
  },
  {
    month: 'October 2024',
    monthKey: '2024-10',
    operatingDays: 31,
    totalProcessedWater: 16397, // m³
    avgDailyProcessed: 529, // m³
    totalTreatedWater: 17669, // m³
    avgDailyTreated: 570, // m³
    treatmentEfficiency: 107.8, // %
    totalTSEWater: 15490, // m³
    avgDailyTSE: 500, // m³
    totalTankers: 289,
    avgDailyTankers: 9.3,
    tankerIncome: 1300.50, // OMR
    tseWaterSavings: 20446.80, // OMR
    totalFinancialBenefit: 21747.30 // OMR
  },
  {
    month: 'November 2024',
    monthKey: '2024-11',
    operatingDays: 30,
    totalProcessedWater: 14540, // m³
    avgDailyProcessed: 485, // m³
    totalTreatedWater: 16488, // m³
    avgDailyTreated: 550, // m³
    treatmentEfficiency: 113.4, // %
    totalTSEWater: 14006, // m³
    avgDailyTSE: 467, // m³
    totalTankers: 235,
    avgDailyTankers: 7.8,
    tankerIncome: 1057.50, // OMR
    tseWaterSavings: 18487.92, // OMR
    totalFinancialBenefit: 19545.42 // OMR
  },
  {
    month: 'December 2024',
    monthKey: '2024-12',
    operatingDays: 31,
    totalProcessedWater: 15213, // m³
    avgDailyProcessed: 491, // m³
    totalTreatedWater: 17444, // m³
    avgDailyTreated: 563, // m³
    treatmentEfficiency: 114.7, // %
    totalTSEWater: 14676, // m³
    avgDailyTSE: 473, // m³
    totalTankers: 196,
    avgDailyTankers: 6.3,
    tankerIncome: 882.00, // OMR
    tseWaterSavings: 19372.32, // OMR
    totalFinancialBenefit: 20254.32 // OMR
  },
  {
    month: 'January 2025',
    monthKey: '2025-01',
    operatingDays: 31,
    totalProcessedWater: 15723, // m³
    avgDailyProcessed: 507, // m³
    totalTreatedWater: 18212, // m³
    avgDailyTreated: 587, // m³
    treatmentEfficiency: 115.8, // %
    totalTSEWater: 15433, // m³
    avgDailyTSE: 498, // m³
    totalTankers: 207,
    avgDailyTankers: 6.7,
    tankerIncome: 931.50, // OMR
    tseWaterSavings: 20371.56, // OMR
    totalFinancialBenefit: 21303.06 // OMR
  },
  {
    month: 'February 2025',
    monthKey: '2025-02',
    operatingDays: 26,
    totalProcessedWater: 13080, // m³
    avgDailyProcessed: 503, // m³
    totalTreatedWater: 14408, // m³
    avgDailyTreated: 554, // m³
    treatmentEfficiency: 110.2, // %
    totalTSEWater: 12075, // m³
    avgDailyTSE: 464, // m³
    totalTankers: 121,
    avgDailyTankers: 4.7,
    tankerIncome: 544.50, // OMR
    tseWaterSavings: 15939.00, // OMR
    totalFinancialBenefit: 16483.50 // OMR
  },
  {
    month: 'March 2025',
    monthKey: '2025-03',
    operatingDays: 31,
    totalProcessedWater: 16603, // m³
    avgDailyProcessed: 536, // m³
    totalTreatedWater: 18900, // m³
    avgDailyTreated: 610, // m³
    treatmentEfficiency: 113.8, // %
    totalTSEWater: 16093, // m³
    avgDailyTSE: 519, // m³
    totalTankers: 131,
    avgDailyTankers: 4.2,
    tankerIncome: 589.50, // OMR
    tseWaterSavings: 21242.76, // OMR
    totalFinancialBenefit: 21832.26 // OMR
  },
  {
    month: 'April 2025',
    monthKey: '2025-04',
    operatingDays: 31,
    totalProcessedWater: 18481, // m³
    avgDailyProcessed: 596, // m³
    totalTreatedWater: 20703, // m³
    avgDailyTreated: 668, // m³
    treatmentEfficiency: 112.0, // %
    totalTSEWater: 17905, // m³
    avgDailyTSE: 578, // m³
    totalTankers: 194,
    avgDailyTankers: 6.3,
    tankerIncome: 873.00, // OMR
    tseWaterSavings: 23634.60, // OMR
    totalFinancialBenefit: 24507.60 // OMR
  },
  {
    month: 'May 2025',
    monthKey: '2025-05',
    operatingDays: 31,
    totalProcessedWater: 19472, // m³
    avgDailyProcessed: 628, // m³
    totalTreatedWater: 22071, // m³
    avgDailyTreated: 712, // m³
    treatmentEfficiency: 113.3, // %
    totalTSEWater: 18985, // m³
    avgDailyTSE: 612, // m³
    totalTankers: 262,
    avgDailyTankers: 8.5,
    tankerIncome: 1179.00, // OMR
    tseWaterSavings: 25060.20, // OMR
    totalFinancialBenefit: 26239.20 // OMR
  },
  {
    month: 'June 2025',
    monthKey: '2025-06',
    operatingDays: 11, // Updated with correct data
    totalProcessedWater: 6476, // m³
    avgDailyProcessed: 589, // m³
    totalTreatedWater: 7022, // m³
    avgDailyTreated: 638, // m³
    treatmentEfficiency: 108.4, // %
    totalTSEWater: 6231, // m³
    avgDailyTSE: 567, // m³
    totalTankers: 117,
    avgDailyTankers: 10.6,
    tankerIncome: 526.50, // OMR
    tseWaterSavings: 8224.92, // OMR
    totalFinancialBenefit: 8751.42 // OMR
  }
];

// Financial Analysis Summary
export const financialAnalysisSummary = {
  tankerDischargeRevenue: {
    total: 12847.50, // OMR
    percentage: 5.3,
    monthlyAverage: 1070.63
  },
  tseWaterSavings: {
    total: 231390.72, // OMR
    percentage: 94.7,
    monthlyAverage: 19282.56
  },
  totalFinancialBenefit: {
    total: 244238.22, // OMR
    percentage: 100,
    monthlyAverage: 20353.19
  }
};

// Generate daily data points for detailed views (synthetic data based on monthly averages)
export const generateDailyData = (monthData) => {
  const dailyData = [];
  const daysInMonth = monthData.operatingDays;
  
  for (let day = 1; day <= daysInMonth; day++) {
    // Add some realistic variation around the monthly averages
    const variation = 0.15; // 15% variation
    const processedVariation = (Math.random() - 0.5) * variation;
    const treatedVariation = (Math.random() - 0.5) * variation;
    const tseVariation = (Math.random() - 0.5) * variation;
    const tankerVariation = Math.floor((Math.random() - 0.5) * 4); // ±2 tankers
    
    const processedWater = Math.round(monthData.avgDailyProcessed * (1 + processedVariation));
    const treatedWater = Math.round(monthData.avgDailyTreated * (1 + treatedVariation));
    const tseWater = Math.round(monthData.avgDailyTSE * (1 + tseVariation));
    const tankers = Math.max(0, Math.round(monthData.avgDailyTankers + tankerVariation));
    
    dailyData.push({
      date: `${monthData.monthKey}-${day.toString().padStart(2, '0')}`,
      processed: processedWater,
      treated: treatedWater,
      tse: tseWater,
      tankers: tankers,
      efficiency: ((tseWater / treatedWater) * 100).toFixed(1),
      tankerIncome: tankers * TANKER_INCOME_PER_TRIP,
      tseSavings: tseWater * TSE_SAVING_PER_M3,
      totalBenefit: (tankers * TANKER_INCOME_PER_TRIP) + (tseWater * TSE_SAVING_PER_M3)
    });
  }
  
  return dailyData;
};

// Get data for specific month
export const getDataByMonth = (monthKey) => {
  const monthData = monthlyPerformanceData.find(m => m.monthKey === monthKey);
  if (!monthData) return [];
  
  return generateDailyData(monthData);
};

// Get monthly summary data
export const getMonthlyData = () => {
  return monthlyPerformanceData;
};

// Get performance metrics with enhanced KPIs
export const getPerformanceMetrics = (data) => {
  if (data.length === 0) {
    return {
      totalTreated: 0,
      totalTSE: 0,
      totalProcessed: 0,
      totalTankers: 0,
      avgTreated: 0,
      avgTSE: 0,
      avgProcessed: 0,
      avgTankers: 0,
      treatmentEfficiency: 0,
      capacityUtilization: 0,
      tankerIncome: 0,
      tseSavings: 0,
      totalFinancialImpact: 0,
      dailyFinancialImpact: 0,
      designCapacityPerformance: 0
    };
  }

  const totalTreated = data.reduce((sum, item) => sum + item.treated, 0);
  const totalTSE = data.reduce((sum, item) => sum + item.tse, 0);
  const totalProcessed = data.reduce((sum, item) => sum + item.processed, 0);
  const totalTankers = data.reduce((sum, item) => sum + item.tankers, 0);
  const avgTSE = totalTSE / data.length;
  const avgTreated = totalTreated / data.length;
  const avgProcessed = totalProcessed / data.length;
  const avgTankers = totalTankers / data.length;
  
  const treatmentEfficiency = totalTreated > 0 ? (totalTSE / totalTreated) * 100 : 0;
  const capacityUtilization = (avgTSE / STP_DESIGN_CAPACITY) * 100;
  const tankerIncome = totalTankers * TANKER_INCOME_PER_TRIP;
  const tseSavings = totalTSE * TSE_SAVING_PER_M3;
  const totalFinancialImpact = tankerIncome + tseSavings;
  const dailyFinancialImpact = totalFinancialImpact / data.length;
  const designCapacityPerformance = (avgTreated / (STP_DESIGN_CAPACITY * 1.1)) * 100; // Assuming 110% of TSE capacity for treatment

  return {
    totalTreated,
    totalTSE,
    totalProcessed,
    totalTankers,
    avgTreated,
    avgTSE,
    avgProcessed,
    avgTankers,
    treatmentEfficiency,
    capacityUtilization,
    tankerIncome,
    tseSavings,
    totalFinancialImpact,
    dailyFinancialImpact,
    designCapacityPerformance
  };
};

// Get annual performance summary
export const getAnnualSummary = () => {
  const totalOperatingDays = monthlyPerformanceData.reduce((sum, month) => sum + month.operatingDays, 0);
  const totalProcessedWater = monthlyPerformanceData.reduce((sum, month) => sum + month.totalProcessedWater, 0);
  const totalTreatedWater = monthlyPerformanceData.reduce((sum, month) => sum + month.totalTreatedWater, 0);
  const totalTSEWater = monthlyPerformanceData.reduce((sum, month) => sum + month.totalTSEWater, 0);
  const totalTankers = monthlyPerformanceData.reduce((sum, month) => sum + month.totalTankers, 0);
  const totalFinancialBenefit = monthlyPerformanceData.reduce((sum, month) => sum + month.totalFinancialBenefit, 0);
  
  return {
    totalOperatingDays,
    totalProcessedWater,
    avgDailyProcessed: totalProcessedWater / totalOperatingDays,
    totalTreatedWater,
    avgDailyTreated: totalTreatedWater / totalOperatingDays,
    totalTSEWater,
    avgDailyTSE: totalTSEWater / totalOperatingDays,
    overallTreatmentEfficiency: (totalTSEWater / totalTreatedWater) * 100,
    totalTankers,
    avgDailyTankers: totalTankers / totalOperatingDays,
    totalFinancialBenefit,
    avgMonthlyFinancialBenefit: totalFinancialBenefit / monthlyPerformanceData.length,
    capacityUtilization: ((totalTSEWater / totalOperatingDays) / STP_DESIGN_CAPACITY) * 100
  };
};

// Export constants
export { TANKER_INCOME_PER_TRIP, TSE_SAVING_PER_M3, STP_DESIGN_CAPACITY };