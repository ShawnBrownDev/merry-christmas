import './LandingPage.css'

interface LandingPageProps {
  onStart: () => void
}

function LandingPage({ onStart }: LandingPageProps) {
  const handleStart = () => {
    onStart()
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <p className="landing-subtitle">A Coding Celebration</p>
        <button className="start-button" onClick={handleStart}>
          <span className="button-text">Start the Magic</span>
          <span className="button-icon">✨</span>
        </button>
        <p className="landing-hint">Click to begin your coding adventure!</p>
      </div>
    </div>
  )
}

export default LandingPage

