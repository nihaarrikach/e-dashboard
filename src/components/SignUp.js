import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom'
const SignUp =()=>{
    
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
const navigate=useNavigate();


useEffect(()=>{
    const auth=localStorage.getItem("users");
    if(auth){
      navigate('/')
    }
})



 const collectData=async ()=>{
   let result=await fetch('http://localhost:8000/register',{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers:{
            'Content-Type':'application/json'
         }

   })
   result=await result.json()
   console.log(result);
   localStorage.setItem("users",JSON.stringify(result.result))
   localStorage.setItem("token",JSON.stringify(result.auth))
   if(result){
   navigate('/')
   }

  
  
 }    
return (
    <div className="register">
        <h1>Register</h1>
        <input type="text" name="" value={name} placeholder="Enter Username" id="name" onChange={(e)=>{setName(e.target.value)}} />
        <input type="email" name="" placeholder="Enter Email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type="password" name="" placeholder="Enter Password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        <button type="button" onClick={collectData} className="btn">Sign Up</button>
    </div>
)
}

export default SignUp