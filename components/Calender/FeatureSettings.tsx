import { useState } from 'react';

const FeatureSettings: React.FC = () => {
  const [isHotWaterEnabled, setIsHotWaterEnabled] = useState(false);
  const [isPreheatingEnabled, setIsPreheatingEnabled] = useState(false);

  const handleHotWaterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsHotWaterEnabled(event.target.value === 'enabled');
  };

  const handlePreheatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPreheatingEnabled(event.target.value === 'enabled');
  };

  return (
    <div>
      <div className="mb-4">
        <span>آب گرم بهداشتی در ساعت غیر کاری:</span>
        <label className="ml-2">
          <input
            type="radio"
            name="hotWater"
            value="enabled"
            checked={isHotWaterEnabled}
            onChange={handleHotWaterChange}
          />
          فعال
        </label>
        <label className="ml-2">
          <input
            type="radio"
            name="hotWater"
            value="disabled"
            checked={!isHotWaterEnabled}
            onChange={handleHotWaterChange}
          />
          غیرفعال
        </label>
      </div>
      <div>
        <span>قابلیت پیش گرمایش:</span>
        <label className="ml-2">
          <input
            type="radio"
            name="preheating"
            value="enabled"
            checked={isPreheatingEnabled}
            onChange={handlePreheatingChange}
          />
          فعال
        </label>
        <label className="ml-2">
          <input
            type="radio"
            name="preheating"
            value="disabled"
            checked={!isPreheatingEnabled}
            onChange={handlePreheatingChange}
          />
          غیرفعال
        </label>
      </div>
    </div>
  );
};

export default FeatureSettings;
