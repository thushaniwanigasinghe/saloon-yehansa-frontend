import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {  Bell,  Menu, X, Sun, Moon } from "lucide-react";
import axios from "axios";
import logoImage from "../assets/logo.jpg";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const userStr = localStorage.getItem("userInfo");
  const user = userStr ? JSON.parse(userStr) : null;

  const isActive = (path) => location.pathname === path;

  const getLinkClass = (path) => {
    return `px-4 py-2 rounded-full text-sm font-medium transition-all ${
      isActive(path)
        ? 'bg-yellow-500 text-black dark:text-yellow-500 dark:bg-yellow-500/10'
        : 'text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5'
    }`;
  };

  const getMobileLinkClass = (path) => {
    return `block px-4 py-4 rounded-xl text-lg font-medium border transition-all ${
      isActive(path)
        ? 'bg-yellow-500 text-black border-transparent dark:text-yellow-500 dark:bg-yellow-500/10 dark:border-yellow-500/20'
        : 'text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5 border-transparent hover:border-stone-300 dark:hover:border-white/10'
    }`;
  };

  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [lastSeen, setLastSeen] = useState(
    Number(localStorage.getItem("lastSeenNotifications") || 0),
  );
  const [openedWithLastSeen, setOpenedWithLastSeen] = useState(lastSeen);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  }, [location]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      const checkNotifications = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get(
            "http://localhost:5000/api/appointments/myappointments",
            config,
          );
          const approvedApps = data.filter((app) => app.status === "approved");
          setNotifications(approvedApps.reverse()); // Show newest first

          const hasUnread = approvedApps.some(
            (app) => new Date(app.updatedAt).getTime() > lastSeen,
          );
          setHasNotifications(hasUnread);
        } catch (error) {
          console.error("Error fetching notifications", error);
        }
      };

      checkNotifications();
      const interval = setInterval(checkNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [userStr, lastSeen]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleNotifications = () => {
    if (!showDropdown) {
      setOpenedWithLastSeen(lastSeen);
      setShowDropdown(true);
      setHasNotifications(false);
    } else {
      setShowDropdown(false);
      const now = Date.now();
      localStorage.setItem("lastSeenNotifications", now);
      setLastSeen(now);
      setOpenedWithLastSeen(now);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-stone-50/90 dark:bg-black/90 backdrop-blur-md border-b border-stone-200 dark:border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoImage}
                alt="Logo"
                className="h-10 w-10 object-cover rounded-full border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-2xl font-light tracking-widest text-stone-900 dark:text-white uppercase">
                Saloon<span className="font-bold text-yellow-500">Yehansa</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className={getLinkClass('/')}>Home</Link>
              <Link to="/about" className={getLinkClass('/about')}>About</Link>
              <Link to="/gallery" className={getLinkClass('/gallery')}>Gallery</Link>
              <Link to="/services" className={getLinkClass('/services')}>Services</Link>
              <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>

              <button
                onClick={toggleTheme}
                className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {user ? (
                <>
                  <Link to={user.role === "admin" ? "/admin" : "/dashboard"} className={getLinkClass(user.role === "admin" ? "/admin" : "/dashboard")}>Dashboard</Link>

                  {user.role !== "admin" && (
                    <div className="relative inline-block text-left">
                      <button
                        onClick={toggleNotifications}
                        className={`relative p-2 rounded-full transition-colors flex items-center ${
                          hasNotifications
                            ? "text-red-500 hover:bg-red-500/10 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                            : showDropdown
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "text-stone-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-white/10 hover:text-stone-900 dark:hover:text-white"
                        }`}
                        title="Notifications"
                      >
                        <Bell size={20} />
                      </button>

                      {/* Desktop Notifications Dropdown */}
                      {showDropdown && (
                        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-neutral-900 border border-stone-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                          <div className="p-4 border-b border-stone-200 dark:border-white/10 flex justify-between items-center bg-stone-50/60 dark:bg-black/60 backdrop-blur-md">
                            <h3 className="text-stone-900 dark:text-white font-medium text-xs uppercase tracking-widest">
                              Notifications
                            </h3>
                            <span className="text-[10px] bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 px-2 py-0.5 rounded-full font-bold">
                              {notifications.length}
                            </span>
                          </div>
                          <div className="max-h-80 overflow-y-auto scrollbar-hide">
                            {notifications.length > 0 ? (
                              notifications.map((notif) => {
                                const isNew =
                                  new Date(notif.updatedAt).getTime() >
                                  openedWithLastSeen;
                                return (
                                  <div
                                    key={notif._id}
                                    className={`p-4 border-b border-stone-200 dark:border-white/5 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors relative ${isNew ? "bg-red-500/5" : ""}`}
                                  >
                                    {isNew && (
                                      <span className="absolute top-4 right-4 bg-red-500 text-stone-900 dark:text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                        New
                                      </span>
                                    )}
                                    <p
                                      className={`text-sm leading-relaxed ${isNew ? "text-stone-900 dark:text-white" : "text-stone-600 dark:text-gray-300"}`}
                                    >
                                      Your booking for{" "}
                                      <span className="text-yellow-500 font-medium">
                                        {notif.serviceId?.name || "a service"}
                                      </span>{" "}
                                      on{" "}
                                      {new Date(
                                        notif.date,
                                      ).toLocaleDateString()}{" "}
                                      at {notif.time} has been{" "}
                                      <span className="text-green-400 font-medium">
                                        approved
                                      </span>
                                      .
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">
                                      {new Date(
                                        notif.updatedAt,
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="p-8 text-center text-gray-500 text-sm">
                                <Bell
                                  size={24}
                                  className="mx-auto mb-3 opacity-20"
                                />
                                No notifications yet.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="border border-stone-300 dark:border-white/20 text-stone-900 dark:text-white hover:bg-white hover:text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ml-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-yellow-500 text-black hover:bg-neutral-800 dark:hover:bg-yellow-400 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ml-4"
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white focus:outline-none p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {user && user.role !== "admin" && hasNotifications && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-red-500 animate-pulse relative p-2"
              >
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-neutral-900"></span>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white focus:outline-none p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-screen opacity-100 border-b border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-neutral-950 shadow-2xl" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-6 space-y-2 flex flex-col max-h-[80vh] overflow-y-auto">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/')}>Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/about')}>About Us</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/gallery')}>Gallery</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/services')}>Services</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/contact')}>Contact</Link>

          <div className="h-px bg-stone-100 dark:bg-white/10 my-4"></div>

          {user ? (
            <>
              <Link to={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass(user.role === "admin" ? "/admin" : "/dashboard")}>Dashboard</Link>

              {user.role !== "admin" && (
                <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none rounded-xl border border-stone-200 dark:border-white/10 overflow-hidden my-2">
                  <button
                    onClick={toggleNotifications}
                    className="w-full text-left px-4 py-4 text-lg font-medium text-stone-900 dark:text-white flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <Bell
                        size={20}
                        className={
                          hasNotifications
                            ? "text-red-500"
                            : "text-stone-600 dark:text-gray-400"
                        }
                      />{" "}
                      Notifications
                    </span>
                    {hasNotifications && (
                      <span className="bg-red-500 text-stone-900 dark:text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold animate-pulse">
                        New
                      </span>
                    )}
                  </button>

                  {showDropdown && (
                    <div className="px-2 pb-2 bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((notif) => {
                          const isNew =
                            new Date(notif.updatedAt).getTime() >
                            openedWithLastSeen;
                          return (
                            <div
                              key={notif._id}
                              className="p-3 mb-1 bg-white dark:bg-white/5 shadow-sm dark:shadow-none rounded-lg border border-stone-200 dark:border-white/5 text-sm"
                            >
                              {isNew && (
                                <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                                  New
                                </span>
                              )}
                              <p className="text-stone-600 dark:text-gray-300 text-xs leading-relaxed">
                                Your booking for{" "}
                                <span className="text-yellow-500">
                                  {notif.serviceId?.name || "service"}
                                </span>{" "}
                                on {new Date(notif.date).toLocaleDateString()}{" "}
                                has been{" "}
                                <span className="text-green-400">approved</span>
                                .
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-xs">
                          No notifications.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-red-500/20 transition-all text-left mt-2"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-500 text-black hover:bg-neutral-800 dark:hover:bg-yellow-400 block px-4 py-4 rounded-xl text-lg font-bold text-center mt-4 uppercase tracking-widest shadow-lg shadow-black/10 dark:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all"
            >
              Book Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
