import React, { useEffect } from 'react'
import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { getAllProjectsAPI } from '../services/allApi'

//To Display All Projects Added by All Users Registered
function Projects() {
 
  const[searchkey,setsearchkey]=useState('')
  const [allprojects,setallprojects]=useState([])
  console.log(allprojects);
  
    //Getting All Projects when Page Loads and Whenever Searching Happens
      useEffect(() => {
        getallProjects() //to get all projects when component loaded
      }, [searchkey])
      
    
      const getallProjects=async()=>{
        //for setting request-header we need to access token 
        const token=sessionStorage.getItem('token')
       
        //for "verification of token in server" by passing "request-header"
       if(token){
         const reqheader= {
           'Content-Type':'application/json', //request for getting only "text type contents"(image name collecting not file)
           'authorization':`Bearer ${token}`
        }
      
      
        try {
         //pass the "request-header" as argument because of "verification" needed in "server"
          const allProjects=await getAllProjectsAPI(searchkey,reqheader)
          console.log(allProjects.data);
          setallprojects(allProjects.data)
          
        } catch (error) {
          console.log(error);
          
        }
       }
      }
    
  return (
   <div>
      <Header/>
      
      <div>
          <div className='d-flex justify-content-center mt-5'>
             <input onChange={(e)=>setsearchkey(e.target.value)} type="text" className='w-25 p-2'  placeholder='Search by Language' />
          </div>
        
        <Row>
          {
          //Collected All Projects Displayed here
          allprojects?.length>0?
          allprojects?.map(projects=>(
                <Col lg={3} md={6} sm={12} className='mt-5 ps-2'>
                  {/* The Complete Projects details passed to ProjectsCard Component */}
                   <ProjectCard displayData={projects}/>
                </Col>
          ))
          :
          <div className='text-danger fs-1 text-align-center'>
              No Projects Added!!!
          </div>
           
          }
          
        </Row>
        
      </div>

    </div>
  )
}

export default Projects