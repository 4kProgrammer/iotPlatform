import { useEffect } from "react";
import Head from "next/head";
import Chart from "../components/Dashboard/Chart";
import Widget from "../components/Dashboard/Widget";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>

      {/* Dashboard */}
      <div className={styles.main}>
        <div className={styles.dashboard}>
          <h2 className={styles.dashboardTitle}>Real-time Data</h2>
          <div className={styles.widgetGrid}>
            <Widget title="Temperature" value="25°C" />
            <Widget title="Humidity" value="60%" />
            <Widget title="Pressure" value="1013 hPa" />
            <Widget title="Air Quality" value="Good" />
          </div>
          <div className={styles.chartWrapper}>
            <h3 className={styles.chartTitle}>Chart</h3>
            <Chart />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Dashboard</h2>
        <nav>
          <ul>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Profile
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Add Devices
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
