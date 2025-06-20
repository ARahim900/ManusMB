// Water system data types
export interface WaterDataItem {
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

export interface WaterSystemLevels {
  A1_totalSupply: number;
  A2_total: number;
  A3_total: number;
  L2_total: number;
  L3_total: number;
  DC_total: number;
  stage1Loss: number;
  stage2Loss: number;
  totalLoss: number;
  stage1LossPercent: number;
  stage2LossPercent: number;
  totalLossPercent: number;
  systemEfficiency: number;
  zoneBulkMeters: WaterDataItem[];
  directConnections: WaterDataItem[];
  endUserMeters: WaterDataItem[];
}

export interface WaterTrendData {
  name: string;
  A1: number;
  A2: number;
  A3: number;
}

export interface ZoneConsumptionData {
  zone: string;
  consumption: number;
  type: string;
}

export interface TopWaterConsumer {
  name: string;
  consumption: number;
  type: string;
  zone: string;
  label: string;
}

// Water module state
export interface WaterModuleState {
  isLoading: boolean;
  selectedWaterMonth: string;
  activeWaterSubSection: string;
  selectedZone: string;
}

export type WaterMeterLabel = 'L1' | 'L2' | 'L3' | 'DC';

export interface WaterQualityParameter {
  parameter: string;
  value: number;
  unit: string;
  status: 'good' | 'normal' | 'warning';
  range: string;
}