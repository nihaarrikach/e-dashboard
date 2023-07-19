import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  
useEffect(()=>{
    const auth=localStorage.getItem("users");
    if(auth){
      navigate('/')
    }
})

  const handleLogin = async () => {
    let result = await fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if(result.auth){
        localStorage.setItem("users",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/')
    }
    else{
        alert("pls eneter correct details")
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter Email"
        className="name"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter Password"
        className="name"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={handleLogin} className="btn">
        Login
      </button>
    </div>
  );
};
export default Login;
