/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Khoa Gemini tuy chon, nap tu bien moi truong luc build. */
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
