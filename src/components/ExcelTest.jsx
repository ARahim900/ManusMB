import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testExcelFile = async () => {
    setLoading(true);
    setTestResult('Starting test...\n');
    
    try {
      // Test 1: Fetch the file
      setTestResult(prev => prev + '1. Fetching Excel file...\n');
      const response = await fetch('/Electricitydatabase.xlsx');
      setTestResult(prev => prev + `   Response status: ${response.status}\n`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Test 2: Read as array buffer
      setTestResult(prev => prev + '2. Reading array buffer...\n');
      const arrayBuffer = await response.arrayBuffer();
      setTestResult(prev => prev + `   Buffer size: ${arrayBuffer.byteLength} bytes\n`);
      
      // Test 3: Parse with XLSX
      setTestResult(prev => prev + '3. Parsing with XLSX...\n');
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      setTestResult(prev => prev + `   Worksheets: ${workbook.SheetNames.join(', ')}\n`);
      
      // Test 4: Convert to JSON
      setTestResult(prev => prev + '4. Converting to JSON...\n');
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setTestResult(prev => prev + `   Total rows: ${jsonData.length}\n`);
      
      // Test 5: Show first few rows
      setTestResult(prev => prev + '5. First 3 rows:\n');
      jsonData.slice(0, 3).forEach((row, index) => {
        setTestResult(prev => prev + `   Row ${index}: ${JSON.stringify(row)}\n`);
      });
      
      // Test 6: Check specific data
      if (jsonData.length > 1) {
        const headers = jsonData[0];
        const firstDataRow = jsonData[1];
        setTestResult(prev => prev + '\n6. Headers found:\n');
        setTestResult(prev => prev + `   ${headers.join(', ')}\n`);
        setTestResult(prev => prev + '\n7. First data row:\n');
        headers.forEach((header, index) => {
          setTestResult(prev => prev + `   ${header}: ${firstDataRow[index]}\n`);
        });
      }
      
      setTestResult(prev => prev + '\n✅ Test completed successfully!');
      
    } catch (error) {
      setTestResult(prev => prev + `\n❌ Error: ${error.message}\n`);
      console.error('Excel test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Excel File Test</h2>
      <button 
        onClick={testExcelFile}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Excel File'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Test Results:</h3>
          <pre className="text-sm whitespace-pre-wrap font-mono">{testResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelTest; 