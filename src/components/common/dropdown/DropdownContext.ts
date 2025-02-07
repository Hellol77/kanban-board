import { createContext } from 'react';

export const DropdownContext = createContext<{
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}>({ isDropdownOpen: false, toggleDropdown: () => {} });
