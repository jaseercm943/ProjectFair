import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import SERVERURL from '../services/serverurl';

//displayData contains All Project Details
function ProjectCard({displayData}) {
     
      
      
      const [show, setShow] = useState(false);
        
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  
  
  return (
   <>
    <Card style={{ width: '20rem' }}>

      {/* Accessing Image File as => ${SERVERURL}/uploads/${displayData.picture} */}
      {/* because the image file accessing from server ->> if accessing permision granted by server */}
      <Card.Img onClick={handleShow} variant="top" src={`${SERVERURL}/uploads/${displayData.picture}`} height={'300px'}/>
      <Card.Body>
        <Card.Title className='text-success fw-bolder'>{displayData?.title}</Card.Title>
        <Card.Text>
         
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    

     

      <Modal size='lg' show={show} onHide={handleClose} className='bg-dark'>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder text-decoration-underline'>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
               <div className='col-lg-6'>
                   <img src={`${SERVERURL}/uploads/${displayData.picture}`}  className='img-fluid' alt="" />
               </div>

               <div className='col-lg-6'>
                   <h5 className='fw-bolder'>Project Name : <span className='fw-normal'>{displayData?.title}</span></h5>
                   <h5 className='fw-bolder'>Languages Used: <span className='fw-normal'>{displayData?.lang}</span></h5>
                   <h5 className='fw-bolder'>Projects Overview: <span className='fw-normal'>{displayData?.overview} </span></h5>
               </div>
            </div>
            <div className='mt-3 '>
              <i class="fa-brands fa-github fa-xl me-2"></i>
              <i class="fa-brands fa-linkedin-in fa-xl"></i>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    
   </>
  )
}

export default ProjectCard
