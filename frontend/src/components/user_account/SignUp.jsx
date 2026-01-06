import React from "react"
import '../../assets/styles/user_account/account.css'

import '../../assets/styles/user_account/account.css'
import { Link } from "react-router-dom"

function SignUp() {
  return (
    <div className="authWrapper">
      <div className="authCard">
        <h2 className="authTitle">Create Account</h2>
        <p className="authSubtitle">Join and start learning</p>

        <form className="authForm">
          <div className="field">
            <label>Username</label>
            <input type="text" placeholder="vizay" />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="authBtn">Sign Up</button>

          <p className="authFooter">
            Already have an account? <Link to='/login-acc'><span>Sign in</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
