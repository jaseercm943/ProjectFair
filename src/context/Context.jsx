import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


//creating context using createContext()

//context for added response from Add.jsx to View.jsx
export const addResponseContext=createContext()

//context for editted response from Edit.jsx to View.jsx
export const editResponseContext=createContext()
//createContext()=>returns an object

export const LoginResponseContext=createContext()
//Context Component
//inbuilt prop children =>passed to Context Component
function Context({children}) {
// Creating state for holding the added response from add component to view component
// So pass state to View component and pass state update function to Add component

    const [addProjectResponse,setaddProjectResponse]=useState({})
    const [editProjectResponse,seteditProjectResponse]=useState({})
    const [isLoginResponse,setisLoginResponse]=useState(false)

    //double checking 
    useEffect(() => {
      if(sessionStorage.getItem('token')){
          setisLoginResponse(true)
      }
      else{
        setisLoginResponse(false)
      }
    }, [isLoginResponse])
    
  return (
    <div>
      {/* Access the Provider component from the created context=> addResponseContext*/}
   <LoginResponseContext.Provider value={{isLoginResponse,setisLoginResponse}}>

    <editResponseContext.Provider value={{editProjectResponse,seteditProjectResponse}}>
         <addResponseContext.Provider value={{addProjectResponse,setaddProjectResponse}} >
          {/* Placing All Components inside */}
          {/* Thus any component can access the state and update function */}
           {children}
       </addResponseContext.Provider>
     </editResponseContext.Provider>

   </LoginResponseContext.Provider>
    
      
    </div>
  )
}

export default Context