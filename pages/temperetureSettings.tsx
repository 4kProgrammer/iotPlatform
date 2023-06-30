import React, { useState } from 'react'; 
import Layout from "../components/Layout";
import SanitaryWaterTemperature from '../components/TempSettingComponent/SanitaryWaterTemperature';
import AntifreezeTemperatureSetting from '../components/TempSettingComponent/AntifreezeTemperatureSetting';
import EnergyLabel from '../components/TempSettingComponent/EnergyLabel'
import SensorCalibration from '../components/TempSettingComponent/sensorCalibration'
const temperetureSettings: React.FC = () => {
  const [selectedEnergyClass, setSelectedEnergyClass] = useState("C");  // added state here

  const handleEnergyClassSelect = (selectedClass) => {
    setSelectedEnergyClass(selectedClass);
    console.log("selected"+selectedEnergyClass);
    // Now you can use the selected energy class anywhere in this component or pass it to other components as props
  };

  return (    
      <Layout>
        <div className="flex flex-col space-y-4 lg:flex-row h-screen lg:h-auto" dir="rtl">
          <div className="flex flex-col space-y-4 flex-1">  
          <SanitaryWaterTemperature></SanitaryWaterTemperature> 
          <AntifreezeTemperatureSetting  ></AntifreezeTemperatureSetting>  
          <EnergyLabel 
              classes="A,B,C,D,E,F,G" 
              selected={selectedEnergyClass} 
              onSelect={handleEnergyClassSelect}  
            />
            <SensorCalibration></SensorCalibration>
            
          </div>          
        </div>         
      </Layout>    
  );
};

export default temperetureSettings;
