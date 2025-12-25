import { useEffect, useState } from 'react'
import './MerryEffect.css'

function MerryEffect({ trigger }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger > 0) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  if (!show) return null

  return (
    <div className="merry-effect">
      <div className="merry-sparkles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${1 + Math.random() * 1}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
      <div className="merry-text">🎄 MERRY 🎄</div>
    </div>
  )
}

export default MerryEffect

