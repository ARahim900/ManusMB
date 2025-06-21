import React from 'react';

const GaugeChart = ({ 
  percentage, 
  value, 
  title, 
  subtitle, 
  color = '#3b82f6',
  size = 120,
  strokeWidth = 8
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color variations based on percentage ranges
  const getColor = () => {
    if (color !== '#3b82f6') return color; // Use custom color if provided
    
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#f59e0b'; // Yellow/Orange
    if (percentage >= 40) return '#ef4444'; // Red
    return '#6b7280'; // Gray
  };

  const finalColor = getColor();

  return (
    <div className="flex flex-col items-center space-y-3 p-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={finalColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(percentage)}%
          </div>
          {value !== undefined && (
            <div className="text-sm text-gray-600 font-medium">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
          )}
        </div>
      </div>
      
      {/* Title and subtitle */}
      <div className="text-center space-y-1">
        <div 
          className="text-sm font-semibold text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: finalColor }}
        >
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 max-w-32">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaugeChart; 