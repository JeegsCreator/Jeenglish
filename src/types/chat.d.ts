import { ReactElement } from 'react'

export type SendBy = 'bot' | 'user'

export interface Message {
  id: number
  sendBy: SendBy
  children: ReactElement | string
}

export interface Error {
  'message': {
    long: string
    short: string
  }
  'replacements': Array<{ value: string }>
  'issueType': 'typographical' | 'misspelling' | 'style' | 'non-conformance' | 'grammar'
  'context': {
    text: string
    sentence: string
    offset: number
    length: number
    word: string
  }
}

export interface ApiResponse {
  isCorrect: boolean
  errors: Error[]
}
