export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LANGUAGE_TOOL__API: string
      SUPABASE_KEY: string
    }
  }
}
