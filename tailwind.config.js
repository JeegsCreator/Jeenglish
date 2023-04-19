/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      primary: '#1E86E5',
      white: '#fff',
      gray: {
        light: '#E7E7E7',
        mid: '#BFBFBF',
        message: '#D9D9D9'
      }
    }
  },
  plugins: []
}
