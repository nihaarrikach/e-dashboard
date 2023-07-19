import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError]=useState(false);
  const navigate=useNavigate();
const addProduct=async()=>{

  console.warn(!name);
  if(!name || !price || !category || !company){
    setError(true);
    return false;
  }
    
    const userId=JSON.parse(localStorage.getItem('users'))._id; 
    let result=await fetch('http://localhost:8000/add-product',{
        method:"POST",
       
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
        'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
   
    
})
result=await result.json()
navigate('/')
     console.log(result);

}
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        onChange={(e) => {setName(e.target.value)}}
        value={name}
        className="name"
        placeholder="enter product name"
      />
      {error && !name && <span className="error">Enter valid name</span>}
      <input
        type="text"
        value={price}
        onChange={(e) =>{ setPrice(e.target.value)}}
        className="name"
        placeholder="enter product price"
      />
      {error && !price && <span className="error">Enter valid price</span>}
      <input
        type="text"
        className="name"
        value={category}
        onChange={(e) =>{ setCategory(e.target.value)}}
        id=""
        placeholder="enter product category"
      />
      {error && !category && <span className="error">Enter valid category</span>}
      <input
        type="text"
        name=""
        className="name"
        value={company}
        onChange={(e) =>{ setCompany(e.target.value)}}
        placeholder="enter product company"
      />
      {error && !company && <span className="error">Enter valid company</span>}
      <button type="button" onClick={addProduct} className="btn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
