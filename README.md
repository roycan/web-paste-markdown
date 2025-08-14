# HTML to Markdown Converter - Static Version

A simple, educational web application that converts between HTML and Markdown formats. Built with vanilla JavaScript, HTML, and CSS for grade 9 students.

## How to Use

### Option 1: Open Locally
1. Download all files in the `public` folder
2. Open `index.html` in any web browser
3. Start converting!

### Option 2: Use Online
Simply open the `index.html` file in your web browser - no server needed!

## Features

### HTML to Markdown Mode (Default)
- **Paste rich content** from websites, Word documents, or any formatted text
- **Live conversion** to clean Markdown format
- **Multiple view modes**: Source, Preview, and HTML
- **Customizable settings** for different markdown styles
- **Copy and download** your converted content

### Markdown to HTML Mode
- **Type or paste Markdown** code in the text area
- **Live preview** of your markdown as you type
- **Convert to clean HTML** with preserved formatting
- **View HTML source** or rendered preview
- **Copy and download** HTML files

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling with Tailwind CSS (via CDN)
- **Vanilla JavaScript** - All functionality and interactivity
- **External libraries** (via CDN):
  - [Turndown.js](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
  - [Marked.js](https://github.com/markedjs/marked) - Markdown to HTML conversion
  - [Lucide Icons](https://lucide.dev/) - Beautiful icons
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Learning Objectives

This project demonstrates:
- **DOM manipulation** with vanilla JavaScript
- **Event handling** and user interactions
- **Working with external libraries** via CDN
- **Clipboard API** for copy functionality
- **File downloads** using Blob API
- **Responsive design** with CSS Grid and Flexbox
- **Modern CSS** with utility classes
- **Clean code organization** and commenting

## Code Structure

```
public/
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Key JavaScript Concepts Used

1. **Classes and Objects** - `HTMLToMarkdownConverter` class
2. **Event Listeners** - User interaction handling
3. **Async/Await** - Clipboard operations
4. **DOM Methods** - Element selection and manipulation
5. **String Methods** - Text processing and formatting
6. **Regular Expressions** - Pattern matching for markdown parsing
7. **Error Handling** - Try-catch blocks for robust operation

## Educational Benefits

- **No build tools required** - Pure vanilla JavaScript
- **Well-commented code** - Easy to understand and modify
- **Modular design** - Clear separation of concerns
- **Real-world functionality** - Practical text processing
- **Modern JavaScript features** - ES6+ syntax and patterns

## Browser Compatibility

Works in all modern browsers including:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Customization Ideas

Students can extend this project by:
- Adding new markdown syntax support
- Creating custom themes
- Adding export options (PDF, RTF)
- Implementing keyboard shortcuts
- Adding syntax highlighting
- Creating a dark mode toggle

## Support

This is an educational project designed to teach web development concepts. The code is intentionally verbose and well-commented to aid learning.

---

**Made for Grade 9 Students** 📚  
*Learning web development with practical, real-world applications*