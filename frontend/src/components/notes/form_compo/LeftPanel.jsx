
import '../../../assets/styles/forms/center_left.css'

import { pythonTopics } from '../../../utils/python-topics'
// import { javascriptTopics } from '../../../utils/javascript-topics' //
import { useState } from 'react'
import { useTopic } from '../../../contexts/TopicContext'

import { useTags } from '../../../hooks/Tag'
import { X } from 'lucide-react'

export default function CenterLeft({language,logoColor}) {

  let [customSubTopic,setSubCustomTopic] = useState("")
  let [selectedTopicId,setSelectedTopicId] = useState("js_basics")
  let [tag,setTag] = useState("")

  let { topicList ,addCustomTopic } = useTopic() // topic context
  let { tagList,addTag,removeTag } = useTags() // tag hook

  let selectedTopic = topicList.find((topic)=> topic.id == selectedTopicId)



  let selectTopic = (e) => {
        setSelectedTopicId(e.target.value)
  }

  // onChange custom sub-topic field
 


  return(
  <>
    <div className='wrapperLeft'>
        <div className='language'>
          <h1>
            {language.toUpperCase()}
            <span style={{backgroundColor:logoColor}}>
            {
              language == "javascript" ? "Js" : language == "cpp" ? "Cpp" : "Py"
            }
          </span> 
          </h1>
        </div>
        <div className='topic'>
          <span>Topic</span>
          <select onChange={selectTopic}> 
            {topicList?.map((el)=>(
              <option key={el.id} value={el.id}>{el.name}</option>
            ))}
          </select>
        </div>

        <div className='subTopic'>
          <span>Sub Topic</span>
          <select disabled={!selectedTopicId}>
            {selectedTopic?.subTopics?.map((sub,key)=>(
              <option key={key} value={sub}>{sub}</option>
            ))}

          </select>
        </div>

        <div className='status'>
          <span>Custom Topic(optional)</span>
          <div className='status-options'>
            <input
             value={customSubTopic}
             onChange = {(e)=>setSubCustomTopic(e.target.value)} 
             type="text" placeholder="Name your topic" />
             
             <span 
              style = {customSubTopic != "" ? {background:'blue',color:'white'}:{pointerEvents:"none",userSelect:"none"}}
              
              onClick={()=>addCustomTopic(selectedTopicId,customSubTopic)}
              >Add Topic</span>
            </div>
        </div>

        <div className="customTags">

           {/* Tags List */}
           <div className="tagList">
             {tagList.map((el, index) => (
               <span className="tagChip" key={index}>
                 {el}
                 <button
                   className="removeTag"
                   onClick={() => removeTag(el)}
                   aria-label="Remove tag"
                 >
                   <X size={12} />
                 </button>
               </span>
             ))}
           </div>

          {/* Add Tag */}
          <div className="tagInputRow">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              type="text"
              placeholder="Revision, Interview..."
            />
            <button className="addTagBtn" onClick={() => addTag(tag)}>
              + Add
            </button>
          </div>

        </div>
        
    </div>
  </>
  )
}