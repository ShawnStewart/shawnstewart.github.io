import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  toggleTheme: () => void;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) ?? defaultTheme) as Theme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    const isDarkTheme = theme === 'dark';
    const isSystemTheme = theme === 'system';
    const isSystemDarkTheme =
      isSystemTheme && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDarkTheme || isSystemDarkTheme);
    localStorage.setItem(storageKey, theme);
  }, [storageKey, theme]);

  const toggleTheme = useCallback(() => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }, []);

  const value: ThemeProviderState = {
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
