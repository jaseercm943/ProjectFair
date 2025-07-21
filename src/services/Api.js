import axios from "axios";


const generalApi=async(httpMethod,Url,reqbody,reqheader)=>{
    const configuration={
        method:httpMethod,
        url:Url,
        data:reqbody,
        headers:reqheader?reqheader:{"Connection-Type":"application/json"}
       //if requestheader have other datatypes except json set reqheader=>thats been passed
       //else set requestheader as {"Connection-Type":"application/json"}
    }
    return await axios(configuration).then(res=>{
        console.log(res);
        return res
        
    }).catch(rej=>{
        return rej
    })
}
export default generalApi