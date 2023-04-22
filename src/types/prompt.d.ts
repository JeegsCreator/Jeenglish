import { Database } from './supabase'

export type Prompt = Database['public']['Views']['random_prompts']['Row']
