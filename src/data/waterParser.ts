export interface WaterData {
  id: number;
  meterLabel: string;
  acctNo: string;
  zone: string;
  type: string;
  parentMeter: string;
  label: string;
  consumption: Record<string, number>;
  totalConsumption: number;
}

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