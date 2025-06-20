// ===============================
// TYPE DEFINITIONS
// ===============================

// Common types
export interface BaseData {
  id: number;
  date?: string;
  month?: string;
}

// Electricity System Types
export interface ElectricityConsumption {
  [key: string]: number;
}

export interface ElectricityData extends BaseData {
  slNo: number;
  zone: string;
  type: string;
  muscatBayNumber: string;
  unitName: string;
  category: string;
  meterAccountNo: string;
  consumption: ElectricityConsumption;
  totalConsumption: number;
}

// Water System Types
export interface WaterData extends BaseData {
  meterLabel: string;
  acctNo: string;
  zone: string;
  type: string;
  parentMeter: string;
  label: string;
  consumption: { [key: string]: number };
  totalConsumption: number;
}

// STP Plant Types
export interface STPData extends BaseData {
  parsedDate: Date | null;
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

// Contractor Types
export interface ContractorData {
  contractor: string;
  serviceProvided: string;
  status: 'Active' | 'Expired';
  contractType: string;
  startDate: string;
  endDate: string;
  monthlyContract?: string;
  yearlyContract?: string;
  note?: string;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value?: number;
  [key: string]: any;
}

// Summary Card Props
export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: any;
  unit?: string;
  trend?: string;
  trendColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
}

// Navigation Types
export interface MainSection {
  name: string;
  icon: string;
  sectionId: string;
}

export interface SubSection {
  name: string;
  id: string;
  icon: any;
}

// Component Props Types
export interface SidebarProps {
  activeMainSection: string;
  setActiveMainSection: (section: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
}

export interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isCollapsed: boolean;
}

export interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
}

export interface StyledSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  id: string;
  icon?: any;
  disabled?: boolean;
}