// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import Header from "../../components/ui/Header";
// // import FloatingChat from "../../components/ui/FloatingChat";
// // import FilterSidebar from "./components/FilterSidebar";
// // import SearchAndSort from "./components/SearchAndSort";
// // import PropertyGrid from "./components/PropertyGrid";
// // import PropertyMap from "./components/PropertyMap";
// // import Icon from "../../components/AppIcon";
// // import Button from "../../components/ui/Button";

// // const PropertyListings = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // State management
// //   const [user] = useState({
// //     id: 1,
// //     name: "Rahul Sharma",
// //     email: "rahul.sharma@email.com",
// //     role: "buyer",
// //   });

// //   const [filters, setFilters] = useState({
// //     priceRange: { min: "", max: "" },
// //     location: [],
// //     propertyType: [],
// //     bedrooms: "",
// //     bathrooms: "",
// //     amenities: [],
// //     agent: "",
// //   });

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortBy, setSortBy] = useState("relevance");
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [showMapView, setShowMapView] = useState(false);
// //   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [selectedMapProperty, setSelectedMapProperty] = useState(null);
// //   const [wishlistedProperties, setWishlistedProperties] = useState([1, 5, 8]);

// //   // Mock properties data
// //   const mockProperties = [
// //     {
// //       id: 1,
// //       title: "Luxury 3BHK Apartment in Bandra West",
// //       location: "Bandra West, Mumbai",
// //       price: 25000000,
// //       bedrooms: 3,
// //       bathrooms: 3,
// //       area: 1450,
// //       type: "apartment",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Modern luxury apartment living room with floor-to-ceiling windows, contemporary furniture, and city skyline view",
// //       agent: {
// //         id: 1,
// //         name: "Rajesh Kumar",
// //         phone: "919876543210",
// //         email: "rajesh@realconnect.com",
// //       },
// //       amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
// //       description: `Stunning 3BHK apartment in prime Bandra West location with panoramic sea views.\nFeatures modern amenities and premium finishes throughout.\nClose to shopping centers, restaurants, and transportation hubs.`,
// //     },
// //     {
// //       id: 2,
// //       title: "Spacious 4BHK Villa in Juhu",
// //       location: "Juhu, Mumbai",
// //       price: 85000000,
// //       bedrooms: 4,
// //       bathrooms: 4,
// //       area: 3200,
// //       type: "villa",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Elegant villa exterior with manicured garden, palm trees, and modern architectural design featuring white walls and large windows",
// //       agent: {
// //         id: 2,
// //         name: "Priya Sharma",
// //         phone: "919876543211",
// //         email: "priya@realconnect.com",
// //       },
// //       amenities: [
// //         "Swimming Pool",
// //         "Garden",
// //         "Parking",
// //         "Security",
// //         "Club House",
// //       ],
// //       description: `Magnificent 4BHK villa with private garden and swimming pool.\nPremium location near Juhu Beach with excellent connectivity.\nPerfect for families seeking luxury and comfort.`,
// //     },
// //     {
// //       id: 3,
// //       title: "Modern 2BHK Flat in Andheri East",
// //       location: "Andheri East, Mumbai",
// //       price: 12000000,
// //       bedrooms: 2,
// //       bathrooms: 2,
// //       area: 980,
// //       type: "apartment",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Contemporary 2BHK apartment interior with open-plan living area, modern kitchen, and large balcony overlooking city",
// //       agent: {
// //         id: 3,
// //         name: "Amit Patel",
// //         phone: "919876543212",
// //         email: "amit@realconnect.com",
// //       },
// //       amenities: ["Gym", "Parking", "Security", "Elevator"],
// //       description: `Well-designed 2BHK apartment in growing Andheri East area.\nExcellent connectivity to business districts and airports.\nIdeal for young professionals and small families.`,
// //     },
// //     {
// //       id: 4,
// //       title: "Premium 3BHK Penthouse in Worli",
// //       location: "Worli, Mumbai",
// //       price: 45000000,
// //       bedrooms: 3,
// //       bathrooms: 3,
// //       area: 2100,
// //       type: "apartment",
// //       status: "sold",
// //       images: [
// //         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Luxurious penthouse terrace with outdoor seating area, city skyline views, and modern architectural elements",
// //       agent: {
// //         id: 4,
// //         name: "Sneha Reddy",
// //         phone: "919876543213",
// //         email: "sneha@realconnect.com",
// //       },
// //       amenities: [
// //         "Swimming Pool",
// //         "Gym",
// //         "Parking",
// //         "Security",
// //         "Club House",
// //         "CCTV",
// //       ],
// //       description: `Exclusive penthouse with private terrace and stunning city views.\nPremium Worli location with world-class amenities.\nRecently sold to satisfied customer.`,
// //     },
// //     {
// //       id: 5,
// //       title: "Cozy 1BHK Studio in Powai",
// //       location: "Powai, Mumbai",
// //       price: 8500000,
// //       bedrooms: 1,
// //       bathrooms: 1,
// //       area: 650,
// //       type: "apartment",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Compact modern studio apartment with efficient space utilization, contemporary furniture, and large windows providing natural light",
// //       agent: {
// //         id: 5,
// //         name: "Vikram Singh",
// //         phone: "919876543214",
// //         email: "vikram@realconnect.com",
// //       },
// //       amenities: ["Gym", "Parking", "Security", "Power Backup"],
// //       description: `Compact yet comfortable 1BHK studio perfect for singles.\nLocated in tech hub Powai with excellent amenities.\nGreat investment opportunity in growing area.`,
// //     },
// //     {
// //       id: 6,
// //       title: "Elegant 5BHK Bungalow in Bandra",
// //       location: "Bandra, Mumbai",
// //       price: 120000000,
// //       bedrooms: 5,
// //       bathrooms: 5,
// //       area: 4500,
// //       type: "villa",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Grand bungalow with traditional architecture, spacious front yard, and elegant entrance featuring carved pillars and arched doorways",
// //       agent: {
// //         id: 1,
// //         name: "Rajesh Kumar",
// //         phone: "919876543210",
// //         email: "rajesh@realconnect.com",
// //       },
// //       amenities: [
// //         "Swimming Pool",
// //         "Garden",
// //         "Parking",
// //         "Security",
// //         "Club House",
// //         "Children's Play Area",
// //       ],
// //       description: `Magnificent 5BHK bungalow in prestigious Bandra location.\nSpacious rooms with traditional architecture and modern amenities.\nPerfect for large families seeking luxury living.`,
// //     },
// //     {
// //       id: 7,
// //       title: "Commercial Office Space in BKC",
// //       location: "Bandra Kurla Complex, Mumbai",
// //       price: 35000000,
// //       bedrooms: 0,
// //       bathrooms: 2,
// //       area: 1800,
// //       type: "commercial",
// //       status: "available",
// //       images: [
// //         "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Modern commercial office space with open floor plan, glass partitions, contemporary workstations, and city views",
// //       agent: {
// //         id: 2,
// //         name: "Priya Sharma",
// //         phone: "919876543211",
// //         email: "priya@realconnect.com",
// //       },
// //       amenities: ["Parking", "Security", "Elevator", "Power Backup", "CCTV"],
// //       description: `Prime commercial office space in Mumbai's financial district.\nModern infrastructure with excellent connectivity.\nIdeal for businesses and corporate offices.`,
// //     },
// //     {
// //       id: 8,
// //       title: "Affordable 2BHK in Thane West",
// //       location: "Thane West, Thane",
// //       price: 9500000,
// //       bedrooms: 2,
// //       bathrooms: 2,
// //       area: 850,
// //       type: "apartment",
// //       status: "under-offer",
// //       images: [
// //         "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
// //       ],
// //       imageAlt:
// //         "Comfortable 2BHK apartment with modern kitchen, spacious living room, and balcony with garden view",
// //       agent: {
// //         id: 3,
// //         name: "Amit Patel",
// //         phone: "919876543212",
// //         email: "amit@realconnect.com",
// //       },
// //       amenities: ["Gym", "Parking", "Security", "Garden"],
// //       description: `Well-planned 2BHK apartment in developing Thane West area.\nAffordable pricing with good amenities and connectivity.\nCurrently under offer - act fast!`,
// //     },
// //   ];

// //   // Filter and sort properties
// //   const getFilteredAndSortedProperties = () => {
// //     let filtered = [...mockProperties];

// //     // Apply search filter
// //     if (searchQuery) {
// //       filtered = filtered?.filter(
// //         (property) =>
// //           property?.title
// //             ?.toLowerCase()
// //             ?.includes(searchQuery?.toLowerCase()) ||
// //           property?.location
// //             ?.toLowerCase()
// //             ?.includes(searchQuery?.toLowerCase()) ||
// //           property?.type?.toLowerCase()?.includes(searchQuery?.toLowerCase())
// //       );
// //     }

// //     // Apply filters
// //     if (filters?.priceRange?.min || filters?.priceRange?.max) {
// //       filtered = filtered?.filter((property) => {
// //         const min = filters?.priceRange?.min
// //           ? parseInt(filters?.priceRange?.min)
// //           : 0;
// //         const max = filters?.priceRange?.max
// //           ? parseInt(filters?.priceRange?.max)
// //           : Infinity;
// //         return property?.price >= min && property?.price <= max;
// //       });
// //     }

// //     if (filters?.location?.length > 0) {
// //       filtered = filtered?.filter((property) =>
// //         filters?.location?.some((loc) => property?.location?.includes(loc))
// //       );
// //     }

// //     if (filters?.propertyType?.length > 0) {
// //       filtered = filtered?.filter((property) =>
// //         filters?.propertyType?.includes(property?.type)
// //       );
// //     }

// //     if (filters?.bedrooms) {
// //       const bedrooms =
// //         filters?.bedrooms === "4+" ? 4 : parseInt(filters?.bedrooms);
// //       filtered = filtered?.filter((property) =>
// //         filters?.bedrooms === "4+"
// //           ? property?.bedrooms >= bedrooms
// //           : property?.bedrooms === bedrooms
// //       );
// //     }

// //     if (filters?.bathrooms) {
// //       const bathrooms =
// //         filters?.bathrooms === "4+" ? 4 : parseInt(filters?.bathrooms);
// //       filtered = filtered?.filter((property) =>
// //         filters?.bathrooms === "4+"
// //           ? property?.bathrooms >= bathrooms
// //           : property?.bathrooms === bathrooms
// //       );
// //     }

// //     if (filters?.amenities?.length > 0) {
// //       filtered = filtered?.filter((property) =>
// //         filters?.amenities?.every((amenity) =>
// //           property?.amenities?.includes(amenity)
// //         )
// //       );
// //     }

// //     if (filters?.agent) {
// //       filtered = filtered?.filter(
// //         (property) => property?.agent?.id?.toString() === filters?.agent
// //       );
// //     }

// //     // Apply sorting
// //     switch (sortBy) {
// //       case "price-low":
// //         filtered?.sort((a, b) => a?.price - b?.price);
// //         break;
// //       case "price-high":
// //         filtered?.sort((a, b) => b?.price - a?.price);
// //         break;
// //       case "newest":
// //         filtered?.sort((a, b) => b?.id - a?.id);
// //         break;
// //       case "area-large":
// //         filtered?.sort((a, b) => b?.area - a?.area);
// //         break;
// //       case "area-small":
// //         filtered?.sort((a, b) => a?.area - b?.area);
// //         break;
// //       default:
// //         // relevance - keep original order
// //         break;
// //     }

// //     return filtered;
// //   };

// //   const filteredProperties = getFilteredAndSortedProperties();

// //   // Handle URL search params
// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const searchParam = urlParams?.get("search");
// //     const locationParam = urlParams?.get("location");

// //     if (searchParam) {
// //       setSearchQuery(searchParam);
// //     }

// //     if (locationParam) {
// //       setFilters((prev) => ({
// //         ...prev,
// //         location: [locationParam],
// //       }));
// //     }

// //     // Handle search from location state
// //     if (location?.state?.searchQuery) {
// //       setSearchQuery(location?.state?.searchQuery);
// //     }
// //   }, [location]);

// //   const handleFiltersChange = (newFilters) => {
// //     setFilters(newFilters);
// //     setLoading(true);
// //     setTimeout(() => setLoading(false), 500); // Simulate loading
// //   };

// //   const handleSearchChange = (query) => {
// //     setSearchQuery(query);
// //     setLoading(true);
// //     setTimeout(() => setLoading(false), 300);
// //   };

// //   const handleSortChange = (newSortBy) => {
// //     setSortBy(newSortBy);
// //     setLoading(true);
// //     setTimeout(() => setLoading(false), 200);
// //   };

// //   const handleWishlistToggle = (propertyId) => {
// //     setWishlistedProperties((prev) =>
// //       prev?.includes(propertyId)
// //         ? prev?.filter((id) => id !== propertyId)
// //         : [...prev, propertyId]
// //     );
// //   };

// //   const handleLogout = () => {
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header
// //         user={user}
// //         notificationCount={3}
// //         onLogout={handleLogout}
// //         onSearch={handleSearchChange}
// //       />
// //       <motion.div
// //         className="flex h-[calc(100vh-80px)]"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         {/* Desktop Filter Sidebar */}
// //         <div className="hidden lg:block">
// //           <FilterSidebar
// //             filters={filters}
// //             onFiltersChange={handleFiltersChange}
// //             propertyCount={filteredProperties?.length}
// //             onClose={() => {}}
// //           />
// //         </div>

// //         {/* Mobile Filter Sidebar */}
// //         <FilterSidebar
// //           filters={filters}
// //           onFiltersChange={handleFiltersChange}
// //           propertyCount={filteredProperties?.length}
// //           isOpen={isMobileFilterOpen}
// //           onClose={() => setIsMobileFilterOpen(false)}
// //           isMobile={true}
// //         />

// //         {/* Main Content */}
// //         <div className="flex-1 flex flex-col overflow-hidden">
// //           {/* Search and Sort Controls */}
// //           <SearchAndSort
// //             searchQuery={searchQuery}
// //             onSearchChange={handleSearchChange}
// //             sortBy={sortBy}
// //             onSortChange={handleSortChange}
// //             viewMode={viewMode}
// //             onViewModeChange={setViewMode}
// //             onFilterToggle={() => setIsMobileFilterOpen(true)}
// //             propertyCount={filteredProperties?.length}
// //             showMapView={showMapView}
// //             onMapToggle={() => setShowMapView(!showMapView)}
// //           />

// //           {/* Content Area */}
// //           <div className="flex-1 overflow-hidden">
// //             {showMapView ? (
// //               <div className="h-full flex">
// //                 {/* Properties List - Half Width */}
// //                 <div className="w-1/2 overflow-y-auto border-r border-border">
// //                   <PropertyGrid
// //                     properties={filteredProperties}
// //                     viewMode="list"
// //                     onWishlistToggle={handleWishlistToggle}
// //                     wishlistedProperties={wishlistedProperties}
// //                     loading={loading}
// //                   />
// //                 </div>

// //                 {/* Map - Half Width */}
// //                 <div className="w-1/2">
// //                   <PropertyMap
// //                     properties={filteredProperties}
// //                     onPropertySelect={setSelectedMapProperty}
// //                     selectedProperty={selectedMapProperty}
// //                   />
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="h-full overflow-y-auto">
// //                 <PropertyGrid
// //                   properties={filteredProperties}
// //                   viewMode={viewMode}
// //                   onWishlistToggle={handleWishlistToggle}
// //                   wishlistedProperties={wishlistedProperties}
// //                   loading={loading}
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>
// //       {/* Floating Chat */}
// //       <FloatingChat
// //         isOpen={isChatOpen}
// //         onToggle={() => setIsChatOpen(!isChatOpen)}
// //       />
// //       {/* Scroll to Top Button */}
// //       <Button
// //         variant="outline"
// //         size="icon"
// //         className="fixed bottom-20 right-20 z-40 shadow-prominent"
// //         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// //       >
// //         <Icon name="ArrowUp" size={20} />
// //       </Button>
// //     </div>
// //   );
// // };

// // export default PropertyListings;
// // ``

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowUp } from "lucide-react";
// import Header from "../../components/ui/Header";
// import FloatingChat from "../../components/ui/FloatingChat";
// import FilterSidebar from "./components/FilterSidebar";
// import SearchAndSort from "./components/SearchAndSort";
// import PropertyGrid from "./components/PropertyGrid";
// import PropertyMap from "./components/PropertyMap";
// import Button from "../../components/ui/Button";

// const PropertyListings = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // State management
//   const [user] = useState({
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul.sharma@email.com",
//     role: "buyer",
//   });

//   const [filters, setFilters] = useState({
//     priceRange: { min: "", max: "" },
//     location: [],
//     propertyType: [],
//     bedrooms: "",
//     bathrooms: "",
//     amenities: [],
//     agent: "",
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showMapView, setShowMapView] = useState(false);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedMapProperty, setSelectedMapProperty] = useState(null);
//   const [wishlistedProperties, setWishlistedProperties] = useState([1, 5, 8]);

//   // Mock properties data
//   const mockProperties = [
//     {
//       id: 1,
//       title: "Luxury 3BHK Apartment in Bandra West",
//       location: "Bandra West, Mumbai",
//       price: 25000000,
//       bedrooms: 3,
//       bathrooms: 3,
//       area: 1450,
//       type: "apartment",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Modern luxury apartment living room",
//       agent: {
//         id: 1,
//         name: "Rajesh Kumar",
//         phone: "919876543210",
//         email: "rajesh@realconnect.com",
//       },
//       amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
//       description: `Stunning 3BHK apartment in prime Bandra West location with panoramic sea views.`,
//     },
//     {
//       id: 2,
//       title: "Spacious 4BHK Villa in Juhu",
//       location: "Juhu, Mumbai",
//       price: 85000000,
//       bedrooms: 4,
//       bathrooms: 4,
//       area: 3200,
//       type: "villa",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Elegant villa exterior",
//       agent: {
//         id: 2,
//         name: "Priya Sharma",
//         phone: "919876543211",
//         email: "priya@realconnect.com",
//       },
//       amenities: ["Swimming Pool", "Garden", "Parking", "Security"],
//       description: `Magnificent 4BHK villa with private garden and swimming pool.`,
//     },
//     {
//       id: 3,
//       title: "Modern 2BHK Flat in Andheri East",
//       location: "Andheri East, Mumbai",
//       price: 12000000,
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 980,
//       type: "apartment",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Contemporary 2BHK apartment",
//       agent: {
//         id: 3,
//         name: "Amit Patel",
//         phone: "919876543212",
//         email: "amit@realconnect.com",
//       },
//       amenities: ["Gym", "Parking", "Security", "Elevator"],
//       description: `Well-designed 2BHK apartment in growing Andheri East area.`,
//     },
//     {
//       id: 4,
//       title: "Premium 3BHK Penthouse in Worli",
//       location: "Worli, Mumbai",
//       price: 45000000,
//       bedrooms: 3,
//       bathrooms: 3,
//       area: 2100,
//       type: "apartment",
//       status: "sold",
//       images: [
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Luxurious penthouse terrace",
//       agent: {
//         id: 4,
//         name: "Sneha Reddy",
//         phone: "919876543213",
//         email: "sneha@realconnect.com",
//       },
//       amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
//       description: `Exclusive penthouse with private terrace and stunning city views.`,
//     },
//     {
//       id: 5,
//       title: "Cozy 1BHK Studio in Powai",
//       location: "Powai, Mumbai",
//       price: 8500000,
//       bedrooms: 1,
//       bathrooms: 1,
//       area: 650,
//       type: "apartment",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Compact modern studio apartment",
//       agent: {
//         id: 5,
//         name: "Vikram Singh",
//         phone: "919876543214",
//         email: "vikram@realconnect.com",
//       },
//       amenities: ["Gym", "Parking", "Security", "Power Backup"],
//       description: `Compact yet comfortable 1BHK studio perfect for singles.`,
//     },
//     {
//       id: 6,
//       title: "Elegant 5BHK Bungalow in Bandra",
//       location: "Bandra, Mumbai",
//       price: 120000000,
//       bedrooms: 5,
//       bathrooms: 5,
//       area: 4500,
//       type: "villa",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Grand bungalow with traditional architecture",
//       agent: {
//         id: 1,
//         name: "Rajesh Kumar",
//         phone: "919876543210",
//         email: "rajesh@realconnect.com",
//       },
//       amenities: ["Swimming Pool", "Garden", "Parking", "Security"],
//       description: `Magnificent 5BHK bungalow in prestigious Bandra location.`,
//     },
//     {
//       id: 7,
//       title: "Commercial Office Space in BKC",
//       location: "Bandra Kurla Complex, Mumbai",
//       price: 35000000,
//       bedrooms: 0,
//       bathrooms: 2,
//       area: 1800,
//       type: "commercial",
//       status: "available",
//       images: [
//         "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Modern commercial office space",
//       agent: {
//         id: 2,
//         name: "Priya Sharma",
//         phone: "919876543211",
//         email: "priya@realconnect.com",
//       },
//       amenities: ["Parking", "Security", "Elevator", "Power Backup"],
//       description: `Prime commercial office space in Mumbai's financial district.`,
//     },
//     {
//       id: 8,
//       title: "Affordable 2BHK in Thane West",
//       location: "Thane West, Thane",
//       price: 9500000,
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 850,
//       type: "apartment",
//       status: "under-offer",
//       images: [
//         "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
//       ],
//       imageAlt: "Comfortable 2BHK apartment",
//       agent: {
//         id: 3,
//         name: "Amit Patel",
//         phone: "919876543212",
//         email: "amit@realconnect.com",
//       },
//       amenities: ["Gym", "Parking", "Security", "Garden"],
//       description: `Well-planned 2BHK apartment in developing Thane West area.`,
//     },
//   ];

//   // Filter and sort properties
//   const getFilteredAndSortedProperties = () => {
//     let filtered = [...mockProperties];

//     // Apply search filter
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (property) =>
//           property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           property.type.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply filters
//     if (filters.priceRange.min || filters.priceRange.max) {
//       filtered = filtered.filter((property) => {
//         const min = filters.priceRange.min
//           ? parseInt(filters.priceRange.min)
//           : 0;
//         const max = filters.priceRange.max
//           ? parseInt(filters.priceRange.max)
//           : Infinity;
//         return property.price >= min && property.price <= max;
//       });
//     }

//     if (filters.location.length > 0) {
//       filtered = filtered.filter((property) =>
//         filters.location.some((loc) => property.location.includes(loc))
//       );
//     }

//     if (filters.propertyType.length > 0) {
//       filtered = filtered.filter((property) =>
//         filters.propertyType.includes(property.type)
//       );
//     }

//     if (filters.bedrooms) {
//       const bedrooms =
//         filters.bedrooms === "4+" ? 4 : parseInt(filters.bedrooms);
//       filtered = filtered.filter((property) =>
//         filters.bedrooms === "4+"
//           ? property.bedrooms >= bedrooms
//           : property.bedrooms === bedrooms
//       );
//     }

//     if (filters.bathrooms) {
//       const bathrooms =
//         filters.bathrooms === "4+" ? 4 : parseInt(filters.bathrooms);
//       filtered = filtered.filter((property) =>
//         filters.bathrooms === "4+"
//           ? property.bathrooms >= bathrooms
//           : property.bathrooms === bathrooms
//       );
//     }

//     if (filters.amenities.length > 0) {
//       filtered = filtered.filter((property) =>
//         filters.amenities.every((amenity) =>
//           property.amenities.includes(amenity)
//         )
//       );
//     }

//     if (filters.agent) {
//       filtered = filtered.filter(
//         (property) => property.agent.id.toString() === filters.agent
//       );
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "price-low":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "newest":
//         filtered.sort((a, b) => b.id - a.id);
//         break;
//       case "area-large":
//         filtered.sort((a, b) => b.area - a.area);
//         break;
//       case "area-small":
//         filtered.sort((a, b) => a.area - b.area);
//         break;
//       default:
//         break;
//     }

//     return filtered;
//   };

//   const filteredProperties = getFilteredAndSortedProperties();

//   // Handle URL search params
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchParam = urlParams.get("search");
//     const locationParam = urlParams.get("location");

//     if (searchParam) {
//       setSearchQuery(searchParam);
//     }

//     if (locationParam) {
//       setFilters((prev) => ({
//         ...prev,
//         location: [locationParam],
//       }));
//     }

//     if (location.state?.searchQuery) {
//       setSearchQuery(location.state.searchQuery);
//     }
//   }, [location]);

//   const handleFiltersChange = (newFilters) => {
//     setFilters(newFilters);
//     setLoading(true);
//     setTimeout(() => setLoading(false), 500);
//   };

//   const handleSearchChange = (query) => {
//     setSearchQuery(query);
//     setLoading(true);
//     setTimeout(() => setLoading(false), 300);
//   };

//   const handleSortChange = (newSortBy) => {
//     setSortBy(newSortBy);
//     setLoading(true);
//     setTimeout(() => setLoading(false), 200);
//   };

//   const handleWishlistToggle = (propertyId) => {
//     setWishlistedProperties((prev) =>
//       prev.includes(propertyId)
//         ? prev.filter((id) => id !== propertyId)
//         : [...prev, propertyId]
//     );
//   };

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header
//         user={user}
//         notificationCount={3}
//         onLogout={handleLogout}
//         onSearch={handleSearchChange}
//       />

//       <motion.div
//         className="flex h-[calc(100vh-64px)]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Desktop Filter Sidebar */}
//         <div className="hidden lg:block">
//           <FilterSidebar
//             filters={filters}
//             onFiltersChange={handleFiltersChange}
//             propertyCount={filteredProperties.length}
//             onClose={() => {}}
//           />
//         </div>

//         {/* Mobile Filter Sidebar */}
//         <FilterSidebar
//           filters={filters}
//           onFiltersChange={handleFiltersChange}
//           propertyCount={filteredProperties.length}
//           isOpen={isMobileFilterOpen}
//           onClose={() => setIsMobileFilterOpen(false)}
//           isMobile={true}
//         />

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Search and Sort Controls */}
//           <SearchAndSort
//             searchQuery={searchQuery}
//             onSearchChange={handleSearchChange}
//             sortBy={sortBy}
//             onSortChange={handleSortChange}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             onFilterToggle={() => setIsMobileFilterOpen(true)}
//             propertyCount={filteredProperties.length}
//             showMapView={showMapView}
//             onMapToggle={() => setShowMapView(!showMapView)}
//           />

//           {/* Content Area */}
//           <div className="flex-1 overflow-hidden bg-white">
//             {showMapView ? (
//               <div className="h-full flex">
//                 {/* Properties List - Half Width */}
//                 <div className="w-1/2 overflow-y-auto border-r border-slate-200">
//                   <PropertyGrid
//                     properties={filteredProperties}
//                     viewMode="list"
//                     onWishlistToggle={handleWishlistToggle}
//                     wishlistedProperties={wishlistedProperties}
//                     loading={loading}
//                   />
//                 </div>

//                 {/* Map - Half Width */}
//                 <div className="w-1/2">
//                   <PropertyMap
//                     properties={filteredProperties}
//                     onPropertySelect={setSelectedMapProperty}
//                     selectedProperty={selectedMapProperty}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="h-full overflow-y-auto">
//                 <PropertyGrid
//                   properties={filteredProperties}
//                   viewMode={viewMode}
//                   onWishlistToggle={handleWishlistToggle}
//                   wishlistedProperties={wishlistedProperties}
//                   loading={loading}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Floating Chat */}
//       <FloatingChat
//         isOpen={isChatOpen}
//         onToggle={() => setIsChatOpen(!isChatOpen)}
//       />

//       {/* Scroll to Top Button */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="fixed bottom-6 right-6 z-40 bg-white border-slate-300 shadow-lg hover:shadow-xl"
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       >
//         <ArrowUp size={18} />
//       </Button>
//     </div>
//   );
// };

// export default PropertyListings;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import FilterSidebar from "./components/FilterSidebar";
import SearchAndSort from "./components/SearchAndSort";
import PropertyGrid from "./components/PropertyGrid";
import PropertyMap from "./components/PropertyMap";
import Button from "../../components/ui/Button";

const PropertyListings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [user] = useState({
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    role: "buyer",
  });

  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    location: [],
    propertyType: [],
    bedrooms: "",
    bathrooms: "",
    amenities: [],
    agent: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showMapView, setShowMapView] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [wishlistedProperties, setWishlistedProperties] = useState([1, 5, 8]);

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment in Bandra West",
      location: "Bandra West, Mumbai",
      price: 25000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1450,
      type: "apartment",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      ],
      imageAlt: "Modern luxury apartment living room",
      agent: {
        id: 1,
        name: "Rajesh Kumar",
        phone: "919876543210",
        email: "rajesh@realconnect.com",
      },
      amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
      description: `Stunning 3BHK apartment in prime Bandra West location with panoramic sea views.`,
    },
    {
      id: 2,
      title: "Spacious 4BHK Villa in Juhu",
      location: "Juhu, Mumbai",
      price: 85000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      type: "villa",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      ],
      imageAlt: "Elegant villa exterior",
      agent: {
        id: 2,
        name: "Priya Sharma",
        phone: "919876543211",
        email: "priya@realconnect.com",
      },
      amenities: ["Swimming Pool", "Garden", "Parking", "Security"],
      description: `Magnificent 4BHK villa with private garden and swimming pool.`,
    },
    {
      id: 3,
      title: "Modern 2BHK Flat in Andheri East",
      location: "Andheri East, Mumbai",
      price: 12000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 980,
      type: "apartment",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      ],
      imageAlt: "Contemporary 2BHK apartment",
      agent: {
        id: 3,
        name: "Amit Patel",
        phone: "919876543212",
        email: "amit@realconnect.com",
      },
      amenities: ["Gym", "Parking", "Security", "Elevator"],
      description: `Well-designed 2BHK apartment in growing Andheri East area.`,
    },
    {
      id: 4,
      title: "Premium 3BHK Penthouse in Worli",
      location: "Worli, Mumbai",
      price: 45000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      type: "apartment",
      status: "sold",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      ],
      imageAlt: "Luxurious penthouse terrace",
      agent: {
        id: 4,
        name: "Sneha Reddy",
        phone: "919876543213",
        email: "sneha@realconnect.com",
      },
      amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
      description: `Exclusive penthouse with private terrace and stunning city views.`,
    },
    {
      id: 5,
      title: "Cozy 1BHK Studio in Powai",
      location: "Powai, Mumbai",
      price: 8500000,
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      type: "apartment",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      imageAlt: "Compact modern studio apartment",
      agent: {
        id: 5,
        name: "Vikram Singh",
        phone: "919876543214",
        email: "vikram@realconnect.com",
      },
      amenities: ["Gym", "Parking", "Security", "Power Backup"],
      description: `Compact yet comfortable 1BHK studio perfect for singles.`,
    },
    {
      id: 6,
      title: "Elegant 5BHK Bungalow in Bandra",
      location: "Bandra, Mumbai",
      price: 120000000,
      bedrooms: 5,
      bathrooms: 5,
      area: 4500,
      type: "villa",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
      imageAlt: "Grand bungalow with traditional architecture",
      agent: {
        id: 1,
        name: "Rajesh Kumar",
        phone: "919876543210",
        email: "rajesh@realconnect.com",
      },
      amenities: ["Swimming Pool", "Garden", "Parking", "Security"],
      description: `Magnificent 5BHK bungalow in prestigious Bandra location.`,
    },
    {
      id: 7,
      title: "Commercial Office Space in BKC",
      location: "Bandra Kurla Complex, Mumbai",
      price: 35000000,
      bedrooms: 0,
      bathrooms: 2,
      area: 1800,
      type: "commercial",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      ],
      imageAlt: "Modern commercial office space",
      agent: {
        id: 2,
        name: "Priya Sharma",
        phone: "919876543211",
        email: "priya@realconnect.com",
      },
      amenities: ["Parking", "Security", "Elevator", "Power Backup"],
      description: `Prime commercial office space in Mumbai's financial district.`,
    },
    {
      id: 8,
      title: "Affordable 2BHK in Thane West",
      location: "Thane West, Thane",
      price: 9500000,
      bedrooms: 2,
      bathrooms: 2,
      area: 850,
      type: "apartment",
      status: "under-offer",
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      imageAlt: "Comfortable 2BHK apartment",
      agent: {
        id: 3,
        name: "Amit Patel",
        phone: "919876543212",
        email: "amit@realconnect.com",
      },
      amenities: ["Gym", "Parking", "Security", "Garden"],
      description: `Well-planned 2BHK apartment in developing Thane West area.`,
    },
  ];

  // Filter and sort properties
  const getFilteredAndSortedProperties = () => {
    let filtered = [...mockProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((property) => {
        const min = filters.priceRange.min
          ? parseInt(filters.priceRange.min)
          : 0;
        const max = filters.priceRange.max
          ? parseInt(filters.priceRange.max)
          : Infinity;
        return property.price >= min && property.price <= max;
      });
    }

    if (filters.location.length > 0) {
      filtered = filtered.filter((property) =>
        filters.location.some((loc) => property.location.includes(loc))
      );
    }

    if (filters.propertyType.length > 0) {
      filtered = filtered.filter((property) =>
        filters.propertyType.includes(property.type)
      );
    }

    if (filters.bedrooms) {
      const bedrooms =
        filters.bedrooms === "4+" ? 4 : parseInt(filters.bedrooms);
      filtered = filtered.filter((property) =>
        filters.bedrooms === "4+"
          ? property.bedrooms >= bedrooms
          : property.bedrooms === bedrooms
      );
    }

    if (filters.bathrooms) {
      const bathrooms =
        filters.bathrooms === "4+" ? 4 : parseInt(filters.bathrooms);
      filtered = filtered.filter((property) =>
        filters.bathrooms === "4+"
          ? property.bathrooms >= bathrooms
          : property.bathrooms === bathrooms
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
      );
    }

    if (filters.agent) {
      filtered = filtered.filter(
        (property) => property.agent.id.toString() === filters.agent
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "area-large":
        filtered.sort((a, b) => b.area - a.area);
        break;
      case "area-small":
        filtered.sort((a, b) => a.area - b.area);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProperties = getFilteredAndSortedProperties();

  // Handle URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get("search");
    const locationParam = urlParams.get("location");

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (locationParam) {
      setFilters((prev) => ({
        ...prev,
        location: [locationParam],
      }));
    }

    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setLoading(true);
    setTimeout(() => setLoading(false), 200);
  };

  const handleWishlistToggle = (propertyId) => {
    setWishlistedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        user={user}
        notificationCount={3}
        onLogout={handleLogout}
        onSearch={handleSearchChange}
      />

      <motion.div
        className="flex h-[calc(100vh-64px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            propertyCount={filteredProperties.length}
            onClose={() => {}}
          />
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          propertyCount={filteredProperties.length}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          isMobile={true}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search and Sort Controls */}
          <SearchAndSort
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onFilterToggle={() => setIsMobileFilterOpen(true)}
            propertyCount={filteredProperties.length}
            showMapView={showMapView}
            onMapToggle={() => setShowMapView(!showMapView)}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-hidden bg-white">
            {showMapView ? (
              <div className="h-full flex">
                {/* Properties List - Half Width */}
                <div className="w-1/2 overflow-y-auto border-r border-slate-200 custom-scrollbar">
                  <PropertyGrid
                    properties={filteredProperties}
                    viewMode="list"
                    onWishlistToggle={handleWishlistToggle}
                    wishlistedProperties={wishlistedProperties}
                    loading={loading}
                  />
                </div>

                {/* Map - Half Width */}
                <div className="w-1/2">
                  <PropertyMap
                    properties={filteredProperties}
                    onPropertySelect={setSelectedMapProperty}
                    selectedProperty={selectedMapProperty}
                  />
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar">
                <PropertyGrid
                  properties={filteredProperties}
                  viewMode={viewMode}
                  onWishlistToggle={handleWishlistToggle}
                  wishlistedProperties={wishlistedProperties}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Chat */}
      <FloatingChat
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Scroll to Top Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 bg-white border-slate-300 shadow-lg hover:shadow-xl hover:border-slate-400"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={18} />
      </Button>

      {/* Global Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default PropertyListings;