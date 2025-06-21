import React from 'react';

const MetricCard = ({ 
  title, 
  value, 
  unit,
  subtitle,
  icon: Icon,
  iconColor,
  isPrimary = false 
}) => {
  return (
    <div 
      className={`kpi-card ${isPrimary ? 'primary' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="kpi-card-title">
            {title}
          </h3>
        </div>
        {Icon && (
          <Icon className={`w-5 h-5 ${iconColor || 'text-gray-400'}`} />
        )}
      </div>
      
      <div className="flex items-baseline space-x-1">
        <span className="kpi-card-value">
          {value}
        </span>
        {unit && (
          <span className={`text-sm font-medium ${isPrimary ? 'text-white opacity-80' : 'text-gray-500'}`}>
            {unit}
          </span>
        )}
      </div>
      
      {subtitle && (
        <p className={`text-xs mt-1 ${isPrimary ? 'text-white opacity-70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default MetricCard;

