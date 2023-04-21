import { ReactElement } from 'react'
import './index.css'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
// import Nav from '../src/components/Nav'

const font = Montserrat({ subsets: ['latin'] })

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
      <body className={font.className + ' bg-gray-background h-screen w-screen overflow-hidden max-h-screen flex flex-col relative'}>
        {/* <Nav /> */}
        <main className='h-afull'>
          {children}
        </main>
      </body>
    </html>
  )
}
