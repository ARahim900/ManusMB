import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24 }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-slate-200 border-t-primary"
        style={{
          width: size,
          height: size,
          borderTopColor: '#4E4456',
        }}
      ></div>
    </div>
  );
};