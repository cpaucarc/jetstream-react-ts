export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export type LightThemeType = typeof LIGHT_THEME;
export type DarkThemeType = typeof DARK_THEME;
export type ThemesType = LightThemeType | DarkThemeType;

export interface Themes {
  light: LIGHT_THEME;
  dark: DARK_THEME;
}
