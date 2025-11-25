import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className='row bg-success p-2' style={{marginTop:'100px',marginBottom:'150px',color:'white'}}>
        <div className='col-3 ps-5'>
           <h4 className='fw-bold'>Project Fair</h4>
           <p style={{color:'white'}} className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aliquid natus doloremque quibusdam eos sed voluptates corporis, commodi nulla esse temporibus voluptatum libero accusantium eligendi, id molestiae eum est possimus!</p>
           <p style={{color:'white'}}>Lincensed by Luminar Technolab</p>
        </div>
        <div className='col-3' style={{paddingLeft:'200px'}}>
            {/* <h5 className='fw-bold' style={{paddingLeft:'32px'}}>Links</h5> */}
            
            <ul style={{listStyleType:'none',lineHeight:'2rem'}}>
             <li className='fw-bold text-white fs-5'>Links</li>
             <li className='mt-3'><Link to={'/'} style={{textDecoration:'none',color:'white'}} >Home</Link></li>
             <li> <Link to={'/dashboard'} style={{textDecoration:'none',color:'white'}}>Dashboard</Link></li>
             <li><Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Login</Link></li>
             <li><Link to={'/register'} style={{textDecoration:'none',color:'white'}}>Register</Link></li>
              <li><Link to={'/projects'} style={{textDecoration:'none',color:'white'}}>Projects</Link></li>
            </ul>
        </div>
        <div className='col-3'>
            {/* <h5 className='fw-bold'>Guides</h5> */}
            <ul style={{listStyleType:'none',lineHeight:'2rem'}}>
              <li className='fw-bold text-white fs-5'>Guides</li>
              <li className='text-white mt-3'>React</li>
              <li className='text-white'>React Bootstrap</li>
              <li className='text-white'>Router</li>
            </ul>
            {/* <h6>React</h6>
            <h6>React Bootstrap</h6>
            <h6>Router</h6> */}
        </div>
        <div className='col-3'>
           <h5 className='fw-bold mb-3'>Contact us</h5>
           <input type="text" className='border rounded-3 w-50'style={{height:'40px'}}/>&nbsp; &nbsp;<button className='btn btn-warning'><i className="fa-solid fa-arrow-right fa-xl" style={{color:'black'}}></i></button>
           <div className='mt-4'>
           <i class="fa-brands fa-github fa-xl" style={{color:'white'}}></i>&nbsp;&nbsp;&nbsp;
           <i class="fa-brands fa-square-instagram fa-xl" style={{color:'white'}}></i>&nbsp;&nbsp;&nbsp;
           <i class="fa-brands fa-twitter fa-xl" style={{color:'white'}}></i>&nbsp;&nbsp;&nbsp;
           <i class="fa-brands fa-facebook-f fa-xl" style={{color:'white'}}></i>&nbsp;&nbsp;&nbsp;
           <i class="fa-brands fa-linkedin-in fa-xl" style={{color:'white'}}></i>
           </div>
        </div>
    </div>
  )
}

export default Footer