// pages/index.tsx

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import ChartSection from '../components/Dashboard/Chart';
import Widget from '../components/Dashboard/Widget';
import Sidebar from '../components/Sidebar';
import homeStyles from '../styles/Home.module.css';
import { ScreenContext } from "../context/screen-context";
import Layout from '../components/Layout';

const isLandscape = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth > window.innerHeight;
  }
  return false;
};

const IndexPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPortrait, setIsPortrait] = useState(!isLandscape());

  useEffect(() => {
    setIsSidebarOpen(isLandscape());
    setIsPortrait(!isLandscape());

    const handleResize = () => {
      setIsSidebarOpen(isLandscape());
      setIsPortrait(!isLandscape());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (!isLandscape()) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const screenContextValue = useMemo(() => ({ isSidebarOpen }), [isSidebarOpen]);

  return ( 
      <Layout toggleSidebar={toggleSidebar}>
        <div className={homeStyles.content}>
          <Sidebar isOpen={isSidebarOpen} isPortrait={isPortrait} />
          <div className={homeStyles.mainContent}>
            <h2 className={homeStyles.dashboardTitle}>Dashboard</h2>
            <div className={homeStyles.chartContainer}>
              <ChartSection />
            </div>
            <div className={homeStyles.widgetWrapper}>
              <div className={homeStyles.widgets}>
                <Widget title="Temperature" value="72°F" />
                <Widget title="Humidity" value="45%" />
                <Widget title="Pressure" value="1013 hPa" />
                <Widget title="Wind Speed" value="5 mph" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default IndexPage;

