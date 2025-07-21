import SERVERURL from "./serverurl";
import generalApi from "./Api";

//api  for register user
export const registerAPI=async(reqbody)=>{
    return await generalApi('POST',`${SERVERURL}/register`,reqbody,'')
}

//api  for Login 
export const loginAPI=async(reqbody)=>{
    return await generalApi('POST',`${SERVERURL}/login`,reqbody,'')
}

//api  for Adding Projects
export const addProjectAPI=async(reqbody,reqheader)=>{
    return await generalApi('POST',`${SERVERURL}/add_projects`,reqbody,reqheader)
}

//api  for get home-projects(No logging in needed)
export const getHomeProjectsAPI=async()=>{
    return await generalApi('GET',`${SERVERURL}/get-home-projects`,'','')
}
//api  for get All-projects(logging in needed)
export const getAllProjectsAPI=async(searchkey,reqheader)=>{
    return await generalApi('GET',`${SERVERURL}/get-all-projects?search=${searchkey}`,'',reqheader)
}
//api for getting logged in user's project
export const getUserProjectsAPI=async(reqheader)=>{
    return await generalApi('GET',`${SERVERURL}/get-user-projects`,'',reqheader)
}

//edit project api
export const editProjectAPI=async(projectId,reqbody,reqheader)=>{
    return await generalApi('PUT',`${SERVERURL}/edit-project/${projectId}`,reqbody,reqheader)
}
//delete project api
export const deleteProjectAPI=async(projectId,reqheader)=>{
    return await generalApi('DELETE',`${SERVERURL}/delete/project/${projectId}`,{},reqheader)
}
//update profile api
export const updateProfileAPI=async(reqbody,reqheader)=>{
    return await generalApi('PUT',`${SERVERURL}/edit/profile`,reqbody,reqheader)
}