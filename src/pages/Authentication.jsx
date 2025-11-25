import React, { useContext, useState } from 'react'
import { FloatingLabel } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../components/Header';
import { LoginResponseContext } from '../context/Context';


function Authentication({insideRegister}) {
  
  const [userData,setuserData]=useState({username:'',email:'',password:''})
  const [isLogin,setisLogin]=useState(false)
  console.log(userData);
  const navigate=useNavigate()
  const{setisLoginResponse}=useContext(LoginResponseContext)

  const handleRegister=async(e)=>{
    e.preventDefault()//to prevent page loading when "form" is submitted
    const {username,email,password}=userData
    if(username&&email&&password){
      try{
       const result= await registerAPI(userData)
        console.log(result);

        if(result.status==200){
          toast.success(`welcome${result.data.username}....Login to Explore more`)
          setuserData({username:'',email:'',password:''})
          navigate('/login')
        }
        else if(result.status==406){
          toast.error(`${result.response.data}`)
        }
   
        
    }catch(err){
      console.log(err);
    }
    }
   else{
      // alert('enter complete details')
         toast.error('Enter Complete Details')
    }
        

  }

  const handleLogin=async(e)=>{
     e.preventDefault()
     if(userData.email&&userData.password){
          try {
          //Server Passed Response
           const result= await loginAPI(userData)
           console.log(result);
           if(result.status==200){
            //Whenver Login success isLoginResponse turns true(Can Access UserDashboard)
            setisLoginResponse(true)
            //For Showing Spinner
            setisLogin(true)
            //Delaying for 2 Seconds server passed responses{token && userDetails}(LINE NUMBER=55) set to sessionStorage
            setTimeout(() => {
               sessionStorage.setItem('user',JSON.stringify(result.data.user))
               sessionStorage.setItem('token',(result.data.token))
               setuserData({username:'',email:'',password:''})
               navigate('/')
            }, 2000); //2 seconds delaying
           
           }
           if(result.status==404){
            toast.error(result.response.data)
           }

          } catch (error) {
            console.log(err);
            
          }
     }
     else{
      toast.error('Enter complete details')
     }
  }
  return (
    <>
    <Header insideAuth={true}/>
    <div style={{marginLeft:'80px',borderColor:'red',borderWidth:'5px',marginTop:'100px'}}>
        
        <div className='d-flex justify-content-evenly '>

        <img src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" alt="" />
        <div>
          <h3>Project Fair</h3>
        <h4>{insideRegister?'SignUp':'Login'}to your Account</h4>{
          insideRegister&&
                <FloatingLabel controlId="floatingPassword" label="Username" >
                <Form.Control value={userData.username} onChange={(e)=>setuserData({...userData,username:e.target.value})} type="text" placeholder="username" className="mb-3"/>
                </FloatingLabel>
        }
           
            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
           >
            <Form.Control value={userData.email} onChange={(e)=>setuserData({...userData,email:e.target.value})}  type="email" placeholder="name@example.com" />
           </FloatingLabel>
           <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control value={userData.password} onChange={(e)=>setuserData({...userData,password:e.target.value})}  type="password" placeholder="Password" />
           </FloatingLabel>

           {insideRegister
           ?
           <button className='btn btn-primary mt-3' onClick={(e)=>handleRegister(e)}>SignUp</button>
           :
           <button className='btn btn-primary mt-3' onClick={(e)=>handleLogin(e)}>Login 
           {isLogin&&
            <Spinner animation="border" role="status">
              <span className="visually-hidden ms-2">Loading...</span>
             </Spinner>
           }</button>
            

           }
           {insideRegister
           ?
            <p>Already have an account?<Link to={'/login'} className='text-warning'>Login</Link></p>
           :
            <p>Dont you have an account yet?<Link to={'/register'} className='text-warning'>Sign Up</Link></p>
           }
           
           
        </div>

       </div>
        
    </div>
    <ToastContainer position="top-right" theme="colored" />
    </>
    
  )
}

export default Authentication