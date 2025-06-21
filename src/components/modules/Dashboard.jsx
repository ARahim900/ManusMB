import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../ui/MetricCard';
import ChartCard from '../ui/ChartCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Button } from '../ui/button';
import { 
  Zap, 
  Droplets, 
  Factory, 
  DollarSign, 
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Bell,
  Activity,
  Calendar,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate loading and update time
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Sample data for overview metrics
  const overviewMetrics = [
    {
      title: 'Total Energy Consumption',
      value: '1,738,034',
      unit: 'kWh',
      subtitle: 'Last 14 months',
      icon: Zap,
      iconColor: 'text-muscat-primary',
      trend: { value: 5.2, direction: 'up' },
      path: '/electricity'
    },
    {
      title: 'Water System Efficiency',
      value: '76.2',
      unit: '%',
      subtitle: 'Current month',
      icon: Droplets,
      iconColor: 'text-muscat-teal',
      trend: { value: 2.1, direction: 'down' },
      path: '/water'
    },
    {
      title: 'STP Plant Status',
      value: 'Online',
      subtitle: 'All systems operational',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      path: '/stp'
    },
    {
      title: 'Active Contracts',
      value: '25',
      unit: 'contracts',
      subtitle: 'Total value: 5.5M OMR',
      icon: Users,
      iconColor: 'text-muscat-gold',
      path: '/contractor'
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'High water loss detected in Zone 3A',
      time: '2 hours ago',
      icon: AlertTriangle,
      priority: 'high'
    },
    {
      type: 'info',
      message: 'Monthly electricity report generated',
      time: '4 hours ago',
      icon: BarChart3,
      priority: 'medium'
    },
    {
      type: 'success',
      message: 'STP maintenance completed successfully',
      time: '1 day ago',
      icon: CheckCircle,
      priority: 'low'
    }
  ];

  const quickActions = [
    { label: 'View Reports', icon: BarChart3, action: () => {}, variant: 'default' },
    { label: 'System Status', icon: Activity, action: () => {}, variant: 'outline' },
    { label: 'Schedule Maintenance', icon: Calendar, action: () => {}, variant: 'outline' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="py-4 px-1 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 leading-tight"
            style={{ color: 'var(--muscat-navy)' }}
          >
            Muscat Bay Management System
          </h1>
          <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Welcome back! Here's what's happening with your systems today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div 
            className="text-xs sm:text-sm bg-gray-50 px-2 py-1 rounded"
            style={{ color: 'var(--text-secondary)' }}
          >
            {currentTime.toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {overviewMetrics.map((metric, index) => (
          <Link key={index} to={metric.path} className="block group">
            <div className="metric-card group-hover:scale-105 transition-transform duration-200">
              <MetricCard {...metric} />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--muscat-primary)' }}
                >
                  View Details
                </span>
                <ArrowRight className="w-4 h-4 text-muscat-primary transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* System Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 md:p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 
                  className="text-lg font-semibold flex items-center"
                  style={{ color: 'var(--muscat-navy)' }}
                >
                  <Bell className="w-5 h-5 mr-2" />
                  System Alerts
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {systemAlerts.map((alert, index) => {
                const Icon = alert.icon;
                return (
                  <div key={index} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.type === 'warning' ? 'bg-yellow-100' :
                        alert.type === 'success' ? 'bg-green-100' :
                        'bg-blue-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          alert.type === 'warning' ? 'text-yellow-600' :
                          alert.type === 'success' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-sm font-medium"
                          style={{ color: 'var(--muscat-navy)' }}
                        >
                          {alert.message}
                        </p>
                        <p 
                          className="text-xs mt-1"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {alert.time}
                        </p>
                      </div>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 md:p-6 border-b">
              <h2 
                className="text-lg font-semibold"
                style={{ color: 'var(--muscat-navy)' }}
              >
                Quick Actions
              </h2>
            </div>
            
            <div className="p-4 md:p-6 space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="w-full justify-start"
                    onClick={action.action}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

