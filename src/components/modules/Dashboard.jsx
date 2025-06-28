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
import AlertCard from '@components/ui/AlertCard';

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
      isPrimary: true,
      tooltip: "Total electricity consumption across all systems for the current period. Includes residential, commercial, and infrastructure consumption."
    },
    {
      title: "Water System Efficiency", 
      value: "76.2%",
      isPrimary: false,
      tooltip: "Current water system efficiency based on input vs. output flow rates, leak detection, and distribution performance."
    },
    {
      title: "Current Balance",
      value: "$4,836.00",
      isPrimary: true,
      tooltip: "Available reserve funds balance including maintenance reserves, operational costs, and emergency funds."
    },
    {
      title: "Active Contracts",
      value: "25",
      isPrimary: false,
      tooltip: "Number of currently active maintenance and service contracts across all systems and facilities."
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
      priority: 'high',
      action: () => {
        alert('Investigating Zone 3A water loss...\n\nRecommended Actions:\n• Check valve status\n• Inspect pipeline for leaks\n• Review flow meters\n• Schedule maintenance team');
      },
      actionLabel: 'Investigate'
    },
    {
      type: 'info',
      message: 'Monthly electricity report generated',
      time: '4 hours ago',
      icon: BarChart3,
      priority: 'medium',
      action: () => {
        alert('Opening electricity consumption report...');
        // In a real app: navigate to /electricity or open report modal
      },
      actionLabel: 'View Report'
    },
    {
      type: 'success',
      message: 'STP maintenance completed successfully',
      time: '1 day ago',
      icon: CheckCircle,
      priority: 'low',
      action: () => {
        alert('STP Maintenance Summary:\n• All systems checked\n• Filters replaced\n• Performance optimized\n• Next maintenance: 30 days');
      },
      actionLabel: 'View Details'
    }
  ];

  const quickActions = [
    { 
      label: 'View Reports', 
      icon: <BarChart3 className="w-4 h-4" />, 
      action: () => {
        // Navigate to a reports view or show reports modal
        alert('Reports functionality - Navigate to reports dashboard');
        // In a real app: navigate('/reports') or openReportsModal()
      }, 
      variant: 'primary' 
    },
    { 
      label: 'System Status', 
      icon: <Activity className="w-4 h-4" />, 
      action: () => {
        // Show system status information
        alert('System Status: All systems operational\n- Electricity: Online\n- Water: Online\n- STP: Online\n- Reserve Fund: Stable');
        // In a real app: openSystemStatusModal()
      }, 
      variant: 'secondary' 
    },
    { 
      label: 'Schedule Maintenance', 
      icon: <Calendar className="w-4 h-4" />, 
      action: () => {
        // Open maintenance scheduling interface
        alert('Maintenance Scheduling - Opening scheduler...');
        // In a real app: openMaintenanceScheduler()
      }, 
      variant: 'secondary' 
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiCards.map((card, index) => (
          <MetricCard
            key={index}
            title={card.title}
            value={card.value}
            isPrimary={card.isPrimary}
            tooltip={card.tooltip}
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
                {alert.action && (
                  <button
                    onClick={alert.action}
                    className="btn btn-sm btn-secondary ml-4"
                  >
                    {alert.actionLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

