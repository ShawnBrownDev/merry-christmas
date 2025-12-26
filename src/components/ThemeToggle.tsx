import { useState, useEffect } from 'react'
import './ThemeToggle.css'

type Theme = 'dark' | 'cyberpunk' | 'neon'

interface ThemeInfo {
  name: string
  icon: string
}

const THEMES: Record<Theme, ThemeInfo> = {
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

interface ThemeToggleProps {
  onThemeChange?: (theme: Theme) => void
}

function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (onThemeChange) {
      onThemeChange(currentTheme)
    }
  }, [currentTheme, onThemeChange])

  const themes = Object.keys(THEMES) as Theme[]
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

