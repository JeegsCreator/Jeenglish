import React, { ReactElement } from 'react'
import { ApiResponse, Error } from '../types/chat'

const ChatError = ({ issueType, message, context, replacements }: Error): ReactElement => {
  let issueColor = 'before:bg-[#ff0]'

  if (issueType === 'typographical') issueColor = 'before:bg-error-typo'
  if (issueType === 'misspelling') issueColor = 'before:bg-error-gramar'
  if (issueType === 'grammar') issueColor = 'before:bg-error-gramar'
  if (issueType === 'style') issueColor = 'before:bg-error-style'
  if (issueType === 'non-conformance') issueColor = 'before:bg-error-conformance'

  return (
    <div className='ml-4'>
      <p className={`mb-2 relative before:content[""] before:absolute before:block before:h-2 before:aspect-square before:rounded-full before:-left-4 before:top-1.5 ${issueColor}`}>
        <strong className={`font-medium mr-2 relative before:content[""] before:w-full before:absolute before:h-[2px] before:-bottom-px ${issueColor}`}>{context.word}</strong>
        <span>{message.short}</span>
      </p>
      <p>{message.long}</p>
      <p className='flex gap-1'>
        {replacements.slice(0, 6).map((r, i) => <span className='inline-block my-2 px-2 py-1 text-white rounded-lg bg-primary' key={i}>{r.value}</span>)}
      </p>
    </div>
  )
}

export default function ChatCheckResponse ({ data }: { data: ApiResponse }): ReactElement {
  const { isCorrect, errors } = data

  if (isCorrect) {
    return (<p className='text-base'>Good job! You have 0 mistakes 🎉🎉🎉</p>)
  }

  return (
    <div>
      <p>Your text has some mistakes:</p>
      <div className='bg-white text-black px-4 py-2 rounded-lg my-2 flex flex-col gap-2 shadow-lg'>
        {errors.map((err, i) => <ChatError key={i} issueType={err.issueType} message={err.message} context={err.context} replacements={err.replacements} />)}
      </div>
      <p>Try Again.</p>
    </div>
  )
}
