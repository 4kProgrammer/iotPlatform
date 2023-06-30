import TempAdjuster from './TempAdjuster';
import { useState } from 'react';

function ParentComponent() {
  const [wentSensorTemp, setWentSensorTemp] = useState(1);
  const [returnSensorTemp, setReturnSensorTemp] = useState(0);
  const [sanitaryWaterTempe, setSanitaryWaterTemp] = useState(-1);
  const [environmentSensorTemp, setEnvironmentSensorTemp] = useState(2);

  const handleWentSensorTempChange = (temp: number) => {
    setWentSensorTemp(temp);
    // You can do something with the new temperature here
  };

  const handleReturnWaterTempChange = (temp: number) => {
    setReturnSensorTemp(temp);
    // You can do something with the new temperature here
  };

  const handleSanitaryWaterTempeChange = (temp: number) => {
    setSanitaryWaterTemp(temp);
    // You can do something with the new temperature here
  };

  const handleEnvironmentSensorTempChange = (temp: number) => {
    setEnvironmentSensorTemp(temp);
    // You can do something with the new temperature here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 border-2 border-gray-200 rounded-lg p-4 shadow-md">
      <h1 dir="rtl" className="text-right font-bold text-xl mb-4 text-gray-700">کالیبراسیون سنسورها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={wentSensorTemp} 
            title="دمای سنسور رفت" 
            onTempChange={handleWentSensorTempChange}
          />
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={returnSensorTemp} 
            title="دمای سنسور برگشت" 
            onTempChange={handleReturnWaterTempChange}
          />
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={sanitaryWaterTempe} 
            title="دمای سنسور بهداشتی" 
            onTempChange={handleSanitaryWaterTempeChange}
          />
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <TempAdjuster 
            initialTemp={environmentSensorTemp} 
            title="دمای سنسور بهداشتی" 
            onTempChange={handleEnvironmentSensorTempChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ParentComponent;
