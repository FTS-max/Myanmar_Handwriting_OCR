'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

/**
 * Custom hook for managing theme (light/dark mode)
 * @returns Object with current theme and functions to change it
 */
export const useTheme = () => {
  // Initialize theme from localStorage or default to system
  const [theme, setThemeState] = useState<Theme>('system');
  
  // Effect to initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      // Default to system preference
      applyTheme('system');
    }
  }, []);
  
  // Function to set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };
  
  // Function to toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  
  return { theme, setTheme, toggleTheme };
};

/**
 * Applies the selected theme to the document
 * @param theme - The theme to apply ('light', 'dark', or 'system')
 */
const applyTheme = (theme: Theme) => {
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Apply dark class to document
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Sets up a listener for system theme changes
 */
export const initializeThemeListener = () => {
  // Check if window is defined (browser environment)
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to handle system theme changes
  const handleSystemThemeChange = () => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme === 'system') {
      applyTheme('system');
    }
  };
  
  // Add listener for system theme changes
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  // Initial check
  handleSystemThemeChange();
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
};