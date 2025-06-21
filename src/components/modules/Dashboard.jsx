import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../ui/MetricCard';
import DetailedCard from '../ui/DetailedCard';
import Button from '../ui/button';
import LoadingSpinner from '../ui/LoadingSpinner';
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

  // KPI Cards data following components.json specification
  const kpiCards = [
    {
      title: "Total Energy Consumption",
      value: "1,738,034 kWh",
      isPrimary: true
    },
    {
      title: "Water System Efficiency", 
      value: "76.2%",
      isPrimary: false
    },
    {
      title: "Current Balance",
      value: "$4,836.00",
      isPrimary: true
    },
    {
      title: "Active Contracts",
      value: "25",
      isPrimary: false
    }
  ];

  // Detailed Card data following components.json specification
  const detailedCardData = {
    icon: "🏢",
    title: "System Overview",
    mainValue: "$2,850",
    detailsLink: "See Details >",
    items: [
      { label: "Electricity", value: "$1,159" },
      { label: "Water", value: "$510" },
      { label: "Maintenance", value: "$340" },
      { label: "Reserve Fund", value: "$841" }
    ]
  };

  // System alerts data
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
    { label: 'View Reports', icon: <BarChart3 className="w-4 h-4" />, action: () => {}, variant: 'primary' },
    { label: 'System Status', icon: <Activity className="w-4 h-4" />, action: () => {}, variant: 'secondary' },
    { label: 'Schedule Maintenance', icon: <Calendar className="w-4 h-4" />, action: () => {}, variant: 'secondary' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Muscat Bay Management System
          </h1>
          <p className="page-subtitle">
            Welcome back! Here's what's happening with your systems today.
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="btn btn-secondary btn-sm">
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

      {/* KPI Cards Grid */}
      <div className="metrics-grid">
        {kpiCards.map((card, index) => (
          <MetricCard
            key={index}
            title={card.title}
            value={card.value}
            isPrimary={card.isPrimary}
          />
        ))}
      </div>

      {/* Detailed Card and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2">
          <DetailedCard {...detailedCardData} />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-h3">
            Quick Actions
          </h2>
          
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                label={action.label}
                icon={action.icon}
                variant={action.variant}
                action={action.action}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="chart-card">
        <div className="chart-card-header flex items-center justify-between">
          <h2 className="chart-card-title flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            System Alerts
          </h2>
          <Button
            label="View All"
            variant="secondary"
            size="sm"
            action={() => {}}
          />
        </div>
        
        <div className="space-y-4">
          {systemAlerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-gray-50"
              >
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'success' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-body-regular font-medium">
                    {alert.message}
                  </p>
                  <p className="text-body-small mt-1">
                    {alert.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

