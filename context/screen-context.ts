import { createContext } from "react";

export const ScreenContext = createContext<{
  isSidebarOpen: boolean;
}>({
  isSidebarOpen: false,
});