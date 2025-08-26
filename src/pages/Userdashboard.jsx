import React, { useContext } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUserProjectsAPI } from '../services/allApi'
import { LoginResponseContext } from '../context/Context'



function Userdashboard() {
  const[username,setusername]=useState('')
  //for storing the user added projects coming from server 
  
  
  useEffect(() => {
    if(sessionStorage.getItem('user')){
         setusername(JSON.parse(sessionStorage.getItem('user')).username)
    }
    else{
         setusername('')
    }
  }, [])

 
  

  
  
  return (
    <>
    <Header/>
    <div className='row'>
      <div className='col-8'>
        <h4>Welcome <span className='text-success fs-3 fw-bold'>{username}</span> </h4>
        <View/>
      </div>
      <div className='col-4'>
        <Profile/>
      </div>

    </div>
    </>
    
  )
}

export default Userdashboard
