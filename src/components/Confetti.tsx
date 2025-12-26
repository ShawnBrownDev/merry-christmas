import { useEffect, useRef } from 'react'
import './Confetti.css'

interface ConfettiProps {
  trigger: number
}

function Confetti({ trigger }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !containerRef.current) return

    const theme = document.documentElement.getAttribute('data-theme') || 'dark'
    const isNeonTheme = theme === 'neon'
    
    const colors = ['#4ade80', '#82aaff', '#c792ea', '#f78c6c', '#ffbd2e', '#ff5f56']
    const confettiCount = isNeonTheme ? 50 : 100

    const fragment = document.createDocumentFragment()
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti-piece'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 3 + 's'
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`
      
      fragment.appendChild(confetti)

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove()
        }
      }, 5000)
    }
    
    if (containerRef.current) {
      containerRef.current.appendChild(fragment)
    }
  }, [trigger])

  return <div ref={containerRef} className="confetti-container" />
}

export default Confetti

