import './App.css'

import BaseLayout from './layouts/BaseLayout'
import { Routes,Route } from 'react-router-dom'
import WriteNote from './components/notes/NoteForm'
import OnBoarding from './pages/home/Home'
import MyDashboard  from './pages/userdashboard/MyDashboard'
import SignIn from './components/user_account/SignIn'
import SignUp from './components/user_account/SignUp'
function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<BaseLayout/>}>

        <Route index element={<OnBoarding/>}/>
        <Route path="notes" element={<WriteNote/>}/>
        <Route path="my-dashboard" element={<MyDashboard/>}/>

        <Route path='login-acc' element={<SignIn/>}/>
        <Route path='singup-acc' element={<SignUp/>}/>

        

      </Route>
    </Routes>
   </>
  )
}

export default App