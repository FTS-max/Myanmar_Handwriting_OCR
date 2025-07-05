'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme, initializeThemeListener } from '@/utils/themeUtils';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
});

// Hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component that manages theme state
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeState = useTheme();
  
  // Initialize theme listener for system preference changes
  React.useEffect(() => {
    const cleanup = initializeThemeListener();
    return cleanup;
  }, []);
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};