import Editor from "@monaco-editor/react"

const LANGUAGE_MAP = {
  js: "javascript",
  cpp: "cpp",
  python: "python",
}

export default function CodeEditor({
  language = "js",
  value = "",
  onChange,
}) {
  return (
    <Editor
      height="200px"
      language={LANGUAGE_MAP[language]}
      value={value}
      theme="vs-light"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
        padding: { top: 8 },
      }}
      onChange={(val) => onChange(val || "")}
    />
  )
}
