import './LanguageTabs.css'

type Language = 'js' | 'py' | 'java' | 'cpp' | 'rust' | 'go' | 'ts' | 'php'

const LANGUAGE_NAMES: Record<Language, string> = {
  js: 'JavaScript',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  rust: 'Rust',
  go: 'Go',
  ts: 'TypeScript',
  php: 'PHP'
}

interface LanguageTabsProps {
  languages: Language[]
  selectedLanguage: Language
  onLanguageChange: (lang: Language) => void
}

function LanguageTabs({ languages, selectedLanguage, onLanguageChange }: LanguageTabsProps) {
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

