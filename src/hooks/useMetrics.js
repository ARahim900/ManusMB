import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing metrics data with optimized performance
 * Uses React 18 patterns and best practices
 */
export function useMetrics(dataService, filters = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  // Load data with error handling
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getData(memoizedFilters);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error('Error loading metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [dataService, memoizedFilters]);

  // Auto-load on mount and filter changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh function
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refresh,
    isReady: !loading && !error && data !== null
  };
} 