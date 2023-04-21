import React, { ReactElement } from 'react'
import LogoMobile from '../assets/logos/LogoMobile'
import Menu from '../assets/icons/Menu'

export default function Nav (): ReactElement {
  return (
    <header className='h-16 flex w-full justify-between items-center text-primary text-4xl px-8 py-6 -z-10 bg-white'>
      <div>
        <LogoMobile />
      </div>
      <nav className='text-xl'>
        <Menu />
      </nav>
    </header>
  )
}
