// STP Real Database Service
// Contains actual operational data from July 2024 to June 2025

const TANKER_INCOME_PER_TRIP = 4.5; // OMR per tanker trip
const TSE_SAVING_PER_M3 = 1.32; // OMR savings per m³ of TSE irrigation

// Real STP operational data
export const stpRealData = [
  { date: '2024-07-01', treated: 385, tse: 340, inlet: 339, tankers: 10, expectedVolume: 200, directSewage: 139, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-02', treated: 519, tse: 458, inlet: 526, tankers: 14, expectedVolume: 280, directSewage: 246, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-03', treated: 479, tse: 425, inlet: 468, tankers: 13, expectedVolume: 260, directSewage: 208, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-04', treated: 547, tse: 489, inlet: 464, tankers: 11, expectedVolume: 220, directSewage: 244, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-05', treated: 653, tse: 574, inlet: 565, tankers: 15, expectedVolume: 300, directSewage: 265, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-06', treated: 552, tse: 492, inlet: 502, tankers: 14, expectedVolume: 280, directSewage: 222, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-07', treated: 575, tse: 498, inlet: 549, tankers: 13, expectedVolume: 260, directSewage: 289, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-08', treated: 587, tse: 515, inlet: 532, tankers: 16, expectedVolume: 320, directSewage: 212, maintenance1: "Need to empty the tank and the problem can be identified. need to open roof top structural work also even for cleaning activity considered as confined space.", maintenance2: "", maintenance3: "" },
  { date: '2024-07-09', treated: 586, tse: 519, inlet: 532, tankers: 13, expectedVolume: 260, directSewage: 272, maintenance1: "Need to empty out the tank and rooftop has to be removed for the maintainance activity.", maintenance2: "The maintenance activity over removing the debris got stuck inside Raw sewage pump was done", maintenance3: "" },
  { date: '2024-07-10', treated: 542, tse: 462, inlet: 493, tankers: 12, expectedVolume: 240, directSewage: 253, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-12', treated: 533, tse: 468, inlet: 506, tankers: 12, expectedVolume: 240, directSewage: 266, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-13', treated: 464, tse: 402, inlet: 479, tankers: 10, expectedVolume: 200, directSewage: 279, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-14', treated: 506, tse: 448, inlet: 486, tankers: 13, expectedVolume: 260, directSewage: 226, maintenance1: "today clean and cheaked aeration blower air filter - oil level and blower belt today clean and cheaked mbr blower air filter - oil level and blower belt", maintenance2: "poured lime powder poured chlorine for cleaning mbr", maintenance3: "house keeping stp aera" },
  { date: '2024-07-15', treated: 482, tse: 418, inlet: 391, tankers: 6, expectedVolume: 120, directSewage: 271, maintenance1: "today clean and cheaked intermediate pump we found all three pump ok", maintenance2: "house keeping stp aera", maintenance3: "" },
  { date: '2024-07-16', treated: 670, tse: 600, inlet: 576, tankers: 18, expectedVolume: 360, directSewage: 216, maintenance1: "used chemical lime and nacl", maintenance2: "house keeping stp aera", maintenance3: "" },
  { date: '2024-07-17', treated: 344, tse: 300, inlet: 506, tankers: 12, expectedVolume: 240, directSewage: 266, maintenance1: "clean aeration tank with water poured chemical house keeping stp aera", maintenance2: "", maintenance3: "" },
  { date: '2024-07-18', treated: 585, tse: 517, inlet: 369, tankers: 8, expectedVolume: 160, directSewage: 209, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-19', treated: 687, tse: 605, inlet: 614, tankers: 15, expectedVolume: 300, directSewage: 314, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2024-07-20', treated: 536, tse: 465, inlet: 483, tankers: 12, expectedVolume: 240, directSewage: 243, maintenance1: "today all three mbr blower clean and cheaked house keeping in stp aera", maintenance2: "", maintenance3: "" },
  { date: '2025-06-01', treated: 701, tse: 610, inlet: 576, tankers: 10, expectedVolume: 200, directSewage: 376, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-02', treated: 650, tse: 524, inlet: 544, tankers: 11, expectedVolume: 220, directSewage: 324, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-03', treated: 646, tse: 560, inlet: 598, tankers: 11, expectedVolume: 220, directSewage: 378, maintenance1: "Today fine screen checked and clean", maintenance2: "", maintenance3: "" },
  { date: '2025-06-04', treated: 626, tse: 564, inlet: 603, tankers: 11, expectedVolume: 220, directSewage: 383, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-05', treated: 662, tse: 591, inlet: 595, tankers: 12, expectedVolume: 240, directSewage: 355, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-06', treated: 626, tse: 603, inlet: 648, tankers: 10, expectedVolume: 200, directSewage: 448, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-07', treated: 639, tse: 573, inlet: 593, tankers: 9, expectedVolume: 180, directSewage: 413, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-08', treated: 658, tse: 585, inlet: 583, tankers: 11, expectedVolume: 220, directSewage: 363, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-09', treated: 628, tse: 564, inlet: 596, tankers: 11, expectedVolume: 220, directSewage: 376, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-10', treated: 569, tse: 508, inlet: 548, tankers: 10, expectedVolume: 200, directSewage: 348, maintenance1: "", maintenance2: "", maintenance3: "" },
  { date: '2025-06-11', treated: 617, tse: 549, inlet: 592, tankers: 11, expectedVolume: 220, directSewage: 372, maintenance1: "", maintenance2: "", maintenance3: "" }
];

// Calculate financial metrics
export const calculateFinancialMetrics = (data) => {
  const totalTankers = data.reduce((sum, item) => sum + item.tankers, 0);
  const totalTSE = data.reduce((sum, item) => sum + item.tse, 0);
  const tankerIncome = totalTankers * TANKER_INCOME_PER_TRIP;
  const tseSavings = totalTSE * TSE_SAVING_PER_M3;
  
  return {
    totalTankers,
    totalTSE,
    tankerIncome,
    tseSavings,
    totalFinancialImpact: tankerIncome + tseSavings
  };
};

// Get data for specific month
export const getDataByMonth = (month) => {
  return stpRealData.filter(item => item.date.startsWith(month));
};

// Get monthly aggregated data
export const getMonthlyAggregatedData = () => {
  const months = {};
  
  stpRealData.forEach(item => {
    const month = item.date.substring(0, 7);
    if (!months[month]) {
      months[month] = {
        month,
        treated: 0,
        tse: 0,
        inlet: 0,
        tankers: 0,
        days: 0
      };
    }
    
    months[month].treated += item.treated;
    months[month].tse += item.tse;
    months[month].inlet += item.inlet;
    months[month].tankers += item.tankers;
    months[month].days += 1;
  });

  return Object.values(months).map(month => ({
    ...month,
    avgTreated: month.treated / month.days,
    avgTSE: month.tse / month.days,
    efficiency: (month.tse / month.treated * 100),
    tankerIncome: month.tankers * TANKER_INCOME_PER_TRIP,
    tseSavings: month.tse * TSE_SAVING_PER_M3,
    totalFinancialImpact: (month.tankers * TANKER_INCOME_PER_TRIP) + (month.tse * TSE_SAVING_PER_M3)
  }));
};

// Get recent maintenance activities
export const getRecentMaintenance = (limit = 10) => {
  return stpRealData
    .filter(item => item.maintenance1 || item.maintenance2 || item.maintenance3)
    .slice(-limit)
    .map(item => ({
      date: item.date,
      actions: [item.maintenance1, item.maintenance2, item.maintenance3].filter(Boolean)
    }))
    .reverse();
};

// Get performance metrics for a specific period
export const getPerformanceMetrics = (data) => {
  if (data.length === 0) {
    return {
      totalTreated: 0,
      totalTSE: 0,
      totalInlet: 0,
      totalTankers: 0,
      avgTreated: 0,
      avgTSE: 0,
      avgInlet: 0,
      avgTankers: 0,
      treatmentEfficiency: 0,
      tankerIncome: 0,
      tseSavings: 0,
      totalFinancialImpact: 0
    };
  }

  const totalTreated = data.reduce((sum, item) => sum + item.treated, 0);
  const totalTSE = data.reduce((sum, item) => sum + item.tse, 0);
  const totalInlet = data.reduce((sum, item) => sum + item.inlet, 0);
  const totalTankers = data.reduce((sum, item) => sum + item.tankers, 0);

  return {
    totalTreated,
    totalTSE,
    totalInlet,
    totalTankers,
    avgTreated: totalTreated / data.length,
    avgTSE: totalTSE / data.length,
    avgInlet: totalInlet / data.length,
    avgTankers: totalTankers / data.length,
    treatmentEfficiency: totalTreated > 0 ? (totalTSE / totalTreated * 100) : 0,
    tankerIncome: totalTankers * TANKER_INCOME_PER_TRIP,
    tseSavings: totalTSE * TSE_SAVING_PER_M3,
    totalFinancialImpact: (totalTankers * TANKER_INCOME_PER_TRIP) + (totalTSE * TSE_SAVING_PER_M3)
  };
};

export { TANKER_INCOME_PER_TRIP, TSE_SAVING_PER_M3 }; 