import React, { useState } from 'react';
import Head from 'next/head';
import ChartSection from '../components/Dashboard/Chart';
import Widget from '../components/Dashboard/Widget';
import Sidebar from '../components/Sidebar';
import homeStyles from '../styles/Home.module.css';

const IndexPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={homeStyles.container}>
        <header className={homeStyles.header}>
          <div className={homeStyles.headerContent}>
            <h1 className={homeStyles.dashboardTitle}>Dashboard</h1>
            <button className={homeStyles.headerMenuButton} onClick={toggleSidebar}>
              <span className="material-icons">menu</span>
            </button>            
          </div>
        </header>
        <div className={homeStyles.content}>
          {isSidebarOpen && <Sidebar />}
          <div className={homeStyles.mainContent}>
            <h2 className={homeStyles.dashboardTitle}>Dashboard</h2>
            <ChartSection />
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
      </div>
    </>
  );
};

export default IndexPage;
