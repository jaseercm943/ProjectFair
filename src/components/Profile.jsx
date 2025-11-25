import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import SERVERURL from '../services/serverurl';
import { loginAPI, updateProfileAPI } from '../services/allApi';
import { toast } from 'react-toastify';


function Profile() {
  //for storing user giving details
     const [userDetails,setuserDetails]=useState({username:'',email:'',password:'',githublink:'',linkedinlink:'',profile:''})
     

     // to store user selecting profile picture 
     const [preview,setpreview]=useState('')
     
     // to store profile image already exist if user added early
     const [existingImage,setexistingImage]=useState('')
     
     
     //to display modal for profile view
     const [open, setOpen] = useState(false);
     
     //the default profile pic
    const profileImage='https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg'

     useEffect(() => {
       if(sessionStorage.getItem('user')){
          const existingUser=JSON.parse(sessionStorage.getItem('user'))
          setuserDetails({username:existingUser?.username, email:existingUser?.email, password:existingUser?.password, githublink:existingUser?.githublink, 
          linkedinlink:existingUser?.linkedinlink, profile:''
          })
          setexistingImage(existingUser?.profile)
       }
  //every time modal of "profile updation state(open) changes" "useEffect" works
      }, [open])

     useEffect(() => {
         if(userDetails.profile){
         //creating url for user choosing image
           setpreview(URL.createObjectURL(userDetails.profile))
          }
          //Whenever User Choosing Profile Picture that Picture is Shown In Profile
     }, [userDetails.profile])

     
     //Updation of Profile
     const handleUpdate=async()=>{

      const {username,email,password,githublink,linkedinlink,profile}=userDetails
      
          if(userDetails.githublink && userDetails.linkedinlink){
              const reqBody=new FormData()
              reqBody.append('username',username)
              reqBody.append('email',email)
              reqBody.append('password',password)
              reqBody.append('githublink',githublink)
              reqBody.append('linkedinlink',linkedinlink)
            //if user choosing any edit in image
              preview?reqBody.append('profile',profile):reqBody.append('profile',existingImage)

      const token=sessionStorage.getItem('token')
        if(token){
              const reqheader={
                'Content-Type':preview?'multipart/form-data':'application/json',
                'Authorization':`Bearer ${token}` 
              }
      
        const result=await updateProfileAPI(reqBody,reqheader)
        console.log(result);
        if(result.status==200){
          setOpen(!open)
          
          //adding to session storage with newly updated data
          sessionStorage.setItem('user',JSON.stringify(result.data))
        }
        }
       }
      else{
          toast.error('Enter All Details')
      }
     }
     
     
  return (
    <>
    <div className='d-flex justify-content-between '>
        <h1 className='text-success fw-bold'>Profile</h1>
        <button className='btn btn-light' onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}><i class="fa-solid fa-angle-down fa-xl"></i></button>
    </div>

      <Collapse in={open}>
        <div id="example-collapse-text" className='border p-3 me-3 rounded'>
          <div className='mb-5' style={{marginLeft:'170px'}}>
            <label>
              {/* accessing user giving image file */}
               <input type="file" style={{display:'none'}} onChange={(e)=>setuserDetails({...userDetails,profile:e.target.files[0]})}/>
               {
                // checking if image is already added else display default image
                // IN BOTH CASES IF USER CHOOSING AN IMAGE IT SHOULD BE DISPLAYED
                existingImage?
                  <img src={preview?preview:`${SERVERURL}/uploads/${existingImage}`} width={'200px'} alt="" />
                  :
                  <img src={preview?preview:profileImage} width={'150px'} alt="" />
               }
               
            </label>
            
          </div>
          <div className='' style={{margin:'0px 100px 0px 100px'}}>
              <input value={userDetails.githublink} onChange={(e)=>setuserDetails({...userDetails,githublink:e.target.value})} type="text" placeholder='Github link' className='form-control mb-4 '/>
          </div>
         <div style={{margin:'0px 100px 0px 100px'}}>
              <input value={userDetails.linkedinlink} onChange={(e)=>setuserDetails({...userDetails,linkedinlink:e.target.value})} type="text" placeholder='LinkedIn link' className='form-control'/>
         </div>

         <button className='btn btn-success fs-5 mt-4 ps-4 pe-4 fw-bold' style={{marginLeft:'210px'}} onClick={handleUpdate}>Update</button>
        </div>
       
      </Collapse>
    </>
    
  )
}

export default Profile