import React from "react";
import Icon from "../../../components/AppIcon";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Scheduled",
      description: "Rahul Sharma booked viewing for Luxury Villa in Bandra",
      time: "2 minutes ago",
      icon: "Calendar",
      color: "text-primary",
    },
    {
      id: 2,
      type: "lead",
      title: "New Lead Generated",
      description: "Priya Patel inquired about 3BHK apartments in Andheri",
      time: "15 minutes ago",
      icon: "UserPlus",
      color: "text-success",
    },
    {
      id: 3,
      type: "property",
      title: "Property Status Updated",
      description: "Modern Apartment in Pune marked as Sold by Agent Amit",
      time: "1 hour ago",
      icon: "Home",
      color: "text-warning",
    },
    {
      id: 4,
      type: "employee",
      title: "Employee Action",
      description: "Sneha Reddy added new property listing in Hyderabad",
      time: "2 hours ago",
      icon: "User",
      color: "text-secondary",
    },
    {
      id: 5,
      type: "system",
      title: "Report Generated",
      description: "Monthly sales report generated and sent to stakeholders",
      time: "3 hours ago",
      icon: "FileText",
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-smooth"
          >
            <div
              className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}
            >
              <Icon name={activity?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity?.title}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {activity?.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {activity?.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
