import { useEffect, useState } from "react"

export function useTags() {
  const [tagList, setTagList] = useState([])

 
    
  // Add Tag
  const addTag = (tag) => {
     if (!tag.trim()) return alert("Empty tag")

     setTagList(prev => {
       if (prev.includes(tag)) return prev
       if (prev.length >= 4) {
         alert("4 tags at max")
         return prev
       }
     
       const updated = [...prev, tag]
       localStorage.setItem("tags", JSON.stringify(updated))
       return updated
     })
  }   

  // Remove Tag
  const removeTag = (targetTag) => {
    setTagList(prev => {
      const updated = prev.filter(tag => tag !== targetTag)
      localStorage.setItem("tags", JSON.stringify(updated))
      return updated
    })
  }


  return {
    tagList,
    addTag,
    removeTag,
  }
}
