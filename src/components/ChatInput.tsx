/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactElement, useState } from 'react'
import Send from '../assets/icons/Send'

const ChatInput = ({ addMessage }: { addMessage: (text: string) => Promise<void> }): ReactElement => {
  const [input, setInput] = useState('')

  const submit = async (): Promise<void> => {
    if (input.length !== 0) {
      setInput('')
      await addMessage(input)
    }
    // const encodedParams = new URLSearchParams()
    // encodedParams.append('text', text)

    // const res = await fetch('/api/check', {
    //   method: 'POST',
    //   body: encodedParams
    // })
    // const data = await res.json()
  }

  return (
    <form className='bg-white w-full p-2'>
      <div className='border-2 h-14 border-solid border-gray-mid rounded-full flex p-1 pl-6 gap-2'>
        <input
          autoComplete='off'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          className='h-full w-full focus-visible:outline-none'
          id='input' type='text' placeholder='Write your answer'
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            submit()
          }}
          className='h-full aspect-square rounded-full bg-primary flex justify-center items-center text-white text-2xl pl-1'
        >
          <Send />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
