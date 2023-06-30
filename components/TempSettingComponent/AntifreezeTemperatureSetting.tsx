import TempAdjuster from './TempAdjuster';
import { useState } from 'react';

function ParentComponent() {
  const [returnWaterTemp, setReturnWaterTemp] = useState(20);
  const [environmentTemp, setEnvironmentTemp] = useState(22);

  const handleReturnWaterTempChange = (temp: number) => {
    setReturnWaterTemp(temp);
    // You can do something with the new temperature here
  };

  const handleEnvironmentTempChange = (temp: number) => {
    setEnvironmentTemp(temp);
    // You can do something with the new temperature here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 border-2 border-gray-200 rounded-lg p-4 shadow-md">
      <h1 dir="rtl" className="text-right font-bold text-xl mb-4 text-gray-700">تنظیم دمای ضد انجماد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={returnWaterTemp} 
            title="دمای برگشت آب" 
            onTempChange={handleReturnWaterTempChange}
          />
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={environmentTemp} 
            title="دمای محیط" 
            onTempChange={handleEnvironmentTempChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ParentComponent;
