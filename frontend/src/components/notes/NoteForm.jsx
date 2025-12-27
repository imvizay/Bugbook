import React from 'react'
import { SidebarSelection } from '../../layouts/Sidebar'
import { User } from 'lucide-react'
import '../../assets/styles/forms/write_notes.css'




export default function WriteNote() {
  return (
    <>
    <section id="addNote">
      <aside className='sidebar'>
        <SidebarSelection/>
      </aside>

      {/* context */}
      <div className='context'>

        {/* top */}
          <div className='topContext'>
              
          </div>

          {/* center */}
          <div className='centerContext'>

            <div className='centerLeft'>

            </div>

            <div className='centerright'>

            </div>

          </div>
            
      </div>
    </section>
        
    </>
)
}