import './LandingPage.css'

function LandingPage({ onStart }) {

  const handleStart = () => {
    onStart()
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">🎄 Merry Christmas 🎄</h1>
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
3