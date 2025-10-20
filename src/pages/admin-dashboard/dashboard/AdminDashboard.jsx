import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MetricsCard from "../components/MetricsCard";
import PropertyChart from "../components/PropertyChart";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import PropertyStatusOverview from "../components/PropertyStatusOverview";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

// Mock data
const metricsData = [
  {
    title: "Total Properties",
    value: "1,247",
    change: "+12.5%",
    changeType: "positive",
    icon: "Building2",
    color: "primary",
  },
  {
    title: "Active Listings",
    value: "892",
    change: "+8.2%",
    changeType: "positive",
    icon: "Home",
    color: "success",
  },
  {
    title: "Pending Appointments",
    value: "156",
    change: "+15.3%",
    changeType: "positive",
    icon: "Calendar",
    color: "warning",
  },
  {
    title: "Monthly Revenue",
    value: "₹3.8 Cr",
    change: "+22.1%",
    changeType: "positive",
    icon: "TrendingUp",
    color: "secondary",
  },
  {
    title: "Lead Conversion",
    value: "68.5%",
    change: "+5.2%",
    changeType: "positive",
    icon: "Target",
    color: "primary",
  },
  {
    title: "Active Employees",
    value: "45",
    change: "+2",
    changeType: "positive",
    icon: "Users",
    color: "success",
  },
];

const salesTrendData = [
  { month: "Jan", sales: 45, revenue: 2400000, leads: 120 },
  { month: "Feb", sales: 52, revenue: 2800000, leads: 135 },
  { month: "Mar", sales: 48, revenue: 2600000, leads: 128 },
  { month: "Apr", sales: 61, revenue: 3200000, leads: 145 },
  { month: "May", sales: 55, revenue: 2900000, leads: 132 },
  { month: "Jun", sales: 67, revenue: 3500000, leads: 158 },
  { month: "Jul", sales: 59, revenue: 3100000, leads: 142 },
  { month: "Aug", sales: 72, revenue: 3800000, leads: 165 },
  { month: "Sep", sales: 68, revenue: 3600000, leads: 152 },
  { month: "Oct", sales: 75, revenue: 3900000, leads: 170 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location?.reload();
  };

  const handleExportData = () => {
    navigate("/admin/reports");
  };

  const chartComponents = useMemo(
    () => [
      {
        title: "Property Sales Trend",
        data: salesTrendData,
        type: "bar",
        height: 300,
      },
      {
        title: "Revenue Analytics",
        data: salesTrendData,
        type: "line",
        height: 300,
      },
    ],
    []
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Rajesh Patel! Here's what's happening with your
            business today.
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={handleRefresh}
          >
            Refresh
          </Button>

          <Button
            iconName="Download"
            iconPosition="left"
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metricsData.map((metric, index) => (
          <MetricsCard
            key={`${metric.title}-${index}`}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {chartComponents.map((chart) => (
          <PropertyChart
            key={chart.title}
            type={chart.type}
            data={chart.data}
            title={chart.title}
            height={chart.height}
          />
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActions />
        <RecentActivity />
      </div>

      {/* Property Status Overview */}
      <div className="mb-8">
        <PropertyStatusOverview />
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
