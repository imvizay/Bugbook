
import '../../../assets/styles/forms/center_left.css'

import { pythonTopics } from '../../../utils/python-topics'
// import { javascriptTopics } from '../../../utils/javascript-topics' //
import { useEffect } from 'react'
import { useTopic } from '../../../contexts/TopicContext'
import axios from 'axios'

import { X } from 'lucide-react'

export default function CenterLeft(
  {
    language,
    logoColor,
    customSubTopic,
    setCustomSubTopic,
    tag,setTag,addTag,removeTag,tagList,setTagList,
    selectedTopicId,setSelectedTopicId,
    subTopic,setSubTopic,
    setPrimeHeading,primeHeading
  }
){

  let { topicList ,addCustomTopic,setTopicList } = useTopic() // topic context

  let selectedTopic = topicList.find((topic)=> topic.id == selectedTopicId)

  useEffect(() => {

    console.log("topic List",topicList[0])
    if (!language) return;

    axios
      .get(`http://127.0.0.1:8000/api/topic-subtopics/${language.codeL}`)
      .then((res) => {
        setTopicList(res.data); 
        setSelectedTopicId(""); 
        setSubTopic("");
      })
      .catch((err) => console.error(err));
  }, [language]);

  let selectTopic = (e) => {
        setSelectedTopicId(e.target.value)
  }

  // 
 


  return(
  <>
    <div className='wrapperLeft'>
       
        <div className='language'>
          <h1>
            {language?.codeL?.toUpperCase()}
            <span style={{backgroundColor:logoColor}}>
            {
              language?.codeL == "javascript" ? "Js" : language?.codeL == "cpp" ? "Cpp" : "Py"
            }
          </span> 
          </h1>
        </div>

         <div className='chooseTopic'>
          <select value={primeHeading} onChange={(e)=>setPrimeHeading(e.target.value)} id="">
            <option value={1}>Frontend</option>
            <option value={2}>Backend</option>
            <option value={3}>Database</option>
            <option value={4}>Game Dev</option>
          </select>
        </div>


        <div className='topic'>
          <span>Topic</span>
          <select onChange={selectTopic} value={selectedTopicId}>
            {topicList.map((el) => (
              <option key={el.id} value={el.id}>
                {el.topic_name}
              </option>
            ))}
          </select>
        </div>

        <div className='subTopic'>
          <span>Sub Topic</span>
          <select
            value={subTopic}
            onChange={(e) => setSubTopic(e.target.value)}
            disabled={!selectedTopic}
          >
            {selectedTopic?.subtopics?.map((sub) => (
              <option key={sub.id} value={sub.sub_topic}>
                {sub.sub_topic}
              </option>
            ))}
          </select>
          
        </div>

        <div className='status'>
          <span>Custom Topic(optional)</span>
          <div className='status-options'>
            <input
             value={customSubTopic}
             onChange = {(e)=>setCustomSubTopic(e.target.value)} 
             type="text" placeholder="Name your topic" />
             
             <span 
              style = {customSubTopic != "" ? {background:'blue',color:'white'}:{pointerEvents:"none",userSelect:"none"}}
              
              onClick={()=>addCustomTopic(selectedTopicId,customSubTopic)}
              >Add Custom Sub Topic</span>
            </div>
        </div>

        <div className="customTags">

           {/* Tags List */}
           <div className="tagList">
            <span>TAGS : </span> 
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