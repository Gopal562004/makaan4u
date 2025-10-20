import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyMap = ({ properties, onPropertySelect, selectedProperty }) => {
  const [mapCenter] = useState({ lat: 19.076, lng: 72.8777 }); // Mumbai coordinates

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000)?.toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000)?.toFixed(1)}L`;
    return `₹${price?.toLocaleString()}`;
  };

  const handlePropertyClick = (property) => {
    onPropertySelect?.(property);
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Properties Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
          className="border-0"
        />
      </div>
      {/* Property Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {properties?.map((property, index) => {
          // Simulate marker positions based on property index
          const markerStyle = {
            position: "absolute",
            left: `${20 + (index % 5) * 15}%`,
            top: `${20 + Math.floor(index / 5) * 20}%`,
            pointerEvents: "auto",
          };

          return (
            <div key={property?.id} style={markerStyle}>
              <button
                onClick={() => handlePropertyClick(property)}
                className={`relative bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-moderate hover:shadow-prominent transition-all duration-200 transform hover:scale-105 ${
                  selectedProperty?.id === property?.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
              >
                <div className="text-xs font-semibold whitespace-nowrap">
                  {formatPrice(property?.price)}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
              </button>
            </div>
          );
        })}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          title="Zoom In"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          title="Zoom Out"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          title="My Location"
        >
          <Icon name="MapPin" size={16} />
        </Button>
      </div>
      {/* Selected Property Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-prominent p-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <img
                src={selectedProperty?.images?.[0]}
                alt={selectedProperty?.imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">
                {selectedProperty?.title}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center">
                <Icon name="MapPin" size={12} className="mr-1" />
                {selectedProperty?.location}
              </p>
              <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                <span>{selectedProperty?.bedrooms} beds</span>
                <span>{selectedProperty?.bathrooms} baths</span>
                <span>{selectedProperty?.area} sq ft</span>
              </div>
              <p className="text-lg font-bold text-primary mt-1">
                {formatPrice(selectedProperty?.price)}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                size="sm"
                onClick={() =>
                  window.open(
                    `/property-details/${selectedProperty?.id}`,
                    "_blank"
                  )
                }
              >
                View
              </Button>
              <button
                onClick={() => onPropertySelect(null)}
                className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          Map Legend
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Available Properties</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">Recently Sold</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-muted-foreground">Under Offer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
