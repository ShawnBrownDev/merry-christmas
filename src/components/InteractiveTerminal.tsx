import { useState, useRef, useEffect } from 'react'
import './InteractiveTerminal.css'

type CommandValue = string | ((args: string[]) => string)

interface Commands {
  [key: string]: CommandValue
}

const COMMANDS: Commands = {
  help: 'Available commands: help, clear, ls, whoami, date, echo, merry, christmas',
  ls: 'merry_christmas.js  README.md  package.json  src/',
  whoami: 'developer',
  date: new Date().toLocaleString(),
  echo: (args: string[]) => args.join(' '),
  merry: '🎄 MERRY 🎄',
  christmas: '🎅 CHRISTMAS 🎅',
  clear: 'clear'
}

type HistoryItemType = 'input' | 'output' | 'error'

interface HistoryItem {
  type: HistoryItemType
  content: string
}

interface InteractiveTerminalProps {
  onMerryCommand?: () => void
  onMerryChristmasCommand?: () => void
}

function InteractiveTerminal({ onMerryCommand, onMerryChristmasCommand }: InteractiveTerminalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'Welcome to the Interactive Terminal!' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: 'Try: echo "Merry Christmas!" or type "merry" or "merry christmas"' }
  ])
  const [input, setInput] = useState<string>('')
  const [currentPath] = useState<string>('~/merry-christmas')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.trim().toLowerCase()
    
    if (lowerCmd === 'merry christmas') {
      setHistory(prev => [...prev,
        { type: 'input', content: `$ ${cmd}` },
        { type: 'output', content: '🎄🎅 MERRY CHRISTMAS! 🎅🎄' }
      ])
      if (onMerryChristmasCommand) {
        onMerryChristmasCommand()
      }
      return
    }

    const [command, ...args] = cmd.trim().split(' ')
    const lowerCommand = command.toLowerCase()

    if (lowerCommand === 'clear') {
      setHistory([])
      return
    }

    if (lowerCommand === 'merry') {
      setHistory(prev => [...prev,
        { type: 'input', content: `$ ${cmd}` },
        { type: 'output', content: '🎄 MERRY 🎄' }
      ])
      if (onMerryCommand) {
        onMerryCommand()
      }
      return
    }

    if (COMMANDS[lowerCommand]) {
      const commandValue = COMMANDS[lowerCommand]
      if (typeof commandValue === 'function') {
        const result = commandValue(args)
        setHistory(prev => [...prev, 
          { type: 'input', content: `$ ${cmd}` },
          { type: 'output', content: result }
        ])
      } else {
        setHistory(prev => [...prev,
          { type: 'input', content: `$ ${cmd}` },
          { type: 'output', content: commandValue }
        ])
      }
    } else if (command) {
      setHistory(prev => [...prev,
        { type: 'input', content: `$ ${cmd}` },
        { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) {
        handleCommand(input)
        setInput('')
      }
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

