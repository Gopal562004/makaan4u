import React, { useState, useCallback, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import ReportCard from "../components/ReportCard";
import PerformanceChart from "../components/PerformanceChart";
import ExportModal from "../components/ExportModal";
import RecentReports from "../components/RecentReports";
import QuickStats from "../components/QuickStats";

// Mock data
const quickStats = [
  {
    id: 1,
    label: "Total Reports Generated",
    value: "1,247",
    change: "+12.5%",
    changeType: "positive",
    icon: "FileText",
    color: "bg-primary",
  },
  {
    id: 2,
    label: "Properties Analyzed",
    value: "8,456",
    change: "+8.2%",
    changeType: "positive",
    icon: "Building2",
    color: "bg-secondary",
  },
  {
    id: 3,
    label: "Revenue Tracked",
    value: "₹2.4Cr",
    change: "+15.7%",
    changeType: "positive",
    icon: "TrendingUp",
    color: "bg-success",
  },
  {
    id: 4,
    label: "Active Employees",
    value: "156",
    change: "+3.1%",
    changeType: "positive",
    icon: "Users",
    color: "bg-warning",
  },
];

const reportsData = [
  {
    id: 1,
    title: "Sales Performance Report",
    description: "Monthly sales analysis and performance metrics",
    icon: "TrendingUp",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    status: "ready",
    lastGenerated: "17/10/2025 14:30",
    recordCount: 1247,
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Property Analytics",
    description: "Comprehensive property market analysis",
    icon: "Building2",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    status: "ready",
    lastGenerated: "16/10/2025 09:15",
    recordCount: 856,
    fileSize: "3.1 MB",
  },
  {
    id: 3,
    title: "Employee Performance",
    description: "Individual and team performance metrics",
    icon: "Users",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    status: "generating",
    lastGenerated: "15/10/2025 16:45",
    recordCount: 234,
    fileSize: "1.8 MB",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Q3 Sales Performance Analysis",
    format: "pdf",
    generatedDate: "17/10/2025",
    fileSize: 2457600,
    downloadCount: 12,
  },
  {
    id: 2,
    name: "Property Market Trends October",
    format: "excel",
    generatedDate: "16/10/2025",
    fileSize: 3145728,
    downloadCount: 8,
  },
];

const salesTrendData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const propertyTypeData = [
  { name: "Apartments", value: 45 },
  { name: "Villas", value: 25 },
  { name: "Commercial", value: 20 },
  { name: "Plots", value: 10 },
];

const revenueData = [
  { name: "Q1", value: 85000 },
  { name: "Q2", value: 92000 },
  { name: "Q3", value: 78000 },
  { name: "Q4", value: 95000 },
];

const ReportsDashboard = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleExport = useCallback((exportConfig) => {
    console.log("Exporting reports with config:", exportConfig);
  }, []);

  const handleCloseExportModal = useCallback(() => {
    setIsExportModalOpen(false);
  }, []);

  const handleOpenExportModal = useCallback(() => {
    setIsExportModalOpen(true);
  }, []);

  const handleScheduleReport = useCallback(() => {
    console.log("Schedule report");
  }, []);

  const chartComponents = useMemo(
    () => [
      {
        title: "Sales Trend Analysis",
        data: salesTrendData,
        type: "line",
        icon: "TrendingUp",
        color: "#3B82F6",
      },
      {
        title: "Property Type Distribution",
        data: propertyTypeData,
        type: "pie",
        icon: "PieChart",
        color: "#8B5CF6",
      },
      {
        title: "Quarterly Revenue Analysis",
        data: revenueData,
        type: "bar",
        icon: "BarChart3",
        color: "#10B981",
      },
    ],
    []
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Reports Dashboard
          </h1>
          <p className="text-muted-foreground">
            Generate, view, and export comprehensive business analytics
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            onClick={handleScheduleReport}
          >
            Schedule Report
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleOpenExportModal}
          >
            Export Reports
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {chartComponents.slice(0, 2).map((chart) => (
          <PerformanceChart
            key={chart.title}
            title={chart.title}
            data={chart.data}
            type={chart.type}
            icon={chart.icon}
            color={chart.color}
          />
        ))}
      </div>

      <div className="mb-8">
        <PerformanceChart
          title={chartComponents[2].title}
          data={chartComponents[2].data}
          type={chartComponents[2].type}
          icon={chartComponents[2].icon}
          color={chartComponents[2].color}
        />
      </div>

      {/* Reports Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Available Reports
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {[
                { color: "bg-success", label: "Ready" },
                { color: "bg-warning", label: "Generating" },
                { color: "bg-error", label: "Failed" },
              ].map((status, index) => (
                <React.Fragment key={status.label}>
                  {index > 0 && <span className="ml-4" />}
                  <div className={`w-3 h-3 ${status.color} rounded-full`} />
                  <span>{status.label}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsData.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onGenerate={() => console.log("Generate:", report.title)}
              onDownload={() => console.log("Download:", report.title)}
              onView={() => console.log("View:", report.title)}
            />
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <RecentReports
        reports={recentReports}
        onDownload={() => {}}
        onShare={() => {}}
        onDelete={() => {}}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={handleCloseExportModal}
        reportData={reportsData}
        onExport={handleExport}
      />
    </div>
  );
};

export default React.memo(ReportsDashboard);
