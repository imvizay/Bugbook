import { useEffect,useState } from 'react'


import '../../assets/styles/forms/write_notes.css'

import { noteTypes } from '../../utils/write-note'

import NoteSideBar from './NoteSideBar'
import CenterLeft from './form_compo/LeftPanel'
import CenterRight from './form_compo/RightPanel'



export default function WriteNote() {
  let [language,setLanguage] = useState("javascript")
  let [noteType,setNoteType] = useState("Concept")

  let [logoColor,setLogoColor] = useState("")

  useEffect(()=>{
    let activeNote = noteTypes.find((obj)=>obj.type == noteType)
    if(activeNote){
      setLogoColor(activeNote.color)
    }
    else{
      setLogoColor("")
    }

  },[noteType,noteTypes])

  

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
                  
                  />
            </div>

            <div className='centerRight'>
                <CenterRight/>
            </div>

          </div>
            
      </div>
    </section>
        
    </>
)
}

