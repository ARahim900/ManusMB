import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, OMR_PER_KWH } from '@/utils/constants';
import { ElectricityData } from '@/types';

interface ElectricityUnitDetailsProps {
  kpiAndTableData: ElectricityData[];
  selectedMonth: string;
  selectedCategory: string;
}

const ElectricityUnitDetails: React.FC<ElectricityUnitDetailsProps> = ({
  kpiAndTableData,
  selectedMonth,
  selectedCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof ElectricityData>('totalConsumption');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 15;

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = kpiAndTableData.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.unitName.toLowerCase().includes(searchLower) ||
        item.zone.toLowerCase().includes(searchLower) ||
        item.meterAccountNo.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    });

    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [kpiAndTableData, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = processedData.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (field: keyof ElectricityData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Summary statistics
  const summaryStats = useMemo(() => {
    const total = processedData.reduce((sum, item) => sum + item.totalConsumption, 0);
    const avg = processedData.length > 0 ? total / processedData.length : 0;
    const max = processedData.length > 0 ? Math.max(...processedData.map(item => item.totalConsumption)) : 0;
    const min = processedData.length > 0 ? Math.min(...processedData.map(item => item.totalConsumption)) : 0;
    
    return { total, avg, max, min };
  }, [processedData]);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600">Total Units</h4>
          <p className="text-2xl font-bold text-slate-800">{processedData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600">Total Consumption</h4>
          <p className="text-2xl font-bold text-slate-800">{summaryStats.total.toLocaleString()} kWh</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600">Average/Unit</h4>
          <p className="text-2xl font-bold text-slate-800">{Math.round(summaryStats.avg).toLocaleString()} kWh</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600">Total Cost</h4>
          <p className="text-2xl font-bold text-slate-800">OMR {(summaryStats.total * OMR_PER_KWH).toFixed(2)}</p>
        </div>
      </div>

      {/* Search and Export */}
      <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by unit name, zone, meter account, or category..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none text-sm"
              style={{ '--tw-ring-color': COLORS.primaryLight } as React.CSSProperties}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  #
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('unitName')}
                >
                  Unit Name {sortField === 'unitName' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('zone')}
                >
                  Zone {sortField === 'zone' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('category')}
                >
                  Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Meter Account
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('totalConsumption')}
                >
                  Consumption (kWh) {sortField === 'totalConsumption' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Cost (OMR)
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {item.unitName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.meterAccountNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-medium">
                    {item.totalConsumption.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
                    {(item.totalConsumption * OMR_PER_KWH).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.totalConsumption > 10000 ? 'bg-red-100 text-red-800' :
                      item.totalConsumption > 5000 ? 'bg-yellow-100 text-yellow-800' :
                      item.totalConsumption > 0 ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.totalConsumption > 10000 ? 'High' :
                       item.totalConsumption > 5000 ? 'Medium' :
                       item.totalConsumption > 0 ? 'Normal' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, processedData.length)}</span> of{' '}
                <span className="font-medium">{processedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNumber === currentPage
                            ? 'z-10 bg-primary border-primary text-white'
                            : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                        }`}
                        style={pageNumber === currentPage ? { backgroundColor: COLORS.primary, borderColor: COLORS.primary } : {}}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityUnitDetails;