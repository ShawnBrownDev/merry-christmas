import { useEffect, useState } from 'react'
import './MerryChristmasBanner.css'

function MerryChristmasBanner({ trigger }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger > 0) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  if (!show) return null

  return (
    <div className="merry-christmas-banner">
      <div className="banner-text">
        <span className="banner-word">🎄</span>
        <span className="banner-word">MERRY</span>
        <span className="banner-word">CHRISTMAS</span>
        <span className="banner-word">🎅</span>
        <span className="banner-word">MERRY</span>
        <span className="banner-word">CHRISTMAS</span>
        <span className="banner-word">🎄</span>
        <span className="banner-word">MERRY</span>
        <span className="banner-word">CHRISTMAS</span>
        <span className="banner-word">🎅</span>
      </div>
    </div>
  )
}

export default MerryChristmasBanner

