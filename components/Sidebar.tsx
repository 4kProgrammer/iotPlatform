import React, { useContext } from "react";
import { ScreenContext } from "../context/screen-context";
import sidebarStyles from "./Sidebar.module.css";
import 'material-icons/css/material-icons.min.css';
import Link from 'next/link';

const navItems = [
  { id: 0, title: "Dashboard", icon: "dashboard", handler: "handleDashboard", path: "/" },
  { id: 1, title: "Profile", icon: "account_circle", handler: "handleProfile", path: "/profile" },
  { id: 2, title: "Add Device", icon: "add_box", handler: "handleAddDevice", path: "/add-device" },
  { id: 3, title: "Schedule", icon: "schedule", handler: "handleSchedule", path: "/schedule" },
  { id: 4, title: "Logout", icon: "logout", handler: "handleLogout", path: "/logout" }
];

const Sidebar = () => {
  const { isSidebarOpen } = useContext(ScreenContext);

  const sidebarClassName = isSidebarOpen
    ? `${sidebarStyles.sidebar} ${sidebarStyles.show}`
    : sidebarStyles.sidebar;

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  const handleAddDevice = () => {
    console.log("Add Device clicked");
  };

  const handleSchedule = () => {
    console.log("Schedule clicked");
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleDashboard = () => {
    console.log("Dashboard clicked");
  };

  const handleClick = (handler: string) => {
    switch (handler) {
      case "handleDashboard":
        handleDashboard();
        break;
      case "handleProfile":
        handleProfile();
        break;
      case "handleAddDevice":
        handleAddDevice();
        break;
      case "handleSchedule":
        handleSchedule();
        break;
      case "handleLogout":
        handleLogout();
        break;
      default:
        console.log("Unknown handler");
    }
  };

  return (
    <aside className={sidebarClassName}>
      <nav className={sidebarStyles.nav}>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <div
                  className={sidebarStyles.content}
                  onClick={() => handleClick(item.handler)}
                >
                  <span className="material-icons">{item.icon}</span>
                  {item.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={sidebarStyles.softwareInfo}>
        <p>Software Name v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
