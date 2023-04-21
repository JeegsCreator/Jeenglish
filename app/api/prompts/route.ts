import { NextResponse } from 'next/server'
import supabase from '../../../src/services/client/supabase'

export async function GET (request: Request): Promise<Response> {
  const { difficulty } = await request.json()
  console.log(difficulty)
  const { data, error } = await supabase
    .from('writing_prompts')
    .select()
    .eq('difficulty', 1)

  return NextResponse.json({ data, error })
}
