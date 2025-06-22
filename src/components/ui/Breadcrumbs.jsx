import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    '/': 'Dashboard',
    '/electricity': 'Electricity System',
    '/water': 'Water Management',
    '/stp': 'STP Management',
    '/reserve-fund': 'Reserve Fund',
    '/contractor': 'Contractor Management'
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav className="flex items-center space-x-2 mb-6" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
        <span className="ml-1 text-sm font-medium">Dashboard</span>
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbName = breadcrumbNameMap[routeTo] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
            {isLast ? (
              <span className="text-sm font-medium text-text-primary">
                {breadcrumbName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {breadcrumbName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs; 