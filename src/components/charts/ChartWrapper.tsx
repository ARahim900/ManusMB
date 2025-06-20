import React from 'react';

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children, subtitle, actions }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
      <div className="mt-4" style={{ height: '350px' }}>
        {children}
      </div>
    </div>
  );
};