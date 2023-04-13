import React, { useContext } from "react";
import { ScreenContext } from "../context/screen-context";
import sidebarStyles from "./Sidebar.module.css";
import 'material-icons/css/material-icons.min.css';

const navItems = [
  { id: 1, title: "Profile", icon: "account_circle", handler: "handleProfile" },
  { id: 2, title: "Add Device", icon: "add_box", handler: "handleAddDevice" },
  { id: 3, title: "Schedule", icon: "schedule", handler: "handleSchedule" },
  { id: 4, title: "Logout", icon: "logout", handler: "handleLogout" }
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

  const handleClick = (handler: string) => {
    switch (handler) {
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
            <li key={item.id} onClick={() => handleClick(item.handler)}>
              <span className="material-icons">{item.icon}</span>
              {item.title}
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
