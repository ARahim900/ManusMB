// Contractor and project management types
export interface ContractorData {
  contractor: string;
  serviceProvided: string;
  status: 'Active' | 'Expired' | 'Pending';
  contractType: 'Contract' | 'PO';
  startDate: string;
  endDate: string;
  monthlyValue: string;
  yearlyValue: string;
  note: string;
}

export interface ProjectStatusData {
  name: string;
  value: number;
  color: string;
}

export interface ContractorPerformance {
  name: string;
  project: string;
  status: 'active' | 'completed' | 'pending';
  completion: number;
  deadline: string;
}

export interface ContractorKPIData {
  activeProjects: number;
  totalContractors: number;
  avgCompletion: number;
  budgetUtilization: number;
}

// Contractor module state
export interface ContractorModuleState {
  isLoading: boolean;
  selectedStatus: string;
  selectedContractType: string;
  activeSubSection: string;
}

export type ContractStatus = 'Active' | 'Expired' | 'Pending';
export type ContractType = 'Contract' | 'PO';

export interface BudgetAllocation {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface ContractRenewal {
  contractor: string;
  service: string;
  expiryDate: string;
  daysUntilExpiry: number;
  priority: 'high' | 'medium' | 'low';
}