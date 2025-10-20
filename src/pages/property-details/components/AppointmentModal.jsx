import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const AppointmentModal = ({ isOpen, onClose, property, agent }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mode: "in-person",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  const meetingModes = [
    { value: "in-person", label: "In-Person Visit" },
    { value: "virtual", label: "Virtual Tour" },
    { value: "phone", label: "Phone Call" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message and close modal
    alert(
      "Appointment scheduled successfully! You will receive a confirmation email shortly."
    );
    setIsSubmitting(false);
    onClose();

    // Reset form
    setFormData({
      date: "",
      time: "",
      mode: "in-person",
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split("T")?.[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[75vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Schedule Property Viewing
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {property?.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              label="Preferred Date"
              value={formData?.date}
              onChange={(e) => handleInputChange("date", e?.target?.value)}
              min={getMinDate()}
              required
            />
            <Select
              label="Preferred Time"
              options={timeSlots}
              value={formData?.time}
              onChange={(value) => handleInputChange("time", value)}
              placeholder="Select time"
              required
            />
          </div>

          {/* Meeting Mode */}
          <Select
            label="Meeting Mode"
            options={meetingModes}
            value={formData?.mode}
            onChange={(value) => handleInputChange("mode", value)}
            required
          />

          {/* Contact Information */}
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={(e) => handleInputChange("name", e?.target?.value)}
            required
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange("email", e?.target?.value)}
            required
          />

          <Input
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData?.phone}
            onChange={(e) => handleInputChange("phone", e?.target?.value)}
            required
          />

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Any specific requirements or questions..."
              value={formData?.message}
              onChange={(e) => handleInputChange("message", e?.target?.value)}
            />
          </div>

          {/* Agent Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {agent?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{agent?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {agent?.designation}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              iconName="Calendar"
              iconPosition="left"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Viewing"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
