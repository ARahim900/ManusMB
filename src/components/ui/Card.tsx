import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};