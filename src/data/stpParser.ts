export interface STPData {
  id: number;
  date: string;
  parsedDate: Date | null;
  month: string;
  treatedWater: number;
  tseOutput: number;
  totalInlet: number;
  tankersDischarge: number;
  expectedTankerVolume: number;
  directSewage: number;
  treatmentEfficiency: number;
  irrigationEfficiency: number;
  tankerPercentage: number;
}

export const parseSTPData = (rawData: string): STPData[] => {
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
    const expectedTankerVolume = parseFloat(values[5]) || 0;

    return {
      id: index + 1,
      date: dateStr,
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater,
      tseOutput,
      totalInlet,
      tankersDischarge: parseInt(values[4]) || 0,
      expectedTankerVolume,
      directSewage: parseFloat(values[6]) || 0,
      // Calculated fields
      treatmentEfficiency: totalInlet > 0 ? (treatedWater / totalInlet) * 100 : 0,
      irrigationEfficiency: treatedWater > 0 ? (tseOutput / treatedWater) * 100 : 0,
      tankerPercentage: totalInlet > 0 ? (expectedTankerVolume / totalInlet) * 100 : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
};

export const PLANT_DESIGN_CAPACITY = 750; // m³/day