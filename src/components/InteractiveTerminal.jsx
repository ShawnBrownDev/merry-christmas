import { useState, useRef, useEffect } from 'react'
import './InteractiveTerminal.css'

const COMMANDS = {
  help: 'Available commands: help, clear, ls, whoami, date, echo, merry, christmas',
  ls: 'merry_christmas.js  README.md  package.json  src/',
  whoami: 'developer',
  date: new Date().toLocaleString(),
  echo: (args) => args.join(' '),
  merry: '🎄 MERRY 🎄',
  christmas: '🎅 CHRISTMAS 🎅',
  clear: 'clear'
}

function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to the Interactive Terminal!' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: 'Try: echo "Merry Christmas!" or type "merry" or "christmas"' }
  ])
  const [input, setInput] = useState('')
  const [currentPath, setCurrentPath] = useState('~/merry-christmas')
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.trim().split(' ')
    const lowerCmd = command.toLowerCase()

    if (lowerCmd === 'clear') {
      setHistory([])
      return
    }

    if (COMMANDS[lowerCmd]) {
      if (typeof COMMANDS[lowerCmd] === 'function') {
        const result = COMMANDS[lowerCmd](args)
        setHistory(prev => [...prev, 
          { type: 'input', content: `$ ${cmd}` },
          { type: 'output', content: result }
        ])
      } else {
        setHistory(prev => [...prev,
          { type: 'input', content: `$ ${cmd}` },
          { type: 'output', content: COMMANDS[lowerCmd] }
        ])
      }
    } else if (command) {
      setHistory(prev => [...prev,
        { type: 'input', content: `$ ${cmd}` },
        { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }
      ])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="interactive-terminal">
      <div className="interactive-terminal-header">
        <div className="terminal-buttons">
          <span className="btn btn-close"></span>
          <span className="btn btn-minimize"></span>
          <span className="btn btn-maximize"></span>
        </div>
        <div className="terminal-title">interactive-terminal</div>
      </div>
      <div className="interactive-terminal-body" ref={terminalRef}>
        {history.map((item, idx) => (
          <div key={idx} className={`terminal-line ${item.type}`}>
            {item.type === 'input' && <span className="prompt">{currentPath} $</span>}
            <span className="line-content">{item.content}</span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <span className="prompt">{currentPath} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="terminal-input"
            autoFocus
            placeholder="Type a command..."
          />
        </form>
      </div>
    </div>
  )
}

export default InteractiveTerminal

