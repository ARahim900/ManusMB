import { ElectricityData, WaterData, STPData, ContractorData } from '@/types';

// ===============================
// ELECTRICITY DATA PARSER
// ===============================

export const extractElectricityCategory = (unitName: string): string => {
  if (!unitName) return 'Other';
  const lowerUnitName = unitName.toLowerCase();
  if (lowerUnitName.includes('pumping station')) return 'Pumping Station';
  if (lowerUnitName.includes('lifting station')) return 'Lifting Station';
  if (lowerUnitName.includes('street light')) return 'Street Light';
  if (lowerUnitName.includes('irrigation tank')) return 'Irrigation Tank';
  if (lowerUnitName.includes('actuator db')) return 'Actuator DB';
  if (lowerUnitName.includes('apartment')) return 'Apartment';
  if (lowerUnitName.includes('guard house') || lowerUnitName.includes('security building') || lowerUnitName.includes('rop building')) return 'Ancillary Building';
  if (lowerUnitName.includes('central park')) return 'Central Park';
  if (lowerUnitName.includes('village square')) return 'Village Square';
  if (lowerUnitName.includes('bank muscat')) return 'Commercial (Bank)';
  if (lowerUnitName.includes('cif kitchen')) return 'Commercial (Kitchen)';
  if (lowerUnitName.includes('landscape light')) return 'Landscape Light';
  if (lowerUnitName.includes('beachwell')) return 'Beachwell';
  if (lowerUnitName.includes('helipad')) return 'Helipad';
  return 'Other';
};

export const parseElectricityData = (rawData: string): ElectricityData[] => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthsHeader = headerLine.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const unitName = values[4]?.trim() || 'N/A';
    const entry: ElectricityData = {
      id: parseInt(values[0], 10) || index + 1,
      slNo: parseInt(values[0], 10) || index + 1,
      zone: values[1]?.trim() || 'N/A',
      type: values[2]?.trim() || 'N/A',
      muscatBayNumber: values[3]?.trim() || 'N/A',
      unitName: unitName,
      category: extractElectricityCategory(unitName),
      meterAccountNo: values[5]?.trim() || 'N/A',
      consumption: {},
      totalConsumption: 0, 
    };
    let currentOverallTotal = 0;
    monthsHeader.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]);
      entry.consumption[month] = isNaN(consumptionValue) ? 0 : consumptionValue;
      if (!isNaN(consumptionValue)) {
        currentOverallTotal += consumptionValue;
      }
    });
    entry.totalConsumption = parseFloat(currentOverallTotal.toFixed(2));
    return entry;
  });
};

// ===============================
// WATER DATA PARSER
// ===============================

export const parseWaterSystemData = (rawData: string): WaterData[] => {
  const lines = rawData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthColumns = headers.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const entry: WaterData = {
      id: index + 1,
      meterLabel: values[0] || 'N/A',
      acctNo: values[1] || 'N/A',
      zone: values[2] || 'N/A',
      type: values[3] || 'N/A',
      parentMeter: values[4] || 'N/A',
      label: values[5] || 'N/A',
      consumption: {},
      totalConsumption: 0,
    };

    let totalConsumption = 0;
    monthColumns.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]) || 0;
      entry.consumption[month] = consumptionValue;
      totalConsumption += consumptionValue;
    });
    
    entry.totalConsumption = parseFloat(totalConsumption.toFixed(2));
    return entry;
  });
};

// ===============================
// STP DATA PARSER
// ===============================

export const parseStpData = (rawData: string): STPData[] => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const dateStr = values[0]?.trim();
    
    // Parse date
    let parsedDate = null;
    if (dateStr) {
      const [day, month, year] = dateStr.split('/');
      parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const treatedWater = parseFloat(values[1]) || 0;
    const tseOutput = parseFloat(values[2]) || 0;
    const totalInlet = parseFloat(values[3]) || 0;

    return {
      id: index + 1,
      date: dateStr || '',
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater,
      tseOutput,
      totalInlet,
      tankersDischarge: parseInt(values[4]) || 0,
      expectedTankerVolume: parseFloat(values[5]) || 0,
      directSewage: parseFloat(values[6]) || 0,
      // Calculated fields
      treatmentEfficiency: values[1] && values[3] ? ((treatedWater / totalInlet) * 100) : 0,
      irrigationEfficiency: values[2] && values[1] ? ((tseOutput / treatedWater) * 100) : 0,
      tankerPercentage: values[5] && values[3] ? ((parseFloat(values[5]) / totalInlet) * 100) : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
};

// ===============================
// CONTRACTOR DATA PARSER
// ===============================

export const parseContractorData = (rawData: string): ContractorData[] => {
  const lines = rawData.split('\n');
  const dataLines = lines.slice(1); // Skip header

  return dataLines.map((line) => {
    const values = line.split('\t').map(v => v.trim());
    
    return {
      contractor: values[0] || 'N/A',
      serviceProvided: values[1] || 'N/A',
      status: (values[2] || 'N/A') as 'Active' | 'Expired',
      contractType: values[3] || 'N/A',
      startDate: values[4] || 'N/A',
      endDate: values[5] || 'N/A',
      monthlyContract: values[6] ? parseFloat(values[6].replace(/[^0-9.-]+/g, '')) : undefined,
      yearlyContract: values[7] ? parseFloat(values[7].replace(/[^0-9.-]+/g, '')) : undefined,
      note: values[8] || undefined,
    };
  }).filter(item => item.contractor && item.contractor !== 'N/A');
};