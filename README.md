# Merry Christmas - Coding Platform 🎄💻

A professional React-based coding platform that displays "Merry Christmas" in a creative, developer-friendly way. Built with React, Vite, and modern web technologies.

## Features

- **Terminal Interface**: Animated terminal window with syntax-highlighted code
- **ASCII Art**: Animated ASCII art display
- **Multi-Language Support**: View "Merry Christmas" implementations in 8+ programming languages:
  - JavaScript
  - Python
  - Java
  - C++
  - Rust
  - Go
  - TypeScript
  - PHP
- **Professional Design**: Modern, clean UI with smooth animations
- **Responsive**: Works beautifully on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Terminal.jsx       # Terminal component with code animation
│   │   ├── ASCIIArt.jsx       # ASCII art display
│   │   ├── CodePreview.jsx    # Code preview with syntax highlighting
│   │   └── LanguageTabs.jsx   # Language selection tabs
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables and animations

## Customization

You can easily add more programming languages by:
1. Adding the language code to the `LANGUAGES` array in `src/App.jsx`
2. Adding the language name to `LANGUAGE_NAMES` in `src/components/LanguageTabs.jsx`
3. Adding a code example to `CODE_EXAMPLES` in `src/components/CodePreview.jsx`
4. Adding keywords for syntax highlighting in the `highlightCode` function

## License

MIT

---

Built with ❤️ and React • Happy Holidays! 🎅
