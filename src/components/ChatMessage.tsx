import React, { ReactElement } from 'react'
import { Message } from '../types/chat'

function ChatMessage ({ sendBy, children }: Omit<Message, 'id'>): ReactElement {
  const botStyles = 'bg-primary before:bg-primary text-white before:left-0 before:triangle-left'
  const userStyles = 'bg-gray-message before:bg-gray-message self-end before:right-0 before:triangle-right'
  const isbot = sendBy === 'bot'
  const isString = typeof children === 'string'
  return (
    <div className={`mb-3 w-fit max-w-[80%] lg:max-w-[70%] rounded-2xl px-6 py-4 leading-4 text-base relative z-10 before:-z-10 before:content-[''] before:h-10 before:w-8  before:absolute before:-bottom-3 before:rounded-md
    ${isbot ? botStyles : userStyles}`}
    >
      {isString ? <p className='text-base'>{children}</p> : children}
    </div>
  )
}

export default ChatMessage
