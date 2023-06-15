import React, { useEffect, useState, useMemo } from "react";
import classNames from 'classnames';

type TimeSlot = {
  hour: number;
  half: number;
  selected: boolean;
};

const halfHours = ['00', '30'];

// Replace these functions with your actual data fetching/updating methods
const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
  // Replace with your actual data fetching method
  // This is a placeholder that returns the initial values
  return Array.from({ length: 24 }, (_, hour) =>
    halfHours.map((_, i) => ({
      hour,
      half: i,
      selected: false,
    }))
  ).flat();
};

const updateTimeSlots = async (timeSlots: TimeSlot[]): Promise<void> => {
  // Replace with your actual data updating method
  // This is a placeholder that does nothing
};

const TimeLimitSection: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [startRangeIndex, setStartRangeIndex] = useState<number | null>(null);
  const [endRangeIndex, setEndRangeIndex] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingValue, setSelectingValue] = useState<boolean | null>(null);

  // Fetch the time slots when the component mounts
  useEffect(() => {
    fetchTimeSlots().then(setTimeSlots);
  }, []);

  // Log and update the time slots when they change
  useEffect(() => {
    console.log(timeSlots);
    updateTimeSlots(timeSlots);
  }, [timeSlots]);

  const startSelecting = (index: number) => {
    setIsSelecting(true);
    setStartRangeIndex(index);
    const newSelectingValue = timeSlots[index].selected ? false : true;
    setSelectingValue(newSelectingValue);
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].selected = newSelectingValue;
    setTimeSlots(newTimeSlots);
};
  const endSelecting = () => {
    setIsSelecting(false);
    setStartRangeIndex(null);
    setSelectingValue(null);
    setEndRangeIndex(null);
  };

  const selectTimeSlot = (index: number) => {
    if (isSelecting && selectingValue !== null) {
      const newTimeSlots = [...timeSlots];
      const oldEndRangeIndex = endRangeIndex;
      setEndRangeIndex(index);
      const rangeStart = Math.min(startRangeIndex!, index);
      const rangeEnd = Math.max(startRangeIndex!, index);
      if (oldEndRangeIndex !== null) {
        const oldRangeStart = Math.min(startRangeIndex!, oldEndRangeIndex);
        const oldRangeEnd = Math.max(startRangeIndex!, oldEndRangeIndex);
        for (let i = oldRangeStart; i <= oldRangeEnd; i++) {
          newTimeSlots[i].selected = newTimeSlots[i].selected !== selectingValue;
        }
      }
      for (let i = rangeStart; i <= rangeEnd; i++) {
        newTimeSlots[i].selected = selectingValue;
      }
      setTimeSlots(newTimeSlots);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isSelecting) {
        endSelecting();
      }
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isSelecting]);

  const ranges = useMemo(() => {
    let start: number | null = null;
    let end: number | null = null;
    const ranges: { start: number; end: number }[] = [];

    timeSlots.forEach((slot, index) => {
      if (slot.selected) {
        if (start === null) {
          start = index;
        }
        end = index;
      }

      if ((start !== null && !slot.selected) || (slot.selected && index === timeSlots.length - 1)) {
        ranges.push({ start, end: end! });
        start = null;
        end = null;
      }
    });

    return ranges;
}, [timeSlots]);


  return (
    <div className="mt-4 select-none">
        <h2 className="text-lg font-semibold mb-2">TimeTable</h2>
        <div className="relative bg-gray-100 p-4 m-0 p-0">
              {timeSlots.map((slot, index) => {
                  const range = ranges.find(({ start, end }) => index >= start && index <= end);
                  let displayText = "";
                  if (range && range.start === index) {
                      let endSlot;
                      if (range.end < timeSlots.length - 1) {
                          endSlot = timeSlots[range.end + 1];
                      } else if (range.end === timeSlots.length - 1 && timeSlots[range.end].selected) {
                          endSlot = { hour: 24, half: 0 };
                      } else {
                          endSlot = timeSlots[range.end];
                      }
                      displayText = `${timeSlots[range.start].hour}:${halfHours[timeSlots[range.start].half]}-${endSlot.hour}:${halfHours[endSlot.half]}`;
                  }

              // differentiate border style
              const isHourCell = slot.half === 0;
              const borderClass = isHourCell ? 'border-t-2 border-blue-500' : 'border-t border-gray-300';

              // differentiate text color
              const textColorClass = isHourCell ? 'text-sm font-mono' : 'text-sm font-mono text-transparent';

              return (
                <div className={`flex ${borderClass} m-0 p-0`} key={index}>
                    <div className="border-r border-gray-300 p-2 text-center flex items-start m-0 p-0">
                        <div className="inline-block min-w-[4rem] m-0 p-0">
                            <span className={textColorClass}>{slot.hour}:{halfHours[slot.half]}</span>
                        </div>
                    </div>
                    <div
                        onMouseDown={() => startSelecting(index)}
                        onMouseEnter={() => selectTimeSlot(index)}
                        className={classNames('border-r border-gray-300 flex-grow h-10 cursor-pointer relative rounded transition-colors duration-300 m-0 p-0', {
                            'bg-blue-400': slot.selected,
                            'hover:border-blue-400': !slot.selected
                        })}
                    >{displayText && <span className="absolute top-1 left-0 transform translate-y-1/4 translate-x-1/2 text-black">{displayText}</span>}
                    </div>
                </div>
              );
            })}
        </div>
    </div>
  );

};

export default TimeLimitSection;