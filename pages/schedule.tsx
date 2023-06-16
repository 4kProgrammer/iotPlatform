import React from 'react';
import Layout from "../components/Layout";
import CalenderSection from "../components/Calender/CalenderSection";
import TimeRangeSelection from "../components/Calender/TimeRangeSection";
import WeekendsSelector from '../components/Calender/WeekendsSelector';
import { SelectedDayProvider } from '../context/SelectedDayContext';

const schedule: React.FC = () => {
  return (
    <SelectedDayProvider>
      <Layout>
        <div className="flex flex-col lg:flex-row h-screen lg:h-auto" dir="rtl">
          <div className="flex flex-col flex-1">
            <CalenderSection />
          </div>
          <div className="flex-1">
            <TimeRangeSelection />
          </div>
        </div>
        <WeekendsSelector />
      </Layout>
    </SelectedDayProvider>
  );
};

export default schedule;
