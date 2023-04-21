import { ReactElement } from 'react'

export type SendBy = 'bot' | 'user'

export interface Message {
  sendBy: SendBy
  children: ReactElement | string
}

export type AddMessage = (text: string, sendBy: SendBy) => void

export interface UseMessages {
  messages: Message[]
  addMessage: AddMessage
  answer: (text: string) => void
  addBotMessage: (text: any) => Promise<void>
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
