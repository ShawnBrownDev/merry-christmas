import { useState, useEffect, useMemo, useRef } from 'react'
import './Terminal.css'

const CODE_LINES = [
  { num: 1, parts: [
    { content: 'function', type: 'keyword' },
    { content: ' merryChristmas', type: 'function' },
    { content: '() {', type: 'normal' }
  ]},
  { num: 2, parts: [
    { content: '    const', type: 'keyword' },
    { content: ' message', type: 'variable' },
    { content: ' = ', type: 'normal' },
    { content: '"Merry Christmas!"', type: 'string' },
    { content: ';', type: 'normal' }
  ]},
  { num: 3, parts: [
    { content: '    return', type: 'keyword' },
    { content: ' message', type: 'variable' },
    { content: '.', type: 'normal' },
    { content: 'toUpperCase', type: 'function' },
    { content: '();', type: 'normal' }
  ]},
  { num: 4, parts: [{ content: '}', type: 'normal' }]},
  { num: 5, parts: [{ content: '', type: 'normal' }]},
  { num: 6, parts: [{ content: '// Output:', type: 'comment' }]},
  { num: 7, parts: [
    { content: 'console.log', type: 'output' },
    { content: '(merryChristmas', type: 'function' },
    { content: '());', type: 'normal' }
  ]},
]

function Terminal({ showResult, onResultComplete }) {
  const [displayedLineIndex, setDisplayedLineIndex] = useState(0)
  const [typingResult, setTypingResult] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (displayedLineIndex < CODE_LINES.length) {
      const timer = setTimeout(() => {
        setDisplayedLineIndex(prev => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [displayedLineIndex])

  const hasCalledComplete = useRef(false)

  useEffect(() => {
    if (showResult && typingResult.length < 'MERRY CHRISTMAS!'.length) {
      const timer = setTimeout(() => {
        setTypingResult('MERRY CHRISTMAS!'.substring(0, typingResult.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    } else if (typingResult.length === 'MERRY CHRISTMAS!'.length && !hasCalledComplete.current) {
      hasCalledComplete.current = true
      setTimeout(() => {
        setShowCursor(false)
        if (onResultComplete) {
          onResultComplete()
        }
      }, 500)
    }
  }, [showResult, typingResult, onResultComplete])

  const displayedLines = useMemo(() => {
    return CODE_LINES.slice(0, displayedLineIndex)
  }, [displayedLineIndex])

  const getClassName = (type) => {
    const classes = {
      keyword: 'keyword',
      function: 'function-name',
      variable: 'variable',
      string: 'string',
      comment: 'comment',
      output: 'output',
      normal: ''
    }
    return classes[type] || ''
  }

  return (
    <div className="terminal" style={{ animation: 'fadeIn 0.5s ease-in' }}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn btn-close"></span>
          <span className="btn btn-minimize"></span>
          <span className="btn btn-maximize"></span>
        </div>
        <div className="terminal-title">terminal — merry_christmas.js</div>
      </div>
      <div className="terminal-body">
        {displayedLines.map((line, idx) => (
          <div key={line.num} className="code-line">
            <span className="line-number">{line.num}</span>
            <span className="code-content">
              {line.parts.map((part, partIdx) => (
                <span key={partIdx} className={getClassName(part.type)}>
                  {part.content}
                </span>
              ))}
            </span>
          </div>
        ))}
        
        {showResult && (
          <div className="code-line output-line">
            <span className="line-number">8</span>
            <span className="code-content">
              <span className="output">// &gt; </span>
              <span className="result">{typingResult}</span>
              {showCursor && <span className="cursor">|</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal

