import { ComponentType } from 'react';

// Common component props
export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<any>;
  unit?: string;
  trend?: string;
  trendColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
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
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  id: string;
  icon?: ComponentType<any>;
  disabled?: boolean;
}

// Filter and state interfaces
export interface FilterOptions {
  selectedMonth: string;
  selectedCategory?: string;
  selectedZone?: string;
  selectedMetric?: string;
}

export interface NavigationItem {
  name: string;
  icon: ComponentType<any>;
  sectionId: string;
}

export interface SubNavigationItem {
  name: string;
  id: string;
  icon: ComponentType<any>;
}

// App state interfaces
export interface AppState {
  activeMainSection: string;
  isCollapsed: boolean;
  isDarkMode: boolean;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Generic data item interface
export interface DataItem {
  id: number;
  [key: string]: any;
}