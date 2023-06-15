import React from 'react';
import Layout from "../components/Layout";
import CalenderSection from "../components/Calender/CalenderSection";
import TimeRangeSelection from "../components/Calender/TimeRangeSection";

const schedule: React.FC = () => {
  return (
    <Layout >
      <div className="flex flex-col lg:flex-row h-screen lg:h-auto" dir="rtl">
        <div className="flex flex-col flex-1">
          <CalenderSection />
        </div>
        <div className="flex-1">
          <TimeRangeSelection />
        </div>
      </div>
    </Layout>
  );
};

export default schedule;
