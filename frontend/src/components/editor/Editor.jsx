import { useRef } from "react";
import '../../assets/styles/codeEditor/editor.css'
const MAX_LINES = 80;

export default function CodeTextarea({ language ,value, onChange }) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const text = e.target.value;
    const lines = text.split("\n");

    if (lines.length > MAX_LINES) return;

    onChange(text);
  };

  const handleKeyDown = (e) => {
    // TAB indentation
    if (e.key === "Tab") {
      e.preventDefault();

      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const updated =
        value.substring(0, start) +
        "  " +
        value.substring(end);

      onChange(updated);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="codeEditorShell">
      {/* Line numbers */}
      <div className="lineNumbers">
        {Array.from({ length: value.split("\n").length || 1 }).map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>

      {/* Code textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder={`// Write code here (max ${MAX_LINES} lines)`}
      />

      <div className="editorFooter">
        {value.split("\n").length} / {MAX_LINES} lines
      </div>
    </div>
  );
}
