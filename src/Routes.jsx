// import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// import NotFound from "pages/NotFound";
// import PropertyDetails from "./pages/property-details";
// import AdminDashboard from "./pages/admin-dashboard";
// import AppointmentManagement from "./pages/appointment-management";
// import ReportsDashboard from "./pages/admin-dashboard/components/report-dashboard";
// import PropertyListings from "./pages/property-listings";
// import HomePage from "./pages/home-page";

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <ScrollToTop />
//         <RouterRoutes>
//           {/* Define your route here */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/property-details" element={<PropertyDetails />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route
//             path="/appointment-management"
//             element={<AppointmentManagement />}
//           />
//           <Route path="/reports-dashboard" element={<ReportsDashboard />} />
//           <Route path="/property-listings" element={<PropertyListings />} />
//           <Route path="/home-page" element={<HomePage />} />
//           <Route path="*" element={<NotFound />} />
//         </RouterRoutes>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertyDetails from "./pages/property-details";
import AppointmentManagement from "./pages/appointment-management";
import PropertyListings from "./pages/property-listings";
import HomePage from "./pages/home-page";

// Import the new admin structure
import AdminLayout from "./pages/admin-dashboard/AdminLayout";
import AdminDashboard from "./pages/admin-dashboard/dashboard/AdminDashboard";
import ReportsDashboard from "./pages/admin-dashboard/reports/ReportsDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/property-listings" element={<PropertyListings />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route
            path="/appointment-management"
            element={<AppointmentManagement />}
          />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<ReportsDashboard />} />
            {/* You can add more admin routes here */}
          </Route>

          {/* Legacy routes for backward compatibility - redirect to new structure */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/reports-dashboard" element={<ReportsDashboard />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
