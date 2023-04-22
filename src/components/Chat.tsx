'use client'
import { ReactElement, useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { ApiResponse } from '../types/chat'
import Arrow from '../assets/icons/Arrow'
import { useMessages } from '../services/hooks/useMessages'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleErrors: ApiResponse = {
  isCorrect: true,
  errors: [
    {
      message: {
        long: 'Use “an” instead of ‘a’ if the following word starts with a vowel sound, e.g. ‘an article’, ‘an hour’.',
        short: 'Wrong article'
      },
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
        sentence: 'This is a error.',
        word: 'a'
      }
    },
    {
      message: {
        long: 'This sentence does not start with an uppercase letter.',
        short: ''
      },
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
        sentence: 'please give me an avocsdo',
        word: 'please'
      }
    },
    {
      message: {
        long: 'Possible spelling mistake found.',
        short: 'Spelling mistake'
      },
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
        sentence: 'please give me an avocsdo',
        word: 'avocsdo'
      }
    }
  ]
}

const Chat = (): ReactElement => {
  const { messages, addMessage, addBotMessage, createPrompt } = useMessages([
    {
      sendBy: 'bot',
      children: 'Ready for practice your English? Here is your first prompt:'
    }
  ])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollDivRef = useRef<HTMLDivElement>(null)

  const handleInput = async (text: string): Promise<void> => {
    addMessage(text, 'user')
    await addBotMessage(text)
  }
  const scrollToTheBottom = (): void => {
    console.dir(scrollDivRef.current)
    const scrollHeight = scrollDivRef.current?.scrollHeight

    scrollDivRef.current?.scroll({
      left: 0,
      top: scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleOnScroll = (e): void => {
    const { scrollHeight, scrollTop, clientHeight } = e.target

    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 40) {
      if (showScrollButton) setShowScrollButton(false)
    } else {
      if (!showScrollButton) setShowScrollButton(true)
    }
  }

  useEffect(() => {
    scrollToTheBottom()
  }, [messages])

  // eslint-disable-next-line
  useEffect(async () => {
    createPrompt().catch(err => console.error(err.message))
  }, [])

  return (
    <section className='w-full h-screen p-4 md:flex md:justify-center'>
      <div className='will-change-transform bg-white h-full md:w-10/12 lg:w-8/12 rounded-2xl relative overflow-hidden flex flex-col-reverse'>
        <ChatInput addMessage={handleInput} />
        {showScrollButton && <button onClick={scrollToTheBottom} className='fixed z-20 bg-white aspect-square h-8 flex rounded-full justify-center items-center text-primary border border-gray-mid right-4 bottom-20'><Arrow /></button>}
        <div
          onScroll={handleOnScroll}
          id='scroll'
          ref={scrollDivRef}
          className='w-full p-2 flex flex-col gap-2 max-h-full overflow-y-scroll lg:px-8 scrollbar-thin'
        >
          {/* render messages here */}
          {messages.map((message, i) => <ChatMessage key={i} sendBy={message.sendBy}>{message.children}</ChatMessage>)}
        </div>
      </div>
    </section>
  )
}

export default Chat
