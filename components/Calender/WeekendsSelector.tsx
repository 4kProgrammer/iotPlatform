import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import translate  from '../utils/i18n';

const WeekendsSelector = () => {
  const { currentLocale } = useLanguage();
  const [weekendSelection, setWeekendSelection] = useState([]);

  const toggleWeekendSelection = (dayOfWeek) => {
    if (weekendSelection.includes(dayOfWeek)) {
      // Deselect the day if it was already selected
      setWeekendSelection(weekendSelection.filter((day) => day !== dayOfWeek));
    } else {
      // Select the day if it was not selected
      setWeekendSelection([...weekendSelection, dayOfWeek]);
    }
  };

  const getLocalizedDayOfWeek = (dayOfWeek) => {
    if (currentLocale === 'fa') {
      // Map English day of week to Persian
      switch (dayOfWeek) {
        case 'Sunday':
          return 'یکشنبه';
        case 'Monday':
          return 'دوشنبه';
        case 'Tuesday':
          return 'سه‌شنبه';
        case 'Wednesday':
          return 'چهارشنبه';
        case 'Thursday':
          return 'پنج‌شنبه';
        case 'Friday':
          return 'جمعه';
        case 'Saturday':
          return 'شنبه';
        default:
          return '';
      }
    } else {
      // Return English day of week
      return dayOfWeek;
    }
  };

  return (
    <div>
      <h2>{translate('weekendsSelectorTitle', currentLocale)}</h2>
      <div>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <div
            key={day}
            className={`cursor-pointer ${weekendSelection.includes(day) ? 'bg-blue-500' : 'bg-gray-200'} py-2 px-4 m-1 rounded`}
            onClick={() => toggleWeekendSelection(day)}
          >
            {getLocalizedDayOfWeek(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekendsSelector;
