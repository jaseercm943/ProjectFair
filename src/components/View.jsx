import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, getUserProjectsAPI } from '../services/allApi'
import { addResponseContext, editResponseContext } from '../context/Context'


function View() {
  //accessing the value from context API component
  const{addProjectResponse}=useContext(addResponseContext)
  const{editProjectResponse}=useContext(editResponseContext)
  //state for storing user projects
  const[userprojects,setuserprojects]=useState([])
  console.log(userprojects);

   useEffect(() => {
    getuserprojects()
    //get the user added projects when page loads and whenever a project added and also edited
  }, [addProjectResponse,editProjectResponse])


  const getuserprojects=async()=>{
     const token=sessionStorage.getItem('token')
     if(token){
       
      //reqheader is needed to pass through api to server for token verification
       const reqheader= {
        //since image name only need to access
        //Content-Type:application/json
           'Content-Type':'application/json', 
           'authorization':`Bearer ${token}`
        }
      
        try {
          const userProjects=await getUserProjectsAPI(reqheader)
          console.log(userProjects);
          if(userProjects.status==200){
            setuserprojects(userProjects.data)
           
          }

        } catch (error) {
          console.log(error);
          
        }
        
     }

  }

  const handleRemove=async(projId)=>{
      const token=sessionStorage.getItem('token')
     if(token){
       
      //reqheader is needed to pass through api to server for token verification
       const reqheader= {
        //since image name only need to access
        //Content-Type:application/json
           'Content-Type':'application/json', 
           'authorization':`Bearer ${token}`
        }

        try {
           const result= await deleteProjectAPI(projId,reqheader)
           console.log(result);

           //To reflect the deletion in view component when deleting a project
           if(result.status==200){
             getuserprojects()
           }
          
        } catch (error) {
           console.log(error);
           
        }
       
      }}
  return (
   <>
    <div className='d-flex justify-content-between mb-3 ms-4 '>
        <h4 className='text-success fw-bolder'>All Projects</h4>
        <Add/>
    </div>
    {
      userprojects?.length>0?
      userprojects?.map(pro=>(
        <div className='d-flex align-items-center justify-content-between border border-1 rounded mb-2 p-3 ms-3'>
            <h4 className='fw-bold text-warning'>{pro.title}</h4>
            <div className='d-flex align-items-center justify-content-evenly'>
              
              {/*the user added projects being passed to Edit Component  */}
              {/* <div className='me-3'><Edit projects={pro}/></div> */}
              <button className='btn'><Edit projects={pro}/></button>
              <a href={pro?.github} className='btn border me-3'><i className="fa-brands fa-github fa-lg  "></i></a>
              {/* deletion of projects */}
             <button className='btn border' onClick={()=>handleRemove(pro?._id)}> <i className="fa-solid fa-trash fa-lg "></i></button>
            </div>
      </div>
      ))
       
      :
      <div className='text-danger'>
        No Projects
      </div>
    }
   
   </>
  )

}

export default View