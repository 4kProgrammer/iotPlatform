import React from 'react';
import headerStyles from './Header.module.css';
import LanguageSwitcher from '../LanguageSwitcher'; // Import the LanguageSwitcher component

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <LanguageSwitcher /> {/* Add the LanguageSwitcher component */}
        <h1 className={headerStyles.dashboardTitle}>Dashboard</h1>
        <button className={headerStyles.headerMenuButton} onClick={toggleSidebar}>
          <span className="material-icons">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
