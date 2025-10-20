// import React, { useState, useEffect } from "react";
// import Icon from "../../../components/AppIcon";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";
// import { Checkbox } from "../../../components/ui/Checkbox";

// const FilterSidebar = ({
//   filters,
//   onFiltersChange,
//   propertyCount = 0,
//   isOpen = false,
//   onClose,
//   isMobile = false,
// }) => {
//   const [localFilters, setLocalFilters] = useState(filters);
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     location: true,
//     type: true,
//     bedrooms: true,
//     bathrooms: false,
//     amenities: false,
//     agent: false,
//   });

//   const priceRanges = [
//     { label: "Under ₹50L", min: 0, max: 5000000 },
//     { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//     { label: "₹1Cr - ₹2Cr", min: 10000000, max: 20000000 },
//     { label: "₹2Cr - ₹5Cr", min: 20000000, max: 50000000 },
//     { label: "Above ₹5Cr", min: 50000000, max: 999999999 },
//   ];

//   const locations = [
//     "Mumbai",
//     "Delhi",
//     "Bangalore",
//     "Pune",
//     "Chennai",
//     "Hyderabad",
//     "Kolkata",
//     "Ahmedabad",
//     "Gurgaon",
//     "Noida",
//   ];

//   const propertyTypes = [
//     { value: "apartment", label: "Apartment", icon: "Building2" },
//     { value: "villa", label: "Villa", icon: "Home" },
//     { value: "plot", label: "Plot", icon: "Square" },
//     { value: "commercial", label: "Commercial", icon: "Building" },
//   ];

//   const amenities = [
//     "Swimming Pool",
//     "Gym",
//     "Parking",
//     "Security",
//     "Garden",
//     "Elevator",
//     "Power Backup",
//     "Club House",
//     "Children's Play Area",
//     "CCTV",
//   ];

//   const agents = [
//     { id: 1, name: "Rajesh Kumar", properties: 45 },
//     { id: 2, name: "Priya Sharma", properties: 38 },
//     { id: 3, name: "Amit Patel", properties: 52 },
//     { id: 4, name: "Sneha Reddy", properties: 29 },
//     { id: 5, name: "Vikram Singh", properties: 41 },
//   ];

//   useEffect(() => {
//     setLocalFilters(filters);
//   }, [filters]);

//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...localFilters, [key]: value };
//     setLocalFilters(newFilters);
//     onFiltersChange(newFilters);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev?.[section],
//     }));
//   };

//   const clearAllFilters = () => {
//     const clearedFilters = {
//       priceRange: { min: "", max: "" },
//       location: [],
//       propertyType: [],
//       bedrooms: "",
//       bathrooms: "",
//       amenities: [],
//       agent: "",
//     };
//     setLocalFilters(clearedFilters);
//     onFiltersChange(clearedFilters);
//   };

//   const formatPrice = (price) => {
//     if (price >= 10000000) return `₹${(price / 10000000)?.toFixed(1)}Cr`;
//     if (price >= 100000) return `₹${(price / 100000)?.toFixed(1)}L`;
//     return `₹${price?.toLocaleString()}`;
//   };

//   const FilterSection = ({ title, children, sectionKey, count }) => (
//     <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
//       <button
//         onClick={() => toggleSection(sectionKey)}
//         className="w-full flex items-center justify-between p-2 hover:bg-muted rounded-md transition-smooth"
//       >
//         <div className="flex items-center space-x-2">
//           <h3 className="font-medium text-foreground">{title}</h3>
//           {count && (
//             <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
//               {count}
//             </span>
//           )}
//         </div>
//         <Icon
//           name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"}
//           size={16}
//           className="text-muted-foreground"
//         />
//       </button>
//       {expandedSections?.[sectionKey] && (
//         <div className="mt-3 space-y-3">{children}</div>
//       )}
//     </div>
//   );

//   const sidebarContent = (
//     <div className="h-full flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-border">
//         <div>
//           <h2 className="text-lg font-semibold text-foreground">Filters</h2>
//           <p className="text-sm text-muted-foreground">
//             {propertyCount?.toLocaleString()} properties found
//           </p>
//         </div>
//         {isMobile && (
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <Icon name="X" size={20} />
//           </Button>
//         )}
//       </div>

//       {/* Filters Content */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {/* Price Range */}
//         <FilterSection title="Price Range" sectionKey="price">
//           <div className="space-y-3">
//             <div className="grid grid-cols-2 gap-2">
//               <Input
//                 type="number"
//                 placeholder="Min Price"
//                 value={localFilters?.priceRange?.min || ""}
//                 onChange={(e) =>
//                   handleFilterChange("priceRange", {
//                     ...localFilters?.priceRange,
//                     min: e?.target?.value,
//                   })
//                 }
//               />
//               <Input
//                 type="number"
//                 placeholder="Max Price"
//                 value={localFilters?.priceRange?.max || ""}
//                 onChange={(e) =>
//                   handleFilterChange("priceRange", {
//                     ...localFilters?.priceRange,
//                     max: e?.target?.value,
//                   })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               {priceRanges?.map((range) => (
//                 <Checkbox
//                   key={range?.label}
//                   label={range?.label}
//                   checked={
//                     localFilters?.priceRange?.min === range?.min?.toString() &&
//                     localFilters?.priceRange?.max === range?.max?.toString()
//                   }
//                   onChange={(e) => {
//                     if (e?.target?.checked) {
//                       handleFilterChange("priceRange", {
//                         min: range?.min?.toString(),
//                         max: range?.max?.toString(),
//                       });
//                     }
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </FilterSection>

//         {/* Location */}
//         <FilterSection
//           title="Location"
//           sectionKey="location"
//           count={localFilters?.location?.length}
//         >
//           <div className="space-y-2">
//             {locations?.map((location) => (
//               <Checkbox
//                 key={location}
//                 label={location}
//                 checked={localFilters?.location?.includes(location)}
//                 onChange={(e) => {
//                   const currentLocations = localFilters?.location || [];
//                   const newLocations = e?.target?.checked
//                     ? [...currentLocations, location]
//                     : currentLocations?.filter((l) => l !== location);
//                   handleFilterChange("location", newLocations);
//                 }}
//               />
//             ))}
//           </div>
//         </FilterSection>

//         {/* Property Type */}
//         <FilterSection
//           title="Property Type"
//           sectionKey="type"
//           count={localFilters?.propertyType?.length}
//         >
//           <div className="space-y-2">
//             {propertyTypes?.map((type) => (
//               <Checkbox
//                 key={type?.value}
//                 label={
//                   <div className="flex items-center space-x-2">
//                     <Icon name={type?.icon} size={16} />
//                     <span>{type?.label}</span>
//                   </div>
//                 }
//                 checked={localFilters?.propertyType?.includes(type?.value)}
//                 onChange={(e) => {
//                   const currentTypes = localFilters?.propertyType || [];
//                   const newTypes = e?.target?.checked
//                     ? [...currentTypes, type?.value]
//                     : currentTypes?.filter((t) => t !== type?.value);
//                   handleFilterChange("propertyType", newTypes);
//                 }}
//               />
//             ))}
//           </div>
//         </FilterSection>

//         {/* Bedrooms */}
//         <FilterSection title="Bedrooms" sectionKey="bedrooms">
//           <div className="grid grid-cols-4 gap-2">
//             {["1", "2", "3", "4+"]?.map((bedroom) => (
//               <button
//                 key={bedroom}
//                 onClick={() =>
//                   handleFilterChange(
//                     "bedrooms",
//                     localFilters?.bedrooms === bedroom ? "" : bedroom
//                   )
//                 }
//                 className={`p-2 text-sm rounded-md border transition-smooth ${
//                   localFilters?.bedrooms === bedroom
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-card text-foreground border-border hover:bg-muted"
//                 }`}
//               >
//                 {bedroom}
//               </button>
//             ))}
//           </div>
//         </FilterSection>

//         {/* Bathrooms */}
//         <FilterSection title="Bathrooms" sectionKey="bathrooms">
//           <div className="grid grid-cols-4 gap-2">
//             {["1", "2", "3", "4+"]?.map((bathroom) => (
//               <button
//                 key={bathroom}
//                 onClick={() =>
//                   handleFilterChange(
//                     "bathrooms",
//                     localFilters?.bathrooms === bathroom ? "" : bathroom
//                   )
//                 }
//                 className={`p-2 text-sm rounded-md border transition-smooth ${
//                   localFilters?.bathrooms === bathroom
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-card text-foreground border-border hover:bg-muted"
//                 }`}
//               >
//                 {bathroom}
//               </button>
//             ))}
//           </div>
//         </FilterSection>

//         {/* Amenities */}
//         <FilterSection
//           title="Amenities"
//           sectionKey="amenities"
//           count={localFilters?.amenities?.length}
//         >
//           <div className="space-y-2">
//             {amenities?.map((amenity) => (
//               <Checkbox
//                 key={amenity}
//                 label={amenity}
//                 checked={localFilters?.amenities?.includes(amenity)}
//                 onChange={(e) => {
//                   const currentAmenities = localFilters?.amenities || [];
//                   const newAmenities = e?.target?.checked
//                     ? [...currentAmenities, amenity]
//                     : currentAmenities?.filter((a) => a !== amenity);
//                   handleFilterChange("amenities", newAmenities);
//                 }}
//               />
//             ))}
//           </div>
//         </FilterSection>

//         {/* Agent */}
//         <FilterSection title="Agent" sectionKey="agent">
//           <div className="space-y-2">
//             {agents?.map((agent) => (
//               <div
//                 key={agent?.id}
//                 className={`p-3 rounded-md border cursor-pointer transition-smooth ${
//                   localFilters?.agent === agent?.id?.toString()
//                     ? "bg-primary/10 border-primary"
//                     : "bg-card border-border hover:bg-muted"
//                 }`}
//                 onClick={() =>
//                   handleFilterChange(
//                     "agent",
//                     localFilters?.agent === agent?.id?.toString()
//                       ? ""
//                       : agent?.id?.toString()
//                   )
//                 }
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-foreground">
//                     {agent?.name}
//                   </span>
//                   <span className="text-xs text-muted-foreground">
//                     {agent?.properties} properties
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </FilterSection>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-border space-y-3">
//         <Button variant="outline" fullWidth onClick={clearAllFilters}>
//           <Icon name="RotateCcw" size={16} className="mr-2" />
//           Clear All Filters
//         </Button>
//         {isMobile && (
//           <Button fullWidth onClick={onClose}>
//             Show {propertyCount} Properties
//           </Button>
//         )}
//       </div>
//     </div>
//   );

//   if (isMobile) {
//     return (
//       <>
//         {isOpen && (
//           <div className="fixed inset-0 z-50 lg:hidden">
//             <div
//               className="fixed inset-0 bg-background/80 backdrop-blur-sm"
//               onClick={onClose}
//             />
//             <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border shadow-prominent">
//               {sidebarContent}
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

//   return (
//     <div className="w-80 bg-card border-r border-border h-full">
//       {sidebarContent}
//     </div>
//   );
// };

// export default FilterSidebar;
import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  RotateCcw,
  Building2,
  Home,
  Square,
  Building,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterSidebar = ({
  filters,
  onFiltersChange,
  propertyCount = 0,
  isOpen = false,
  onClose,
  isMobile = false,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    location: true,
    type: true,
    bedrooms: true,
    bathrooms: false,
    amenities: false,
    agent: false,
  });

  const priceRanges = [
    { label: "Under ₹50L", min: 0, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr - ₹2Cr", min: 10000000, max: 20000000 },
    { label: "₹2Cr - ₹5Cr", min: 20000000, max: 50000000 },
    { label: "Above ₹5Cr", min: 50000000, max: 999999999 },
  ];

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Ahmedabad",
    "Gurgaon",
    "Noida",
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building2 },
    { value: "villa", label: "Villa", icon: Home },
    { value: "plot", label: "Plot", icon: Square },
    { value: "commercial", label: "Commercial", icon: Building },
  ];

  const amenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Garden",
    "Elevator",
    "Power Backup",
    "Club House",
    "Children's Play Area",
    "CCTV",
  ];

  const agents = [
    { id: 1, name: "Rajesh Kumar", properties: 45 },
    { id: 2, name: "Priya Sharma", properties: 38 },
    { id: 3, name: "Amit Patel", properties: 52 },
    { id: 4, name: "Sneha Reddy", properties: 29 },
    { id: 5, name: "Vikram Singh", properties: 41 },
  ];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: { min: "", max: "" },
      location: [],
      propertyType: [],
      bedrooms: "",
      bathrooms: "",
      amenities: [],
      agent: "",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, children, sectionKey, count }) => (
    <div className="border-b border-slate-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
      >
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
          {count > 0 && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-medium min-w-6 text-center">
              {count}
            </span>
          )}
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp
            size={18}
            className="text-slate-500 group-hover:text-slate-700"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-slate-500 group-hover:text-slate-700"
          />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-4 space-y-4">{children}</div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Filters</h2>
          <p className="text-sm text-slate-600 mt-1">
            {propertyCount.toLocaleString()} properties found
          </p>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100 rounded-xl"
          >
            <X size={20} className="text-slate-600" />
          </Button>
        )}
      </div>

      {/* Filters Content with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.priceRange.min || ""}
                onChange={(e) =>
                  handleFilterChange("priceRange", {
                    ...localFilters.priceRange,
                    min: e.target.value,
                  })
                }
                className="text-sm border-slate-300 focus:border-blue-500 rounded-lg"
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.priceRange.max || ""}
                onChange={(e) =>
                  handleFilterChange("priceRange", {
                    ...localFilters.priceRange,
                    max: e.target.value,
                  })
                }
                className="text-sm border-slate-300 focus:border-blue-500 rounded-lg"
              />
            </div>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <Checkbox
                  key={range.label}
                  label={range.label}
                  checked={
                    localFilters.priceRange.min === range.min.toString() &&
                    localFilters.priceRange.max === range.max.toString()
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleFilterChange("priceRange", {
                        min: range.min.toString(),
                        max: range.max.toString(),
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Location"
          sectionKey="location"
          count={localFilters.location.length}
        >
          <div className="space-y-3">
            {locations.map((location) => (
              <Checkbox
                key={location}
                label={location}
                checked={localFilters.location.includes(location)}
                onChange={(e) => {
                  const currentLocations = localFilters.location || [];
                  const newLocations = e.target.checked
                    ? [...currentLocations, location]
                    : currentLocations.filter((l) => l !== location);
                  handleFilterChange("location", newLocations);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection
          title="Property Type"
          sectionKey="type"
          count={localFilters.propertyType.length}
        >
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <Checkbox
                key={type.value}
                label={
                  <div className="flex items-center space-x-3">
                    <type.icon size={18} className="text-slate-600" />
                    <span className="text-slate-800 font-medium">
                      {type.label}
                    </span>
                  </div>
                }
                checked={localFilters.propertyType.includes(type.value)}
                onChange={(e) => {
                  const currentTypes = localFilters.propertyType || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type.value]
                    : currentTypes.filter((t) => t !== type.value);
                  handleFilterChange("propertyType", newTypes);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Bedrooms */}
        <FilterSection title="Bedrooms" sectionKey="bedrooms">
          <div className="grid grid-cols-4 gap-3">
            {["1", "2", "3", "4+"].map((bedroom) => (
              <button
                key={bedroom}
                onClick={() =>
                  handleFilterChange(
                    "bedrooms",
                    localFilters.bedrooms === bedroom ? "" : bedroom
                  )
                }
                className={`p-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  localFilters.bedrooms === bedroom
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {bedroom}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Bathrooms */}
        <FilterSection title="Bathrooms" sectionKey="bathrooms">
          <div className="grid grid-cols-4 gap-3">
            {["1", "2", "3", "4+"].map((bathroom) => (
              <button
                key={bathroom}
                onClick={() =>
                  handleFilterChange(
                    "bathrooms",
                    localFilters.bathrooms === bathroom ? "" : bathroom
                  )
                }
                className={`p-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  localFilters.bathrooms === bathroom
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {bathroom}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection
          title="Amenities"
          sectionKey="amenities"
          count={localFilters.amenities.length}
        >
          <div className="space-y-3">
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity}
                label={amenity}
                checked={localFilters.amenities.includes(amenity)}
                onChange={(e) => {
                  const currentAmenities = localFilters.amenities || [];
                  const newAmenities = e.target.checked
                    ? [...currentAmenities, amenity]
                    : currentAmenities.filter((a) => a !== amenity);
                  handleFilterChange("amenities", newAmenities);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Agent */}
        <FilterSection title="Agent" sectionKey="agent">
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  localFilters.agent === agent.id.toString()
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
                onClick={() =>
                  handleFilterChange(
                    "agent",
                    localFilters.agent === agent.id.toString()
                      ? ""
                      : agent.id.toString()
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-sm">
                    {agent.name}
                  </span>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full font-medium">
                    {agent.properties}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200 bg-white space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={clearAllFilters}
          className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 rounded-xl font-semibold"
        >
          <RotateCcw size={18} className="mr-2" />
          Clear All Filters
        </Button>
        {isMobile && (
          <Button
            fullWidth
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-semibold text-white"
          >
            Show {propertyCount} Properties
          </Button>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
            <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 shadow-2xl">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-slate-200 h-full shadow-sm">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;