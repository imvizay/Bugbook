import React from "react"
import '../../assets/styles/user_account/account.css'
import { Link } from "react-router-dom"
import { useState } from "react"
function SignIn() {

    let [user,setUser] = useState()

    let handleLoginCredentials = (e)=> {
        let {name,value} = e.target
    }

  return (
    <div className="authWrapper">
      <div className="authCard">
        <h2 className="authTitle">Welcome Back</h2>
        <p className="authSubtitle">Sign in to continue</p>

        <form className="authForm">
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="authBtn">Sign In</button>

          <p className="authFooter">
            Dont have an account? <Link to="/singup-acc"><span>Create one</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
