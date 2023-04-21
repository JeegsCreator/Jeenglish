
import { ReactElement, useState } from 'react'
import { Message, SendBy, UseMessages } from '../../types/chat'
import ChatCheckResponse from '../../components/ChatCheckResponse'

function useMessages (defaultValue: Message[]): UseMessages {
  const [messages, setMessages] = useState(defaultValue)

  const answer = (text: string): void => {
    addMessage(text, 'user')
  }

  const addBotMessage = async (text: string): Promise<void> => {
    addMessage('...', 'bot')

    fetch('/api/check', {
      method: 'POST',
      body: text
    })
      .then(async res => await res.json())
      .then(data => {
        console.log(data)
        removeLastMessage()
        addMessage(<ChatCheckResponse data={data} />, 'bot')
      })
      .catch((err) => {
        console.warn('local')
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

  return { messages, addMessage, answer, addBotMessage }
}

export { useMessages }
