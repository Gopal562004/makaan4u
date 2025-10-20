import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const ScheduleAppointmentModal = ({
  isOpen,
  onClose,
  onSchedule,
  properties,
  agents,
}) => {
  const [formData, setFormData] = useState({
    propertyId: "",
    agentId: "",
    date: "",
    time: "",
    mode: "in-person",
    requirements: "",
  });

  const [errors, setErrors] = useState({});

  const meetingModes = [
    { value: "in-person", label: "In-Person Visit" },
    { value: "virtual", label: "Virtual Tour" },
    { value: "phone", label: "Phone Consultation" },
  ];

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
  ];

  const propertyOptions = properties?.map((property) => ({
    value: property?.id,
    label: `${property?.title} - ${property?.location}`,
  }));

  const agentOptions = agents?.map((agent) => ({
    value: agent?.id,
    label: `${agent?.name} - ${agent?.role}`,
  }));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.propertyId) {
      newErrors.propertyId = "Please select a property";
    }
    if (!formData?.agentId) {
      newErrors.agentId = "Please select an agent";
    }
    if (!formData?.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }
    if (!formData?.time) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSchedule(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      propertyId: "",
      agentId: "",
      date: "",
      time: "",
      mode: "in-person",
      requirements: "",
    });
    setErrors({});
    onClose();
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split("T")?.[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Schedule Appointment
              </h2>
              <p className="text-sm text-muted-foreground">
                Book a property viewing session
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Select Property"
              placeholder="Choose a property"
              options={propertyOptions}
              value={formData?.propertyId}
              onChange={(value) => handleInputChange("propertyId", value)}
              error={errors?.propertyId}
              required
              searchable
            />

            <Select
              label="Select Agent"
              placeholder="Choose an agent"
              options={agentOptions}
              value={formData?.agentId}
              onChange={(value) => handleInputChange("agentId", value)}
              error={errors?.agentId}
              required
              searchable
            />
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange("date", e?.target?.value)}
              error={errors?.date}
              min={getMinDate()}
              required
            />

            <Select
              label="Preferred Time"
              placeholder="Choose time slot"
              options={timeSlots}
              value={formData?.time}
              onChange={(value) => handleInputChange("time", value)}
              error={errors?.time}
              required
            />
          </div>

          {/* Meeting Mode */}
          <Select
            label="Meeting Mode"
            placeholder="Select meeting type"
            options={meetingModes}
            value={formData?.mode}
            onChange={(value) => handleInputChange("mode", value)}
            required
          />

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Special Requirements (Optional)
            </label>
            <textarea
              value={formData?.requirements}
              onChange={(e) =>
                handleInputChange("requirements", e?.target?.value)
              }
              placeholder="Any specific requirements or questions for the agent..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>

          {/* Meeting Mode Info */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon
                name={
                  formData?.mode === "virtual"
                    ? "Video"
                    : formData?.mode === "phone"
                    ? "Phone"
                    : "MapPin"
                }
                size={20}
                className="text-primary mt-0.5"
              />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {formData?.mode === "virtual"
                    ? "Virtual Tour"
                    : formData?.mode === "phone"
                    ? "Phone Consultation"
                    : "In-Person Visit"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {formData?.mode === "virtual"
                    ? "Join a live video tour of the property from anywhere. You'll receive a meeting link via email."
                    : formData?.mode === "phone"
                    ? "Discuss property details over a phone call. Perfect for initial inquiries and questions."
                    : "Visit the property in person with our agent. Get the full experience and ask questions on-site."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;
