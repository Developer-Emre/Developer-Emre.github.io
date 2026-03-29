// @refresh reset
import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// ── Context ──────────────────────────────────────────────────
export const ThemeContext = createContext<ThemeContextValue | null>(null);

