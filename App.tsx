import { useState } from 'react';
import { FinancialPlannerForm } from './components/FinancialPlannerForm';
import { FinancialPlanDisplay } from './components/FinancialPlanDisplay';
import { generateFinancialPlan, FinancialInputData, FinancialPlanResults } from './lib/financialCalculations';
import './App.css';

function App() {
  const [planResults, setPlanResults] = useState<FinancialPlanResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: FinancialInputData) => {
    // Generate financial plan based on input data
    const results = generateFinancialPlan(data);
    setPlanResults(results);
    
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setPlanResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Family Financial Planner
        </h1>
        
        {!showResults ? (
          <FinancialPlannerForm onSubmit={handleFormSubmit} />
        ) : (
          planResults && <FinancialPlanDisplay results={planResults} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
