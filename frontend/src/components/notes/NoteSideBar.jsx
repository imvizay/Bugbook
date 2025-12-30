import '../../assets/styles/sidebar/sidebar.css'
import { motion } from 'framer-motion'

import cpp from '../../assets/images/logos/cpp.png'
import js from '../../assets/images/logos/js.png'
import python from '../../assets/images/logos/python.png'
import { useEffect, useState } from 'react'

const logos = [
  { id: 3,lang:"cpp", src: cpp, alt: 'C++' },
  { id: 1,lang:"javascript", src: js, alt: 'JavaScript' },
  { id: 2,lang:"python", src: python, alt: 'Python' },
]

export default function NoteSideBar({language,setLanguage}) {
  const [active, setActive] = useState(null)

  useEffect(()=>{
        let active  = logos.find((obj)=> obj.lang === language.codeL)
        setActive(active.id)
  },[])

  let handleLanguage = (langObj) => {
    setActive(langObj.id)  // status active
    setLanguage({
      id:langObj.id,
      codeL:langObj.lang
    }) // language
  }

  return (
    <div className="sidebarSelection">
      {logos.map(item => (
        <motion.span
          key={item.id}
          className={`sidebarIcon ${active === item.id ? 'active' : ''}`}
          onClick={() => handleLanguage(item)}

          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            backgroundColor:
              active === item.id
                ? 'rgba(99,102,241,0.12)'
                : 'rgba(0,0,0,0)',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <img src={item.src} alt={item.alt} />
        </motion.span>
      ))}
    </div>
  )
}
