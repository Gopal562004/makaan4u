import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const AgentCard = ({ agent, onScheduleViewing, onWhatsAppContact }) => {
  const handleCall = () => {
    window.open(`tel:${agent?.phone}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${agent?.email}`, "_self");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={agent?.avatar}
            alt={agent?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {agent?.name}
        </h3>
        <p className="text-muted-foreground mb-2">{agent?.designation}</p>
        <div className="flex items-center justify-center space-x-1 mb-2">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className={
                i < Math.floor(agent?.rating)
                  ? "text-warning fill-current"
                  : "text-muted-foreground"
              }
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            {agent?.rating} ({agent?.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Agent Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {agent?.propertiesSold}
          </p>
          <p className="text-sm text-muted-foreground">Properties Sold</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{agent?.experience}</p>
          <p className="text-sm text-muted-foreground">Years Experience</p>
        </div>
      </div>
      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{agent?.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Mail" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{agent?.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{agent?.location}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={onScheduleViewing}
        >
          Schedule Viewing
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onWhatsAppContact}
          >
            WhatsApp
          </Button>
          <Button
            variant="outline"
            iconName="Phone"
            iconPosition="left"
            onClick={handleCall}
          >
            Call
          </Button>
        </div>

        <Button
          variant="ghost"
          fullWidth
          iconName="Mail"
          iconPosition="left"
          onClick={handleEmail}
        >
          Send Email
        </Button>
      </div>
      {/* Languages Spoken */}
      {agent?.languages && agent?.languages?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Languages Spoken
          </h4>
          <div className="flex flex-wrap gap-2">
            {agent?.languages?.map((language, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCard;
