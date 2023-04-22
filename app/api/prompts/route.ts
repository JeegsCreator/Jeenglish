import { NextResponse } from 'next/server'
import supabase from '../../../src/services/client/supabase'

export async function GET (request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)

  const difficulty = searchParams.get('difficulty')

  if (difficulty == null) throw Error('Difficulty param missing')

  const parseDifficulty = Number(difficulty)

  if (isNaN(parseDifficulty)) throw Error('Difficulty param type is wrong. must be a number')

  const { data: prompts, error } = await supabase
    .from('random_prompts')
    .select()
    .eq('difficulty', parseDifficulty)
    .limit(1)
    .single()

  return NextResponse.json({ prompts, error })
}
