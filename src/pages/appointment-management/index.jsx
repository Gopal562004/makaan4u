import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import AppointmentCalendar from "./components/AppointmentCalendar";
import AppointmentCard from "./components/AppointmentCard";
import ScheduleAppointmentModal from "./components/ScheduleAppointmentModal";
import AppointmentFilters from "./components/AppointmentFilters";
import AppointmentStats from "./components/AppointmentStats";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [filters, setFilters] = useState({
    status: "all",
    mode: "all",
    timeRange: "all",
    search: "",
  });

  // Mock user data
  const user = {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    role: "buyer",
  };

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      propertyId: "prop-1",
      propertyTitle: "Luxury 3BHK Apartment in Bandra West",
      propertyLocation: "Bandra West, Mumbai",
      propertyImage:
        "https://images.unsplash.com/photo-1699292102479-2cd4b8986228",
      propertyImageAlt:
        "Modern luxury apartment building with glass facade and balconies in Bandra West Mumbai",
      date: "2025-10-20",
      time: "14:00",
      mode: "in-person",
      status: "confirmed",
      agent: {
        id: 1,
        name: "Priya Sharma",
        role: "Senior Property Consultant",
        phone: "+91-9876543210",
        whatsapp: "919876543210",
        avatar: "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
        avatarAlt:
          "Professional headshot of Indian woman with shoulder-length black hair in navy blazer",
      },
      requirements: "Interested in parking availability and nearby schools",
    },
    {
      id: 2,
      propertyId: "prop-2",
      propertyTitle: "Premium Villa with Garden in Pune",
      propertyLocation: "Koregaon Park, Pune",
      propertyImage:
        "https://images.unsplash.com/photo-1702994533417-5c44bd4964c7",
      propertyImageAlt:
        "Elegant white villa with manicured garden and palm trees in upscale Pune neighborhood",
      date: "2025-10-18",
      time: "10:00",
      mode: "virtual",
      status: "confirmed",
      agent: {
        id: 2,
        name: "Amit Patel",
        role: "Property Specialist",
        phone: "+91-9876543211",
        whatsapp: "919876543211",
        avatar: "https://images.unsplash.com/photo-1675784206080-4e928963cc8e",
        avatarAlt:
          "Professional headshot of Indian man with short black hair and beard in dark suit",
      },
      requirements: null,
    },
    {
      id: 3,
      propertyId: "prop-3",
      propertyTitle: "Modern 2BHK Flat in Andheri East",
      propertyLocation: "Andheri East, Mumbai",
      propertyImage:
        "https://images.unsplash.com/photo-1589174392300-5ebef9775ceb",
      propertyImageAlt:
        "Contemporary apartment complex with modern architecture and landscaped entrance in Andheri East",
      date: "2025-10-15",
      time: "16:00",
      mode: "in-person",
      status: "completed",
      agent: {
        id: 3,
        name: "Sneha Reddy",
        role: "Property Advisor",
        phone: "+91-9876543212",
        whatsapp: "919876543212",
        avatar: "https://images.unsplash.com/photo-1712318972749-21c11488f3eb",
        avatarAlt:
          "Professional headshot of South Indian woman with long black hair in white blouse",
      },
      requirements: "Need information about metro connectivity",
      feedback: null,
    },
    {
      id: 4,
      propertyId: "prop-4",
      propertyTitle: "Spacious 4BHK Penthouse in Gurgaon",
      propertyLocation: "Cyber City, Gurgaon",
      propertyImage:
        "https://images.unsplash.com/photo-1693944545929-5a104523778f",
      propertyImageAlt:
        "Luxurious penthouse terrace with city skyline view and modern outdoor furniture in Gurgaon",
      date: "2025-10-22",
      time: "11:00",
      mode: "phone",
      status: "pending",
      agent: {
        id: 4,
        name: "Vikram Singh",
        role: "Senior Sales Manager",
        phone: "+91-9876543213",
        whatsapp: "919876543213",
        avatar: "https://images.unsplash.com/photo-1492285960178-335ca44794dc",
        avatarAlt:
          "Professional headshot of Sikh man with turban and beard in formal shirt",
      },
      requirements: "Discuss financing options and payment plans",
    },
    {
      id: 5,
      propertyId: "prop-5",
      propertyTitle: "Cozy 1BHK Studio in Bangalore",
      propertyLocation: "Koramangala, Bangalore",
      propertyImage:
        "https://images.unsplash.com/photo-1722604676716-5c0135828a5d",
      propertyImageAlt:
        "Modern studio apartment with open floor plan and large windows in Bangalore tech hub",
      date: "2025-10-12",
      time: "09:00",
      mode: "virtual",
      status: "cancelled",
      agent: {
        id: 5,
        name: "Kavya Nair",
        role: "Property Consultant",
        phone: "+91-9876543214",
        whatsapp: "919876543214",
        avatar: "https://images.unsplash.com/photo-1700560970703-82fd3150d5ac",
        avatarAlt:
          "Professional headshot of South Indian woman with curly hair in teal blazer",
      },
      requirements: null,
    },
  ];

  // Mock properties for scheduling
  const properties = [
    {
      id: "prop-1",
      title: "Luxury 3BHK Apartment in Bandra West",
      location: "Bandra West, Mumbai",
    },
    {
      id: "prop-2",
      title: "Premium Villa with Garden in Pune",
      location: "Koregaon Park, Pune",
    },
    {
      id: "prop-3",
      title: "Modern 2BHK Flat in Andheri East",
      location: "Andheri East, Mumbai",
    },
    {
      id: "prop-4",
      title: "Spacious 4BHK Penthouse in Gurgaon",
      location: "Cyber City, Gurgaon",
    },
    {
      id: "prop-5",
      title: "Cozy 1BHK Studio in Bangalore",
      location: "Koramangala, Bangalore",
    },
  ];

  // Mock agents for scheduling
  const agents = [
    { id: 1, name: "Priya Sharma", role: "Senior Property Consultant" },
    { id: 2, name: "Amit Patel", role: "Property Specialist" },
    { id: 3, name: "Sneha Reddy", role: "Property Advisor" },
    { id: 4, name: "Vikram Singh", role: "Senior Sales Manager" },
    { id: 5, name: "Kavya Nair", role: "Property Consultant" },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const filterAppointments = () => {
    return appointments?.filter((appointment) => {
      // Status filter
      if (
        filters?.status !== "all" &&
        appointment?.status !== filters?.status
      ) {
        return false;
      }

      // Mode filter
      if (filters?.mode !== "all" && appointment?.mode !== filters?.mode) {
        return false;
      }

      // Time range filter
      if (filters?.timeRange !== "all") {
        const appointmentDate = new Date(
          `${appointment.date} ${appointment.time}`
        );
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        switch (filters?.timeRange) {
          case "upcoming":
            if (appointmentDate <= now || appointment?.status === "cancelled")
              return false;
            break;
          case "today":
            if (appointmentDate?.toDateString() !== today?.toDateString())
              return false;
            break;
          case "this-week":
            const weekStart = new Date(today);
            weekStart?.setDate(today?.getDate() - today?.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd?.setDate(weekStart?.getDate() + 6);
            if (appointmentDate < weekStart || appointmentDate > weekEnd)
              return false;
            break;
          case "this-month":
            if (
              appointmentDate?.getMonth() !== today?.getMonth() ||
              appointmentDate?.getFullYear() !== today?.getFullYear()
            )
              return false;
            break;
          case "past":
            if (appointmentDate > now) return false;
            break;
        }
      }

      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        const searchableText =
          `${appointment?.propertyTitle} ${appointment?.propertyLocation} ${appointment?.agent?.name}`?.toLowerCase();
        if (!searchableText?.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  };

  const handleScheduleAppointment = (appointmentData) => {
    console.log("Scheduling appointment:", appointmentData);
    // Here you would typically make an API call to schedule the appointment
    alert("Appointment scheduled successfully!");
  };

  const handleReschedule = (appointmentId) => {
    console.log("Rescheduling appointment:", appointmentId);
    // Here you would open a reschedule modal or navigate to reschedule page
    alert("Reschedule functionality would be implemented here");
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      console.log("Cancelling appointment:", appointmentId);
      // Here you would make an API call to cancel the appointment
      alert("Appointment cancelled successfully");
    }
  };

  const handleJoinMeeting = (appointmentId) => {
    console.log("Joining meeting for appointment:", appointmentId);
    // Here you would redirect to the meeting platform
    window.open("https://meet.google.com/sample-meeting-link", "_blank");
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      mode: "all",
      timeRange: "all",
      search: "",
    });
  };

  const filteredAppointments = filterAppointments();

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        notificationCount={3}
        onLogout={() => navigate("/login")}
        onSearch={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Appointment Management
            </h1>
            <p className="text-muted-foreground">
              Manage your property viewing appointments and schedule new ones
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button
              variant="outline"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate("/property-listings")}
            >
              Browse Properties
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Appointment Statistics */}
        <AppointmentStats appointments={appointments} />

        {/* Appointment Filters */}
        <AppointmentFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="xl:col-span-2">
            <AppointmentCalendar
              appointments={appointments}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Today's Appointments
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {
                      appointments?.filter((apt) => {
                        const today = new Date()?.toDateString();
                        return new Date(apt.date)?.toDateString() === today;
                      })?.length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    This Week
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {
                      appointments?.filter((apt) => {
                        const aptDate = new Date(apt.date);
                        const today = new Date();
                        const weekStart = new Date(
                          today.setDate(today.getDate() - today.getDay())
                        );
                        const weekEnd = new Date(
                          today.setDate(today.getDate() - today.getDay() + 6)
                        );
                        return aptDate >= weekStart && aptDate <= weekEnd;
                      })?.length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pending Confirmations
                  </span>
                  <span className="text-sm font-medium text-warning">
                    {
                      appointments?.filter((apt) => apt?.status === "pending")
                        ?.length
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Next Appointments
              </h3>
              <div className="space-y-3">
                {appointments
                  ?.filter((apt) => {
                    const aptDate = new Date(`${apt.date} ${apt.time}`);
                    return aptDate > new Date() && apt?.status !== "cancelled";
                  })
                  ?.sort(
                    (a, b) =>
                      new Date(`${a.date} ${a.time}`) -
                      new Date(`${b.date} ${b.time}`)
                  )
                  ?.slice(0, 3)
                  ?.map((apt) => (
                    <div key={apt?.id} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground truncate">
                        {apt?.propertyTitle}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon
                          name="Calendar"
                          size={12}
                          className="text-muted-foreground"
                        />
                        <span className="text-xs text-muted-foreground">
                          {new Date(apt.date)?.toLocaleDateString("en-IN")} at{" "}
                          {apt?.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon
                          name="User"
                          size={12}
                          className="text-muted-foreground"
                        />
                        <span className="text-xs text-muted-foreground">
                          {apt?.agent?.name}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              All Appointments ({filteredAppointments?.length})
            </h2>
          </div>

          {filteredAppointments?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="Calendar"
                  size={32}
                  className="text-muted-foreground"
                />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No appointments found
              </h3>
              <p className="text-muted-foreground mb-6">
                {filters?.status !== "all" ||
                filters?.mode !== "all" ||
                filters?.timeRange !== "all" ||
                filters?.search
                  ? "Try adjusting your filters to see more appointments."
                  : "Schedule your first property viewing appointment to get started."}
              </p>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                Schedule Appointment
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments?.map((appointment) => (
                <AppointmentCard
                  key={appointment?.id}
                  appointment={appointment}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  onJoinMeeting={handleJoinMeeting}
                  onViewProperty={handleViewProperty}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Schedule Appointment Modal */}
      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleAppointment}
        properties={properties}
        agents={agents}
      />

      {/* Floating Chat */}
      <FloatingChat
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
};

export default AppointmentManagement;
