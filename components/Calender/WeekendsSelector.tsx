import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../utils/i18n';

type WeekendsSelectorProps = {
  weekends: number[];
  onWeekendChange: (selectedWeekends: number[]) => void;
};

const WeekendsSelector: React.FC<WeekendsSelectorProps> = ({ weekends, onWeekendChange }) => {
  const { currentLocale } = useLanguage();
  const [weekendSelection, setWeekendSelection] = useState<number[]>(weekends || []);

  useEffect(() => {
    if (typeof onWeekendChange === 'function') {
      onWeekendChange(weekendSelection);
    } else {
      console.error('onWeekendChange is not a function. It is:', typeof onWeekendChange);
    }
  }, [weekendSelection]);

  const toggleWeekendSelection = (dayOfWeek: number) => {
    if (weekendSelection.includes(dayOfWeek)) {
      // Deselect the day if it was already selected
      setWeekendSelection(weekendSelection.filter((day) => day !== dayOfWeek));
    } else {
      // Select the day if it was not selected
      setWeekendSelection([...weekendSelection, dayOfWeek]);
    }
  };

  const getLocalizedDayOfWeek = (dayOfWeek: number) => {
    if (currentLocale === 'fa') {
      // Map English day of week to Persian
      switch (dayOfWeek) {
        case 0:
          return 'یکشنبه';
        case 1:
          return 'دوشنبه';
        case 2:
          return 'سه‌شنبه';
        case 3:
          return 'چهارشنبه';
        case 4:
          return 'پنج‌شنبه';
        case 5:
          return 'جمعه';
        case 6:
          return 'شنبه';
        default:
          return '';
      }
    } else {
      // Return English day of week
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }
  };

  const firstDayOfWeek = 6; // Change this to set the first day of the week. 0 is Sunday, 1 is Monday, and so on.
  const daysOfWeek = Array.from({length: 7}, (_, i) => (firstDayOfWeek + i) % 7);

  return (
    <div>
      <h2>{translate('weekendsSelectorTitle', currentLocale)}</h2>
      <div className="flex">
        {daysOfWeek.map((dayOfWeek) => (
          <div
            key={dayOfWeek}
            className={`cursor-pointer min-w-[100px] ${
              weekendSelection.includes(dayOfWeek) ? 'bg-red-500' : 'bg-gray-200'
            } py-2 px-4 m-1 rounded`}
            onClick={() => toggleWeekendSelection(dayOfWeek)}
          >
            {getLocalizedDayOfWeek(dayOfWeek)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekendsSelector;
