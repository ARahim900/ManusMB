// Electricity data types
export interface ElectricityDataItem {
  id: number;
  slNo: number;
  zone: string;
  type: string;
  muscatBayNumber: string;
  unitName: string;
  category: string;
  meterAccountNo: string;
  consumption: Record<string, number>;
  totalConsumption: number;
}

export interface ElectricityKPIData {
  totalConsumptionKWh: number;
  totalCostOMR: number;
  averageConsumptionPerUnit: number;
  activeMeters: number;
}

export interface ConsumptionTrendData {
  name: string;
  total: number;
}

export interface TopConsumerData {
  name: string;
  consumption: number;
  monthlyDataFull: Record<string, number>;
}

export interface ConsumptionByTypeData {
  name: string;
  value: number;
}

// Electricity module state
export interface ElectricityModuleState {
  activeSubSection: string;
  selectedMonth: string;
  selectedCategory: string;
  selectedUnitId: string;
  isAiModalOpen: boolean;
  aiAnalysisResult: string;
  isAiLoading: boolean;
  currentPage: number;
}

// AI Analysis interface
export interface AIAnalysisData {
  selectedMonth: string;
  totalConsumption: number;
  insights: string[];
  recommendations: string[];
}

export type ElectricityCategory = 
  | 'Pumping Station'
  | 'Lifting Station'
  | 'Street Light'
  | 'Irrigation Tank'
  | 'Actuator DB'
  | 'Apartment'
  | 'Ancillary Building'
  | 'Central Park'
  | 'Village Square'
  | 'Commercial (Bank)'
  | 'Commercial (Kitchen)'
  | 'Landscape Light'
  | 'Beachwell'
  | 'Helipad'
  | 'Other';