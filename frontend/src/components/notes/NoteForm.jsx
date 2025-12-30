
import '../../assets/styles/forms/write_notes.css'

import { useEffect,useState } from 'react'
import axios from 'axios'

import { noteTypes } from '../../utils/write-note'
import NoteSideBar from './NoteSideBar'
import CenterLeft from './form_compo/LeftPanel'
import CenterRight from './form_compo/RightPanel'

import { useTags } from '../../hooks/Tag'
import { useTopic } from '../../contexts/TopicContext'

export default function WriteNote() {
  // API ERROR
  let [apiError,setError] = useState({
    language:"",
    custom_note:'',
    explanation:'',
    reasoning:'',
    code:'',
    misconception:'',
  })

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
      explanation:"",
      code:"",
      reasoning:"",
      misconception:""
    })


  /* ======  SIDE EFFECTS ======== */  

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
    console.log("Started Saving")

    console.log("Reached")
    console.log("tagList type:", typeof tagList)
    console.log("tagList value:", tagList)
    console.log("is array?", Array.isArray(tagList))
    

    let data = {
      username:'vizay',
      prime_heading:primeHeading,
      note_type : Number(noteType.id),
      language : language.id,
      topic : Number(selectedTopicId),
      sub_topic : Number(subTopic),
      custom_topic : customSubTopic,
      tags : tagList, // tag array
      ...genericNote
    }

    console.log("Table",data)
    axios.post("http://127.0.0.1:8000/api/notes/",data,{
      headers:{
        Authorization:"vizay",
        "Content-Type":"application/json"
      }

    })

    .then((res)=>{
      console.log(res.data)
      localStorage.removeItem("tags")
    })
    .catch((error)=>console.log(error.response.data))
    
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

                  // API
                  saveNote={saveNote}
                />
            </div>

          </div>
            
      </div>
    </section>
        
    </>
)

}
