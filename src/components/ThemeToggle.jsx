import React, { useEffect, useState } from 'react'

const THEME_KEY = 'sp_theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) || 'light'
    setTheme(stored)
    document.documentElement.classList.toggle('dark', stored === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem(THEME_KEY, next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 border rounded transition-colors duration-300
                 bg-gray-100 dark:bg-gray-700
                 text-gray-900 dark:text-gray-100
                 border-gray-300 dark:border-gray-600
                 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
