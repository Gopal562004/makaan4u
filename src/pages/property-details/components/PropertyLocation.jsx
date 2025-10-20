import React from "react";
import Icon from "../../../components/AppIcon";

const PropertyLocation = ({ property }) => {
  const nearbyPlaces = [
    { name: "Metro Station", distance: "0.5 km", icon: "Train" },
    { name: "Shopping Mall", distance: "1.2 km", icon: "ShoppingBag" },
    { name: "Hospital", distance: "2.1 km", icon: "Heart" },
    { name: "School", distance: "0.8 km", icon: "GraduationCap" },
    { name: "Bank", distance: "0.3 km", icon: "Building2" },
    { name: "Restaurant", distance: "0.2 km", icon: "Utensils" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Location & Neighborhood
        </h3>

        {/* Address */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary mt-1" />
            <div>
              <p className="font-medium text-foreground">{property?.address}</p>
              <p className="text-muted-foreground">{property?.location}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Pincode: {property?.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-64 rounded-lg overflow-hidden border border-border mb-6">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={property?.title}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${property?.coordinates?.lat},${property?.coordinates?.lng}&z=14&output=embed`}
            className="w-full h-full"
          />
        </div>

        {/* Nearby Places */}
        <div>
          <h4 className="text-lg font-medium text-foreground mb-4">
            Nearby Places
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nearbyPlaces?.map((place, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={place?.icon} size={18} className="text-primary" />
                  <span className="text-foreground">{place?.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {place?.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div className="mt-6">
          <h4 className="text-lg font-medium text-foreground mb-4">
            Transportation
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Car" size={18} className="text-primary" />
                <span className="text-foreground">City Center</span>
              </div>
              <span className="text-sm text-muted-foreground">
                15 min drive
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Bus" size={18} className="text-primary" />
                <span className="text-foreground">Bus Stop</span>
              </div>
              <span className="text-sm text-muted-foreground">2 min walk</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Plane" size={18} className="text-primary" />
                <span className="text-foreground">Airport</span>
              </div>
              <span className="text-sm text-muted-foreground">
                45 min drive
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;
