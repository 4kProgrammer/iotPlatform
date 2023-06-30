import { useState } from 'react';

interface TempAdjusterProps {
  initialTemp: number;
  title: string;
  onTempChange: (temp: number) => void;  // Add a callback prop to handle temperature change
}

const TempAdjuster: React.FC<TempAdjusterProps> = ({ initialTemp, title, onTempChange }) => {
  const [temperature, setTemperature] = useState(initialTemp);

  const handleIncrease = () => {
    setTemperature((prevTemp) => {
      const newTemp = prevTemp + 1;
      onTempChange(newTemp);
      return newTemp;
    });
  };

  const handleDecrease = () => {
    setTemperature((prevTemp) => {
      const newTemp = prevTemp - 1;
      onTempChange(newTemp);
      return newTemp;
    });
  };

  return (
    <div className="temp-adjuster text-center my-4 bg-white p-4 rounded shadow-sm">
      <h2 className="font-bold text-lg mb-2 text-gray-600">{title}</h2>
      <div className="flex items-center justify-center">
        <button 
          onClick={handleIncrease} 
          className="bg-indigo-500 text-white font-bold py-1 px-3 mx-2 rounded"
        >
          +
        </button>
        <span dir="ltr" className="text-xl font-semibold text-gray-700">{temperature >= 0 ? `+${temperature}` : `${temperature}`}°C</span>
        <button 
          onClick={handleDecrease} 
          className="bg-indigo-500 text-white font-bold py-1 px-3 mx-2 rounded"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default TempAdjuster;
