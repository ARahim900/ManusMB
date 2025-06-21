import React from 'react';

const DetailedCard = ({ 
  icon, 
  title, 
  mainValue, 
  detailsLink, 
  items = [] 
}) => {
  return (
    <div 
      className="bg-background-secondary p-lg rounded-design-system transition-all duration-300 hover:shadow-design-system"
      style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="space-y-md">
        {/* Header with icon and title */}
        <div className="flex items-center space-x-md">
          {icon && (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#A8D5E3',
                color: '#5f5168'
              }}
            >
              <span className="text-lg">{icon}</span>
            </div>
          )}
          <h3 
            className="font-inter text-h3"
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: '#5f5168'
            }}
          >
            {title}
          </h3>
        </div>

        {/* Main Value */}
        <div 
          className="font-inter text-kpi-value"
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: "'Inter', sans-serif",
            color: '#5f5168'
          }}
        >
          {mainValue}
        </div>

        {/* Items List */}
        {items && items.length > 0 && (
          <div className="space-y-xs">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span 
                  className="font-inter text-body-regular"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    fontFamily: "'Inter', sans-serif",
                    color: '#BFA181'
                  }}
                >
                  {item.label}
                </span>
                <span 
                  className="font-inter text-body-regular font-medium"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    fontFamily: "'Inter', sans-serif",
                    color: '#5f5168'
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Details Link */}
        {detailsLink && (
          <div className="pt-sm border-t" style={{ borderColor: '#D9D4DB' }}>
            <button 
              className="font-inter text-body-regular font-medium transition-colors duration-200 hover:opacity-80"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                fontFamily: "'Inter', sans-serif",
                color: '#5f5168'
              }}
            >
              {detailsLink}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCard; 