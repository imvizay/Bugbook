
import '../../assets/styles/forms/write_notes.css'

import { useEffect,useState } from 'react'
import axios from 'axios'

import { noteTypes } from '../../utils/write-note'
import NoteSideBar from './NoteSideBar'
import CenterLeft from './form_compo/LeftPanel'
import CenterRight from './form_compo/RightPanel'

import { useLocation } from 'react-router-dom'

export default function WriteNote() {
  // API ERROR
  const location = useLocation();

  const isEditMode = location.state?.mode === "edit";
  const editNote = location.state?.note;

  let [noteCreated,setNoteCreated] = useState(false)

  let [primeHeading,setPrimeHeading] = useState(1)

  // top panel states
  let [language,setLanguage] = useState({id:1,codeL:"javascript"})
  let [subTopic,setSubTopic] = useState("")
  let [noteType,setNoteType] = useState(noteTypes[0])
  let [logoColor,setLogoColor] = useState("")

  // center left panel states
  let [customSubTopic,setCustomSubTopic] = useState("")
  let [selectedTopicId,setSelectedTopicId] = useState(Number(1))

  // Tags
  let [tagList, setTagList] = useState([])
  let [tag,setTag] = useState("")

  // right panel state
  let [genericNote,setGenericNote] = useState({
      title:"",
      explanation:"",
      code:"",
      reasoning:"",
      misconception:""
    })


  /* ======  SIDE EFFECTS ======== */  

  useEffect(() => {
  if (!isEditMode || !editNote) return

  // Top panel
  setLanguage({
    id: editNote.language.id,
    codeL: editNote.language.language_name,
  });

  setNoteType({
    id: editNote.note_type.id,
    type: editNote.note_type.note_type,
  });

  setLogoColor(editNote.note_type.color || "");

  // Topics
  setSelectedTopicId(editNote.main_topic?.id || 1);
  setSubTopic(editNote.sub_topic || "");
  setCustomSubTopic(editNote.custom_subtopic || "");

  // Tags
  setTagList(editNote.tags?.map(t => t.tag_name) || []);

  // Right panel (main content)
  setGenericNote({
      title: editNote.title || "",
      explanation: editNote.sections?.[0]?.note_explanation || "",
      reasoning: editNote.sections?.[0]?.note_reasoning || "",
      misconception: editNote.sections?.[0]?.note_misconception || "",
      code: editNote.code_snippets?.[0]?.code || "",
    });

  }, [isEditMode, editNote]);



  useEffect(()=>{
    let activeNote = noteTypes.find((obj)=>obj.id == noteType.id)
    if(activeNote){
      setLogoColor(activeNote.color)
    }
    else{
      setLogoColor("")
    }
  },[noteType])


  // TAGS HANDLERS
  /* add tag */ 
  let addTag = (tag) => {
     if (!tag.trim()) return alert("Empty tag")
     setTagList(prev => {
       if (prev.includes(tag)) return prev
       if (prev.length >= 4) {
         alert("4 tags at max")
         return prev
       }
     
       let updated = [...prev, tag]
       localStorage.setItem("tags", JSON.stringify(updated))
       return updated
     })
  }   

    // Remove Tag
  let removeTag = (targetTag) => {
    setTagList(prev => {
      let updated = prev.filter(tag => tag !== targetTag)
      localStorage.setItem("tags", JSON.stringify(updated))
      return updated
    })
  }


  /* ====== EVENT HANDLERS ======= */
  // send post request
 let saveNote = () => {
  const payload = {
    username: "vizay",
    prime_heading: primeHeading,
    note_type: Number(noteType.id),
    language: language.id,
    topic: Number(selectedTopicId),
    sub_topic: Number(subTopic) || null,
    custom_topic: customSubTopic,
    tags: tagList,
    ...genericNote,
  };

  if (isEditMode) {
    // UPDATE
    axios
      .put(`http://127.0.0.1:8000/api/update_note/${editNote.id}/`, payload)
      .then(() => setNoteCreated(true))
      .catch(err => console.log(err.response?.data));
  } else {
    // CREATE
    axios
      .post("http://127.0.0.1:8000/api/notes/", payload)
      .then(() => setNoteCreated(true))
      .catch(err => console.log(err.response?.data));
  }
}


  return (
    <>
    <section id="addNote">
      <aside className='sidebar'>
        <NoteSideBar 
        language={language}
        setLanguage={setLanguage}
        />
      </aside>

      {/* context */}
      <div className='context'>
        {/* top */}
          <div className='topContext'>
              <div className='noteType'>
                <span>Note Type :</span>

                 {noteTypes?.map((el)=>(
                  <div 
                    onClick={ () => setNoteType( {id:el.id, type:el.type})} 
                    style={ noteType.type == el.type ? { backgroundColor:el.color } : {} } 
                    key={ el.id || el.type }> 

                    {<el.icon color = { noteType.type ==el.type ? "white": el.color } />} 

                    <span style = { noteType.type ==el.type ? {color:"white"}:{} }> {el.type} </span>

                   </div>
                 ))}

              </div>
          </div>

          {/* center */}
          <div className='centerContext'>

            <div className='centerLeft'>
                  <CenterLeft 
                    primeHeading={primeHeading}
                    setPrimeHeading={setPrimeHeading}
                    language={language}
                    logoColor={logoColor}
                    subTopic={subTopic}
                    setSubTopic={setSubTopic}
                    customSubTopic={customSubTopic}
                    setCustomSubTopic={setCustomSubTopic}

                    selectedTopicId={selectedTopicId}
                    setSelectedTopicId={setSelectedTopicId}
                    tag={tag}
                    setTag={setTag}

                    tagList={tagList}
                    setTagList={setTagList}
                    addTag={addTag}
                    removeTag={removeTag}
                  
                  />
            </div>

            <div className='centerRight'>
                <CenterRight 
                  language={language} 
                  genericNote={genericNote}
                  setGenericNote={setGenericNote}
                  isEditMode={isEditMode}

                  // API
                  saveNote={saveNote}
                />
            </div>

          </div>
            
      </div>
    </section>
          
    { noteCreated && 
    <>
    <SuccessDialog onClose={()=>setNoteCreated((prev)=>!prev)}/>
    </>}

        
    </>
)

}



import { X, CheckCircle } from "lucide-react";
import '../../assets/styles/api_success/success_note.css'

export function SuccessDialog({ onClose }) {
  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div
        className="dialogBox"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="dialogClose" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="dialogIcon">
          <CheckCircle size={48} />
        </div>

        {/* Content */}
        <h3>Note Created Successfully</h3>
        <p>Your note has been saved and is ready to use.</p>

        {/* Action */}
        <button className="dialogBtn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
