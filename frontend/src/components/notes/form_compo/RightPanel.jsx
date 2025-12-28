import React from 'react';
import '../../../assets/styles/forms/center_right.css'

import { CodeXml , BookOpen , Brain , Bug} from 'lucide-react'
import CodeEditor from '../../editor/Editor';

function CenterRight() {
  return (
    <div className="wrapperRight">

      {/* Explanation */}
      <div className="fieldBlock">
        <label><span className='fieldIcon'><BookOpen size={14} color='blue'/></span> Explanation <em>*</em>  </label>
        <textarea
          maxLength={300}
          placeholder="Explain the topic briefly in your own words…"
        />
        <small>Max 300 characters</small>
      </div>

       {/* Code Editor */}
      <div className="fieldBlock highlight">
        <label> <span className='fieldIcon'><CodeXml size={14} color='gray'/></span> Code <em>*</em> </label>
       
        <CodeEditor/>

      </div>

      {/* Reasoning */}
      <div className="fieldBlock">
        <label> <span className='fieldIcon'><Brain size={14} color='pink'/></span> Reasoning <span>(optional)</span>  </label>
        <textarea
          maxLength={500}
          placeholder="Why does this work? What is the underlying logic?"
        />
      </div>

      {/* Misconception */}
      <div className="fieldBlock">
        <label> <span className='fieldIcon'><Bug size={14} color='red'/></span> Misconception <span>(optional)</span>  </label>
        <textarea
          maxLength={300}
          placeholder="What did you misunderstand earlier?"
        />
      </div>


      <div className='ctaButtons'>
            <div className='ctaBox'>
                <span className='add'>Add Note</span>
                <span className='draft'>Draft</span>
                <span className='clear'>Clear</span>
            </div>
      </div>

    </div>
  );
}

export default CenterRight;
