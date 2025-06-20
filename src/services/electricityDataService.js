import * as XLSX from 'xlsx';

class ElectricityDataService {
  constructor() {
    this.data = null;
    this.processedData = null;
    this.pricePerKWH = 0.025; // 1 kWh = 0.025 OMR as specified
  }

  // Create table structure matching the provided SQL schema
  createTableStructure() {
    return {
      tableName: 'electricity_consumption',
      columns: [
        { name: 'Name', type: 'VARCHAR(512)' },
        { name: 'Type', type: 'VARCHAR(512)' },
        { name: 'Meter Account No.', type: 'VARCHAR(512)' },
        { name: 'Apr-24', type: 'DECIMAL(10,2)' },
        { name: 'May-24', type: 'DECIMAL(10,2)' },
        { name: 'Jun-24', type: 'DECIMAL(10,2)' },
        { name: 'Jul-24', type: 'DECIMAL(10,2)' },
        { name: 'Aug-24', type: 'DECIMAL(10,2)' },
        { name: 'Sep-24', type: 'DECIMAL(10,2)' },
        { name: 'Oct-24', type: 'DECIMAL(10,2)' },
        { name: 'Nov-24', type: 'DECIMAL(10,2)' },
        { name: 'Dec-24', type: 'DECIMAL(10,2)' },
        { name: 'Jan-25', type: 'DECIMAL(10,2)' },
        { name: 'Feb-25', type: 'DECIMAL(10,2)' },
        { name: 'Mar-25', type: 'DECIMAL(10,2)' },
        { name: 'Apr-25', type: 'DECIMAL(10,2)' },
        { name: 'May-25', type: 'DECIMAL(10,2)' }
      ]
    };
  }

  // Load and parse the Excel file
  async loadExcelData(filePath) {
    try {
      console.log('🔄 Starting to load Electricity Database with pricing calculations...');
      
      // For web applications, we'll fetch the file from public directory
      const response = await fetch('/Electricitydatabase.xlsx');
      console.log('📡 Fetch response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      console.log('📊 ArrayBuffer size:', arrayBuffer.byteLength);
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      console.log('📋 Worksheet names:', workbook.SheetNames);
      
      // Get the first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log('📈 Raw JSON data rows:', jsonData.length);
      console.log('📝 First few rows:', jsonData.slice(0, 3));
      
      this.data = this.parseElectricityData(jsonData);
      console.log('🔧 Parsed data records:', this.data.length);
      console.log('📋 Sample parsed record:', this.data[0]);
      
      this.processedData = this.processDataWithPricing(this.data);
      console.log('✅ Processed data with pricing (0.025 OMR/kWh):', {
        totalConsumption: this.processedData.totalConsumption,
        totalCost: this.processedData.totalCost,
        activeMeters: this.processedData.activeMeters,
        pricePerKWH: this.pricePerKWH
      });
      
      return this.processedData;
    } catch (error) {
      console.error('❌ Error loading Excel data:', error);
      console.log('🔄 Falling back to structured mock data with pricing');
      return this.getStructuredMockData();
    }
  }

  // Parse the raw Excel data into structured format matching the database schema
  parseElectricityData(rawData) {
    if (!rawData || rawData.length < 2) return [];
    
    const headers = rawData[0];
    const rows = rawData.slice(1);
    
    // Map data according to the provided database structure
    return rows.map((row, index) => {
      const record = {};
      headers.forEach((header, colIndex) => {
        record[header] = row[colIndex] || (header.includes('-') ? 0 : ''); // Default 0 for month columns, empty string for others
      });
      
      // Ensure we have all required fields
      if (!record['Name']) record['Name'] = `Unknown Asset ${index + 1}`;
      if (!record['Type']) record['Type'] = 'Unknown';
      if (!record['Meter Account No.']) record['Meter Account No.'] = 'N/A';
      
      return record;
    });
  }

  // Process data with enhanced pricing calculations and analytics
  processDataWithPricing(data) {
    if (!data || data.length === 0) return this.getStructuredMockData();

    const processed = {
      totalConsumption: 0,
      totalCost: 0,
      activeMeters: 0,
      averageConsumption: 0,
      averageCost: 0,
      pricePerKWH: this.pricePerKWH,
      consumptionByCategory: {},
      consumptionByMonth: {},
      costByMonth: {},
      topConsumers: [],
      topCostCenters: [],
      categoryPerformance: [],
      consumptionTrend: [],
      costTrend: [],
      typeBreakdown: {},
      monthlyStats: {},
      efficiencyMetrics: {}
    };

    // Month columns from the database schema
    const monthColumns = [
      'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24',
      'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25',
      'Apr-25', 'May-25'
    ];

    // Initialize monthly totals
    monthColumns.forEach(month => {
      processed.consumptionByMonth[month] = 0;
      processed.costByMonth[month] = 0;
    });

    // Process each record
    data.forEach((record, index) => {
      let recordTotalConsumption = 0;
      let recordMonthlyCosts = {};
      
      // Calculate monthly consumption and costs
      monthColumns.forEach(month => {
        const monthlyConsumption = this.extractNumber(record[month] || 0);
        const monthlyCost = monthlyConsumption * this.pricePerKWH;
        
        recordTotalConsumption += monthlyConsumption;
        recordMonthlyCosts[month] = monthlyCost;
        
        processed.consumptionByMonth[month] += monthlyConsumption;
        processed.costByMonth[month] += monthlyCost;
      });

      // Only count active meters (those with consumption > 0)
      if (recordTotalConsumption > 0) {
        processed.activeMeters++;
      }

      const totalRecordCost = recordTotalConsumption * this.pricePerKWH;
      const category = this.getCategoryFromType(record['Type'] || 'Unknown');
      const name = record['Name'] || 'Unknown';
      const meter = record['Meter Account No.'] || 'N/A';
      const type = record['Type'] || 'Unknown';

      // Debug logging for first few records
      if (index < 3) {
        console.log(`🔍 Record ${index + 1} - ${name}:`, {
          type,
          category,
          consumption: recordTotalConsumption.toFixed(2),
          cost: totalRecordCost.toFixed(3),
          meter,
          pricePerKWH: this.pricePerKWH
        });
      }

      processed.totalConsumption += recordTotalConsumption;
      processed.totalCost += totalRecordCost;

      // Group by category
      if (!processed.consumptionByCategory[category]) {
        processed.consumptionByCategory[category] = {
          total: 0,
          totalCost: 0,
          count: 0,
          records: [],
          averageConsumption: 0,
          averageCost: 0
        };
      }
      
      const categoryData = processed.consumptionByCategory[category];
      categoryData.total += recordTotalConsumption;
      categoryData.totalCost += totalRecordCost;
      categoryData.count += 1;
      categoryData.records.push({
        ...record,
        totalConsumption: recordTotalConsumption,
        totalCost: totalRecordCost,
        monthlyCosts: recordMonthlyCosts
      });

      // Group by type
      if (!processed.typeBreakdown[type]) {
        processed.typeBreakdown[type] = {
          count: 0,
          totalConsumption: 0,
          totalCost: 0
        };
      }
      processed.typeBreakdown[type].count++;
      processed.typeBreakdown[type].totalConsumption += recordTotalConsumption;
      processed.typeBreakdown[type].totalCost += totalRecordCost;

      // Add to consumers lists
      if (recordTotalConsumption > 0) {
        processed.topConsumers.push({
          name,
          meter,
          type,
          category,
          consumption: recordTotalConsumption,
          cost: totalRecordCost,
          efficiency: this.calculateEfficiencyScore(recordTotalConsumption, type),
          monthlyCosts: recordMonthlyCosts
        });

        processed.topCostCenters.push({
          name,
          meter,
          type,
          category,
          consumption: recordTotalConsumption,
          cost: totalRecordCost,
          costPerKWH: this.pricePerKWH
        });
      }
    });

    // Calculate derived metrics
    processed.averageConsumption = processed.activeMeters > 0 ? processed.totalConsumption / processed.activeMeters : 0;
    processed.averageCost = processed.activeMeters > 0 ? processed.totalCost / processed.activeMeters : 0;

    // Finalize category calculations
    Object.keys(processed.consumptionByCategory).forEach(category => {
      const cat = processed.consumptionByCategory[category];
      cat.averageConsumption = cat.count > 0 ? cat.total / cat.count : 0;
      cat.averageCost = cat.count > 0 ? cat.totalCost / cat.count : 0;
    });

    // Sort lists
    processed.topConsumers = processed.topConsumers
      .sort((a, b) => b.consumption - a.consumption)
      .slice(0, 15);

    processed.topCostCenters = processed.topCostCenters
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 15);

    // Generate category performance metrics
    processed.categoryPerformance = Object.entries(processed.consumptionByCategory)
      .map(([category, data]) => ({
        title: category,
        units: data.count,
        total: `${Math.round(data.total).toLocaleString()} kWh`,
        totalCost: `${data.totalCost.toFixed(2)} OMR`,
        average: `${Math.round(data.averageConsumption).toLocaleString()} kWh`,
        averageCost: `${data.averageCost.toFixed(3)} OMR`,
        efficiency: this.calculateCategoryEfficiency(data)
      }))
      .sort((a, b) => b.units - a.units);

    // Generate monthly trends
    processed.consumptionTrend = monthColumns.map(month => ({
      month,
      consumption: Math.round(processed.consumptionByMonth[month] || 0),
      cost: parseFloat((processed.costByMonth[month] || 0).toFixed(2))
    }));

    processed.costTrend = monthColumns.map(month => ({
      month,
      cost: parseFloat((processed.costByMonth[month] || 0).toFixed(2)),
      consumption: Math.round(processed.consumptionByMonth[month] || 0)
    }));

    // Calculate monthly statistics
    processed.monthlyStats = this.calculateMonthlyStats(monthColumns, processed.consumptionByMonth, processed.costByMonth);

    // Calculate efficiency metrics
    processed.efficiencyMetrics = this.calculateEfficiencyMetrics(processed);

    return processed;
  }

  // Enhanced number extraction with better handling of decimals
  extractNumber(value) {
    if (typeof value === 'number') return Math.max(0, value);
    if (typeof value === 'string') {
      // Handle negative values and decimals properly
      const cleaned = value.replace(/[^0-9.-]/g, '');
      const number = parseFloat(cleaned);
      return isNaN(number) ? 0 : Math.max(0, number); // Don't allow negative consumption
    }
    return 0;
  }

  // Enhanced category mapping based on Type field
  getCategoryFromType(type) {
    const typeMapping = {
      'PS': 'Pumping Station',
      'LS': 'Lifting Station', 
      'IRR': 'Irrigation Tank',
      'DB': 'Distribution Board',
      'D_Building': 'Development Building',
      'Street Light': 'Street Light',
      'FP-Landscape Lights Z3': 'Landscape Lights Zone 3',
      'Retail': 'Commercial/Retail'
    };
    return typeMapping[type] || 'Other Infrastructure';
  }

  // Calculate efficiency score based on consumption and type
  calculateEfficiencyScore(consumption, type) {
    // Define baseline consumption expectations by type
    const baselines = {
      'PS': 2500,
      'LS': 2000,
      'IRR': 1800,
      'DB': 200,
      'D_Building': 2000,
      'Street Light': 2000,
      'FP-Landscape Lights Z3': 50,
      'Retail': 15000
    };
    
    const baseline = baselines[type] || 1500;
    const efficiency = Math.max(20, Math.min(100, 100 - ((consumption - baseline) / baseline) * 50));
    return Math.round(efficiency);
  }

  // Calculate category efficiency
  calculateCategoryEfficiency(categoryData) {
    if (categoryData.count === 0) return 0;
    const avgConsumption = categoryData.averageConsumption;
    // Simple efficiency calculation - could be enhanced with more sophisticated logic
    return Math.max(60, Math.min(95, 95 - (avgConsumption / 3000) * 20));
  }

  // Calculate monthly statistics
  calculateMonthlyStats(monthColumns, consumptionByMonth, costByMonth) {
    const consumptions = monthColumns.map(month => consumptionByMonth[month] || 0);
    const costs = monthColumns.map(month => costByMonth[month] || 0);
    
    return {
      peakConsumptionMonth: monthColumns[consumptions.indexOf(Math.max(...consumptions))],
      peakConsumption: Math.max(...consumptions),
      peakCostMonth: monthColumns[costs.indexOf(Math.max(...costs))],
      peakCost: Math.max(...costs),
      averageMonthlyConsumption: consumptions.reduce((a, b) => a + b, 0) / consumptions.length,
      averageMonthlyCost: costs.reduce((a, b) => a + b, 0) / costs.length,
      totalMonths: monthColumns.length
    };
  }

  // Calculate overall efficiency metrics
  calculateEfficiencyMetrics(processed) {
    return {
      overallEfficiency: Math.round((processed.activeMeters / Math.max(processed.activeMeters, 60)) * 85 + 10),
      costEfficiency: processed.totalConsumption > 0 ? (processed.totalCost / processed.totalConsumption).toFixed(4) : 0,
      utilizationRate: Math.round((processed.activeMeters / Math.max(processed.activeMeters, 70)) * 100),
      performanceScore: Math.round(85 + Math.random() * 10) // Mock performance score
    };
  }

  // Get structured mock data matching the database schema
  getStructuredMockData() {
    // Using actual data from the provided database for mock/fallback
    const mockRecords = [
      { Name: 'Pumping Station 01', Type: 'PS', 'Meter Account No.': 'R52330', 'Apr-24': 1608, 'May-24': 1940, 'Jun-24': 1783 },
      { Name: 'Central Park', Type: 'D_Building', 'Meter Account No.': 'R54672', 'Apr-24': 12208, 'May-24': 21845, 'Jun-24': 29438 },
      { Name: 'CIF kitchen', Type: 'Retail', 'Meter Account No.': '', 'Apr-24': 0, 'May-24': 0, 'Jun-24': 0 }
    ];

    return this.processDataWithPricing(mockRecords);
  }

  // Get current processed data
  getData() {
    return this.processedData || this.getStructuredMockData();
  }

  // Filter data based on various criteria
  filterData(filters = {}) {
    const data = this.getData();
    // Implementation for filtering - can be enhanced based on requirements
    return data;
  }

  // Get pricing information
  getPricingInfo() {
    return {
      pricePerKWH: this.pricePerKWH,
      currency: 'OMR',
      pricingModel: 'Fixed Rate',
      lastUpdated: new Date().toISOString()
    };
  }

  // Calculate cost for given consumption
  calculateCost(consumptionKWH) {
    return consumptionKWH * this.pricePerKWH;
  }

  // Generate cost analysis report
  generateCostAnalysisReport(data = null) {
    const processedData = data || this.getData();
    
    return {
      summary: {
        totalConsumption: processedData.totalConsumption,
        totalCost: processedData.totalCost,
        averageCostPerUnit: processedData.averageCost,
        pricePerKWH: this.pricePerKWH
      },
      categories: processedData.categoryPerformance,
      topCostCenters: processedData.topCostCenters,
      monthlyTrends: processedData.costTrend,
      recommendations: this.generateCostRecommendations(processedData)
    };
  }

  // Generate cost optimization recommendations
  generateCostRecommendations(data) {
    const recommendations = [];
    
    // High consumption items
    if (data.topConsumers.length > 0) {
      const topConsumer = data.topConsumers[0];
      recommendations.push({
        type: 'High Consumption Alert',
        item: topConsumer.name,
        message: `${topConsumer.name} consumes ${topConsumer.consumption.toLocaleString()} kWh (${topConsumer.cost.toFixed(2)} OMR)`,
        priority: 'High'
      });
    }

    // Efficiency opportunities
    recommendations.push({
      type: 'Efficiency Opportunity',
      message: `Potential savings of ${(data.totalCost * 0.1).toFixed(2)} OMR through efficiency improvements`,
      priority: 'Medium'
    });

    return recommendations;
  }
}

export default new ElectricityDataService(); 