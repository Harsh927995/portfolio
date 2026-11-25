export type LogoId = 'cyber-hex' | 'neon-ring' | 'mono-minimal' | 'matrix-crest';

export interface LogoOption {
  id: LogoId;
  name: string;
  tag: string;
  src: string;
}

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: 'cyber-hex',
    name: 'Cyber Hex',
    tag: 'Cyan / Violet',
    src: '/portfolio-logo.png',
  },
  {
    id: 'neon-ring',
    name: 'Neon Circle',
    tag: 'Violet / Sky',
    src: '/portfolio-logo-neon.png',
  },
  {
    id: 'mono-minimal',
    name: 'Mono Minimal',
    tag: 'Silver / Cyan',
    src: '/portfolio-logo-minimal.png',
  },
  {
    id: 'matrix-crest',
    name: 'Matrix Crest',
    tag: 'Emerald / Gold',
    src: '/portfolio-logo-emerald.png',
  },
];

export const DEFAULT_LOGO_ID: LogoId = 'cyber-hex';
export const LOGO_STORAGE_KEY = 'devcore-logo';

export function getStoredLogoId(): LogoId {
  try {
    const saved = window.localStorage.getItem(LOGO_STORAGE_KEY);
    if (LOGO_OPTIONS.some((l) => l.id === saved)) {
      return saved as LogoId;
    }
  } catch {
    // Ignore storage access issues
  }
  return DEFAULT_LOGO_ID;
}

export function getLogoById(id: LogoId): LogoOption {
  return LOGO_OPTIONS.find((l) => l.id === id) ?? LOGO_OPTIONS[0];
}

export function applyLogoFavicon(logo: LogoOption): void {
  try {
    window.localStorage.setItem(LOGO_STORAGE_KEY, logo.id);
  } catch {
    // Ignore storage access issues
  }

  const icon = document.querySelector('link[rel="icon"]');
  if (icon) icon.setAttribute('href', logo.src);
  const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (appleIcon) appleIcon.setAttribute('href', logo.src);
}
