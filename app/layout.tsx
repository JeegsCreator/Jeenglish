import { ReactElement } from 'react'
import './index.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Jeenglish',
    default: 'Jeenglish'
  },
  description: 'Jeenglish can help you to improve your English hard skills. 📘'
  // icons: {
  //   icon: '../../public/logo_small.svg'
  // }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
