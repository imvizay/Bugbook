import '../../assets/styles/home/onboarding.css'
import bookBg from '../../assets/images/photos/code.jpg'
import { Link } from 'react-router-dom'
function OnBoarding() {
  return (
    <>
    <div className='homeWrapper'>
        <img src={bookBg} alt="" />

        <div className='describeApp'>
            <h1>Turn confusion into clarity.</h1>
            <p> Stop losing notes across folders and apps.
                Recoord helps you organize what you learn, what you misunderstood,
                and what truly matters — all in one place.
            </p>
            <div>
                <Link className='button' to = "notes">Get Started</Link>
            </div>
        </div>
        
    </div>
    
    </>
  )
}

export default OnBoarding