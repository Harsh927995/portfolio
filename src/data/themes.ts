export type ThemeId =
  | 'cyber-cyan'
  | 'electric-violet'
  | 'cyber-emerald'
  | 'crimson-amber';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  shortName: string;
  primary: string;
  secondary: string;
  bg: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'cyber-cyan',
    name: 'Cyber Cyan',
    shortName: 'Cyan',
    primary: '#00f2ff',
    secondary: '#ebb2ff',
    bg: '#121414',
  },
  {
    id: 'electric-violet',
    name: 'Electric Violet',
    shortName: 'Violet',
    primary: '#a855f7',
    secondary: '#38bdf8',
    bg: '#0e0f17',
  },
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald',
    shortName: 'Emerald',
    primary: '#00ff88',
    secondary: '#fbbf24',
    bg: '#0f1412',
  },
  {
    id: 'crimson-amber',
    name: 'Crimson Amber',
    shortName: 'Crimson',
    primary: '#ff3b5c',
    secondary: '#ffb020',
    bg: '#140f11',
  },
];

export const DEFAULT_THEME: ThemeId = 'cyber-cyan';
export const THEME_STORAGE_KEY = 'devcore-theme';

export function isValidThemeId(value: string | null | undefined): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

export function getStoredTheme(): ThemeId {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidThemeId(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(themeId: ThemeId): void {
  const root = document.documentElement;
  if (themeId === DEFAULT_THEME) {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', themeId);
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // Ignore storage quota/privacy mode errors
  }

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.bg);
  }
}
