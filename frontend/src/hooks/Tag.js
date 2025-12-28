import { useState } from "react"

export function useTags(initialTags = []) {
  const [tagList, setTagList] = useState(initialTags)

  // Add Tag
  const addTag = (tag) => {
    if (!tag.trim()) {
      alert("Empty tag")
      return
    }

    if(tagList.length > 3) {
      return alert("4 tags at max can be linked to a topic")
    }

    setTagList(prev => {
      if (prev.includes(tag)) return prev // prevent duplicate tag
      return [...prev, tag]
    })
  }

  // Remove Tag
  const removeTag = (targetTag) => {
    setTagList(prev =>
      prev.filter(tag => tag !== targetTag)
    )
  }

  return {
    tagList,
    addTag,
    removeTag,
  }
}
