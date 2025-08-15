// HTML to Markdown Converter - Static Version
// Built for grade 9 students using vanilla JavaScript

class HTMLToMarkdownConverter {
    constructor() {
        this.currentMode = 'html-to-markdown';
        this.currentViewMode = 'side-by-side';
        this.currentOutputView = 'markdown';
        this.currentMarkdownView = 'input';
        this.currentHtmlView = 'source';
        
        this.markdownContent = '';
        this.htmlContent = '';
        this.generatedHtml = '';

        // Initialize Turndown service
        this.turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            bulletListMarker: '-'
        });

        this.initializeEventListeners();
        this.updateSettings();
    }

    initializeEventListeners() {
        // Mode toggle
        document.getElementById('toggle-mode-btn').addEventListener('click', () => this.toggleMode());
        
        // View mode toggle
        document.getElementById('side-by-side-btn').addEventListener('click', () => this.setViewMode('side-by-side'));
        document.getElementById('stacked-btn').addEventListener('click', () => this.setViewMode('stacked'));
        
        // HTML to Markdown mode
        document.getElementById('convert-btn').addEventListener('click', () => this.convertHtmlToMarkdown());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearAll());
        document.getElementById('help-btn').addEventListener('click', () => this.showHelp());
        
        // Output view toggle
        document.getElementById('markdown-source-btn').addEventListener('click', () => this.setOutputView('markdown'));
        document.getElementById('markdown-preview-btn').addEventListener('click', () => this.setOutputView('preview'));
        document.getElementById('html-source-btn').addEventListener('click', () => this.setOutputView('html'));
        
        // Copy and download
        document.getElementById('copy-output-btn').addEventListener('click', () => this.copyOutput());
        document.getElementById('download-output-btn').addEventListener('click', () => this.downloadOutput());
        
        // Markdown to HTML mode
        document.getElementById('convert-md-btn').addEventListener('click', () => this.convertMarkdownToHtml());
        document.getElementById('paste-md-btn').addEventListener('click', () => this.pasteMarkdown());
        document.getElementById('clear-md-btn').addEventListener('click', () => this.clearMarkdown());
        
        // Markdown input view toggle
        document.getElementById('md-input-btn').addEventListener('click', () => this.setMarkdownView('input'));
        document.getElementById('md-preview-btn').addEventListener('click', () => this.setMarkdownView('preview'));
        
        // HTML output view toggle
        document.getElementById('html-source-view-btn').addEventListener('click', () => this.setHtmlView('source'));
        document.getElementById('html-preview-view-btn').addEventListener('click', () => this.setHtmlView('preview'));
        
        // HTML copy and download
        document.getElementById('copy-html-btn').addEventListener('click', () => this.copyHtml());
        document.getElementById('download-html-btn').addEventListener('click', () => this.downloadHtml());
        
        // Markdown textarea events
        const markdownTextarea = document.getElementById('markdown-textarea');
        markdownTextarea.addEventListener('input', () => this.updateMarkdownStats());
        markdownTextarea.addEventListener('input', () => this.updateMarkdownPreview());
        
        // Rich text editor events
        const richEditor = document.getElementById('rich-editor');
        richEditor.addEventListener('paste', (e) => this.handleRichTextPaste(e));
        richEditor.addEventListener('input', () => this.updateEditorContent());
        
        // Settings change events
        document.getElementById('preserve-links').addEventListener('change', () => this.updateSettings());
        document.getElementById('convert-images').addEventListener('change', () => this.updateSettings());
        document.getElementById('clean-html').addEventListener('change', () => this.updateSettings());
        document.getElementById('heading-style').addEventListener('change', () => this.updateSettings());
        document.getElementById('code-block-style').addEventListener('change', () => this.updateSettings());
        document.getElementById('bullet-list-marker').addEventListener('change', () => this.updateSettings());
    }

    toggleMode() {
        this.currentMode = this.currentMode === 'html-to-markdown' ? 'markdown-to-html' : 'html-to-markdown';
        this.updateModeDisplay();
    }

    updateModeDisplay() {
        const title = document.getElementById('app-title');
        const toggleText = document.getElementById('toggle-mode-text');
        const htmlMode = document.getElementById('html-to-markdown-mode');
        const markdownMode = document.getElementById('markdown-to-html-mode');

        if (this.currentMode === 'html-to-markdown') {
            title.textContent = 'Rich Text to Markdown';
            toggleText.textContent = 'Switch to MD→HTML';
            htmlMode.style.display = 'block';
            markdownMode.style.display = 'none';
        } else {
            title.textContent = 'Markdown to HTML';
            toggleText.textContent = 'Switch to HTML→MD';
            htmlMode.style.display = 'none';
            markdownMode.style.display = 'block';
        }
    }

    setViewMode(mode) {
        this.currentViewMode = mode;
        const contentPanels = document.getElementById('content-panels');
        const sideBtn = document.getElementById('side-by-side-btn');
        const stackBtn = document.getElementById('stacked-btn');

        if (mode === 'side-by-side') {
            contentPanels.className = 'grid gap-6 grid-cols-1 lg:grid-cols-2';
            sideBtn.className = 'px-3 py-1 text-sm rounded-md transition-colors bg-slate-800 text-white';
            stackBtn.className = 'px-3 py-1 text-sm rounded-md transition-colors text-slate-700 hover:bg-slate-200';
        } else {
            contentPanels.className = 'grid gap-6 grid-cols-1';
            sideBtn.className = 'px-3 py-1 text-sm rounded-md transition-colors text-slate-700 hover:bg-slate-200';
            stackBtn.className = 'px-3 py-1 text-sm rounded-md transition-colors bg-slate-800 text-white';
        }
    }

    setOutputView(view) {
        this.currentOutputView = view;
        const sourceBtn = document.getElementById('markdown-source-btn');
        const previewBtn = document.getElementById('markdown-preview-btn');
        const htmlBtn = document.getElementById('html-source-btn');
        const outputContent = document.getElementById('output-content');

        // Reset button styles
        sourceBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
        previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
        htmlBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';

        // Set active button
        if (view === 'markdown') {
            sourceBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            outputContent.innerHTML = `<pre class="text-sm text-slate-700 font-mono whitespace-pre-wrap">${this.escapeHtml(this.markdownContent)}</pre>`;
        } else if (view === 'preview') {
            previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            outputContent.innerHTML = `<div class="prose prose-sm max-w-none text-left">${this.renderMarkdownPreview(this.markdownContent)}</div>`;
        } else if (view === 'html') {
            htmlBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            outputContent.innerHTML = `<pre class="text-sm text-slate-700 font-mono whitespace-pre-wrap">${this.escapeHtml(this.htmlContent)}</pre>`;
        }

        if (!this.markdownContent) {
            outputContent.innerHTML = '<div class="text-slate-500 italic text-center py-20">Your converted content will appear here...</div>';
        } else {
            // Remove any centering classes from the container when content is present
            outputContent.className = outputContent.className.replace(/text-center/g, '').trim();
        }
    }

    setMarkdownView(view) {
        this.currentMarkdownView = view;
        const inputBtn = document.getElementById('md-input-btn');
        const previewBtn = document.getElementById('md-preview-btn');
        const inputArea = document.getElementById('markdown-input-area');
        const previewArea = document.getElementById('markdown-preview-area');

        if (view === 'input') {
            inputBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
            inputArea.style.display = 'block';
            previewArea.style.display = 'none';
        } else {
            inputBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
            previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            inputArea.style.display = 'none';
            previewArea.style.display = 'block';
        }
    }

    setHtmlView(view) {
        this.currentHtmlView = view;
        const sourceBtn = document.getElementById('html-source-view-btn');
        const previewBtn = document.getElementById('html-preview-view-btn');
        const sourceContent = document.getElementById('html-output-content');
        const previewContent = document.getElementById('html-preview-content');

        if (view === 'source') {
            sourceBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
            sourceContent.style.display = 'block';
            previewContent.style.display = 'none';
            // Ensure source content is left-aligned
            sourceContent.className = sourceContent.className.replace(/text-center/g, '').trim() + ' text-left';
        } else {
            sourceBtn.className = 'px-2 py-1 text-xs rounded transition-colors text-slate-700 hover:bg-slate-200';
            previewBtn.className = 'px-2 py-1 text-xs rounded transition-colors bg-slate-800 text-white';
            sourceContent.style.display = 'none';
            previewContent.style.display = 'block';
            // Ensure preview content is left-aligned
            previewContent.className = previewContent.className.replace(/text-center/g, '').trim() + ' text-left';
        }
    }

    handleRichTextPaste(e) {
        // Allow default paste behavior to preserve formatting
        setTimeout(() => {
            this.updateEditorContent();
        }, 10);
    }

    updateEditorContent() {
        const editor = document.getElementById('rich-editor');
        // Store the HTML content for conversion
        this.richTextContent = editor.innerHTML;
    }

    convertHtmlToMarkdown() {
        const editor = document.getElementById('rich-editor');
        const html = editor.innerHTML;

        if (!html.trim() || html === '<br>') {
            this.showToast('Please add some content to convert');
            return;
        }

        try {
            // Convert HTML to Markdown
            this.markdownContent = this.turndownService.turndown(html);
            
            // Generate HTML from markdown for the HTML view
            this.htmlContent = marked.parse(this.markdownContent);

            // Update the output display
            this.setOutputView(this.currentOutputView);
            this.updateOutputStats();

            this.showToast('Content successfully converted to Markdown!');
        } catch (error) {
            console.error('Conversion error:', error);
            this.showToast('Error converting content. Please try again.');
        }
    }

    convertMarkdownToHtml() {
        const textarea = document.getElementById('markdown-textarea');
        const markdown = textarea.value;

        if (!markdown.trim()) {
            this.showToast('Please add some Markdown to convert');
            return;
        }

        try {
            // Convert Markdown to HTML
            this.generatedHtml = marked.parse(markdown);
            
            // Update HTML output display
            this.updateHtmlOutput();
            
            // Show the HTML output panel
            document.getElementById('html-output-panel').style.display = 'block';

            this.showToast('Markdown successfully converted to HTML!');
        } catch (error) {
            console.error('Conversion error:', error);
            this.showToast('Error converting Markdown. Please check your syntax.');
        }
    }

    updateHtmlOutput() {
        const sourceContent = document.getElementById('html-output-content');
        const previewContent = document.getElementById('html-preview-content');
        const stats = document.getElementById('html-output-stats');
        const textarea = document.getElementById('markdown-textarea');

        sourceContent.textContent = this.generatedHtml;
        previewContent.innerHTML = this.generatedHtml;

        const lines = textarea.value.split('\n').length;
        const characters = this.generatedHtml.length;
        stats.textContent = `Generated from ${lines} lines of Markdown • ${characters} characters`;
    }

    updateMarkdownStats() {
        const textarea = document.getElementById('markdown-textarea');
        const stats = document.getElementById('markdown-stats');
        const value = textarea.value;
        
        const characters = value.length;
        const lines = value.split('\n').length;
        
        stats.textContent = `${characters} characters, ${lines} lines`;
    }

    updateMarkdownPreview() {
        const textarea = document.getElementById('markdown-textarea');
        const preview = document.getElementById('markdown-preview-content');
        const markdown = textarea.value;

        if (!markdown.trim()) {
            preview.className = 'prose prose-sm max-w-none text-slate-500 italic text-center py-20';
            preview.innerHTML = 'Type some Markdown to see the preview...';
            return;
        }

        try {
            preview.className = 'prose prose-sm max-w-none text-left';
            const html = this.renderMarkdownPreview(markdown);
            preview.innerHTML = html;
        } catch (error) {
            preview.className = 'prose prose-sm max-w-none text-red-500 text-center py-20';
            preview.innerHTML = 'Error rendering preview';
        }
    }

    renderMarkdownPreview(markdown) {
        // Enhanced markdown preview rendering
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
            
            // Images
            .replace(/!\[([^\]]*)\]\(([^)"]+)(?:\s+"([^"]+)")?\)/g, '<img src="$2" alt="$1" title="$3" class="max-w-full h-auto rounded-lg my-4" />')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
            
            // Bold and italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Code blocks and inline code
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-3"><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
            
            // Lists
            .replace(/^\* (.*$)/gm, '<li class="ml-4 my-1">$1</li>')
            .replace(/^- (.*$)/gm, '<li class="ml-4 my-1">$1</li>')
            .replace(/^\+ (.*$)/gm, '<li class="ml-4 my-1">$1</li>')
            
            // Blockquotes
            .replace(/^\> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600">$1</blockquote>')
            
            // Line breaks and paragraphs
            .replace(/\n\n/g, '</p><p class="mb-3">')
            .replace(/\n/g, '<br>');

        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li[^>]*>.*?<\/li>(?:\s*<li[^>]*>.*?<\/li>)*)/g, '<ul class="list-disc ml-6 my-3">$1</ul>');
        
        // Wrap content in paragraphs if it doesn't start with a block element
        if (!html.match(/^<(h[1-6]|div|ul|ol|blockquote|pre)/)) {
            html = '<p class="mb-3">' + html + '</p>';
        }

        return html;
    }

    updateOutputStats() {
        const stats = document.getElementById('output-stats');
        if (!this.markdownContent) {
            stats.style.display = 'none';
            return;
        }

        const words = this.markdownContent.split(/\s+/).filter(word => word.length > 0).length;
        const lines = this.markdownContent.split('\n').length;
        const characters = this.markdownContent.length;

        stats.textContent = `${words} words • ${lines} lines • ${characters} characters`;
        stats.style.display = 'block';
    }

    updateSettings() {
        const preserveLinks = document.getElementById('preserve-links').checked;
        const convertImages = document.getElementById('convert-images').checked;
        const cleanHtml = document.getElementById('clean-html').checked;
        const headingStyle = document.getElementById('heading-style').value;
        const codeBlockStyle = document.getElementById('code-block-style').value;
        const bulletListMarker = document.getElementById('bullet-list-marker').value;

        // Recreate Turndown service with new settings
        this.turndownService = new TurndownService({
            headingStyle: headingStyle,
            codeBlockStyle: codeBlockStyle,
            bulletListMarker: bulletListMarker
        });

        // Configure rules
        if (!preserveLinks) {
            this.turndownService.addRule('removeLinks', {
                filter: 'a',
                replacement: function (content) {
                    return content;
                }
            });
        }

        if (!convertImages) {
            this.turndownService.addRule('removeImages', {
                filter: 'img',
                replacement: function () {
                    return '';
                }
            });
        } else {
            this.turndownService.addRule('improvedImages', {
                filter: 'img',
                replacement: function (content, node) {
                    const alt = node.getAttribute('alt') || '';
                    const src = node.getAttribute('src') || '';
                    const title = node.getAttribute('title');
                    
                    if (!src) return '';
                    
                    if (title) {
                        return `![${alt}](${src} "${title}")`;
                    }
                    return `![${alt}](${src})`;
                }
            });
        }

        if (cleanHtml) {
            this.turndownService.addRule('cleanAttributes', {
                filter: function (node) {
                    return node.nodeName === 'SPAN' || node.nodeName === 'DIV';
                },
                replacement: function (content) {
                    return content;
                }
            });
        }
    }

    async pasteMarkdown() {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById('markdown-textarea').value = text;
            this.updateMarkdownStats();
            this.updateMarkdownPreview();
        } catch (err) {
            this.showToast('Unable to read clipboard. Please paste manually.');
        }
    }

    clearMarkdown() {
        document.getElementById('markdown-textarea').value = '';
        document.getElementById('html-output-panel').style.display = 'none';
        this.generatedHtml = '';
        this.updateMarkdownStats();
        this.updateMarkdownPreview();
    }

    clearAll() {
        if (this.currentMode === 'html-to-markdown') {
            document.getElementById('rich-editor').innerHTML = '';
            this.markdownContent = '';
            this.htmlContent = '';
            this.setOutputView(this.currentOutputView);
            this.updateOutputStats();
        } else {
            this.clearMarkdown();
        }
        this.showToast('All content cleared');
    }

    async copyOutput() {
        let content = '';
        if (this.currentOutputView === 'html') {
            content = this.htmlContent;
        } else {
            content = this.markdownContent;
        }

        if (!content) {
            this.showToast('No content to copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(content);
            this.showToast('Content copied to clipboard!');
        } catch (err) {
            this.showToast('Unable to copy to clipboard');
        }
    }

    async copyHtml() {
        if (!this.generatedHtml) {
            this.showToast('No HTML content to copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.generatedHtml);
            this.showToast('HTML copied to clipboard!');
        } catch (err) {
            this.showToast('Unable to copy to clipboard');
        }
    }

    downloadOutput() {
        let content, filename, mimeType;
        
        if (this.currentOutputView === 'html') {
            content = this.htmlContent;
            filename = 'converted-content.html';
            mimeType = 'text/html';
        } else {
            content = this.markdownContent;
            filename = 'converted-content.md';
            mimeType = 'text/markdown';
        }

        if (!content) {
            this.showToast('No content to download');
            return;
        }

        this.downloadFile(content, filename, mimeType);
    }

    downloadHtml() {
        if (!this.generatedHtml) {
            this.showToast('No HTML content to download');
            return;
        }

        this.downloadFile(this.generatedHtml, 'converted-content.html', 'text/html');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast(`Downloaded ${filename}`);
    }

    showHelp() {
        const helpText = this.currentMode === 'html-to-markdown' 
            ? 'Paste rich text from web pages, Word documents, or any formatted source. The tool will preserve formatting and convert it to clean Markdown.'
            : 'Type or paste Markdown code in the input area. Click Convert to generate clean HTML output with preserved formatting.';
        
        this.showToast(helpText);
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const content = document.getElementById('toast-content');
        
        content.textContent = message;
        toast.classList.add('toast-show');
        
        setTimeout(() => {
            toast.classList.remove('toast-show');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the converter when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const converter = new HTMLToMarkdownConverter();
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});