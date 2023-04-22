/** @type {import('tailwindcss').Config} */

import scrollbarPlugin from 'tailwind-scrollbar'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [
    scrollbarPlugin
  ],
  theme: {
    extend: {
      spacing: {
        afull: 'calc(100% - 4rem)'
      }
    },
    colors: {
      primary: '#1E86E5',
      white: '#fff',
      black: '#000',
      error: {
        typo: '#E51E1E',
        gramar: '#FF8E08',
        style: '#17BF32',
        conformance: '#D341E0'
      },
      gray: {
        light: '#E7E7E7',
        mid: '#BFBFBF',
        message: '#D9D9D9',
        background: '#E8E8E8'
      }
    }
  }
}
