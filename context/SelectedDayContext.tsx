import React, { useState } from 'react';

export type SelectedDayContextType = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date) => void;
};

export const SelectedDayContext = React.createContext<SelectedDayContextType>({
  selectedDay: null,
  setSelectedDay: () => {},
});

export const SelectedDayProvider: React.FC = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  return (
    <SelectedDayContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </SelectedDayContext.Provider>
  );
};
