import { useState } from 'react';
import { format, addDays, startOfWeek as getStartOfWeek, isSameDay, isSameMonth, addMonths } from 'date-fns';
import classNames from 'classnames';
import { format as formatJalali, newDate as newDateJalali } from 'date-fns-jalali';
import JalaliDate from "../components/utils/jalaliDateUtils";



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

const Calendar: React.FC<CalendarProps> = ({
  startOfWeek: startOfWeekValue,
  officialHolidays,
  unofficialHolidays,
  weekendVacations,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const days = [];

    console.log("date" + date);
    const jalaliYear = formatJalali(date, 'yyyy');
    const jalaliMonth = formatJalali(date, 'MM');
    const jalaliDay = '01'; // Always set the day to 01 to get the first day of the month

    const jalaliStartDate = `${jalaliYear}/${jalaliMonth}/${jalaliDay}`;
    const year = parseInt(jalaliYear, 10);
    const month = parseInt(jalaliMonth, 10);
    const day = parseInt(jalaliDay, 10);
    console.log("jalaliStartDate" + year + "|" + month + "|" + day);
    const [gy, gm, gd] = JalaliDate.jalaliToGregorian(year, month, day);
    const gregorianStartDate = new Date(gy, gm - 1, gd);
    console.log("aaaa|" + gregorianStartDate);
    const startOfMonth = getStartOfWeek(gregorianStartDate, { weekStartsOn: startOfWeekValue });
    console.log("AA|" + startOfMonth);

    // Calculate the number of days to include from the previous month
    const prevMonthDaysCount = (startOfMonth.getDay() + startOfWeekValue) % 7;
    //(i + startOfWeekValue) % 7;
    console.log("startOfMonth.getDay()" + startOfMonth.getDay());
    console.log("prevMonthDaysCount" + prevMonthDaysCount);

    // Get the date for the first day of the displayed week
    const startOfWeek = addDays(startOfMonth, 0);

    console.log("startOfWeek" + startOfWeek);

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
    const formattedHeader = formatJalali(currentMonth, headerFormat); // Format the month in Persian (Jalali) calendar

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
    const daysOfWeek = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش']; // Persian days of the week
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
          
          const isOfficialHoliday = (day: Date, holidays: Holiday[]): boolean => {
            return holidays.some((holiday) => {
              return holiday.month === day.getMonth() + 1 && holiday.day === day.getDate();
            });
          };

          const isUnofficialHoliday =(day: Date, holidays: Date[]): boolean => {
            return holidays.some((holiday) => {              
              return holiday.getMonth() === day.getMonth() && holiday.getDate() === day.getDate() && holiday.getFullYear() === day.getFullYear();
            });            
        };        

          const jalaliCurrentMonth = parseInt(formatJalali(day, 'MM'), 10);
          var isCurrentMonth = false;

          const jalaliYear = formatJalali(currentMonth.getFullYear(), 'yyyy');
          const jalaliMonth = parseInt(formatJalali(currentMonth, 'MM'), 10);
          
          if (jalaliCurrentMonth === jalaliMonth) {
            isCurrentMonth = true;
          }

          const jalaliDate = {
            year: formatJalali(day, 'yyyy'),
            month: formatJalali(day, 'MM'),
            day: formatJalali(day, 'dd')
          };

          const cellClasses = classNames('p-2', {
            'bg-red-500 text-white': isOfficialHoliday(day,officialHolidays),
            'bg-yellow-500 text-white': isUnofficialHoliday(day,unofficialHolidays),
            'bg-blue-500 text-white': isWeekendVacation(day),
            'text-gray-400': !isCurrentMonth,
          });

          return (
            <div key={day.toISOString()} className={cellClasses}>
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

const Home: React.FC = () => {
  // Define the start of the week (0 for Sunday, 1 for Monday, etc.)
  const startOfWeek: 0 | 2 | 1 | 5 | 3 | 4 | 6 = 6;

  const officialHolidays: Holiday[] = [
    { day: 5, month: 6 }, // Example: June 5th
    { day: 6, month: 6 }, // Example: June 6th
    // Add more holidays with day and month values
  ];
   
  const unofficialHolidays = [new Date('2023-06-07')];

  // Define weekend vacations
  const weekendVacations = [
    {
      name: 'Weekend Vacation 1',
      daysOfWeek: [4,5], // Friday and Saturday
    }    
  ];

  return (
    <div className="max-w-md mx-auto py-8">
      <Calendar
        startOfWeek={startOfWeek}
        officialHolidays={officialHolidays}
        unofficialHolidays={unofficialHolidays}
        weekendVacations={weekendVacations}
      />
    </div>
  );
};

export default Home;
