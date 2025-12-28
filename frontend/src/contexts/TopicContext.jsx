// Create Topic Edit Topic Delete Topic


import { createContext,useContext } from "react";
import { useState,useEffect } from "react";
import { javascriptTopics } from "../utils/javascript-topics";

export const TopicContext = createContext();

export const TopicProvider = ({children}) => {

    let [topicList,setTopicList] = useState([]) // contains Primary Topic and Subtopic 

    useEffect(()=>{
        setTopicList(javascriptTopics)
    },[])


    const addCustomTopic = (mainTopicId,customSubTopic) => {
        if(!customSubTopic.trim()){
            return alert("custom topic cannot be emptu")
        }
        else if(customSubTopic.length < 5){
            return alert("custom topic should have appropriate length")
        }
        // mutate topic state  
        setTopicList( (prev) =>
             prev.map((topic) => 
                 topic.id == mainTopicId ? { ...topic, subTopics:[...topic.subTopics,customSubTopic] } : topic
            )
        )
    }

    const createTopic = (topic) => {
        setTopicList((prev)=>[...prev,topic])
    } 
    
    const removeTopic = (topicId) => {
        setTopicList( (prev) => 
            prev.filter( (pt) => pt.id != topicId )
        )
    }


    return(
        <>
         <TopicContext.Provider 
          value={ {topicList,addCustomTopic,removeTopic,createTopic} }
         >
          {children}
         </TopicContext.Provider>
        </>
    )

}

export const useTopic = () => {
    return useContext(TopicContext)
}