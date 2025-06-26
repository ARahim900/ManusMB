import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine
} from 'recharts';
import { useChartData } from '@hooks/useChartData';

/**
 * Enhanced LineChart component with modern patterns
 * Supports multiple lines, custom tooltips, and responsive design
 */
const LineChartEnhanced = ({
  data,
  lines = [],
  height = 350,
  showGrid = true,
  showBrush = false,
  showLegend = true,
  showTooltip = true,
  xAxisKey = 'name',
  yAxisDomain = ['auto', 'auto'],
  referenceLines = [],
  className = '',
  colors = ['#5f5168', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  tooltipFormatter,
  margin = { top: 5, right: 30, left: 20, bottom: 5 }
}) => {
  // Transform data using custom hook
  const chartData = useChartData(data, 'line', {
    xKey: xAxisKey,
    yKeys: lines.map(line => line.dataKey)
  });

  // Memoize chart configuration
  const chartConfig = useMemo(() => ({
    margin,
    data: chartData
  }), [chartData, margin]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span 
              className="flex items-center gap-2"
              style={{ color: entry.color }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-medium">
              {tooltipFormatter ? tooltipFormatter(entry.value, entry.name) : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Custom axis tick component
  const CustomAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        className="text-xs"
      >
        {payload.value}
      </text>
    </g>
  );

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart {...chartConfig}>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
          )}
          
          <XAxis 
            dataKey={xAxisKey}
            tick={<CustomAxisTick />}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          
          <YAxis 
            domain={yAxisDomain}
            tick={<CustomAxisTick />}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          
          {showTooltip && (
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
          )}
          
          {showLegend && (
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
              }}
              iconType="line"
            />
          )}
          
          {/* Render lines */}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type={line.type || 'monotone'}
              dataKey={line.dataKey}
              stroke={line.color || colors[index % colors.length]}
              strokeWidth={line.strokeWidth || 2}
              dot={line.showDots !== false}
              activeDot={{ r: 6 }}
              name={line.name || line.dataKey}
              {...line.props}
            />
          ))}
          
          {/* Render reference lines */}
          {referenceLines.map((refLine, index) => (
            <ReferenceLine
              key={index}
              y={refLine.value}
              stroke={refLine.color || '#ef4444'}
              strokeDasharray={refLine.strokeDasharray || '5 5'}
              label={refLine.label}
            />
          ))}
          
          {/* Show brush for large datasets */}
          {showBrush && (
            <Brush
              dataKey={xAxisKey}
              height={30}
              stroke="#5f5168"
              fill="#f3f4f6"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartEnhanced; 