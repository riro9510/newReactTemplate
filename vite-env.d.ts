/// <reference types="vite/client" />

/* eslint-disable */
interface ImportMetaEnv {
  readonly VITE_API_URL_DEV?: string;
  readonly VITE_API_URL_PROD?: string;
  readonly VITE_API_TOKEN?: string;
  readonly VITE_USE_COOKIES?: string;
  readonly ENVIRONMENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
