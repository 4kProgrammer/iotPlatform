import { createContext } from 'react';

type ScreenContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export const ScreenContext = createContext<ScreenContextType>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});
