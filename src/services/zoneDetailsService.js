// Zone Details Analysis Service
// Based on the Grafana dashboard structure for comprehensive zone analysis

// Sample data structure based on the SQL queries from the Grafana dashboard
export const zoneDetailsData = {
  // Zone-wise consumption data (similar to CM_MCT_MNTH_READINGS_CSTMR table)
  zones: {
    'ZONE_FM': {
      name: 'ZONE FM (BULK ZONE FM)',
      bulkMeter: 'C43659',
      consumption: {
        'Jan-25': 2008,
        'Feb-25': 1740,
        'Mar-25': 1880,
        'Apr-25': 1880,
        'May-25': 3448
      }
    },
    'ZONE_3A': {
      name: 'ZONE 3A (BULK ZONE 3A)',
      bulkMeter: '4300343',
      consumption: {
        'Jan-25': 4235,
        'Feb-25': 4273,
        'Mar-25': 3591,
        'Apr-25': 4041,
        'May-25': 8893
      }
    },
    'ZONE_3B': {
      name: 'ZONE 3B (BULK ZONE 3B)',
      bulkMeter: '4300344',
      consumption: {
        'Jan-25': 3256,
        'Feb-25': 2962,
        'Mar-25': 3331,
        'Apr-25': 2157,
        'May-25': 5177
      }
    },
    'ZONE_5': {
      name: 'ZONE 5 (Bulk Zone 5)',
      bulkMeter: '4300345',
      consumption: {
        'Jan-25': 4267,
        'Feb-25': 4231,
        'Mar-25': 3862,
        'Apr-25': 3737,
        'May-25': 7511
      }
    },
    'ZONE_8': {
      name: 'ZONE 8 (Bulk Zone 8)',
      bulkMeter: '4300342',
      consumption: {
        'Jan-25': 1547,
        'Feb-25': 1498,
        'Mar-25': 2605,
        'Apr-25': 3203,
        'May-25': 6075
      }
    },
    'VILLAGE_SQUARE': {
      name: 'Village Square (Zone Bulk)',
      bulkMeter: '4300335',
      consumption: {
        'Jan-25': 14,
        'Feb-25': 12,
        'Mar-25': 21,
        'Apr-25': 13,
        'May-25': 28
      }
    },
    'SALES_CENTER': {
      name: 'Sales Center Common Building',
      bulkMeter: '4300295',
      consumption: {
        'Jan-25': 76,
        'Feb-25': 68,
        'Mar-25': 37,
        'Apr-25': 67,
        'May-25': 63
      }
    }
  },

  // Individual customers under each zone
  customers: {
    'ZONE_FM': [
      { account: 'FM001', name: 'Villa FM-01', consumption: { 'May-25': 45 }, type: 'Residential' },
      { account: 'FM002', name: 'Villa FM-02', consumption: { 'May-25': 67 }, type: 'Residential' },
      { account: 'FM003', name: 'Villa FM-03', consumption: { 'May-25': 23 }, type: 'Residential' },
      { account: 'FM004', name: 'Apartment FM-04A', consumption: { 'May-25': 89 }, type: 'Apartment' },
      { account: 'FM005', name: 'Apartment FM-04B', consumption: { 'May-25': 34 }, type: 'Apartment' },
      { account: 'FM006', name: 'Villa FM-05', consumption: { 'May-25': 156 }, type: 'Residential' },
      { account: 'FM007', name: 'Commercial FM-01', consumption: { 'May-25': 234 }, type: 'Commercial' },
      { account: 'FM008', name: 'Villa FM-06', consumption: { 'May-25': 78 }, type: 'Residential' },
      { account: 'FM009', name: 'Apartment FM-07A', consumption: { 'May-25': 45 }, type: 'Apartment' },
      { account: 'FM010', name: 'Apartment FM-07B', consumption: { 'May-25': 56 }, type: 'Apartment' }
    ],
    'ZONE_3A': [
      { account: 'Z3A001', name: 'Villa 3A-01', consumption: { 'May-25': 87 }, type: 'Residential' },
      { account: 'Z3A002', name: 'Villa 3A-02', consumption: { 'May-25': 123 }, type: 'Residential' },
      { account: 'Z3A003', name: 'Apartment 3A-01A', consumption: { 'May-25': 45 }, type: 'Apartment' },
      { account: 'Z3A004', name: 'Apartment 3A-01B', consumption: { 'May-25': 67 }, type: 'Apartment' },
      { account: 'Z3A005', name: 'Villa 3A-03', consumption: { 'May-25': 198 }, type: 'Residential' },
      { account: 'Z3A006', name: 'Commercial 3A-01', consumption: { 'May-25': 345 }, type: 'Commercial' },
      { account: 'Z3A007', name: 'Villa 3A-04', consumption: { 'May-25': 76 }, type: 'Residential' },
      { account: 'Z3A008', name: 'Apartment 3A-02A', consumption: { 'May-25': 89 }, type: 'Apartment' },
      { account: 'Z3A009', name: 'Apartment 3A-02B', consumption: { 'May-25': 134 }, type: 'Apartment' },
      { account: 'Z3A010', name: 'Villa 3A-05', consumption: { 'May-25': 156 }, type: 'Residential' }
    ],
    'ZONE_3B': [
      { account: 'Z3B001', name: 'Villa 3B-01', consumption: { 'May-25': 76 }, type: 'Residential' },
      { account: 'Z3B002', name: 'Villa 3B-02', consumption: { 'May-25': 89 }, type: 'Residential' },
      { account: 'Z3B003', name: 'Apartment 3B-01A', consumption: { 'May-25': 34 }, type: 'Apartment' },
      { account: 'Z3B004', name: 'Apartment 3B-01B', consumption: { 'May-25': 45 }, type: 'Apartment' },
      { account: 'Z3B005', name: 'Villa 3B-03', consumption: { 'May-25': 167 }, type: 'Residential' },
      { account: 'Z3B006', name: 'Commercial 3B-01', consumption: { 'May-25': 289 }, type: 'Commercial' },
      { account: 'Z3B007', name: 'Villa 3B-04', consumption: { 'May-25': 98 }, type: 'Residential' },
      { account: 'Z3B008', name: 'Apartment 3B-02A', consumption: { 'May-25': 67 }, type: 'Apartment' },
      { account: 'Z3B009', name: 'Apartment 3B-02B', consumption: { 'May-25': 123 }, type: 'Apartment' },
      { account: 'Z3B010', name: 'Villa 3B-05', consumption: { 'May-25': 145 }, type: 'Residential' }
    ]
  }
};

// Get zone-wise consumption data for bar chart
export const getZoneWiseConsumption = (month = 'May-25') => {
  return Object.entries(zoneDetailsData.zones).map(([key, zone]) => ({
    zone: zone.name,
    consumption: zone.consumption[month] || 0,
    zoneKey: key
  })).sort((a, b) => b.consumption - a.consumption);
};

// Calculate zone loss analysis
export const getZoneLossAnalysis = (month = 'May-25') => {
  const totalBulkSupply = Object.values(zoneDetailsData.zones)
    .reduce((sum, zone) => sum + (zone.consumption[month] || 0), 0);

  const totalIndividualConsumption = Object.values(zoneDetailsData.customers)
    .flat()
    .reduce((sum, customer) => sum + (customer.consumption[month] || 0), 0);

  const systemLoss = totalBulkSupply - totalIndividualConsumption;
  const systemLossPercent = totalBulkSupply > 0 ? (systemLoss / totalBulkSupply) * 100 : 0;

  return Object.entries(zoneDetailsData.zones).map(([key, zone]) => {
    const zoneConsumption = zone.consumption[month] || 0;
    const zoneCustomers = zoneDetailsData.customers[key] || [];
    const zoneIndividualTotal = zoneCustomers.reduce((sum, customer) => sum + (customer.consumption[month] || 0), 0);
    const zoneLoss = zoneConsumption - zoneIndividualTotal;
    const zoneLossPercent = zoneConsumption > 0 ? (zoneLoss / zoneConsumption) * 100 : 0;

    return {
      zone: zone.name,
      zoneKey: key,
      bulkConsumption: zoneConsumption,
      individualTotal: zoneIndividualTotal,
      loss: zoneLoss,
      lossPercent: zoneLossPercent,
      systemLossContribution: totalBulkSupply > 0 ? (zoneLoss / totalBulkSupply) * 100 : 0
    };
  });
};

// Get zone statistics for gauges
export const getZoneStats = (zoneKey, month = 'May-25') => {
  const zone = zoneDetailsData.zones[zoneKey];
  if (!zone) return null;

  const bulkConsumption = zone.consumption[month] || 0;
  const customers = zoneDetailsData.customers[zoneKey] || [];
  const individualTotal = customers.reduce((sum, customer) => sum + (customer.consumption[month] || 0), 0);
  const zoneLoss = bulkConsumption - individualTotal;
  const lossPercent = bulkConsumption > 0 ? (zoneLoss / bulkConsumption) * 100 : 0;

  // Calculate yearly stats (simplified - would normally aggregate multiple months)
  const yearlyBulk = Object.values(zone.consumption).reduce((sum, val) => sum + val, 0);
  const yearlyIndividual = customers.reduce((sum, customer) => {
    return sum + Object.values(customer.consumption).reduce((customerSum, val) => customerSum + val, 0);
  }, 0);
  const yearlyLoss = yearlyBulk - yearlyIndividual;
  const yearlyLossPercent = yearlyBulk > 0 ? (yearlyLoss / yearlyBulk) * 100 : 0;

  return {
    zone: zone.name,
    bulkMeter: zone.bulkMeter,
    monthly: {
      bulkSupply: bulkConsumption,
      individualTotal: individualTotal,
      loss: zoneLoss,
      lossPercent: lossPercent
    },
    yearly: {
      bulkSupply: yearlyBulk,
      individualTotal: yearlyIndividual,
      loss: yearlyLoss,
      lossPercent: yearlyLossPercent
    },
    customers: customers
  };
};

// Get customer details for a specific zone
export const getZoneCustomerDetails = (zoneKey, month = 'May-25') => {
  const zone = zoneDetailsData.zones[zoneKey];
  const customers = zoneDetailsData.customers[zoneKey] || [];
  
  if (!zone) return null;

  return {
    zone: zone.name,
    bulkMeter: zone.bulkMeter,
    month: month,
    customers: customers.map(customer => ({
      ...customer,
      currentConsumption: customer.consumption[month] || 0
    })).sort((a, b) => b.currentConsumption - a.currentConsumption)
  };
};

// Get available zones for dropdown
export const getAvailableZoneDetails = () => {
  return Object.entries(zoneDetailsData.zones).map(([key, zone]) => ({
    key: key,
    name: zone.name,
    bulkMeter: zone.bulkMeter
  }));
};

// Get available months
export const getAvailableMonths = () => {
  return ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25'];
};
