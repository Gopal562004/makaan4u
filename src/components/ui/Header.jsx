import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Calendar,
  LayoutDashboard,
  BarChart3,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  User,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Button from "./Button";
import Input from "./Input";

const Header = ({ user = null, notificationCount = 0, onLogout, onSearch }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const languageRef = useRef(null);

  const navigationItems = [
    { label: "Home", path: "/home-page", icon: Home },
    { label: "Properties", path: "/property-listings", icon: Building2 },
    {
      label: "Appointments",
      path: "/appointment-management",
      icon: Calendar,
      requiresAuth: true,
    },
    {
      label: "Dashboard",
      path: "/admin-dashboard",
      icon: LayoutDashboard,
      requiresAuth: true,
      adminOnly: true,
    },
    {
      label: "Reports",
      path: "/reports-dashboard",
      icon: BarChart3,
      requiresAuth: true,
      adminOnly: true,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Viewing Confirmed",
      message: "Luxury Villa viewing tomorrow at 2 PM",
      time: "5 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "New Property Match",
      message: "Property matching your criteria available",
      time: "1 hour ago",
      type: "info",
    },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "mr", label: "मराठी" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsLanguageOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch?.(searchQuery);
      navigate("/property-listings", { state: { searchQuery } });
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("language", langCode);
    setIsLanguageOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsProfileOpen(false);
  };

  const getVisibleNavItems = () => {
    return navigationItems.filter((item) => {
      if (item.requiresAuth && !user) return false;
      if (item.adminOnly && (!user || user.role !== "admin")) return false;
      return true;
    });
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language)?.label || "English";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/home-page")}
              className="flex items-center space-x-2 transition-all hover:opacity-80"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <Home size={18} color="white" />
              </div>
              <span className="text-lg font-bold text-slate-900">
                Makaan4U
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {getVisibleNavItems().map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "text-blue-600 bg-blue-50 border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Search size={18} />
              </button>

              <div className="hidden lg:block">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 h-9 text-sm border-slate-300 focus:border-blue-300"
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                </form>
              </div>

              {/* Mobile Search Overlay */}
              {isSearchOpen && (
                <div className="lg:hidden absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch}>
                    <Input
                      type="search"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-9 text-sm"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      className="w-full mt-3 h-9 text-sm bg-blue-600 hover:bg-blue-700"
                    >
                      Search Properties
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Notifications */}
            {user && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
                >
                  <Bell size={18} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-900 text-sm">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === "success"
                                  ? "bg-green-500"
                                  : notification.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-200">
                      <Button variant="ghost" className="w-full text-sm h-9">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Language Selector - Separate from Profile */}
            <div className="relative hidden lg:block" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
              >
                <Globe size={16} />
                <span className="max-w-20 truncate">
                  {getCurrentLanguage()}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                  <div className="p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          language === lang.code
                            ? "text-blue-600 bg-blue-50 font-medium"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="flex-1 text-left">{lang.label}</span>
                        {language === lang.code && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-medium text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-600" />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <p className="font-semibold text-slate-900 text-sm">
                        {user.name}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <User size={16} />
                        <span>Profile Settings</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </button>
                    </div>

                    <div className="p-2 border-t border-slate-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="h-9 text-sm text-slate-700 hover:text-slate-900"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="h-9 text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="py-3 space-y-1">
              {getVisibleNavItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2 ${
                    isActivePath(item.path)
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-4 py-3 border-t border-slate-200 mt-2">
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <Globe size={16} />
                  <span>Language: {getCurrentLanguage()}</span>
                </div>
                <div className="flex space-x-2 mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        language === lang.code
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
