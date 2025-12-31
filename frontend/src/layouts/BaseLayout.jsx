import '../assets/styles/layout/base_layout.css'
import { Outlet } from "react-router-dom"
import { Moon, User,Bug } from 'lucide-react'

import gsap from "gsap"
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// import { SidebarSelection } from '../layouts/Sidebar'

export default function BaseLayout() {
  let navigate = useNavigate()
  let bugRef = useRef(null)
  let kRef = useRef(null)

 useEffect(() => {
  const bug = bugRef.current
  const k = kRef.current
  if (!bug || !k) return

  const bugBox = bug.getBoundingClientRect()
  const kBox = k.getBoundingClientRect()

  const walkX = (kBox.left + kBox.width / 2) - bugBox.left

  const climbY = (kBox.top - bugBox.top) - 10

  const tl = gsap.timeline({
    repeat: 1,
    repeatDelay: 120,
    defaults: { ease: "power2.inOut" }
  })

  tl
    /* -------------------------
       PHASE 1: FACE RIGHT
    ------------------------- */
    .set(bug, {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transformOrigin: "50% 50%"
    })
    .to(bug, {
      rotate: 90,
      duration: 2
    })

    /* -------------------------
       PHASE 2: WALK TO "k"
    ------------------------- */
    .to(bug, {
      x: walkX,
      duration: 2.5
    })

    /* -------------------------
       PHASE 3: FACE UP
    ------------------------- */
    .to(bug, {
      rotate: 0,
      duration: 0.4
    })

    /* -------------------------
       PHASE 4: CLIMB UP
    ------------------------- */
    .to(bug, {
      y: climbY,
      scale: 0.9,
      duration: 1.2,
      ease: "power1.out"
    })

}, [])


  return (
    <div className="layoutRoot">

      {/* ---------- APP AREA ---------- */}
      <div className="appArea">

        {/* HEADER */}
        <header id="header">
          <div className="logoTitle">
            <span ref={bugRef} className="logoDot"> <Bug/> </span>
            <h2 onClick={()=>navigate("/")}>Bugboo<span ref={kRef}>k</span></h2>
          </div>

          <nav className="topActions">
            <button className="ghostBtn"><Moon size={18} /></button>
            <button className="ghostBtn"><User size={18} /></button>
          </nav>
        </header>

        {/* MAIN */}
        <main id="main">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer id="footer">
          <span>Saved locally</span>
          <span>•</span>
          <span>Offline</span>
        </footer>

      </div>
    </div>
  )
}
