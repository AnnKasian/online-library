/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DEVELOPMENT_PORT: string;
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_CONNECTION_TIMEOUT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
