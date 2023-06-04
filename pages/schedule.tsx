import { useState } from 'react';
import { format, addDays, startOfWeek as getStartOfWeek, isSameDay, isSameMonth, addMonths } from 'date-fns';
import classNames from 'classnames';

type CalendarProps = {
  startOfWeek: 0 | 2 | 1 | 5 | 3 | 4 | 6; // 0 for Sunday, 1 for Monday, etc.
  officialHolidays: Date[];
  unofficialHolidays: Date[];
};

const Calendar: React.FC<CalendarProps> = ({
  startOfWeek: startOfWeekValue,
  officialHolidays,
  unofficialHolidays,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const days = [];
    const startOfMonth = getStartOfWeek(date, { weekStartsOn: startOfWeekValue });
  
    // Get the first day of the month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  
    // Calculate the number of days to include from the previous month
    const prevMonthDaysCount = (startOfMonth.getDay() + 6) % 7;
  
    // Get the date for the first day of the displayed week
    const startOfWeek = addDays(firstDayOfMonth, -prevMonthDaysCount);
  
    // Generate the days for the calendar, including the previous month's days if needed
    for (let i = 0; i < 42; i++) {
      const day = addDays(startOfWeek, i);
      days.push(day);
    }
  
    return days;
  };
  

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const renderCalendarHeader = () => {
    const headerFormat = 'MMMM yyyy';
    const formattedHeader = format(currentMonth, headerFormat);

    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <h2 className="text-lg font-bold">{formattedHeader}</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>
    );
  };

  const renderCalendarDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayIndex = (i + startOfWeekValue) % 7;
      const dayName = daysOfWeek[dayIndex];
      days.push(
        <div key={dayIndex} className="text-center font-semibold">
          {dayName}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2">{days}</div>;
  };

  const renderCalendarCells = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
  
    return (
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          const isOfficialHoliday = officialHolidays.some((holiday) =>
            isSameDay(holiday, day)
          );
  
          const isUnofficialHoliday = unofficialHolidays.some((holiday) =>
            isSameDay(holiday, day)
          );
  
          const isCurrentMonth = isSameMonth(day, currentMonth);
  
          const cellClasses = classNames('p-2', {
            'bg-red-500 text-white': isOfficialHoliday,
            'bg-yellow-500 text-white': isUnofficialHoliday,
            'text-gray-400': !isCurrentMonth, // Apply gray color to days not in current month
          });
  
          return (
            <div key={day.toISOString()} className={cellClasses}>
              {day.getDate()}
            </div>
          );
        })}
      </div>
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

const Home: React.FC = () => {
  // Define the start of the week (0 for Sunday, 1 for Monday, etc.)
  const startOfWeek: 0 | 2 | 1 | 5 | 3 | 4 | 6 = 6;

  // Define official and unofficial holidays
  const officialHolidays = [new Date('2023-06-07')];
  const unofficialHolidays = [new Date('2023-06-14')];

  return (
    <div className="max-w-md mx-auto py-8">
      <Calendar
        startOfWeek={startOfWeek}
        officialHolidays={officialHolidays}
        unofficialHolidays={unofficialHolidays}
      />
    </div>
  );
};

export default Home;

