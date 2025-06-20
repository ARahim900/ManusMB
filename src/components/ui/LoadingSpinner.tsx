import React from 'react';
import { COLORS } from '@/utils/constants';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24 }) => (
  <div className="flex justify-center items-center">
    <div 
      className="animate-spin rounded-full border-4 border-slate-200 border-t-primary" 
      style={{
        width: size,
        height: size,
        borderTopColor: COLORS.primary
      }}
    ></div>
  </div>
);

export default LoadingSpinner;