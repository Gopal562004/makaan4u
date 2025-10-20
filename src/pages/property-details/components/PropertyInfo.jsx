import React from "react";
import Icon from "../../../components/AppIcon";

const PropertyInfo = ({ property }) => {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000)?.toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000)?.toFixed(1)} L`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  const specifications = [
    { icon: "Bed", label: "Bedrooms", value: property?.bedrooms },
    { icon: "Bath", label: "Bathrooms", value: property?.bathrooms },
    { icon: "Square", label: "Area", value: `${property?.area} sq ft` },
    { icon: "Building2", label: "Type", value: property?.type },
    { icon: "Calendar", label: "Built Year", value: property?.builtYear },
    { icon: "Car", label: "Parking", value: property?.parking },
  ];

  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {property?.title}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(property?.price)}
          </span>
          {property?.originalPrice &&
            property?.originalPrice > property?.price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(property?.originalPrice)}
              </span>
            )}
        </div>
        <div className="flex items-center text-muted-foreground">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span>{property?.location}</span>
        </div>
      </div>
      {/* Property Status */}
      <div className="flex items-center space-x-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            property?.status === "available"
              ? "bg-success/10 text-success"
              : property?.status === "sold"
              ? "bg-error/10 text-error"
              : "bg-warning/10 text-warning"
          }`}
        >
          {property?.status === "available"
            ? "Available"
            : property?.status === "sold"
            ? "Sold"
            : "Under Contract"}
        </span>
        {property?.featured && (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
            Featured
          </span>
        )}
      </div>
      {/* Specifications Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specifications?.map((spec, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon
              name={spec?.icon}
              size={24}
              className="text-primary mx-auto mb-2"
            />
            <p className="text-sm text-muted-foreground">{spec?.label}</p>
            <p className="font-semibold text-foreground">{spec?.value}</p>
          </div>
        ))}
      </div>
      {/* Description */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Description
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {property?.description}
        </p>
      </div>
      {/* Amenities */}
      {property?.amenities && property?.amenities?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property?.amenities?.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-muted-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Property Features */}
      {property?.features && property?.features?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {property?.features?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Star" size={16} className="text-warning mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
