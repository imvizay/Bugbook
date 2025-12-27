import '../assets/styles/sidebar/sidebar.css'
import { motion } from 'framer-motion'

import cpp from '../assets/images/logos/cpp.png'
import js from '../assets/images/logos/js.png'
import python from '../assets/images/logos/python.png'
import { useState } from 'react'

const logos = [
  { id: 1, src: cpp, alt: 'C++' },
  { id: 2, src: js, alt: 'JavaScript' },
  { id: 3, src: python, alt: 'Python' },
]

export function SidebarSelection() {
  const [active, setActive] = useState(1)

  return (
    <div className="sidebarSelection">
      {logos.map(item => (
        <motion.span
          key={item.id}
          className={`sidebarIcon ${active === item.id ? 'active' : ''}`}
          onClick={() => setActive(item.id)}

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
