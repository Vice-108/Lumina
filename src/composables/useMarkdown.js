import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import codeCopy from 'markdown-it-code-copy'

const md = new MarkdownIt({
	highlight: function (code, lang) {
		let highlightedCode
		if (lang && hljs.getLanguage(lang)) {
			highlightedCode = hljs.highlight(code, { language: lang }).value
		} else {
			const detected = hljs.highlightAuto(code)
			highlightedCode = detected.value
			lang = detected.language || 'plaintext'
		}
		return `<pre><code class="hljs ${lang} p-0 m-0">${highlightedCode}</code></pre>`
	},
}).use(codeCopy, {
	iconClass: '',
	element:
		'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
	buttonStyle: 'position: absolute; top: 0.5rem; right: 0.5rem;',
	buttonText: 'Copy',
	successText: 'Copied!',
})

export default function useMarkdown(text) {
	return md.render(text)
}
