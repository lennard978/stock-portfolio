import React, { useEffect, useState } from 'react'


const THEME_KEY = 'sp_theme'


export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')


  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) || 'light'
    setTheme(stored)
    if (stored === 'dark') document.documentElement.classList.add('dark')
  }, [])


  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem(THEME_KEY, next)
    if (next === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }


  return (
    <button onClick={toggleTheme} className="px-3 py-2 border rounded dark:border-gray-700">
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}