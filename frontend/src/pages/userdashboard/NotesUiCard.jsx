import React, { useState } from "react"
import { Clock, Tag, Code2, Layers, ChevronDown } from "lucide-react"
import "../../assets/styles/userdashboard/notes_card.css"

const cardDetail = [
  {
    id: 1,
    category: "Frontend",
    language: "JavaScript",
    topic: "Variables & Data Types",
    subtopic: "let vs var vs const",
    note_type: "Concept",
    explanation: "Variables store data values used in programs.",
    reasoning: "Scope and mutability differ between let, var and const.",
    misconception: "Thinking var is block scoped.",
    created_at: "2025-07-30T10:22:00",
  },
  {
    id: 2,
    category: "Backend",
    language: "JavaScript",
    topic: "Variables & Data Types",
    subtopic: "let vs var vs const",
    note_type: "Concept",
    explanation: "Variables store data values used in programs.",
    reasoning: "Scope and mutability differ between let, var and const.",
    misconception: "Thinking var is block scoped.",
    created_at: "2025-07-30T10:22:00",
  },{
    id: 3,
    category: "Database",
    language: "JavaScript",
    topic: "Variables & Data Types",
    subtopic: "let vs var vs const",
    note_type: "Concept",
    explanation: "Variables store data values used in programs.",
    reasoning: "Scope and mutability differ between let, var and const.",
    misconception: "Thinking var is block scoped.",
    created_at: "2025-07-30T10:22:00",
  },
]

function NotesUiCard() {
  

  return (
    <div className="userNoteGrid">
      {cardDetail.map((el) => {
        const [openDetails, setDetails] = useState(false)
        return (
          <div className="noteCard" key={el.id}>
            {/* ---------- Header ---------- */}
            <div className="noteHeader">
              <div>
                <h3 className="noteTitle">{el.topic}</h3>
                <p className="noteSub">{el.subtopic}</p>
              </div>
              <span className="noteCategory">{el.category}</span>
            </div>

            {/* ---------- Meta ---------- */}
            <div className="noteMeta">
              <span> <Code2 size={14} /> {el.language} </span>
              <span className="tag"> <Tag size={12} /> {el.note_type} </span>
            </div>

            {/* ---------- Expand Button ---------- */}
            <button className="expandBtn" onClick={() => setDetails((prev)=>!prev)}>   
                View Details <ChevronDown size={16} className={openDetails ? "rotate" : ""} />
            </button>

            {/* ---------- Details ---------- */}
            {openDetails && (
              <div key={el.id} className="noteDetails">
                <div>
                  <strong>Explanation</strong>
                  <p style={{color:"green"}}>{el.explanation}</p>
                </div>

                <div>
                  <strong>Reasoning</strong>
                  <p style={{color:"purple"}}>{el.reasoning}</p>
                </div>

                <div>
                  <strong>Misconception</strong>
                  <p style={{color:"orange"}}>{el.misconception}</p>
                </div>
              </div>
            )}

            {/* ---------- Footer ---------- */}
            <div className="noteFooter">
              <span className="time">
                <Clock size={13} />
                created  {new Date(el.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NotesUiCard
