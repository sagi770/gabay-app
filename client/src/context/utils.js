import { createContext, useContext } from 'react';

export const UtilsContext = createContext();

export function useUtils() {
  return useContext(UtilsContext);
}
