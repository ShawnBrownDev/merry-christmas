import { useState, useEffect, useCallback, useRef } from 'react'
import Terminal from './components/Terminal'
import ASCIIArt from './components/ASCIIArt'
import CodePreview from './components/CodePreview'
import LanguageTabs from './components/LanguageTabs'
import InteractiveTerminal from './components/InteractiveTerminal'
import Confetti from './components/Confetti'
import Snowflakes from './components/Snowflakes'
import ThemeToggle from './components/ThemeToggle'
import LandingPage from './components/LandingPage'
import MerryEffect from './components/MerryEffect'
import MerryChristmasBanner from './components/MerryChristmasBanner'
import './App.css'

const LANGUAGES = ['js', 'py', 'java', 'cpp', 'rust', 'go', 'ts', 'php']

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('js')
  const [showResult, setShowResult] = useState(false)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [showInteractiveTerminal, setShowInteractiveTerminal] = useState(false)
  const [merryTrigger, setMerryTrigger] = useState(0)
  const [merryChristmasTrigger, setMerryChristmasTrigger] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (hasStarted) {
      const timer = setTimeout(() => {
        setShowResult(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasStarted])

  const handleResultComplete = useCallback(() => {
    setConfettiTrigger(prev => prev + 1)
  }, [])

  const handleMerryCommand = useCallback(() => {
    setMerryTrigger(prev => prev + 1)
  }, [])

  const handleMerryChristmasCommand = useCallback(() => {
    setMerryChristmasTrigger(prev => prev + 1)
    setConfettiTrigger(prev => prev + 1)
  }, [])

  const handleStart = () => {
    if (!audioRef.current) {
      const audio = new Audio('/merry-christmas.mp3')
      audio.volume = 0.7
      audio.loop = true
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e)
        console.error('Failed to load: /merry-christmas.mp3')
      })
      
      audio.play().then(() => {
        console.log('Audio playing successfully')
      }).catch(err => {
        console.error('Audio play failed:', err)
        console.log('This might be due to browser autoplay restrictions. Audio should work after user interaction.')
      })
      
      audioRef.current = audio
    } else {
      audioRef.current.play().catch(err => {
        console.error('Audio resume failed:', err)
      })
    }
    setHasStarted(true)
  }


  if (!hasStarted) {
    return <LandingPage onStart={handleStart} />
  }

  return (
    <div className="app">
      <Snowflakes />
      <Confetti trigger={confettiTrigger} />
      <MerryEffect trigger={merryTrigger} />
      <MerryChristmasBanner trigger={merryChristmasTrigger} />
      
      <div className="app-container">
        <header className="app-header">
          <div className="header-controls">
            <ThemeToggle />
            <button 
              className="toggle-terminal-btn"
              onClick={() => setShowInteractiveTerminal(!showInteractiveTerminal)}
            >
              {showInteractiveTerminal ? '📟 Hide Terminal' : '💻 Interactive Terminal'}
            </button>
          </div>
          <h1 className="app-title">Merry Christmas</h1>
          <p className="app-subtitle">A Coding Celebration</p>
        </header>

        {showInteractiveTerminal && (
          <InteractiveTerminal 
            onMerryCommand={handleMerryCommand}
            onMerryChristmasCommand={handleMerryChristmasCommand}
          />
        )}

        <Terminal showResult={showResult} onResultComplete={handleResultComplete} />

        <ASCIIArt />

        <div className="code-section">
          <LanguageTabs
            languages={LANGUAGES}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          <CodePreview language={selectedLanguage} />
        </div>

        <footer className="app-footer">
          <p>Built with React • Happy Holidays! 🎄</p>
        </footer>
      </div>
    </div>
  )
}

export default App

