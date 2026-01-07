import React from "react"
import '../../assets/styles/user_account/account.css'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../contexts/UserContext"
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

function SignIn() {

    let [logInData,setLogInData] = useState({
      username:"" ,
      password:'****' 
    })
    let { login } = useAuth()
    let navigate = useNavigate()

    let handleInChange = (e)=> {
      let {name,value} = e.target

      setLogInData((prev)=>({
        ...prev,[name]:value// remove unecessary leading and trailing spaces value
      }))
    }

    const handleFormSubmmission = (e) => {
      e.preventDefault();

      const isValid = login(logInData)
      if (!isValid) return

      axios.post("/api/login/", logInData, { withCredentials: true })
        .then(res => {
          setUser(res.data.user) 
          navigate("/")
        })
        .catch((error)=>console.log(error?.response?.data))
    }


  return (
    <div className="authWrapper">
      <div className="authCard">
        <h2 className="authTitle">Welcome Back</h2>
        <p className="authSubtitle">Sign in to continue</p>

        <form onSubmit={handleFormSubmmission} className="authForm">
          <div className="field">
            <label>Email</label>
            <input 
             
              name="username" value={logInData.username} 
              onChange={handleInChange}
              type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input 
             
              name="password" value={logInData.password} 
              onChange={handleInChange}
              type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="authBtn">Sign In</button>

          <p className="authFooter">
            Dont have an account? <Link to="/singup-acc"><span>Create one</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
