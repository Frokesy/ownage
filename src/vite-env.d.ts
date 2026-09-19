/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_COMPANY_NAME?: string
  readonly VITE_PHONE?: string
  readonly VITE_EMAIL?: string
  readonly VITE_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
