import React, { useState } from "react"
import { Clock, Tag, Code2,  ChevronDown } from "lucide-react"
import "../../assets/styles/userdashboard/notes_card.css"
import { useNavigate } from "react-router-dom";

function NotesUiCard({notes,onDelete}) {
  console.log(notes[0])
  console.log(notes)
  let navigate = useNavigate()

  return (
    <div className="userNoteGrid">
      {notes.map((el,index) => {
         const [openDetails, setDetails] = useState(false)
        return (
          <div className="noteCard" key={el?.id}>
            {/* ---------- Header ---------- */}
            <div className="noteHeader">
              <div>
                <h3 className="noteTitle">{el?.main_topic?.topic_name}</h3>
                <p className="noteSub">{el?.subtopic}</p>
              </div>
              <span className="noteCategory">{"id :"} {el?.id}</span>
            </div>

            {/* ---------- Meta ---------- */}
            <div className="noteMeta">
              <span> <Code2 size={14} /> {el?.language?.language_name } </span>
              <span className="tag"> <Tag size={12} /> {el?.note_type?.note_type} </span>
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
                  <p style={{color:"green"}}>{el?.sections?.[0]?.note_explanation || "N/A"}</p>
                </div>

                <div>
                  <strong>Reasoning</strong>
                  <p style={{color:"purple"}}>{el?.sections?.[0]?.note_reasoning || "N/A"}</p>
                </div>

                <div>
                  <strong>Misconception</strong>
                  <p style={{color:"orange"}}>{el?.sections?.[0]?.note_misconception || "N/A"}</p>
                </div>
                <div>
                  <strong>Code Example</strong>
                  <p>
                   {el?.code_snippets?.[0]?.code
                     ? el.code_snippets[0].code
                         .split("\n")
                         .map((line, i) => <span key={i}>{line}<br /></span>)
                     : "No code example provided while creating this note"}
                  </p>
                </div>
              </div>
            )}

            {/* ---------- Footer ---------- */}
            <div className="noteFooter">
              <span className="time">
                <Clock size={13} />
                created  {new Date(el.created_at).toLocaleDateString()}
              </span>
              <div className="ctaButton">
                <span className="btn edit" onClick={() =>
                navigate("/notes", {state: {
                  mode: "edit",
                  note: el,
                },})
              }
            >Edit</span>
                <span onClick={()=>onDelete(el.id)} className="btn delete">Delete</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NotesUiCard
