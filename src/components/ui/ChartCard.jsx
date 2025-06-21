import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChartCard = ({ title, subtitle, children, actions }) => {
  return (
    <Card className="bg-background-secondary dark:bg-gray-800 border-border-color dark:border-gray-600 transition-colors duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-text-primary dark:text-white transition-colors duration-300">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-text-secondary dark:text-gray-300 mt-1 transition-colors duration-300">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;

