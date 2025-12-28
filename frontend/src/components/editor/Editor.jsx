import Editor from "@monaco-editor/react"

const LANGUAGE_MAP = {
  js: "javascript",
  cpp: "cpp",
  python: "python",
}

export default function CodeEditor({language = "js",value = "",onChange}){
  return (
    <Editor
      height="300px"
      language={LANGUAGE_MAP[language]}
      value={value}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        renderLineHighlight:'all',
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
        padding: { top: 8 },
        cursorBlinking:"smooth",
        smoothScrolling:true,
        fontFamily: "Fira Code, monospace",
      }}
      onChange={(val) => onChange(val || "")}
    />
  )
}
