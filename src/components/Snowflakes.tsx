import { useEffect, useRef, useState } from 'react'
import './Snowflakes.css'

type Theme = 'dark' | 'cyberpunk' | 'neon'

function Snowflakes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = (document.documentElement.getAttribute('data-theme') || 'dark') as Theme
      setTheme(currentTheme)
    }
    
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    updateTheme()
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const isNeonTheme = theme === 'neon'
    const snowflakeCount = isNeonTheme ? 0 : 30
    const container = containerRef.current

    container.innerHTML = ''

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement('div')
      snowflake.className = 'snowflake'
      snowflake.textContent = '❄'
      snowflake.style.left = Math.random() * 100 + '%'
      snowflake.style.animationDelay = Math.random() * 5 + 's'
      snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's'
      snowflake.style.opacity = String(Math.random() * 0.5 + 0.3)
      snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px'
      
      container.appendChild(snowflake)
    }

    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [theme])

  return <div ref={containerRef} className="snowflakes-container" />
}

export default Snowflakes

