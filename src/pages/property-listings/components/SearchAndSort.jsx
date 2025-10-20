import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const SearchAndSort = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterToggle,
  propertyCount = 0,
  showMapView = false,
  onMapToggle,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  const sortOptions = [
    { value: "relevance", label: "Most Relevant", icon: "Star" },
    { value: "price-low", label: "Price: Low to High", icon: "TrendingUp" },
    { value: "price-high", label: "Price: High to Low", icon: "TrendingDown" },
    { value: "newest", label: "Newest First", icon: "Clock" },
    { value: "area-large", label: "Area: Large to Small", icon: "Maximize" },
    { value: "area-small", label: "Area: Small to Large", icon: "Minimize" },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearch);
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search by location, property name, or keywords..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e?.target?.value)}
              className="pl-10 pr-10"
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </form>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Results Count */}
          <div className="hidden lg:block text-sm text-muted-foreground">
            {propertyCount?.toLocaleString()} properties found
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              iconName="ArrowUpDown"
              iconPosition="left"
              className="min-w-[140px] justify-between"
            >
              <span className="truncate">
                {sortOptions?.find((opt) => opt?.value === sortBy)?.label ||
                  "Sort by"}
              </span>
              <Icon name="ChevronDown" size={16} className="ml-2" />
            </Button>

            <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-lg shadow-moderate opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSortChange(option?.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option?.value
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span>{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === "grid"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === "list"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
            >
              <Icon name="List" size={18} />
            </button>
          </div>

          {/* Map Toggle */}
          <Button
            variant={showMapView ? "default" : "outline"}
            onClick={onMapToggle}
            iconName="Map"
            iconPosition="left"
            className="hidden lg:flex"
          >
            {showMapView ? "Hide Map" : "Show Map"}
          </Button>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            onClick={onFilterToggle}
            iconName="Filter"
            iconPosition="left"
            className="lg:hidden"
          >
            Filters
          </Button>
        </div>
      </div>
      {/* Mobile Results Count */}
      <div className="lg:hidden mt-3 text-sm text-muted-foreground">
        {propertyCount?.toLocaleString()} properties found
      </div>
    </div>
  );
};

export default SearchAndSort;
