import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  subtitle, 
  icon: Icon, 
  iconColor = 'text-muscat-primary',
  trend 
}) => {
  return (
    <Card className="metric-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{title}</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold" style={{ color: 'var(--muscat-navy)' }}>{value}</span>
              {unit && <span className="ml-1 text-sm" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
            </div>
            {subtitle && (
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center mt-2 text-xs ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{trend.direction === 'up' ? '↗' : '↘'}</span>
                <span className="ml-1">{trend.value}%</span>
              </div>
            )}
          </div>
          {Icon && (
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}
              style={{ backgroundColor: 'var(--muscat-teal-light)' }}
            >
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

