import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { Button, Card } from "react-bootstrap";
import Userdashboard from "./Userdashboard";
import { getHomeProjectsAPI } from "../services/allApi";
import { useEffect } from "react";
import { toast } from "react-toastify";


function Home() {
    const[homeProjects,sethomeProjects]=useState([])
    console.log(homeProjects);
    const navigate=useNavigate()
    useEffect(() => {
      getHomeProjects()
    }, [])
    

    const getHomeProjects=async()=>{
        try {
            const HomeProjects=await getHomeProjectsAPI()
            console.log(HomeProjects);
            if(HomeProjects.status==200){
                console.log(HomeProjects.data);
                
               sethomeProjects(HomeProjects.data)
            }
           
        } catch (error) {
            console.log(error);
            
        }
        
        
    }

    const handleProject=()=>{
        if(sessionStorage.getItem('token')){
             navigate('/projects')
            
        }
        else{
             toast.error('please login to access')
        }
    }

    return (
        <>
            <div className="row p-5 " style={{ marginTop: "50px" }}>
                <div className="col-lg-6 ">
                    <h1 className="text-primary fw-bolder">Project Fair</h1>
                    <p style={{ fontStyle: "italic" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nemo earum sequi perferendis{" "}
                        <br /> ducimus quibusdam tenetur enim id velit necessitatibus eos, nobis reiciendis aliquam{" "}
                        <br /> dolorem odit debitis beatae. Consectetur, officia?
                    </p>
                    <button className="btn">
                        
                       {sessionStorage.getItem('token')?
                       <Link to={"/dashboard"} className="btn bg-black text-decoration-none p-2 text-warning fw-bold">Access to Dashboard</Link> 
                       : 
                       <Link to={"/login"} className="btn bg-black text-decoration-none p-2 text-warning fw-bold">START TO EXPLORE MORE</Link>
                       } 

                    </button>
                </div>
                <div className="col-lg-6 p-5">
                    <img
                        src="https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFyayUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
                        width={"500px"}
                        alt=""
                    />
                </div>
            </div>

            {/* To Redirect to Projects Page */}
            <div className="">
                <Link style={{ paddingLeft: "600px" }} className="fs-4 text-success">Explore Our Projects</Link>
                <marquee behavior="" direction="">
                    {/* 3 project cards display to home  */}
                    { homeProjects?.length>0?
                          <div className="d-flex ">
                            {
                                homeProjects?.map(project=>(
                                    <div className="me-2">
                                        <ProjectCard displayData={project}/>
                                    </div>
                                ) )
                            }
                         </div>
                            
                          
                      :
                      
                      <div className="text-danger">
                        no data
                      </div>
                         
                    }
                   
                </marquee>

               <div className="d-flex justify-content-center mt-3">
                   <button onClick={handleProject} className="btn btn-success fw-bold fs-5">Click to view more Projects</button>
               </div>
                    
                
            </div>
            <div className="mt-5">
            <h1 style={{marginLeft:'700px'}} className="text-danger">Our Testimonial</h1>
            <div className="d-flex " style={{marginLeft:'200px'}}>
                
                <Card style={{ width: "18rem" ,marginLeft:'100px'}}>
                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZLPlB-2Ob-_im2b1wGO24yfKy6GvytLh_y7BY8gKKk_jBWuz2SwAntickprW5T2HzpIY&usqp=CAU"  className="img-fluid"/>
                    <Card.Body>
                        <Card.Title>Max Miller</Card.Title>
                         <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl"style={{color:' #FFD43B'}}></i>
                        <Card.Text>
                           
                        </Card.Text>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non totam eligendi est, explicabo aperiam ducimus dicta adipisci assumenda  error.</p>
                    </Card.Body>
                </Card>

                 <Card style={{ width: "18rem",marginLeft:'100px' }}>
                    <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/6997/6997674.png" className="img-fluid" />
                    <Card.Body>
                        <Card.Title>Nita Mary</Card.Title>
                         <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl"style={{color:' #FFD43B'}}></i>
                        <Card.Text>
                            
                        </Card.Text>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. magni error! Ipsum voluptates dolores possimus soluta iusto ex maiores? Itaque, error.</p>
                    </Card.Body>
                </Card>

                 <Card style={{ width: "18rem",marginLeft:'100px' }}>
                    <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/700/700674.png" height={'250px'} className="img-fluid"/>
                    <Card.Body>
                        <Card.Title>David John</Card.Title>
                         <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl" style={{color:' #FFD43B'}}></i>
                            <i class="fa-solid fa-star fa-xl"style={{color:' #FFD43B'}}></i>
                        <Card.Text>
                            
                        </Card.Text>
                       
                       <p>Lorem ipsum dolor sit,aperiam ducimus dicta adipisci assumenda magni error! Ipsum voluptates dolores possimus soluta iusto ex maiores? Itaque, error.</p>
                    </Card.Body>
                </Card>
            </div>
           
            </div>
        </>
    );
}

export default Home;
