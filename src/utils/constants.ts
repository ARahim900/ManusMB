// ===============================
// DESIGN SYSTEM & CONSTANTS
// ===============================

export const OMR_PER_KWH = 0.025;
export const PLANT_DESIGN_CAPACITY = 750; // m³/day for STP

// Primary Color Scheme - Muscat Bay Brand Colors
export const COLORS = {
  primary: '#5f5168',        // Main brand color - Muted purple from logo
  primaryLight: '#7E708A',   // Lighter variant for hover states
  primaryDark: '#3B3241',    // Darker variant for active states
  accent: '#A8D5E3',         // Soft teal for highlights
  success: '#10B981',        // Green for positive metrics
  warning: '#BFA181',        // Muted gold for warnings
  info: '#0A1828',          // Deep classic blue for information
  error: '#EF4444',         // Red for errors
  
  // Chart colors palette - Muscat Bay themed
  chart: ['#5f5168', '#A8D5E3', '#BFA181', '#0A1828', '#7E708A', '#C3FBF4', '#F2F0EA', '#10B981', '#EF4444', '#6A5ACD']
};

// Application metadata
export const APP_CONFIG = {
  name: 'Muscat Bay Operations',
  version: '1.0.0',
  company: 'Muscat Bay Development',
};