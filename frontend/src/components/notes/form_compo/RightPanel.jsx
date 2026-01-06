
import '../../../assets/styles/forms/center_right.css'

import { CodeXml , BookOpen , Brain , Bug} from 'lucide-react'
import CodeEditor from '../../editor/Editor'


function CenterRight({language,genericNote,setGenericNote,saveNote,isEditMode}) {

    let handleGeneric=(e)=>{
        let {name,value}= e.target

        setGenericNote((prev)=>({
            ...prev,
            [name]:value
        }))
    }

  return (
    <div className="wrapperRight">
  
      {/* User Defined Title */}
      <div className='fieldBlock'>
        <label>Title</label>
        <input type="text" className='title' placeholder="Title" value={genericNote.title}
          onChange={(e) =>
            setGenericNote(prev => ({
              ...prev,
              title: e.target.value
            }))
         }/>

      </div>

      {/* Explanation */}
      <div className="fieldBlock">
        <label><span className='fieldIcon'><BookOpen size={14} color='blue'/></span> Explanation <em>*</em>  </label>
        <textarea
          name='explanation'
          value={genericNote.explanation}
          maxLength={300}
          onChange={handleGeneric}
          placeholder="Explain the topic briefly in your own words…"
        />
        <small>Max 300 characters</small>
      </div>

       {/* Code Editor */}
      <div className="fieldBlock highlight">
        <label> <span className='fieldIcon'><CodeXml size={14} color='gray'/></span> Code <em>*</em> </label>
       
        <CodeEditor 
            language={language}
            value={genericNote.code}
            onChange={(value)=>
                setGenericNote((prev)=>({
                ...prev,
                code:value
            }))}
        
        />

      </div>

      {/* Reasoning */}
      <div className="fieldBlock">
        <label> <span className='fieldIcon'><Brain size={14} color='pink'/></span> Reasoning <span>(optional)</span>  </label>
        <textarea
          name='reasoning'
          value={genericNote.reasoning}
          onChange={handleGeneric}
          maxLength={500}
          placeholder="Why does this work? What is the underlying logic?"
        />
      </div>

      {/* Misconception */}
      <div className="fieldBlock">
        <label> <span className='fieldIcon'><Bug size={14} color='red'/></span> Misconception<span>(optional)</span>  </label>
        <textarea
          name='misconception'
          value={genericNote.misconception}
          onChange={handleGeneric}
          maxLength={300}
          placeholder="What did you misunderstand earlier?"
        />
      </div>


      <div className='ctaButtons'>

            <div className='ctaBox'>
                <span onClick={()=>saveNote()} className='add'> 
                  {isEditMode ? "Update Note" : "Save Note"}
                </span>
                <span  className='draft'>Draft</span>
                <span  className='clear'>Clear</span>
            </div>

      </div>

    </div>
  )
}

export default CenterRight
