import React from 'react';
import widgetStyles from '../../styles/Widget.module.css';

interface WidgetProps {
  title: string;
  value: string | number;
}

const Widget: React.FC<WidgetProps> = ({ title, value }) => {
  return (
    <div className={widgetStyles.widget}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Widget;
