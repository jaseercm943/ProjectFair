import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Userdashboard from './pages/Userdashboard'
import Home from './pages/Home'

import Footer from './components/Footer'
import './bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import Projects from './pages/Projects'
import { LoginResponseContext } from './context/Context'



function App() {
  const{isLoginResponse}=useContext(LoginResponseContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Authentication/>}/>
       {/* Want to show login page and register page difference because it uses same component */}
        <Route path='/register' element={<Authentication insideRegister={true}/>}/>
         <Route path='/dashboard' element={isLoginResponse?<Userdashboard/>:<Authentication/>}/>
           <Route path='/projects' element={isLoginResponse?<Projects/>:<Authentication/>}/>
    </Routes>

     <Footer/>
     {/* we can use in any component =>ToastContainer*/}
     <ToastContainer position='top-right' theme='colored'/>
    </>
  )
}

export default App
