import React from "react";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";

const AppointmentFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const modeOptions = [
    { value: "all", label: "All Modes" },
    { value: "in-person", label: "In-Person" },
    { value: "virtual", label: "Virtual" },
    { value: "phone", label: "Phone" },
  ];

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "upcoming", label: "Upcoming" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "past", label: "Past Appointments" },
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = () => {
    return (
      filters?.status !== "all" ||
      filters?.mode !== "all" ||
      filters?.timeRange !== "all" ||
      filters?.search !== ""
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {/* Search */}
          <Input
            type="search"
            placeholder="Search appointments..."
            value={filters?.search}
            onChange={(e) => handleFilterChange("search", e?.target?.value)}
          />

          {/* Status Filter */}
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange("status", value)}
          />

          {/* Mode Filter */}
          <Select
            placeholder="Filter by mode"
            options={modeOptions}
            value={filters?.mode}
            onChange={(value) => handleFilterChange("mode", value)}
          />

          {/* Time Range Filter */}
          <Select
            placeholder="Filter by time"
            options={timeRangeOptions}
            value={filters?.timeRange}
            onChange={(value) => handleFilterChange("timeRange", value)}
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters?.status !== "all" && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>Status: {filters?.status}</span>
              <button
                onClick={() => handleFilterChange("status", "all")}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}

          {filters?.mode !== "all" && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>Mode: {filters?.mode}</span>
              <button
                onClick={() => handleFilterChange("mode", "all")}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}

          {filters?.timeRange !== "all" && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>Time: {filters?.timeRange}</span>
              <button
                onClick={() => handleFilterChange("timeRange", "all")}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}

          {filters?.search && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              <span>Search: "{filters?.search}"</span>
              <button
                onClick={() => handleFilterChange("search", "")}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentFilters;
