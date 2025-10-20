import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const AppointmentCard = ({
  appointment,
  onReschedule,
  onCancel,
  onJoinMeeting,
  onViewProperty,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-success bg-success/10 border-success/20";
      case "pending":
        return "text-warning bg-warning/10 border-warning/20";
      case "completed":
        return "text-primary bg-primary/10 border-primary/20";
      case "cancelled":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case "virtual":
        return "Video";
      case "phone":
        return "Phone";
      case "in-person":
        return "MapPin";
      default:
        return "Calendar";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUpcoming = () => {
    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
    return appointmentDate > new Date();
  };

  const canJoinMeeting = () => {
    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
    const now = new Date();
    const timeDiff = appointmentDate?.getTime() - now?.getTime();
    const minutesDiff = timeDiff / (1000 * 60);

    return (
      appointment?.mode === "virtual" &&
      appointment?.status === "confirmed" &&
      minutesDiff <= 15 &&
      minutesDiff >= -30
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-smooth">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Property Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden">
            <Image
              src={appointment?.propertyImage}
              alt={appointment?.propertyImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {appointment?.propertyTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {appointment?.propertyLocation}
              </p>
            </div>

            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                appointment?.status
              )}`}
            >
              {appointment?.status?.charAt(0)?.toUpperCase() +
                appointment?.status?.slice(1)}
            </div>
          </div>

          {/* Date, Time, and Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Icon
                name="Calendar"
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-sm text-foreground">
                {formatDate(appointment?.date)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {appointment?.time}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Icon
                name={getModeIcon(appointment?.mode)}
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-sm text-foreground capitalize">
                {appointment?.mode}
              </span>
            </div>
          </div>

          {/* Agent Information */}
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={appointment?.agent?.avatar}
                alt={appointment?.agent?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {appointment?.agent?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {appointment?.agent?.role}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Phone"
                iconSize={16}
                onClick={() =>
                  window.open(`tel:${appointment?.agent?.phone}`, "_self")
                }
              >
                Call
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                iconSize={16}
                onClick={() =>
                  window.open(
                    `https://wa.me/${appointment?.agent?.whatsapp}`,
                    "_blank"
                  )
                }
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Special Requirements */}
          {appointment?.requirements && (
            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-medium">Special Requirements: </span>
                {appointment?.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0">
          <div className="flex flex-col space-y-2 w-full lg:w-auto">
            {canJoinMeeting() && (
              <Button
                variant="default"
                size="sm"
                iconName="Video"
                iconPosition="left"
                onClick={() => onJoinMeeting(appointment?.id)}
                className="w-full lg:w-auto"
              >
                Join Meeting
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewProperty(appointment?.propertyId)}
              className="w-full lg:w-auto"
            >
              View Property
            </Button>

            {isUpcoming() && appointment?.status !== "cancelled" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => onReschedule(appointment?.id)}
                  className="w-full lg:w-auto"
                >
                  Reschedule
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => onCancel(appointment?.id)}
                  className="w-full lg:w-auto"
                >
                  Cancel
                </Button>
              </>
            )}

            {appointment?.status === "completed" && !appointment?.feedback && (
              <Button
                variant="outline"
                size="sm"
                iconName="Star"
                iconPosition="left"
                className="w-full lg:w-auto"
              >
                Leave Feedback
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
