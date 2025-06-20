// Common types used across the application

export interface ElectricityData {
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

export interface ContractorData {
  contractor: string;
  serviceProvided: string;
  status: 'Active' | 'Expired';
  contractType: string;
  startDate: string;
  endDate: string;
  monthlyContract?: number;
  yearlyContract?: number;
  totalContract?: number;
  note?: string;
}

export interface MainSection {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  sectionId: string;
}