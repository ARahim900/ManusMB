import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./components/modules/Dashboard'));
const ElectricityModule = React.lazy(() => import('./components/modules/ElectricityModule'));
const WaterModule = React.lazy(() => import('./components/modules/WaterModule'));
const STPModule = React.lazy(() => import('./components/modules/STPModule'));
const ReserveFundModule = React.lazy(() => import('./components/modules/ReserveFundModule'));
const ContractorModule = React.lazy(() => import('./components/modules/ContractorModule'));
const HVACModule = React.lazy(() => import('./components/modules/HVACModule'));

// Temporary bypass for development - remove when Clerk is properly configured
const TEMP_BYPASS_AUTH = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_placeholder_key_replace_with_your_actual_key' || 
                          !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                          import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'undefined';

function App() {
  // Always render the development version if bypassing auth
  return (
    <ThemeProvider>
      <ErrorBoundary>
        {TEMP_BYPASS_AUTH ? (
          // Development mode without authentication
          <>
            <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
              ⚠️ DEVELOPMENT MODE - Authentication Bypassed. Please configure your Clerk key.
            </div>
            <div style={{ paddingTop: '50px' }}>
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
                        <Route path="/hvac" element={<HVACModule />} />
                        <Route path="*" element={<Dashboard />} />
                      </Routes>
                    </Suspense>
                  </AppLayout>
                </div>
              </Router>
            </div>
          </>
        ) : (
          // Production mode with authentication
          <>
            <SignedOut>
              <Login />
            </SignedOut>
            
            <SignedIn>
              <ProtectedRoute>
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
                          <Route path="/hvac" element={<HVACModule />} />
                          <Route path="*" element={<Dashboard />} />
                        </Routes>
                      </Suspense>
                    </AppLayout>
                  </div>
                </Router>
              </ProtectedRoute>
            </SignedIn>
          </>
        )}
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

