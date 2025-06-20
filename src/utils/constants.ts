// ===============================
// DESIGN SYSTEM & CONSTANTS
// ===============================

export const OMR_PER_KWH = 0.025;

// Primary Color Scheme - Muscat Bay Brand Colors  
export const COLORS = {
  primary: '#5f5168',           // Muscat Bay brand color - Deep purple-gray
  primaryLight: '#7E708A',      // Lighter variant for hover states
  primaryDark: '#3B3241',       // Darker variant for active states
  accent: '#A8D5E3',           // Soft teal for highlights
  success: '#10B981',          // Green for positive metrics
  warning: '#BFA181',          // Muted gold for warnings
  info: '#0A1828',            // Deep classic blue for information
  error: '#EF4444',           // Red for errors
  
  // Chart colors palette - Muscat Bay themed
  chart: ['#5f5168', '#A8D5E3', '#BFA181', '#0A1828', '#10B981', '#C3FBF4', '#F2F0EA', '#EF4444', '#6A5ACD', '#4169E1']
};

// STP Plant design specifications
export const PLANT_DESIGN_CAPACITY = 750; // m³/day

// Application configuration
export const APP_CONFIG = {
  name: 'Muscat Bay Operations Management Suite',
  version: '1.0.0',
  description: 'Comprehensive operational data monitoring and analytics'
};

// Navigation sections
export const MAIN_SECTIONS = [
  { name: 'Electricity System', sectionId: 'ElectricitySystem' },
  { name: 'Water Analysis', sectionId: 'WaterAnalysis' },
  { name: 'STP Plant', sectionId: 'STPPlant' },
  { name: 'Contractor Tracker', sectionId: 'ContractorTracker' },
];
