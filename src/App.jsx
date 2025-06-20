import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './App.css';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./components/modules/Dashboard'));
const ElectricityModule = React.lazy(() => import('./components/modules/ElectricityModule'));
const WaterModule = React.lazy(() => import('./components/modules/WaterModule'));
const STPModule = React.lazy(() => import('./components/modules/STPModule'));
const ReserveFundModule = React.lazy(() => import('./components/modules/ReserveFundModule'));
const ContractorModule = React.lazy(() => import('./components/modules/ContractorModule'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app-layout">
          <AppLayout>
            <Suspense 
              fallback={
                <div className="flex items-center justify-center min-h-96">
                  <LoadingSpinner size="large" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/electricity" element={<ElectricityModule />} />
                <Route path="/water" element={<WaterModule />} />
                <Route path="/stp" element={<STPModule />} />
                <Route path="/reserve-fund" element={<ReserveFundModule />} />
                <Route path="/contractor" element={<ContractorModule />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </AppLayout>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

