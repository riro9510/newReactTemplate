/// <reference types="vite/client" />

/* eslint-disable */
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_API_TOKEN?: string;
  readonly VITE_USE_COOKIES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
