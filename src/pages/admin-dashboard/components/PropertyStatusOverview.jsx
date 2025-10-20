import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyStatusOverview = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Luxury Villa in Bandra",
      price: "₹2.5 Cr",
      status: "active",
      agent: "Amit Sharma",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Modern Apartment in Andheri",
      price: "₹85 L",
      status: "pending",
      agent: "Priya Patel",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "3BHK Flat in Pune",
      price: "₹1.2 Cr",
      status: "sold",
      agent: "Sneha Reddy",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      name: "Independent House in Hyderabad",
      price: "₹1.8 Cr",
      status: "draft",
      agent: "Rahul Kumar",
      lastUpdated: "5 hours ago",
    },
  ]);

  const statusConfig = {
    active: {
      label: "Active",
      color: "bg-success text-success-foreground",
      icon: "CheckCircle",
    },
    pending: {
      label: "Pending",
      color: "bg-warning text-warning-foreground",
      icon: "Clock",
    },
    sold: {
      label: "Sold",
      color: "bg-primary text-primary-foreground",
      icon: "Home",
    },
    draft: {
      label: "Draft",
      color: "bg-muted text-muted-foreground",
      icon: "Edit",
    },
  };

  const handleStatusChange = (propertyId, newStatus) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, status: newStatus, lastUpdated: "Just now" }
          : property
      )
    );
  };

  const getStatusCounts = () => {
    return properties.reduce((acc, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Property Status Overview
      </h3>

      {/* Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="text-center p-3 bg-muted/30 rounded-lg">
            <div
              className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center mx-auto mb-2`}
            >
              <Icon name={config.icon} size={16} />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {statusCounts[status] || 0}
            </p>
            <p className="text-sm text-muted-foreground">{config.label}</p>
          </div>
        ))}
      </div>

      {/* Property List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {property.name}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm font-semibold text-primary">
                  {property.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  by {property.agent}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {property.lastUpdated}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusConfig[property.status].color
                }`}
              >
                {statusConfig[property.status].label}
              </span>

              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>

                <div className="absolute right-0 top-8 w-32 bg-popover border border-border rounded-lg shadow-moderate opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {Object.keys(statusConfig)
                    .filter((status) => status !== property.status)
                    .map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(property.id, status)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg"
                      >
                        Mark as {statusConfig[status].label}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyStatusOverview;
