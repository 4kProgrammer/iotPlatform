import { useState } from 'react';

const FeatureSettings: React.FC = () => {
  const [isHotWaterEnabled, setIsHotWaterEnabled] = useState(false);
  const [isPreheatingEnabled, setIsPreheatingEnabled] = useState(false);
  const [isActiveInOfficialHoliday, setIsActiveInOfficialHoliday] = useState(false);
  const [is24HourRunEnabled, setIs24HourRunEnabled] = useState(false);

  const handleHotWaterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsHotWaterEnabled(event.target.value === 'enabled');
  };

  const handlePreheatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPreheatingEnabled(event.target.value === 'enabled');
  };

  const handleActiveInOfficialHolidayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveInOfficialHoliday(event.target.value === 'enabled');
  };

  const handle24HourRunChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIs24HourRunEnabled(event.target.value === 'enabled');
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <span className="font-semibold text-lg mb-4 block">آب گرم بهداشتی در ساعت غیر کاری:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hotWater"
              value="enabled"
              checked={isHotWaterEnabled}
              onChange={handleHotWaterChange}
            />
            فعال
          </label>
          <label className="flex items-center gap-2">
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
      </div>
      <div className="mb-8">
        <span className="font-semibold text-lg mb-4 block">وضعیت دستگاه در تعطیلات رسمی:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="holidayMode"
              value="enabled"
              checked={isActiveInOfficialHoliday}
              onChange={handleActiveInOfficialHolidayChange}
            />
            فعال
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="holidayMode"
              value="disabled"
              checked={!isActiveInOfficialHoliday}
              onChange={handleActiveInOfficialHolidayChange}
            />
            غیرفعال
          </label>
        </div>
      </div>
      <div className="mb-8">
        <span className="font-semibold text-lg mb-4 block">کارکرد 24 ساعته در روزهای کاری:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="24HourRun"
              value="enabled"
              checked={is24HourRunEnabled}
              onChange={handle24HourRunChange}
            />
            فعال
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="24HourRun"
              value="disabled"
              checked={!is24HourRunEnabled}
              onChange={handle24HourRunChange}
            />
            غیرفعال
          </label>
        </div>
      </div>
    </div>
  );
};

export default FeatureSettings;

