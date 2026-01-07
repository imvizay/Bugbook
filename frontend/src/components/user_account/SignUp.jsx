

import '../../assets/styles/user_account/account.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useAuth } from '../../contexts/UserContext'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

function SignUp() {

  let [signUpData,setSignUpData] = useState({
    username:'',
    email:'',
    password:'',
    confirm_password:'',
  })

  let { signUp } = useAuth()

  let handleCreateAcc = (e) => {
    let {name,value} = e.target
    setSignUpData((prev)=>({
      ...prev,[name]:value
    }))
  }

  let handleRegister=(e)=>{
    e.preventDefault()
    let isValidData = signUp(signUpData)

    if(isValidData){
      axios.post(`${API_URL}/api/signup/`,signUpData)
      .then((res)=>console.log(res.data))
      .catch((error)=>console.log(error.data.response))
    }
    else{
      return alert("credentials validation failed.")
    }
  }


  return (
    <div className="authWrapper">
      <div className="authCard">
        <h2 className="authTitle">Create Account</h2>
        <p className="authSubtitle">Join and start learning</p>

        <form onSubmit={handleRegister} className="authForm">
          <div className="field">
            <label>Username</label>
            <input type="text" placeholder="vizay"
              name="username"
              value={signUpData.username}
              onChange={handleCreateAcc}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com"
              name="email"
              value={signUpData.email}
              onChange={handleCreateAcc}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••"
              name="password"
              value={signUpData.password}
              onChange={handleCreateAcc}
            />
          </div>

           <div className="field">
            <label>Re-enter Password</label>
            <input type="password" placeholder="••••••••"
              name="confirm_password"
              value={signUpData.confirm_password}
              onChange={handleCreateAcc}
            />
          </div>

          <button type='submit' className="authBtn">Sign Up</button>

          <p className="authFooter">
            Already have an account? <Link to='/login-acc'><span>Sign in</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
