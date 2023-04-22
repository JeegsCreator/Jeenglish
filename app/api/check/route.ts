import { NextResponse } from 'next/server'
import { ApiResponse } from '../../../src/types/chat'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refactoredExampleResponse = {
  isCorrect: false,
  errors: [
    {
      message: 'Use “an” instead of ‘a’ if the following word starts with a vowel sound, e.g. ‘an article’, ‘an hour’.',
      replacements: [
        {
          value: 'an'
        }
      ],
      issueType: 'misspelling',
      context: {
        text: 'This is a error. please give me an avocsdo',
        offset: 8,
        length: 1,
        sentence: 'This is a error.'
      }
    },
    {
      message: 'This sentence does not start with an uppercase letter.',
      replacements: [
        {
          value: 'Please'
        }
      ],
      issueType: 'typographical',
      context: {
        text: 'This is a error. please give me an avocsdo',
        offset: 17,
        length: 6,
        sentence: 'please give me an avocsdo'
      }
    },
    {
      message: 'Possible spelling mistake found.',
      replacements: [
        {
          value: 'avocado'
        }
      ],
      issueType: 'misspelling',
      context: {
        text: 'This is a error. please give me an avocsdo',
        offset: 35,
        length: 7,
        sentence: 'please give me an avocsdo'
      }
    }
  ]
}

export async function POST (request: Request): Promise<Response | undefined> {
  const text = await request.text()

  const encodedParams = new URLSearchParams()
  encodedParams.append('text', text)
  encodedParams.append('language', 'en-US') // en-US - es
  // return NextResponse.json(refactoredExampleResponse)

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.LANGUAGE_TOOL__API,
      'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
    },
    body: encodedParams
  }

  try {
    const response = await fetch('https://dnaber-languagetool.p.rapidapi.com/v2/check', options)
    const data = await response.json()

    if (data.matches.length === 0) return NextResponse.json({ isCorrect: true })

    const errors = data.matches.map(err => {
      const { message, shortMessage, replacements, rule, sentence, context } = err

      return {
        message: {
          long: message,
          short: shortMessage
        },
        replacements,
        issueType: rule.issueType,
        context: {
          ...context,
          sentence,
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          word: context.text.substring(context.offset, context.offset + context.length)
        }
      }
    })

    const res: ApiResponse = {
      isCorrect: false,
      errors
    }

    return NextResponse.json(res)
    // return NextResponse.json(data.matches)
  } catch (err) {
    console.warn('route')
    console.error(err)
  }
}
