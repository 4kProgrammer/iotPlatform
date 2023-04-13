import React from 'react';
import styles from '../../styles/Widget.module.css';

type WidgetProps = {
  title: string;
  value: string | number;
};

const Widget: React.FC<WidgetProps> = ({ title, value }) => {
  return (
    <div className={styles.widgetContainer}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default Widget;