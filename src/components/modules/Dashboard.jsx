import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../ui/MetricCard';
import EnhancedMetricCard from '../ui/EnhancedMetricCard';
import DetailedCard from '../ui/DetailedCard';
import Button from '../ui/button';
import LoadingSpinner from '../ui/LoadingSpinner';
import ResponsiveContainer, { useResponsive } from '../ui/ResponsiveContainer';
import AdaptiveGrid, { MetricsGrid } from '../ui/AdaptiveGrid';
import ResponsiveModal from '../ui/ResponsiveModal';
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
  BarChart3,
  Settings,
  Maximize2
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { isMobile, isTablet, screenInfo } = useResponsive();

  // Simulate loading and update time
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Enhanced KPI Cards data with trends and additional features
  const kpiCards = [
    {
      title: "Total Energy Consumption",
      value: "1,738,034",
      unit: "kWh",
      isPrimary: true,
      icon: Zap,
      iconColor: "text-yellow-500",
      trend: "up",
      trendValue: "+12.3%",
      trendLabel: "vs last month",
      tooltip: "Total electricity consumption across all systems for the current period. Includes residential, commercial, and infrastructure consumption.",
      onClick: () => window.location.href = '/electricity'
    },
    {
      title: "Water System Efficiency", 
      value: "76.2",
      unit: "%",
      isPrimary: false,
      icon: Droplets,
      iconColor: "text-blue-500",
      trend: "down",
      trendValue: "-2.1%",
      trendLabel: "needs attention",
      tooltip: "Current water system efficiency based on input vs. output flow rates, leak detection, and distribution performance.",
      onClick: () => window.location.href = '/water'
    },
    {
      title: "Reserve Fund Balance",
      value: "$4,836",
      isPrimary: true,
      icon: DollarSign,
      iconColor: "text-green-500",
      trend: "up",
      trendValue: "+5.7%",
      trendLabel: "this quarter",
      tooltip: "Available reserve funds balance including maintenance reserves, operational costs, and emergency funds.",
      onClick: () => window.location.href = '/reserve-fund'
    },
    {
      title: "Active Contracts",
      value: "25",
      isPrimary: false,
      icon: Users,
      iconColor: "text-purple-500",
      trend: "neutral",
      trendValue: "2 expiring",
      trendLabel: "this month",
      tooltip: "Number of currently active maintenance and service contracts across all systems and facilities.",
      onClick: () => window.location.href = '/contractor'
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
    <ResponsiveContainer 
      className="min-h-screen space-y-6"
      mobileLayout="stack"
      fullHeight={true}
    >
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h1 className={`page-title ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Muscat Bay Management System
          </h1>
          <p className="page-subtitle">
            Welcome back! Here's what's happening with your systems today.
          </p>
          {isMobile && (
            <div className="mt-2 text-xs text-gray-500">
              Screen: {screenInfo.width}×{screenInfo.height} • {screenInfo.orientation}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="btn btn-secondary btn-sm">
            {currentTime.toLocaleString('en-US', {
              weekday: isMobile ? 'short' : 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          
          {!isMobile && (
            <button 
              onClick={() => setShowQuickActions(true)}
              className="btn btn-primary btn-sm"
              title="Quick Actions"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Enhanced KPI Cards Grid */}
      <MetricsGrid>
        {kpiCards.map((card, index) => (
          <EnhancedMetricCard
            key={index}
            title={card.title}
            value={card.value}
            unit={card.unit}
            isPrimary={card.isPrimary}
            icon={card.icon}
            iconColor={card.iconColor}
            trend={card.trend}
            trendValue={card.trendValue}
            trendLabel={card.trendLabel}
            tooltip={card.tooltip}
            onClick={card.onClick}
            loading={loading}
            compact={isMobile}
          />
        ))}
      </MetricsGrid>

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

      {/* Quick Actions Modal */}
      <ResponsiveModal
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        title="Quick Actions"
        size="md"
      >
        <div className="space-y-4 p-6">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              label={action.label}
              icon={action.icon}
              variant={action.variant}
              action={() => {
                action.action();
                setShowQuickActions(false);
              }}
              className="w-full"
            />
          ))}
        </div>
      </ResponsiveModal>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <ResponsiveModal
          isOpen={!!selectedAlert}
          onClose={() => setSelectedAlert(null)}
          title="Alert Details"
          size="lg"
        >
          <div className="p-6">
            <p className="text-lg font-medium mb-4">{selectedAlert.message}</p>
            <p className="text-gray-600 mb-4">{selectedAlert.time}</p>
            <div className="flex justify-end space-x-2">
              <Button
                label="Dismiss"
                variant="secondary"
                action={() => setSelectedAlert(null)}
              />
              <Button
                label={selectedAlert.actionLabel}
                variant="primary"
                action={() => {
                  selectedAlert.action();
                  setSelectedAlert(null);
                }}
              />
            </div>
          </div>
        </ResponsiveModal>
      )}
    </ResponsiveContainer>
  );
};

export default Dashboard;

