// components/Layout.tsx

import React, { useState, useContext } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar';
import layoutStyles from './Layout.module.css';
import { ScreenContext } from '../context/screen-context';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const screenContextValue = {
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <ScreenContext.Provider value={screenContextValue}>
      <div className={layoutStyles.container}>
        <Header toggleSidebar={toggleSidebar} />
        <div className={layoutStyles.content}>
          <Sidebar  />
          <main className={layoutStyles.main}>{children}</main>
        </div>
        <Footer />
      </div>
    </ScreenContext.Provider>
  );
};

export default Layout;
