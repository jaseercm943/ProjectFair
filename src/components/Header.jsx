import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { LoginResponseContext } from '../context/Context';


function Header({insideAuth}) {
  const navigate=useNavigate()
  //Destryctured the state function created in Context Component 
  const{setisLoginResponse}=useContext(LoginResponseContext)
  //logic for logout
  const handleLogout=()=>{
    //isLoginResponse turns true , and that means Logged Out Successfully
      setisLoginResponse(false)
      sessionStorage.clear() //clearing all information in the sessionStorage
      navigate('/login')     //Navigating to Login page

  }
  return (
   <>
   <Navbar className="bg-warning">
      <Container fluid>
        <Navbar.Brand className='fs-4 fw-bolder ' >Project Fair</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            { insideAuth ?
             <button className='btn btn-success fw-bold'  ><Link to={'/'} className='text-decoration-none'>Homepage</Link></button>
             :
            <button className='btn btn-success fw-bold me-5' onClick={handleLogout} ><Link className='text-decoration-none text-white fs-5'>Logout</Link></button>
             
            }
            
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
   </>
  )
}

export default Header