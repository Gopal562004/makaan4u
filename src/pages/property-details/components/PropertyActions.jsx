import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyActions = ({
  property,
  onScheduleViewing,
  onWhatsAppContact,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically make an API call to add/remove from wishlist
  };

  const handleShare = async () => {
    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: `Check out this amazing property: ${property?.title}`,
          url: window.location?.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard?.writeText(window.location?.href);
        alert("Property link copied to clipboard!");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }

    setIsSharing(false);
  };

  const handleDownloadBrochure = () => {
    // Simulate brochure download
    const link = document.createElement("a");
    link.href = "#"; // In real app, this would be the brochure URL
    link.download = `${property?.title?.replace(/\s+/g, "_")}_Brochure.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    alert("Brochure download started!");
  };

  const handleCalculateEMI = () => {
    // Navigate to EMI calculator or open modal
    alert("EMI Calculator feature coming soon!");
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="default"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={onScheduleViewing}
        >
          Schedule Viewing
        </Button>

        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={onWhatsAppContact}
        >
          WhatsApp
        </Button>
      </div>
      {/* Secondary Actions */}
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          className={isWishlisted ? "text-error" : ""}
        >
          <Icon
            name="Heart"
            size={20}
            className={isWishlisted ? "fill-current" : ""}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          loading={isSharing}
        >
          <Icon name="Share2" size={20} />
        </Button>

        <Button variant="ghost" size="icon" onClick={handleDownloadBrochure}>
          <Icon name="Download" size={20} />
        </Button>

        <Button variant="ghost" size="icon" onClick={handleCalculateEMI}>
          <Icon name="Calculator" size={20} />
        </Button>
      </div>
      {/* Action Labels */}
      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground text-center">
        <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
        <span>Share</span>
        <span>Brochure</span>
        <span>EMI Calculator</span>
      </div>
      {/* Property Status Alert */}
      {property?.status !== "available" && (
        <div
          className={`p-3 rounded-lg border ${
            property?.status === "sold"
              ? "bg-error/10 border-error/20 text-error"
              : "bg-warning/10 border-warning/20 text-warning"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Icon
              name={property?.status === "sold" ? "AlertCircle" : "Clock"}
              size={16}
            />
            <span className="text-sm font-medium">
              {property?.status === "sold"
                ? "This property has been sold"
                : "This property is under contract"}
            </span>
          </div>
        </div>
      )}
      {/* Contact Disclaimer */}
      <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
        <p>
          By contacting the agent, you agree to our terms of service and privacy
          policy.
        </p>
      </div>
    </div>
  );
};

export default PropertyActions;
