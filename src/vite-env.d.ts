/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_templateId: string
  readonly VITE_serviceId: string
  readonly VITE_userId: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
