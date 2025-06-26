import { useMemo } from 'react';

/**
 * Custom hook for transforming data for Recharts components
 * Provides optimized data transformation with memoization
 */
export function useChartData(rawData, chartType, options = {}) {
  const chartData = useMemo(() => {
    if (!rawData) return null;

    switch (chartType) {
      case 'line':
        return transformLineChartData(rawData, options);
      case 'bar':
        return transformBarChartData(rawData, options);
      case 'pie':
        return transformPieChartData(rawData, options);
      case 'area':
        return transformAreaChartData(rawData, options);
      default:
        return rawData;
    }
  }, [rawData, chartType, JSON.stringify(options)]);

  return chartData;
}

// Transform data for line charts
function transformLineChartData(data, { xKey = 'name', yKeys = [], colors = [] }) {
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    ...item,
    // Ensure numeric values for y-axis
    ...yKeys.reduce((acc, key) => ({
      ...acc,
      [key]: parseFloat(item[key]) || 0
    }), {})
  }));
}

// Transform data for bar charts
function transformBarChartData(data, { xKey = 'name', yKey = 'value', sortBy = null }) {
  if (!Array.isArray(data)) return [];
  
  const transformed = data.map(item => ({
    [xKey]: item[xKey],
    [yKey]: parseFloat(item[yKey]) || 0,
    ...item
  }));

  if (sortBy) {
    return transformed.sort((a, b) => b[sortBy] - a[sortBy]);
  }

  return transformed;
}

// Transform data for pie charts
function transformPieChartData(data, { nameKey = 'name', valueKey = 'value', colors = [] }) {
  if (!Array.isArray(data)) return [];
  
  return data
    .filter(item => item[valueKey] > 0)
    .map((item, index) => ({
      name: item[nameKey],
      value: parseFloat(item[valueKey]) || 0,
      fill: colors[index % colors.length] || `hsl(${index * 45}, 70%, 60%)`,
      ...item
    }));
}

// Transform data for area charts
function transformAreaChartData(data, options) {
  // Area charts use same transformation as line charts
  return transformLineChartData(data, options);
}

// Export transformation utilities
export const chartTransformers = {
  line: transformLineChartData,
  bar: transformBarChartData,
  pie: transformPieChartData,
  area: transformAreaChartData
}; 