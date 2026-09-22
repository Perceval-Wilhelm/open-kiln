type ImportMetaEnv = {
  ENV: string;
  VITE_API_ENDPOINT: string;
  VITE_ICONS_CDN_URL: string;
  VITE_API_ICON_ENDPOINT: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
