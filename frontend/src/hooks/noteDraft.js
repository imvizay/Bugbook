import { useEffect, useState } from "react"

export function useDraft() {
  let [drafts, setDrafts] = useState([])

  // Load drafts once
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("noteDraft")) || []
    setDrafts(stored)
  }, [])

  // Save draft
  const addDraft = (note) => {
    let exists = drafts.some(
      d => d.topic === note.topic && d.subTopic === note.subTopic
    )

    if (exists) {
      return { success: false, message: "Draft already exists" }
    }

    let updated = [...drafts, note]
    setDrafts(updated)
    localStorage.setItem("noteDraft", JSON.stringify(updated))

    return { success: true }
  }

  // Remove all drafts
  const removeDrafts = () => {
    localStorage.removeItem("noteDraft")
    setDrafts([])
  }

  return {
    drafts,
    addDraft,
    removeDrafts
  }
}
