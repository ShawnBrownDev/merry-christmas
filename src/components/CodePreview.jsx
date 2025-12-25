import { useMemo, useState } from 'react'
import './CodePreview.css'

const CODE_EXAMPLES = {
  js: `// JavaScript
function merryChristmas() {
    const message = "Merry Christmas!";
    return message.toUpperCase();
}

console.log(merryChristmas());
// Output: MERRY CHRISTMAS!`,

  py: `# Python
def merry_christmas():
    message = "Merry Christmas!"
    return message.upper()

print(merry_christmas())
# Output: MERRY CHRISTMAS!`,

  java: `// Java
public class MerryChristmas {
    public static String merryChristmas() {
        String message = "Merry Christmas!";
        return message.toUpperCase();
    }
    
    public static void main(String[] args) {
        System.out.println(merryChristmas());
        // Output: MERRY CHRISTMAS!
    }
}`,

  cpp: `// C++
#include <iostream>
#include <string>
#include <algorithm>

std::string merryChristmas() {
    std::string message = "Merry Christmas!";
    std::transform(message.begin(), message.end(), 
                   message.begin(), ::toupper);
    return message;
}

int main() {
    std::cout << merryChristmas() << std::endl;
    // Output: MERRY CHRISTMAS!
    return 0;
}`,

  rust: `// Rust
fn merry_christmas() -> String {
    let message = "Merry Christmas!";
    message.to_uppercase()
}

fn main() {
    println!("{}", merry_christmas());
    // Output: MERRY CHRISTMAS!
}`,

  go: `// Go
package main

import (
    "fmt"
    "strings"
)

func merryChristmas() string {
    message := "Merry Christmas!"
    return strings.ToUpper(message)
}

func main() {
    fmt.Println(merryChristmas())
    // Output: MERRY CHRISTMAS!
}`,

  ts: `// TypeScript
function merryChristmas(): string {
    const message: string = "Merry Christmas!";
    return message.toUpperCase();
}

console.log(merryChristmas());
// Output: MERRY CHRISTMAS!`,

  php: `<?php
// PHP
function merryChristmas(): string {
    $message = "Merry Christmas!";
    return strtoupper($message);
}

echo merryChristmas();
// Output: MERRY CHRISTMAS!
?>`
}

function CodePreview({ language }) {
  const [copied, setCopied] = useState(false)
  const [executed, setExecuted] = useState(false)
  const [output, setOutput] = useState('')

  const code = CODE_EXAMPLES[language] || CODE_EXAMPLES.js

  const highlightedCode = useMemo(() => {
    return highlightCode(code, language)
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleExecute = () => {
    if (language === 'js' || language === 'ts') {
      try {
        const func = new Function(`
          function merryChristmas() {
            const message = "Merry Christmas!";
            return message.toUpperCase();
          }
          return merryChristmas();
        `)
        const result = func()
        setOutput(result)
        setExecuted(true)
        setTimeout(() => {
          setExecuted(false)
          setOutput('')
        }, 3000)
      } catch (err) {
        setOutput('Error: ' + err.message)
        setExecuted(true)
      }
    } else {
      setOutput('MERRY CHRISTMAS!')
      setExecuted(true)
      setTimeout(() => {
        setExecuted(false)
        setOutput('')
      }, 3000)
    }
  }

  return (
    <div className="code-preview">
      <div className="code-preview-header">
        <div className="code-preview-actions">
          <button 
            className="action-btn copy-btn" 
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button 
            className="action-btn execute-btn" 
            onClick={handleExecute}
            title="Execute code"
          >
            {executed ? '✓ Executed' : '▶ Run'}
          </button>
        </div>
      </div>
      <div className="code-preview-content" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      {executed && output && (
        <div className="code-output">
          <div className="output-label">Output:</div>
          <div className="output-content">{output}</div>
        </div>
      )}
    </div>
  )
}

function highlightCode(code, lang) {
  const keywords = {
    js: ['function', 'const', 'return', 'console', 'log'],
    py: ['def', 'return', 'print'],
    java: ['public', 'class', 'static', 'String', 'void', 'System', 'out', 'println'],
    cpp: ['#include', 'using', 'namespace', 'std', 'int', 'main', 'return', 'cout', 'endl'],
    rust: ['fn', 'let', 'return', 'String', 'println'],
    go: ['package', 'import', 'func', 'string', 'fmt', 'println'],
    ts: ['function', 'const', 'return', 'string', 'console', 'log'],
    php: ['function', 'return', 'string', 'echo']
  }

  const langKeywords = keywords[lang] || []
  let highlighted = code

  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`)
  })

  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  highlighted = highlighted.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
  highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
  highlighted = highlighted.replace(/#.*$/gm, '<span class="comment">$&</span>')
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')

  return highlighted
}

export default CodePreview
