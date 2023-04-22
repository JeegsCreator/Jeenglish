import { Prompt } from '../../types/prompt'

async function fetchPrompts ({ difficulty }: { difficulty: 1 | 2 | 3 }): Promise<Prompt> {
  const res = await fetch(`/api/prompts?difficulty=${difficulty}`)
  const { prompts }: { prompts: Prompt } = await res.json()
  console.log(prompts)
  return prompts
}

export default fetchPrompts
