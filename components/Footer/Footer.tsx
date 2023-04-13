import React, { useState } from "react";
import footerStyles from "./Footer.module.css";
import "material-icons/css/material-icons.min.css";

const Footer = () => {
  const [isFooterDrawerOpen, setIsFooterDrawerOpen] = useState(false);
  const toggleFooterDrawer = () => {
    setIsFooterDrawerOpen(!isFooterDrawerOpen);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked:', event.currentTarget.id);
  };

  return (
    <footer className={footerStyles.footer}>
      <button id="more" className={footerStyles.footerButton} onClick={toggleFooterDrawer}>
        <span className="material-icons">more_vert</span>
        <span className={footerStyles.text}>More</span>
      </button>
      <button id="profile" className={footerStyles.footerButton} onClick={handleButtonClick}>
        <span className="material-icons">account_circle</span>
        <span className={footerStyles.text}>Profile</span>
      </button>
      <button id="home" className={footerStyles.footerButton} onClick={handleButtonClick}>
        <span className="material-icons">home</span>
        <span className={footerStyles.text}>Home</span>
      </button>
      {isFooterDrawerOpen && (
        <div className={footerStyles.footerDrawer}>
          <ul className={footerStyles.moreNav}>
            <li className={footerStyles.moreNavItem}>Nav Item 1</li>
            <li className={footerStyles.moreNavItem}>Nav Item 2</li>
            <li className={footerStyles.moreNavItem}>Nav Item 3</li>
            <li className={footerStyles.moreNavItem}>Nav Item 3</li>
          </ul>
        </div>
      )}
    </footer>
  );
};

export default Footer;