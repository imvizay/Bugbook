import Editor from "@monaco-editor/react"

export default function CodeEditor({language,value,onChange}){
  return (
    <Editor
      height="300px"
      language={language}
      value={value}
      theme="vs-dark"
      options={{
        fontLigatures:true,
        tabSize:2,
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
