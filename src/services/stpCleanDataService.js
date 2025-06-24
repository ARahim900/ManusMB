// STP Plant Database Service - Based on User's Complete Database
// Design Capacity: 750 m³ TSE Water daily
// Financial: 4.5 OMR per tanker trip + 1.32 OMR savings per m³ TSE

const TANKER_INCOME_PER_TRIP = 4.5;
const TSE_SAVING_PER_M3 = 1.32;
const STP_DESIGN_CAPACITY = 750;

// Pre-calculated monthly performance data based on user's complete database
export const monthlyPerformanceData = [
  {
    month: 'July 2024',
    monthKey: '2024-07',
    operatingDays: 31,
    totalTreatedWater: 18308,
    avgDailyTreated: 591,
    totalTSEWater: 16067,
    avgDailyTSE: 518,
    totalProcessedWater: 16895,
    treatmentEfficiency: 87.7,
    totalTankers: 442,
    avgDailyTankers: 14.3,
    tankerIncome: 1989.00,
    tseWaterSavings: 21208.44,
    totalFinancialBenefit: 23197.44
  },
  {
    month: 'August 2024',
    monthKey: '2024-08',
    operatingDays: 31,
    totalTreatedWater: 17372,
    avgDailyTreated: 560,
    totalTSEWater: 15139,
    avgDailyTSE: 488,
    totalProcessedWater: 15641,
    treatmentEfficiency: 87.1,
    totalTankers: 378,
    avgDailyTankers: 12.2,
    tankerIncome: 1701.00,
    tseWaterSavings: 19983.48,
    totalFinancialBenefit: 21684.48
  },
  {
    month: 'September 2024',
    monthKey: '2024-09',
    operatingDays: 30,
    totalTreatedWater: 14859,
    avgDailyTreated: 495,
    totalTSEWater: 13196,
    avgDailyTSE: 440,
    totalProcessedWater: 13806,
    treatmentEfficiency: 88.8,
    totalTankers: 283,
    avgDailyTankers: 9.4,
    tankerIncome: 1273.50,
    tseWaterSavings: 17418.72,
    totalFinancialBenefit: 18692.22
  },
  {
    month: 'October 2024',
    monthKey: '2024-10',
    operatingDays: 31,
    totalTreatedWater: 17669,
    avgDailyTreated: 570,
    totalTSEWater: 15490,
    avgDailyTSE: 500,
    totalProcessedWater: 16397,
    treatmentEfficiency: 87.7,
    totalTankers: 289,
    avgDailyTankers: 9.3,
    tankerIncome: 1300.50,
    tseWaterSavings: 20446.80,
    totalFinancialBenefit: 21747.30
  },
  {
    month: 'November 2024',
    monthKey: '2024-11',
    operatingDays: 30,
    totalTreatedWater: 16488,
    avgDailyTreated: 550,
    totalTSEWater: 14006,
    avgDailyTSE: 467,
    totalProcessedWater: 14540,
    treatmentEfficiency: 84.9,
    totalTankers: 235,
    avgDailyTankers: 7.8,
    tankerIncome: 1057.50,
    tseWaterSavings: 18487.92,
    totalFinancialBenefit: 19545.42
  },
  {
    month: 'December 2024',
    monthKey: '2024-12',
    operatingDays: 31,
    totalTreatedWater: 17444,
    avgDailyTreated: 563,
    totalTSEWater: 14676,
    avgDailyTSE: 473,
    totalProcessedWater: 15213,
    treatmentEfficiency: 84.1,
    totalTankers: 196,
    avgDailyTankers: 6.3,
    tankerIncome: 882.00,
    tseWaterSavings: 19372.32,
    totalFinancialBenefit: 20254.32
  },
  {
    month: 'January 2025',
    monthKey: '2025-01',
    operatingDays: 31,
    totalTreatedWater: 18212,
    avgDailyTreated: 587,
    totalTSEWater: 15433,
    avgDailyTSE: 498,
    totalProcessedWater: 15723,
    treatmentEfficiency: 84.7,
    totalTankers: 207,
    avgDailyTankers: 6.7,
    tankerIncome: 931.50,
    tseWaterSavings: 20371.56,
    totalFinancialBenefit: 21303.06
  },
  {
    month: 'February 2025',
    monthKey: '2025-02',
    operatingDays: 28,
    totalTreatedWater: 14408,
    avgDailyTreated: 515,
    totalTSEWater: 12075,
    avgDailyTSE: 431,
    totalProcessedWater: 13080,
    treatmentEfficiency: 83.8,
    totalTankers: 121,
    avgDailyTankers: 4.3,
    tankerIncome: 544.50,
    tseWaterSavings: 15939.00,
    totalFinancialBenefit: 16483.50
  },
  {
    month: 'March 2025',
    monthKey: '2025-03',
    operatingDays: 31,
    totalTreatedWater: 18900,
    avgDailyTreated: 610,
    totalTSEWater: 16093,
    avgDailyTSE: 519,
    totalProcessedWater: 16603,
    treatmentEfficiency: 85.1,
    totalTankers: 131,
    avgDailyTankers: 4.2,
    tankerIncome: 589.50,
    tseWaterSavings: 21242.76,
    totalFinancialBenefit: 21832.26
  },
  {
    month: 'April 2025',
    monthKey: '2025-04',
    operatingDays: 30,
    totalTreatedWater: 20703,
    avgDailyTreated: 690,
    totalTSEWater: 17905,
    avgDailyTSE: 597,
    totalProcessedWater: 18481,
    treatmentEfficiency: 86.5,
    totalTankers: 194,
    avgDailyTankers: 6.5,
    tankerIncome: 873.00,
    tseWaterSavings: 23634.60,
    totalFinancialBenefit: 24507.60
  },
  {
    month: 'May 2025',
    monthKey: '2025-05',
    operatingDays: 31,
    totalTreatedWater: 22071,
    avgDailyTreated: 712,
    totalTSEWater: 18985,
    avgDailyTSE: 612,
    totalProcessedWater: 19472,
    treatmentEfficiency: 86.0,
    totalTankers: 262,
    avgDailyTankers: 8.5,
    tankerIncome: 1179.00,
    tseWaterSavings: 25060.20,
    totalFinancialBenefit: 26239.20
  },
  {
    month: 'June 2025',
    monthKey: '2025-06',
    operatingDays: 11,
    totalTreatedWater: 6882,
    avgDailyTreated: 626,
    totalTSEWater: 6133,
    avgDailyTSE: 558,
    totalProcessedWater: 6531,
    treatmentEfficiency: 89.1,
    totalTankers: 115,
    avgDailyTankers: 10.5,
    tankerIncome: 517.50,
    tseWaterSavings: 8095.56,
    totalFinancialBenefit: 8613.06
  }
];

// Financial analysis summary
export const financialAnalysisSummary = {
  totalFinancialBenefit: {
    total: monthlyPerformanceData.reduce((sum, month) => sum + month.totalFinancialBenefit, 0),
    monthlyAverage: monthlyPerformanceData.reduce((sum, month) => sum + month.totalFinancialBenefit, 0) / monthlyPerformanceData.length
  },
  tseWaterSavings: {
    total: monthlyPerformanceData.reduce((sum, month) => sum + month.tseWaterSavings, 0),
    percentage: ((monthlyPerformanceData.reduce((sum, month) => sum + month.tseWaterSavings, 0) / monthlyPerformanceData.reduce((sum, month) => sum + month.totalFinancialBenefit, 0)) * 100).toFixed(1)
  },
  tankerDischargeRevenue: {
    total: monthlyPerformanceData.reduce((sum, month) => sum + month.tankerIncome, 0),
    percentage: ((monthlyPerformanceData.reduce((sum, month) => sum + month.tankerIncome, 0) / monthlyPerformanceData.reduce((sum, month) => sum + month.totalFinancialBenefit, 0)) * 100).toFixed(1)
  }
};

// Export constants
export { TANKER_INCOME_PER_TRIP, TSE_SAVING_PER_M3, STP_DESIGN_CAPACITY };

// Export functions
export const getDataByMonth = (monthKey) => monthlyPerformanceData.find(m => m.monthKey === monthKey);
export const getMonthlyData = () => monthlyPerformanceData;
export const getPerformanceMetrics = (data) => {
  if (!data || data.length === 0) return {};
  
  const totalTreated = data.reduce((sum, d) => sum + d.treated, 0);
  const totalTSE = data.reduce((sum, d) => sum + d.tse, 0);
  const totalTankers = data.reduce((sum, d) => sum + d.tankers, 0);
  
  return {
    totalTreated,
    totalTSE,
    totalTankers,
    avgDailyTreated: totalTreated / data.length,
    avgDailyTSE: totalTSE / data.length,
    treatmentEfficiency: totalTreated > 0 ? (totalTSE / totalTreated) * 100 : 0,
    capacityUtilization: ((totalTSE / data.length) / STP_DESIGN_CAPACITY) * 100
  };
};

export const getAnnualSummary = () => {
  const totalOperatingDays = monthlyPerformanceData.reduce((sum, m) => sum + m.operatingDays, 0);
  const totalTreatedWater = monthlyPerformanceData.reduce((sum, m) => sum + m.totalTreatedWater, 0);
  const totalTSEWater = monthlyPerformanceData.reduce((sum, m) => sum + m.totalTSEWater, 0);
  const totalProcessedWater = monthlyPerformanceData.reduce((sum, m) => sum + m.totalProcessedWater, 0);
  const totalTankers = monthlyPerformanceData.reduce((sum, m) => sum + m.totalTankers, 0);
  const totalFinancialBenefit = monthlyPerformanceData.reduce((sum, m) => sum + m.totalFinancialBenefit, 0);

  return {
    totalOperatingDays,
    totalTreatedWater,
    totalTSEWater,
    totalProcessedWater,
    totalTankers,
    totalFinancialBenefit,
    overallTreatmentEfficiency: totalTreatedWater > 0 ? (totalTSEWater / totalTreatedWater) * 100 : 0,
    avgDailyTSE: totalTSEWater / totalOperatingDays,
    avgDailyTankers: totalTankers / totalOperatingDays,
    avgMonthlyFinancialBenefit: totalFinancialBenefit / monthlyPerformanceData.length,
    capacityUtilization: ((totalTSEWater / totalOperatingDays) / STP_DESIGN_CAPACITY) * 100
  };
}; 