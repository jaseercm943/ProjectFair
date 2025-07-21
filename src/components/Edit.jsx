import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import SERVERURL from '../services/serverurl';
import { editProjectAPI } from '../services/allApi';
import { editResponseContext } from '../context/Context';
import { toast } from 'react-toastify';


function Edit({projects}) {

  console.log(projects);
  const {seteditProjectResponse}=useContext(editResponseContext)
  const[projectDetails,setprojectDetails]=useState({id:projects?._id,image:'', title:projects?.title, lang:projects?.lang, github:projects?.github, weblink:projects?.weblink, overview:projects?.overview})
  console.log(projectDetails);
   
const [show, setShow] = useState(false);
    //for storing the image choosed by the user while adding project details
    const [preview,setpreview]=useState("")
    //for storing image status whether its included in specific image types
    const[isinvalidImageStatus,setisinvalidImageStatus]=useState(true)


    //image and image status shown whenever user selecting image changes
     useEffect(() => {
          console.log(projectDetails.image);
          
           //Checking image type whenever image choosen by the user
           if(projectDetails.image.type =='image/png' || projectDetails.image.type =='image/jpg' || projectDetails.image.type =='image/jpeg'){
           setisinvalidImageStatus(false)//not showing the warning description
           
           //image from system stored to state
           //anytime which image selected that image is displayed
           setpreview(URL.createObjectURL(projectDetails.image))
         }else{
           setpreview('')
           setisinvalidImageStatus(true)
           setprojectDetails({...projectDetails,image:''})
         }
         
         //each time project image changes image being shown and the status also
       }, [projectDetails.image])


//when modal is closed
   const handleClose = () =>{ 
     setShow(false);
     //whenever modal is closed the user updated detailes do not change
     setprojectDetails({id:projects?._id,image:'', title:projects?.title, lang:projects?.lang, github:projects?.github, weblink:projects?.weblink, overview:projects?.overview})
    } 
//when modal is opened
   const handleShow = () => {
    setShow(true);
    //to show the latest updated values in the modal when edit component loads
    setprojectDetails({id:projects?._id,image:'', title:projects?.title, lang:projects?.lang, github:projects?.github, weblink:projects?.weblink, overview:projects?.overview})
   }

   //Updation of current project of the user logged in
   const handleUpdate=async()=>{
           const {id,image,title,lang,github,weblink,overview}=projectDetails
   
           const reqBody=new FormData() // FormData() is a class used to set request body if multimedia files included
           
           
           //the key names set inside append() is destructured in server while adding...
           reqBody.append('title',title)
           reqBody.append('lang',lang)
           reqBody.append('github',github)
           reqBody.append('weblink',weblink)
           reqBody.append('overview',overview)
          
           //When page loads ->>projectDetails.image have no Data
           //When projectDetails.image have data preview have its copy and that passed to request
           preview?reqBody.append('picture',image):reqBody.append('picture',projects?.picture)
           
           if(title&&lang&&github&&weblink&&overview){
            //accessing token from sessionStorage
               const token=sessionStorage.getItem('token')
               //checking if user is authorised or not
               if(token){
                 // in requst header contains => {content Type & token }
                 //Setting request header
                 const reqheader={ //if multimedia files included => Content-Type : multipart/form-data
                   'Content-Type':preview?'multipart/form-data':'application/json',
                   'Authorization':`Bearer ${token}` 
                 }

                 try {
                  //passing the edited project details of the user to server 
                  const result=await editProjectAPI(id,reqBody,reqheader)
                  console.log(result);
                  //checking the response passed from server
                  if(result.status==200){
                    //storing the edited project to reflect in view Component
                    seteditProjectResponse(result.data)
                    handleClose()
                  }
                  } catch (error) {
                    console.log(error);
                  }
                
                }
           }
           else{
               toast.error('Enter complete Details')
           }
     }
  return (
    <div>
      <button className='btn fw-bolder border border' onClick={handleShow}>Edit</button>

       <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='bg-secondary'>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-6'>
              <label>
                 <input type="file" style={{display:'none'}} onChange={(e)=>setprojectDetails({...projectDetails,image:e.target.files[0]})} />
                 {/* we need to access "image file" from server not just "image name" */}
                 <img src={preview?preview:`${SERVERURL}/uploads/${projects.picture}`} width={'300px'} className='text-light' alt="" />
              </label>
              
               { isinvalidImageStatus && <p className='text-warning'>*Upload only the following file type(jpeg,jpg,png)</p> }
              
            </div>
            <div className='col-6'>
              {/* Initially need to see the values user enterd when project details added  */}
              <input onChange={(e)=>setprojectDetails({...projectDetails,title:e.target.value})} value={projectDetails.title} type="text" className='form-control mb-3' placeholder='Project Title'/>
              <input onChange={(e)=>setprojectDetails({...projectDetails,lang:e.target.value})} value={projectDetails.lang} type="text" className='form-control mb-3' placeholder='Languages Used'/>
              <input onChange={(e)=>setprojectDetails({...projectDetails,github:e.target.value})} value={projectDetails.github} type="text" className='form-control mb-3' placeholder='Project Github Link'/>
              <input onChange={(e)=>setprojectDetails({...projectDetails,weblink:e.target.value})} value={projectDetails.weblink} type="text" className='form-control mb-3' placeholder='Project Website link'/>
            </div>

          </div>
          <div>
             {/* Initially need to see the values user enterd when project details added  */}
             <input onChange={(e)=>setprojectDetails({...projectDetails,overview:e.target.value})} value={projectDetails.overview} type="text" className='form-control mb-3' placeholder='Project Overview'/>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default Edit