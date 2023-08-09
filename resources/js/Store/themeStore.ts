import { create } from 'zustand';
import { LIGHT_THEME, DARK_THEME, ThemesType } from '@/Types/theme.d';

interface ThemeStore {
  // theme: ThemesType;
  theme: string;
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: window.localStorage.getItem('theme') ?? LIGHT_THEME,
  switchTheme: () =>
    set(state => {
      state.theme = state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      window.localStorage.setItem('theme', state.theme);
      return { theme: state.theme };
    }),
}));
