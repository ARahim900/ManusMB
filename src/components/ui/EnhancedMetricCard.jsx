import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TooltipIcon } from './Tooltip';
import { useResponsive } from './ResponsiveContainer';

const EnhancedMetricCard = ({ 
  title, 
  value, 
  unit,
  subtitle,
  icon: Icon,
  iconColor,
  isPrimary = false,
  tooltip,
  trend,
  trendValue,
  trendLabel,
  onClick,
  loading = false,
  actionButton,
  compact = false
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 bg-green-50';
    if (trend === 'down') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const cardClasses = `
    kpi-card ${isPrimary ? 'primary' : ''} 
    ${onClick ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' : ''}
    ${compact && isMobile ? 'p-4' : ''}
    ${loading ? 'animate-pulse' : ''}
    transition-all duration-300 ease-out
    relative overflow-hidden
    ${isMobile ? 'min-h-[120px]' : 'min-h-[140px]'}
  `;

  const valueSize = isMobile 
    ? (compact ? 'text-xl' : 'text-2xl') 
    : (compact ? 'text-2xl' : 'text-3xl');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Background Pattern for Primary Cards */}
      {isPrimary && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-white"></div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex-1 flex items-center space-x-2">
          <h3 className={`kpi-card-title ${isMobile ? 'text-sm' : 'text-base'} leading-tight`}>
            {title}
          </h3>
          {tooltip && <TooltipIcon content={tooltip} />}
        </div>
        {Icon && (
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
            ${isPrimary ? 'bg-white bg-opacity-20' : 'bg-gray-100'}
          `}>
            <Icon className={`w-5 h-5 ${iconColor || (isPrimary ? 'text-white' : 'text-gray-600')}`} />
          </div>
        )}
      </div>
      
      {/* Value */}
      <div className="flex items-baseline space-x-2 mb-2 relative z-10">
        {loading ? (
          <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        ) : (
          <>
            <span className={`kpi-card-value ${valueSize} font-bold leading-none`}>
              {value}
            </span>
            {unit && (
              <span className={`
                text-sm font-medium 
                ${isPrimary ? 'text-white opacity-80' : 'text-gray-500'}
              `}>
                {unit}
              </span>
            )}
          </>
        )}
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className={`
          inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mb-2
          ${getTrendColor()}
        `}>
          {getTrendIcon()}
          {trendValue && <span>{trendValue}</span>}
          {trendLabel && <span>{trendLabel}</span>}
        </div>
      )}
      
      {/* Subtitle */}
      {subtitle && (
        <p className={`
          text-xs leading-tight relative z-10
          ${isPrimary ? 'text-white opacity-70' : 'text-gray-500'}
          ${isMobile ? 'line-clamp-2' : ''}
        `}>
          {subtitle}
        </p>
      )}

      {/* Action Button */}
      {actionButton && (
        <div className="mt-3 relative z-10">
          {actionButton}
        </div>
      )}

      {/* Mobile Touch Indicator */}
      {onClick && isMobile && (
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-400 rounded-full opacity-50"></div>
      )}
    </div>
  );
};

export default EnhancedMetricCard; 