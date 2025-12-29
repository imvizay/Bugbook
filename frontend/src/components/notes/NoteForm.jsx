
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

  // top panel states
  let [language,setLanguage] = useState("javascript")
  let [subTopic,setSubTopic] = useState("")
  let [noteType,setNoteType] = useState("Concept")
  let [logoColor,setLogoColor] = useState("")

  // center left panel states
  let [customSubTopic,setCustomSubTopic] = useState("")
  let [selectedTopicId,setSelectedTopicId] = useState("js_basics")

  let { topicList } = useTopic()
  let [tag,setTag] = useState("")

  // right panel state
  let [genericNote,setGenericNote] = useState({
    explanation:"",
    code:"",
    reasoning:"",
    misconception:""
  })

  let {tagList} = useTags()

  /* ======  SIDE EFFECTS ======== */  

  useEffect(()=>{
    let activeNote = noteTypes.find((obj)=>obj.type == noteType)
    if(activeNote){
      setLogoColor(activeNote.color)
    }
    else{
      setLogoColor("")
    }

  },[noteType,noteTypes])

  /* ====== EVENT HANDLERS ======= */
  // send post request
  let saveNote = () => {
    let topic = topicList.find((topic)=>topic.id == selectedTopicId)
    if(!topic) return {status:false , message:"cannot find topic during note request post"}

    let data = {
      note_type : noteType,
      lang : language.toLowerCase(),
      topic : topic.name.toLowerCase(),
      sub_topic : subTopic.toLowerCase(),
      custom_topic : customSubTopic,
      tags : tagList, // tag array
      ...genericNote
    }
    console.log("Table",data)
    axios.post("http://127.0.0.1:8000/api/notes/",data)

    .then((res)=>console.log(res.data))
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
                    onClick={ () => setNoteType(el.type)} 
                    style={ noteType == el.type ? { backgroundColor:el.color } : {} } 
                    key={ el.id || el.type }> 

                    {<el.icon color = { noteType==el.type ? "white": el.color } />} 

                    <span style = { noteType==el.type ? {color:"white"}:{} }> {el.type} </span>

                   </div>
                 ))}

              </div>
          </div>

          {/* center */}
          <div className='centerContext'>

            <div className='centerLeft'>
                  <CenterLeft 
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

