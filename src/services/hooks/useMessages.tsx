
import { ReactElement, useState } from 'react'
import { ApiResponse, Message, SendBy, UseMessages } from '../../types/chat'
import ChatCheckResponse from '../../components/ChatCheckResponse'
import fetchPrompts from './usePrompts'

function useMessages (defaultValue: Message[]): UseMessages {
  const [messages, setMessages] = useState(defaultValue)

  const createPrompt = async (): Promise<void> => {
    createLoading()
    const prompt = await fetchPrompts({ difficulty: 1 })
    removeLastMessage()
    if (prompt.prompt != null) addMessage(prompt.prompt, 'bot')
  }

  const createLoading = (): void => {
    addMessage('...', 'bot')
  }

  const addBotMessage = async (text: string): Promise<void> => {
    createLoading()

    fetch('/api/check', {
      method: 'POST',
      body: text
    })
      .then(async res => await res.json())
      .then(async (data: ApiResponse) => {
        console.log(data)
        removeLastMessage()
        addMessage(<ChatCheckResponse data={data} />, 'bot')

        if (data.isCorrect) {
          await createPrompt()
        }
      })
      .catch((err) => {
        console.error(err)
        console.log(err.message)
        removeLastMessage()
        const errorMessage: string = handleError[err.message] ?? ''
        addMessage(`We have an Error, ${errorMessage}`, 'bot')
      })
  }

  const handleError = {
    'Failed to fetch': 'please check your connection.'
  }

  const removeLastMessage = (): void => {
    setMessages((m) => {
      const array = [...m]
      array.pop()

      return array
    })
  }

  //   const manipulateMessages (callback: (m: Message[]) => Message[]) => {
  //     const newMessage: Message = {
  //         sendBy,
  //         children: text
  //       }

  //       setMessages(callback)
  //   }
  const addMessage = (text: string | ReactElement, sendBy: SendBy): void => {
    const newMessage: Message = {
      sendBy,
      children: text
    }

    setMessages((m) => {
      const array = [...m]
      array.push(newMessage)

      return array
    })
  }

  return { messages, addMessage, createPrompt, addBotMessage }
}

export { useMessages }
