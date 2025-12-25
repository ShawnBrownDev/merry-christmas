import './LanguageTabs.css'

const LANGUAGE_NAMES = {
  js: 'JavaScript',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  rust: 'Rust',
  go: 'Go',
  ts: 'TypeScript',
  php: 'PHP'
}

function LanguageTabs({ languages, selectedLanguage, onLanguageChange }) {
  return (
    <div className="language-tabs">
      {languages.map(lang => (
        <button
          key={lang}
          className={`tab ${selectedLanguage === lang ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang)}
        >
          {LANGUAGE_NAMES[lang] || lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageTabs

