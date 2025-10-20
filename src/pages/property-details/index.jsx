// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Header from "../../components/ui/Header";
// import FloatingChat from "../../components/ui/FloatingChat";
// import PropertyImageGallery from "./components/PropertyImageGallery";
// import PropertyInfo from "./components/PropertyInfo";
// import AgentCard from "./components/AgentCard";
// import AppointmentModal from "./components/AppointmentModal";
// import PropertyLocation from "./components/PropertyLocation";
// import SimilarProperties from "./components/SimilarProperties";
// import PropertyActions from "./components/PropertyActions";
// import Icon from "../../components/AppIcon";
// import Button from "../../components/ui/Button";

// const PropertyDetails = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [user, setUser] = useState(null);

//   // Mock property data
//   const mockProperty = {
//     id: 1,
//     title: "Luxury 3BHK Apartment with Premium Amenities",
//     price: 15000000,
//     originalPrice: 16500000,
//     location: "Andheri West, Mumbai",
//     address: "Plot No. 123, Veera Desai Road, Andheri West",
//     pincode: "400053",
//     coordinates: {
//       lat: 19.1334,
//       lng: 72.8267,
//     },
//     status: "available",
//     featured: true,
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 1250,
//     type: "Apartment",
//     builtYear: "2022",
//     parking: "2 Covered",
//     description: `This stunning 3BHK apartment offers the perfect blend of luxury and comfort in the heart of Andheri West. Featuring spacious rooms with premium finishes, modern amenities, and excellent connectivity to major business districts.\n\nThe apartment boasts of high-quality Italian marble flooring, modular kitchen with branded appliances, and large windows offering abundant natural light. The building features 24/7 security, power backup, and recreational facilities.\n\nLocated in a prime area with easy access to metro stations, shopping malls, schools, and hospitals. This is an ideal investment opportunity for both end-users and investors.`,
//     amenities: [
//       "Swimming Pool",
//       "Gymnasium",
//       "Children's Play Area",
//       "Landscaped Gardens",
//       "24/7 Security",
//       "Power Backup",
//       "Lift",
//       "Parking",
//       "Club House",
//       "Jogging Track",
//       "Indoor Games",
//       "CCTV Surveillance",
//     ],

//     features: [
//       "Premium Italian marble flooring throughout the apartment",
//       "Modular kitchen with granite countertops and branded appliances",
//       "Master bedroom with attached bathroom and walk-in wardrobe",
//       "Large balconies with city views from all bedrooms",
//       "High-speed internet connectivity and cable TV points",
//       "Earthquake resistant RCC structure with modern architecture",
//     ],

//     images: [
//       {
//         url: "https://images.unsplash.com/photo-1698673786592-cd5730baf7d7",
//         alt: "Spacious living room with modern furniture, large windows, and elegant interior design",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
//         alt: "Modern kitchen with granite countertops, stainless steel appliances, and ample storage",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1723470918065-13488200464c",
//         alt: "Master bedroom with king-size bed, wooden flooring, and large windows with city view",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1730881123778-053fc13c501c",
//         alt: "Luxurious bathroom with modern fixtures, marble tiles, and glass shower enclosure",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1725003940447-4663f27fab8e",
//         alt: "Spacious balcony with outdoor furniture overlooking city skyline and green spaces",
//       },
//     ],

//     agent: {
//       id: 1,
//       name: "Rajesh Kumar",
//       designation: "Senior Property Consultant",
//       avatar: "https://images.unsplash.com/photo-1691671318357-370ca801ad5f",
//       avatarAlt:
//         "Professional headshot of middle-aged Indian man with mustache in formal blue shirt",
//       phone: "+91 98765 43210",
//       email: "rajesh.kumar@realconnect.com",
//       location: "Andheri West, Mumbai",
//       rating: 4.8,
//       reviewCount: 127,
//       propertiesSold: 85,
//       experience: "8+",
//       languages: ["English", "Hindi", "Marathi", "Gujarati"],
//     },
//   };

//   useEffect(() => {
//     // Simulate loading property data
//     const propertyId = searchParams?.get("id") || "1";
//     setProperty(mockProperty);

//     // Mock user data
//     setUser({
//       name: "John Doe",
//       email: "john.doe@example.com",
//       role: "buyer",
//     });
//   }, [searchParams]);

//   const handleScheduleViewing = () => {
//     setIsAppointmentModalOpen(true);
//   };

//   const handleWhatsAppContact = () => {
//     const message = encodeURIComponent(
//       `Hi ${property?.agent?.name}, I'm interested in the property: ${property?.title}. Can we schedule a viewing?`
//     );
//     window.open(
//       `https://wa.me/${property?.agent?.phone?.replace(
//         /\D/g,
//         ""
//       )}?text=${message}`,
//       "_blank"
//     );
//   };

//   const handleBackToListings = () => {
//     navigate("/property-listings");
//   };

//   const tabs = [
//     { id: "overview", label: "Overview", icon: "Home" },
//     { id: "location", label: "Location", icon: "MapPin" },
//     { id: "similar", label: "Similar Properties", icon: "Building2" },
//   ];

//   if (!property) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header user={user} />
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//             <p className="text-muted-foreground">Loading property details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header
//         user={user}
//         onLogout={() => navigate("/login")}
//         onSearch={() => {}}
//       />

//       <main className="container mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
//           <button
//             onClick={() => navigate("/home-page")}
//             className="hover:text-foreground transition-smooth"
//           >
//             Home
//           </button>
//           <Icon name="ChevronRight" size={16} />
//           <button
//             onClick={handleBackToListings}
//             className="hover:text-foreground transition-smooth"
//           >
//             Properties
//           </button>
//           <Icon name="ChevronRight" size={16} />
//           <span className="text-foreground">Property Details</span>
//         </div>

//         {/* Back Button */}
//         <div className="mb-6">
//           <Button
//             variant="outline"
//             onClick={handleBackToListings}
//             iconName="ArrowLeft"
//             iconPosition="left"
//           >
//             Back to Listings
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Image Gallery */}
//             <PropertyImageGallery images={property?.images} />

//             {/* Mobile Actions */}
//             <div className="lg:hidden">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//               />
//             </div>

//             {/* Tabs */}
//             <div className="border-b border-border">
//               <nav className="flex space-x-8">
//                 {tabs?.map((tab) => (
//                   <button
//                     key={tab?.id}
//                     onClick={() => setActiveTab(tab?.id)}
//                     className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
//                       activeTab === tab?.id
//                         ? "border-primary text-primary"
//                         : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
//                     }`}
//                   >
//                     <Icon name={tab?.icon} size={16} />
//                     <span>{tab?.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Tab Content */}
//             <div className="min-h-[400px]">
//               {activeTab === "overview" && <PropertyInfo property={property} />}
//               {activeTab === "location" && (
//                 <PropertyLocation property={property} />
//               )}
//               {activeTab === "similar" && (
//                 <SimilarProperties currentPropertyId={property?.id} />
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Agent Card */}
//             <AgentCard
//               agent={property?.agent}
//               onScheduleViewing={handleScheduleViewing}
//               onWhatsAppContact={handleWhatsAppContact}
//             />

//             {/* Desktop Actions */}
//             <div className="hidden lg:block">
//               <PropertyActions
//                 property={property}
//                 onScheduleViewing={handleScheduleViewing}
//                 onWhatsAppContact={handleWhatsAppContact}
//               />
//             </div>

//             {/* Quick Info Card */}
//             <div className="bg-card border border-border rounded-lg p-6">
//               <h4 className="font-semibold text-foreground mb-4">
//                 Quick Information
//               </h4>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Property ID</span>
//                   <span className="text-foreground font-medium">
//                     RC{property?.id?.toString()?.padStart(6, "0")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Listed Date</span>
//                   <span className="text-foreground">15 Oct 2024</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Property Age</span>
//                   <span className="text-foreground">2 Years</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Possession</span>
//                   <span className="text-foreground">Ready to Move</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Facing</span>
//                   <span className="text-foreground">North-East</span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Support */}
//             <div className="bg-muted/50 rounded-lg p-6 text-center">
//               <Icon
//                 name="Headphones"
//                 size={32}
//                 className="text-primary mx-auto mb-3"
//               />
//               <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Our support team is here to assist you with any questions.
//               </p>
//               <Button variant="outline" size="sm" fullWidth>
//                 Contact Support
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//       {/* Appointment Modal */}
//       <AppointmentModal
//         isOpen={isAppointmentModalOpen}
//         onClose={() => setIsAppointmentModalOpen(false)}
//         property={property}
//         agent={property?.agent}
//       />

//       {/* Floating Chat */}
//       <FloatingChat
//         isOpen={isChatOpen}
//         onToggle={() => setIsChatOpen(!isChatOpen)}
//       />
//     </div>
//   );
// };

// export default PropertyDetails;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import PropertyImageGallery from "./components/PropertyImageGallery";
import PropertyInfo from "./components/PropertyInfo";
import AgentCard from "./components/AgentCard";
import AppointmentModal from "./components/AppointmentModal";
import PropertyLocation from "./components/PropertyLocation";
import SimilarProperties from "./components/SimilarProperties";
import PropertyActions from "./components/PropertyActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

// Move mock data outside component to prevent recreation on every render
const mockProperty = {
  id: 1,
  title: "Luxury 3BHK Apartment with Premium Amenities",
  price: 15000000,
  originalPrice: 16500000,
  location: "Andheri West, Mumbai",
  address: "Plot No. 123, Veera Desai Road, Andheri West",
  pincode: "400053",
  coordinates: {
    lat: 19.1334,
    lng: 72.8267,
  },
  status: "available",
  featured: true,
  bedrooms: 3,
  bathrooms: 2,
  area: 1250,
  type: "Apartment",
  builtYear: "2022",
  parking: "2 Covered",
  description: `This stunning 3BHK apartment offers the perfect blend of luxury and comfort in the heart of Andheri West. Featuring spacious rooms with premium finishes, modern amenities, and excellent connectivity to major business districts.\n\nThe apartment boasts of high-quality Italian marble flooring, modular kitchen with branded appliances, and large windows offering abundant natural light. The building features 24/7 security, power backup, and recreational facilities.\n\nLocated in a prime area with easy access to metro stations, shopping malls, schools, and hospitals. This is an ideal investment opportunity for both end-users and investors.`,
  amenities: [
    "Swimming Pool",
    "Gymnasium",
    "Children's Play Area",
    "Landscaped Gardens",
    "24/7 Security",
    "Power Backup",
    "Lift",
    "Parking",
    "Club House",
    "Jogging Track",
    "Indoor Games",
    "CCTV Surveillance",
  ],
  features: [
    "Premium Italian marble flooring throughout the apartment",
    "Modular kitchen with granite countertops and branded appliances",
    "Master bedroom with attached bathroom and walk-in wardrobe",
    "Large balconies with city views from all bedrooms",
    "High-speed internet connectivity and cable TV points",
    "Earthquake resistant RCC structure with modern architecture",
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1698673786592-cd5730baf7d7",
      alt: "Spacious living room with modern furniture, large windows, and elegant interior design",
    },
    {
      url: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
      alt: "Modern kitchen with granite countertops, stainless steel appliances, and ample storage",
    },
    {
      url: "https://images.unsplash.com/photo-1723470918065-13488200464c",
      alt: "Master bedroom with king-size bed, wooden flooring, and large windows with city view",
    },
    {
      url: "https://images.unsplash.com/photo-1730881123778-053fc13c501c",
      alt: "Luxurious bathroom with modern fixtures, marble tiles, and glass shower enclosure",
    },
    {
      url: "https://images.unsplash.com/photo-1725003940447-4663f27fab8e",
      alt: "Spacious balcony with outdoor furniture overlooking city skyline and green spaces",
    },
  ],
  agent: {
    id: 1,
    name: "Rajesh Kumar",
    designation: "Senior Property Consultant",
    avatar: "https://images.unsplash.com/photo-1691671318357-370ca801ad5f",
    avatarAlt:
      "Professional headshot of middle-aged Indian man with mustache in formal blue shirt",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@realconnect.com",
    location: "Andheri West, Mumbai",
    rating: 4.8,
    reviewCount: 127,
    propertiesSold: 85,
    experience: "8+",
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
  },
};

const PropertyDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);

  // Memoize tabs configuration to prevent recreation
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview", icon: "Home" },
      { id: "location", label: "Location", icon: "MapPin" },
      { id: "similar", label: "Similar Properties", icon: "Building2" },
    ],
    []
  );

  // Optimize useEffect with proper dependencies
  useEffect(() => {
    // Simulate loading property data
    const propertyId = searchParams?.get("id") || "1";
    setProperty(mockProperty);

    // Mock user data
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "buyer",
    });
  }, [searchParams]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleScheduleViewing = useCallback(() => {
    setIsAppointmentModalOpen(true);
  }, []);

  const handleWhatsAppContact = useCallback(() => {
    if (!property?.agent?.phone) return;

    const message = encodeURIComponent(
      `Hi ${property.agent.name}, I'm interested in the property: ${property.title}. Can we schedule a viewing?`
    );
    const phoneNumber = property.agent.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }, [property]);

  const handleBackToListings = useCallback(() => {
    navigate("/property-listings");
  }, [navigate]);

  const handleCloseAppointmentModal = useCallback(() => {
    setIsAppointmentModalOpen(false);
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleHomeNavigate = useCallback(() => {
    navigate("/home-page");
  }, [navigate]);

  // Memoize property ID formatting
  const formattedPropertyId = useMemo(() => {
    return property ? `RC${property.id.toString().padStart(6, "0")}` : "";
  }, [property]);

  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "overview":
        return <PropertyInfo property={property} />;
      case "location":
        return <PropertyLocation property={property} />;
      case "similar":
        return <SimilarProperties currentPropertyId={property?.id} />;
      default:
        return <PropertyInfo property={property} />;
    }
  }, [activeTab, property]);

  // Loading state
  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLogout={() => navigate("/login")}
        onSearch={() => {}}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <button
            onClick={handleHomeNavigate}
            className="hover:text-foreground transition-smooth"
          >
            Home
          </button>
          <Icon name="ChevronRight" size={16} />
          <button
            onClick={handleBackToListings}
            className="hover:text-foreground transition-smooth"
          >
            Properties
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Property Details</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBackToListings}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Listings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <PropertyImageGallery images={property.images} />

            {/* Mobile Actions */}
            <div className="lg:hidden">
              <PropertyActions
                property={property}
                onScheduleViewing={handleScheduleViewing}
                onWhatsAppContact={handleWhatsAppContact}
              />
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">{tabContent}</div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <AgentCard
              agent={property.agent}
              onScheduleViewing={handleScheduleViewing}
              onWhatsAppContact={handleWhatsAppContact}
            />

            {/* Desktop Actions */}
            <div className="hidden lg:block">
              <PropertyActions
                property={property}
                onScheduleViewing={handleScheduleViewing}
                onWhatsAppContact={handleWhatsAppContact}
              />
            </div>

            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">
                Quick Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property ID</span>
                  <span className="text-foreground font-medium">
                    {formattedPropertyId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed Date</span>
                  <span className="text-foreground">15 Oct 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Age</span>
                  <span className="text-foreground">2 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Possession</span>
                  <span className="text-foreground">Ready to Move</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Facing</span>
                  <span className="text-foreground">North-East</span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <Icon
                name="Headphones"
                size={32}
                className="text-primary mx-auto mb-3"
              />
              <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you with any questions.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
        property={property}
        agent={property.agent}
      />

      {/* Floating Chat */}
      <FloatingChat isOpen={isChatOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default React.memo(PropertyDetails);