import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabaseUrl = 'https://sitmtwnyythqblvhiuwb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
