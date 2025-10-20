import React from "react";
import Icon from "../../../components/AppIcon";

const AppointmentStats = ({ appointments }) => {
  const calculateStats = () => {
    const total = appointments?.length;
    const confirmed = appointments?.filter(
      (apt) => apt?.status === "confirmed"
    )?.length;
    const pending = appointments?.filter(
      (apt) => apt?.status === "pending"
    )?.length;
    const completed = appointments?.filter(
      (apt) => apt?.status === "completed"
    )?.length;
    const cancelled = appointments?.filter(
      (apt) => apt?.status === "cancelled"
    )?.length;

    const today = new Date();
    const upcoming = appointments?.filter((apt) => {
      const aptDate = new Date(`${apt.date} ${apt.time}`);
      return aptDate > today && apt?.status !== "cancelled";
    })?.length;

    return { total, confirmed, pending, completed, cancelled, upcoming };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: "Total Appointments",
      value: stats?.total,
      icon: "Calendar",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Upcoming",
      value: stats?.upcoming,
      icon: "Clock",
      color: "text-accent bg-accent/10",
    },
    {
      title: "Confirmed",
      value: stats?.confirmed,
      icon: "CheckCircle",
      color: "text-success bg-success/10",
    },
    {
      title: "Pending",
      value: stats?.pending,
      icon: "AlertCircle",
      color: "text-warning bg-warning/10",
    },
    {
      title: "Completed",
      value: stats?.completed,
      icon: "Check",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Cancelled",
      value: stats?.cancelled,
      icon: "XCircle",
      color: "text-destructive bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat) => (
        <div
          key={stat?.title}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-moderate transition-smooth"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}
            >
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {stat?.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentStats;
