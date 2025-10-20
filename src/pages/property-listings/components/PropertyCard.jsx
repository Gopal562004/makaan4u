import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const PropertyCard = ({
  property,
  onWishlistToggle,
  isWishlisted = false,
  viewMode = "grid",
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000)?.toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000)?.toFixed(1)} L`;
    return `₹${price?.toLocaleString()}`;
  };

  const handleViewDetails = () => {
    navigate(`/property-details/${property?.id}`);
  };

  const handleWishlistClick = (e) => {
    e?.stopPropagation();
    onWishlistToggle?.(property?.id);
  };

  const handleAgentContact = (e) => {
    e?.stopPropagation();
    const message = `Hi, I'm interested in your property: ${property?.title}`;
    const whatsappUrl = `https://wa.me/${
      property?.agent?.phone
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (viewMode === "list") {
    return (
      <div
        className="bg-card border border-border rounded-lg p-4 hover:shadow-moderate transition-all duration-200 cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="flex space-x-4">
          {/* Image */}
          <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={property?.images?.[0]}
              alt={property?.imageAlt}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoading(false)}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                  {property?.title}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {property?.location}
                </p>
              </div>
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-full transition-smooth ${
                  isWishlisted
                    ? "text-error bg-error/10 hover:bg-error/20"
                    : "text-muted-foreground hover:text-error hover:bg-error/10"
                }`}
              >
                <Icon
                  name="Heart"
                  size={18}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Bed" size={14} className="mr-1" />
                {property?.bedrooms} Beds
              </span>
              <span className="flex items-center">
                <Icon name="Bath" size={14} className="mr-1" />
                {property?.bathrooms} Baths
              </span>
              <span className="flex items-center">
                <Icon name="Square" size={14} className="mr-1" />
                {property?.area} sq ft
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(property?.price)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Agent: {property?.agent?.name}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAgentContact}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contact
                </Button>
                <Button size="sm" onClick={handleViewDetails}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-moderate transition-all duration-200 group cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={property?.images?.[0]}
          alt={property?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoading(false)}
        />

        {/* Overlay Elements */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              property?.status === "available"
                ? "bg-success text-success-foreground"
                : property?.status === "sold"
                ? "bg-error text-error-foreground"
                : "bg-warning text-warning-foreground"
            }`}
          >
            {property?.status?.charAt(0)?.toUpperCase() +
              property?.status?.slice(1)}
          </span>
        </div>

        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isWishlisted
              ? "bg-error/20 text-error"
              : "bg-background/20 text-white hover:bg-error/20 hover:text-error"
          }`}
        >
          <Icon
            name="Heart"
            size={16}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 text-xs font-medium rounded-full">
            {property?.type?.charAt(0)?.toUpperCase() +
              property?.type?.slice(1)}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {property?.title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Icon name="MapPin" size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{property?.location}</span>
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Icon name="Bed" size={14} className="mr-1" />
            {property?.bedrooms}
          </span>
          <span className="flex items-center">
            <Icon name="Bath" size={14} className="mr-1" />
            {property?.bathrooms}
          </span>
          <span className="flex items-center">
            <Icon name="Square" size={14} className="mr-1" />
            {property?.area} sq ft
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(property?.price)}
          </p>
          <p className="text-xs text-muted-foreground">
            ₹{Math.round(property?.price / property?.area)?.toLocaleString()}{" "}
            per sq ft
          </p>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded-md">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">
                {property?.agent?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {property?.agent?.name}
              </p>
              <p className="text-xs text-muted-foreground">Agent</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAgentContact}
            iconName="Phone"
            iconPosition="left"
          >
            Call
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            fullWidth
            onClick={handleAgentContact}
            iconName="MessageCircle"
            iconPosition="left"
          >
            WhatsApp
          </Button>
          <Button fullWidth onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
