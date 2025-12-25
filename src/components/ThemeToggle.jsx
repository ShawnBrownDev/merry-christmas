import { useState, useEffect } from 'react'
import './ThemeToggle.css'

const THEMES = {
  dark: {
    name: 'Dark',
    icon: '🌙'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '💜'
  },
  neon: {
    name: 'Neon',
    icon: '⚡'
  }
}

function ThemeToggle({ onThemeChange }) {
  const [currentTheme, setCurrentTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (onThemeChange) {
      onThemeChange(currentTheme)
    }
  }, [currentTheme, onThemeChange])

  const themes = Object.keys(THEMES)
  const currentIndex = themes.indexOf(currentTheme)

  const nextTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length
    setCurrentTheme(themes[nextIndex])
  }

  return (
    <button className="theme-toggle" onClick={nextTheme} title="Change theme">
      <span className="theme-icon">{THEMES[currentTheme].icon}</span>
      <span className="theme-name">{THEMES[currentTheme].name}</span>
    </button>
  )
}

export default ThemeToggle

