import React, { useState, useEffect, useMemo } from 'react';
import ChartSection from '../components/Dashboard/Chart';
import Widget from '../components/Dashboard/Widget';
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/Layout';

const IndexPage = () => { 

  return ( 
      <Layout >
        <div className={homeStyles.content}>
          
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

