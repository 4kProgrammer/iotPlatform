import React, { useState } from "react";
import scheduleStyle from "../styles/Profile.module.css";
import Layout from "../components/Layout";
import CalenderSection from "../components/Calender/CalenderSection";
import TimeRangeSelection from "../components/Calender/TimeRangeSection";
import classNames from 'classnames';

const schedule: React.FC = () => {
  return (
    <Layout>
      <div className={scheduleStyle.flexContainer}>
        <CalenderSection className={scheduleStyle.flexItem} />
        <TimeRangeSelection className={scheduleStyle.flexItem} />
      </div>
    </Layout>
  );
};

export default schedule

