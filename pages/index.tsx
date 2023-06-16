import React, { useState, useEffect, useMemo } from 'react';
import ChartSection from '../components/Dashboard/Chart';
import Widget from '../components/Dashboard/Widget';
import homeStyles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import translate from '../components/utils/i18n';


const IndexPage = () => { 
  const { currentLocale } = useLanguage();

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
                <Widget title={translate('sanitaryTemperature', currentLocale)} value="72°F" />
                <Widget title={translate('returnTemperature', currentLocale)} value="45%" />
                <Widget title={translate('wentTemperature', currentLocale)} value="1013 hPa" />
                <Widget title={translate('energyGrade', currentLocale)} value="5 mph" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default IndexPage;

