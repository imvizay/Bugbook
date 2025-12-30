import { createContext, useContext, useState } from "react";

export const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
  const [topicList, setTopicList] = useState([]);

  // add custom subtopic (frontend-only)
  const addCustomTopic = (mainTopicId, customSubTopic) => {
    if (!customSubTopic.trim()) return alert("Custom topic cannot be empty");

    setTopicList((prev) =>
      prev.map((topic) =>
        topic.id == mainTopicId
          ? {
              ...topic,
              subtopics: [
                ...(topic.subtopics || []),
                {
                  id: `custom-${Date.now()}`,
                  sub_topic: customSubTopic,
                  is_custom: true
                }
              ]
            }
          : topic
      )
    );
  };

  const createTopic = (topic) => {
    setTopicList((prev) => [...prev, topic]);
  };

  const removeTopic = (topicId) => {
    setTopicList((prev) => prev.filter((t) => t.id != topicId));
  };

  return (
    <TopicContext.Provider
      value={{
        topicList,
        setTopicList,
        addCustomTopic,
        createTopic,
        removeTopic
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopic = () => useContext(TopicContext);
