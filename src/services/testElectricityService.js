// Test file for electricity database service
import electricityDatabaseService from './electricityDatabaseService.js';

async function testElectricityService() {
  console.log('🧪 Testing Electricity Database Service...');
  
  try {
    // Test getting the data
    const data = await electricityDatabaseService.getData();
    
    console.log('✅ Service test successful!');
    console.log('Data structure:', {
      totalConsumption: data.totalConsumption,
      totalCost: data.totalCost,
      activeMeters: data.activeMeters,
      pricePerKWH: data.pricePerKWH,
      hasDetailedRecords: !!(data.detailedRecords && data.detailedRecords.length > 0),
      hasConsumptionTrend: !!(data.consumptionTrend && data.consumptionTrend.length > 0)
    });
    
    return data;
  } catch (error) {
    console.error('❌ Service test failed:', error);
    console.error('Stack:', error.stack);
    throw error;
  }
}

// Export for testing
export { testElectricityService };

// Auto-run test if this file is imported
testElectricityService(); 