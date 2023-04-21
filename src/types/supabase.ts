export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Score: {
        Row: {
          created_at: string | null
          id: number
          points: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          points?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          points?: number | null
          user_id?: string
        }
      }
      writing_prompts: {
        Row: {
          difficulty: number
          id: number
          prompt: string
        }
        Insert: {
          difficulty: number
          id?: number
          prompt: string
        }
        Update: {
          difficulty?: number
          id?: number
          prompt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
