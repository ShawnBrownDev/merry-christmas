import { useState, useEffect } from 'react'
import './ASCIIArt.css'

const ASCII_TEXT = `
    __  __                        ____ _       _            _      
   |  \\/  | ___  ___ ___  ___ ___/ ___| |_ ___| |_ ___ _ __| |_    
   | |\\/| |/ _ \\/ __/ __|/ _ \\ __| |   | __/ _ \\ __/ _ \\ '__| __|   
   | |  | |  __/\\__ \\__ \\  __/ |_| |___| ||  __/ ||  __/ |  | |_    
   |_|  |_|\\___||___/___/\\___|\\____\\____|\\__\\___|\\__\\___|_|   \\__|   
                                                                     
`

function ASCIIArt() {
  const [displayedText, setDisplayedText] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (currentIndex < ASCII_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + ASCII_TEXT[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  return (
    <div className="ascii-art" style={{ animation: 'fadeIn 0.8s ease-in 0.5s both' }}>
      <pre>{displayedText}</pre>
    </div>
  )
}

export default ASCIIArt

