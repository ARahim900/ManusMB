// STP (Sewage Treatment Plant) data types
export interface STPDataItem {
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

export interface STPKPIData {
  avgTreatedWater: number;
  avgTseOutput: number;
  avgEfficiency: number;
  totalTankersDischarge: number;
  avgTankerPercentage: number;
  capacityUtilization: number;
  totalDays: number;
  totalTreatedWater: number;
  totalTseOutput: number;
  totalInputProcess: number;
  avgTotalInput: number;
}

export interface STPTrendData {
  date: string;
  treated: number;
  tse: number;
  inlet: number;
  efficiency: number;
  tankers: number;
}

export interface STPMonthlyData {
  month: string;
  treatedWater: number;
  tseOutput: number;
  totalInlet: number;
  tankersDischarge: number;
  directSewage: number;
  days: number;
  avgDaily: number;
  efficiency: number;
  irrigationEff: number;
  capacityUtilization: number;
}

export interface ProcessEfficiencyData {
  name: string;
  value: number;
  color: string;
}

// STP module state
export interface STPModuleState {
  activeSubSection: string;
  selectedMonth: string;
  selectedMetric: string;
  isAiModalOpen: boolean;
  aiAnalysisResult: string;
  isAiLoading: boolean;
  isLoading: boolean;
}

export interface STPPerformanceIndicator {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'needs-improvement';
}