import { useState, useContext } from 'react';
import { format, addDays, startOfWeek as getStartOfWeek, isSameDay, isSameMonth, addMonths } from 'date-fns';
import classNames from 'classnames';
import { format as formatJalali, newDate as newDateJalali } from 'date-fns-jalali';
import JalaliDate from "./jalaliDateUtils";
import { useLanguage } from '../../context/LanguageContext';
import translate  from '../utils/i18n';
import { SelectedDayContext } from '../../context/SelectedDayContext';






type CalendarProps = {
  startOfWeek: 0 | 2 | 1 | 5 | 3 | 4 | 6; // 0 for Sunday, 1 for Monday, etc.
  officialHolidays: Holiday[];
  unofficialHolidays: Date[];
  weekendVacations: { name: string; daysOfWeek: number[] }[]; // Array of weekend vacations
};

type Holiday = {
  day: number;
  month: number;
};
type TDate = {
  day: number;
  month: number;
  year: number;
};

const Calendar: React.FC<CalendarProps> = ({
  startOfWeek: startOfWeekValue,
  officialHolidays,
  unofficialHolidays,
  weekendVacations,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { selectedDay, setSelectedDay } = useContext(SelectedDayContext);
  const [selectedDays, setSelectedDays] = useState<Date[]>([]); 
  const { currentLocale  } = useLanguage();

  const getDaysInMonth = (date: Date) => {
    const days = [];
    
    const jalaliYear = formatJalali(date, 'yyyy');
    const jalaliMonth = formatJalali(date, 'MM');
    const jalaliDay = '01'; // Always set the day to 01 to get the first day of the month

    const jalaliStartDate = `${jalaliYear}/${jalaliMonth}/${jalaliDay}`;
    const year = parseInt(jalaliYear, 10);
    const month = parseInt(jalaliMonth, 10);
    const day = parseInt(jalaliDay, 10);
    const [gy, gm, gd] = JalaliDate.jalaliToGregorian(year, month, day);
    const gregorianStartDate = new Date(gy, gm - 1, gd);
    const startOfMonth = getStartOfWeek(gregorianStartDate, { weekStartsOn: startOfWeekValue });
    

    // Calculate the number of days to include from the previous month
    const prevMonthDaysCount = (startOfMonth.getDay() + startOfWeekValue) % 7;    
    // Get the date for the first day of the displayed week
    const startOfWeek = addDays(startOfMonth, 0);

    // Generate the days for the calendar, including the previous month's days if needed
    for (let i = 0; i < 42; i++) {
      const day = addDays(startOfWeek, i);
      days.push(day);
    }

    return days;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    
    const selectedJalaliMonthValue = parseInt(event.target.value, 10);
    const [gy, gm, gd] = JalaliDate.jalaliToGregorian(parseInt(formatJalali(currentMonth, 'yyyy'), 10), selectedJalaliMonthValue, parseInt(formatJalali(currentMonth, 'dd'), 10));
    setCurrentMonth(new Date(gy, gm - 1, gd));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedJalaliYearValue = parseInt(event.target.value, 10);
    const [gy, gm, gd] = JalaliDate.jalaliToGregorian(selectedJalaliYearValue, parseInt(formatJalali(currentMonth, 'MM'), 10), parseInt(formatJalali(currentMonth, 'dd'), 10));
    setCurrentMonth(new Date(gy, gm - 1, gd));
  };


  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));   
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));   
  };

  const renderCalendarHeader = () => {

    const months = Array.from(Array(12).keys()).map((month) => {
      const [gy, gm, gd] = JalaliDate.jalaliToGregorian(1300, month + 1, 1);
      const gregorianSelectedDate = new Date(gy, gm - 1, gd);
      return {
        index: month+1,
        value: formatJalali(gregorianSelectedDate, 'MMMM')
      };
    });

    const years = Array.from(Array(100).keys()).map((year) => {      
      return {
        index: 1400 + year
      };
    });

    return (
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700" onClick={handlePrevMonth}>
        {translate('prevMonth', currentLocale)}
        </button>
        <div className="flex items-center">
          <select value={parseInt(formatJalali(currentMonth, 'MM'), 10)} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index} value={month.index}>
                {month.value}
              </option>
            ))}
          </select>
          <select value={parseInt(formatJalali(currentMonth, 'yyyy'), 10)} onChange={handleYearChange}>
            {years.map((year, index) => (
              <option key={index} value={year.index}>
                {year.index}
              </option>
            ))}
          </select>
        </div>
        <button className="text-gray-500 hover:text-gray-700" onClick={handleNextMonth}>
        {translate('nextMonth', currentLocale)}
        </button>
      </div>
    );
  };


  const renderCalendarDays = () => {
    const daysOfWeek = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']; // Persian days of the week
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayIndex = (i + startOfWeekValue) % 7;
      const dayName = daysOfWeek[dayIndex];
      days.push(
        <div key={dayIndex} className="text-center font-semibold text-sm">
          {dayName}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2">{days}</div>;
  };

  const renderCalendarCells = () => {
    const daysInMonth = getDaysInMonth(currentMonth);

    const handleDayClick = (day: Date) => {
      setSelectedDays([day]);
      setSelectedDay(day);
    };


    return (
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {

          const isOfficialHoliday = (day: Date, holidays: Holiday[]): boolean => {
            return holidays.some((holiday) => {
              return holiday.month === day.getMonth() + 1 && holiday.day === day.getDate();
            });
          };

          const isUnofficialHoliday = (day: Date, holidays: Date[]): boolean => {
            return holidays.some((holiday) => {
              return holiday.getMonth() === day.getMonth() && holiday.getDate() === day.getDate() && holiday.getFullYear() === day.getFullYear();
            });
          };

          const jalaliMonth = parseInt(formatJalali(day, 'MM'), 10);
          const jalaliYear = parseInt(formatJalali(day, 'yyyy'), 10);
          var isCurrentMonth = false;

          const jalaliCurrentYear = parseInt(formatJalali(currentMonth, 'yyyy'), 10);
          const jalaliCurrentMonth = parseInt(formatJalali(currentMonth, 'MM'), 10);

          if (jalaliCurrentMonth === jalaliMonth && jalaliCurrentYear === jalaliYear) {
            isCurrentMonth = true;
          }

          const jalaliDate = {
            year: formatJalali(day, 'yyyy'),
            month: formatJalali(day, 'MM'),
            day: formatJalali(day, 'dd')
          };

          const cellClasses = classNames('p-2', {
            'text-red-500': isOfficialHoliday(day, officialHolidays) || isUnofficialHoliday(day, unofficialHolidays) || isWeekendVacation(day),
            'opacity-50': !isCurrentMonth, // Added opacity class when day is not in the current month
            'border-2 border-blue-500': selectedDays.some((selectedDay) => isSameDay(selectedDay, day)),
          });

          return (
            <div key={day.toISOString()} className={cellClasses} onClick={() => handleDayClick(day)}>
              {jalaliDate.day}
            </div>
          );
        })}
      </div>
    );
  };


  const isWeekendVacation = (date: Date) => {
    const dayOfWeek = date.getDay();
    return weekendVacations.some((vacation) =>
      vacation.daysOfWeek.includes(dayOfWeek)
    );
  };

  return (
    <div>
      {renderCalendarHeader()}
      {renderCalendarDays()}
      {renderCalendarCells()}
    </div>
  );



};

const CalenderSection: React.FC = () => {
  // Define the start of the week (0 for Sunday, 1 for Monday, etc.)
  const startOfWeek: 0 | 2 | 1 | 5 | 3 | 4 | 6 = 6;

  const officialHolidays: Holiday[] = [
    { day: 4, month: 6 }, // Example: June 4th
    { day: 5, month: 6 }, // Example: June 5th
    // Add more holidays with day and month values
  ];

  const unofficialHolidays = [new Date('2023-06-07')];

  // Define weekend vacations
  const weekendVacations = [
    {
      name: 'Weekend Vacation 1',
      daysOfWeek: [4, 5], // 
    }
  ];

  return (
    <div className="aspect-w-16 aspect-h-9 aspect-content">
      <Calendar
        startOfWeek={startOfWeek}
        officialHolidays={officialHolidays}
        unofficialHolidays={unofficialHolidays}
        weekendVacations={weekendVacations}
      />
    </div>
  );
  
};

export default CalenderSection;
