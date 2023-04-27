
import { ReactElement, useState } from 'react'
import { ApiResponse, Message, SendBy } from '../../types/chat'
import ChatCheckResponse from '../../components/ChatCheckResponse'
import fetchPrompts from './usePrompts'

function useMessages (defaultValue: Message[]) {
  const [messages, setMessages] = useState(defaultValue)

  const createPrompt = async (): Promise<void> => {
    const idToEdit = await createLoading()

    const prompt = await fetchPrompts({ difficulty: 1 })

    if (prompt.prompt != null) editMessage(idToEdit, prompt.prompt)
  }

  const createLoading = async () => {
    return await addMessage('...', 'bot')
  }

  const addBotMessage = async (text: string): Promise<void> => {
    const idToEdit = await createLoading()

    fetch('/api/check', {
      method: 'POST',
      body: text
    })
      .then(async res => await res.json())
      .then(async (data: ApiResponse) => {
        editMessage(idToEdit, <ChatCheckResponse data={data} />)

        if (data.isCorrect) {
          await createPrompt()
        }
      })
      .catch((err) => {
        console.error(err)
        const errorMessage: string = handleError[err.message] ?? ''
        editMessage(idToEdit, `We have an Error. ${errorMessage}`)
      })
  }

  const handleError = {
    'Failed to fetch': 'please check your connection.'
  }

  const createId = (array: Message[]) => {
    // reading messages
    const [lastElement] = array.slice(-1)
    return (lastElement.id + 1)
  }

  const addMessage = async (text: string | ReactElement, sendBy: SendBy) => {
    return await new Promise<number>((resolve) => {
      setMessages((m) => {
        const array = [...m]

        const newMessage: Message = {
          sendBy,
          children: text,
          id: createId(array)
        }

        array.push(newMessage)

        resolve(newMessage.id)
        return array
      })
    })
  }

  const editMessage = (id: number, newMessage: Message['children']) => {
    setMessages((messages) => {
      // reading messages
      const array = [...messages]
      const index = array.findIndex((m) => m.id === id)
      array[index].children = newMessage

      return array
    })
  }

  return { messages, addMessage, createPrompt, addBotMessage }
}

export { useMessages }
