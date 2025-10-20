import React, { useState } from "react";

import Button from "../../../components/ui/Button";

const AppointmentCalendar = ({
  appointments,
  selectedDate,
  onDateSelect,
  viewMode,
  onViewModeChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments?.filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate?.toDateString() === date?.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]}{" "}
            {currentMonth?.getFullYear()}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
              iconPosition="right"
              iconSize={16}
            >
              Next
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          {["month", "week", "day"]?.map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange(mode)}
            >
              {mode?.charAt(0)?.toUpperCase() + mode?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {daysOfWeek?.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground border-b border-border"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days?.map((date, index) => {
          const dayAppointments = getAppointmentsForDate(date);

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-border cursor-pointer transition-smooth hover:bg-muted/50 ${
                !date ? "bg-muted/20" : ""
              } ${isSelected(date) ? "bg-primary/10 border-primary" : ""} ${
                isToday(date) ? "bg-accent/10" : ""
              }`}
              onClick={() => date && onDateSelect(date)}
            >
              {date && (
                <>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday(date)
                        ? "text-accent font-semibold"
                        : "text-foreground"
                    }`}
                  >
                    {date?.getDate()}
                  </div>

                  {/* Appointment Indicators */}
                  <div className="space-y-1">
                    {dayAppointments?.slice(0, 2)?.map((apt) => (
                      <div
                        key={apt?.id}
                        className={`text-xs p-1 rounded truncate ${
                          apt?.status === "confirmed"
                            ? "bg-success/20 text-success"
                            : apt?.status === "pending"
                            ? "bg-warning/20 text-warning"
                            : apt?.status === "completed"
                            ? "bg-primary/20 text-primary"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {apt?.time} - {apt?.propertyTitle}
                      </div>
                    ))}
                    {dayAppointments?.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayAppointments?.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-muted-foreground">Confirmed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-sm text-muted-foreground">Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span className="text-sm text-muted-foreground">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
