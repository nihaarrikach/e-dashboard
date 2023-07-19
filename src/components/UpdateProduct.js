import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
const navigate=useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

 const  getProductDetails = async () => {
    let result=await fetch(`http://localhost:8000/product/${params.id}`);
    result=await result.json();
    setName(result.name);
    setPrice(result.price);
    setCompany(result.company);
    setCategory(result.category);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "put",
      body:JSON.stringify({name,price,category,company}),
      headers:{'Content-Type':"application/json"}
    });
    result = await result.json();
    navigate('/')
  console.warn(result);
  };
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        className="name"
        placeholder="enter product name"
      />
      {error && !name && <span className="error">Enter valid name</span>}
      <input
        type="text"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="name"
        placeholder="enter product price"
      />
      {error && !price && <span className="error">Enter valid price</span>}
      <input
        type="text"
        className="name"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        id=""
        placeholder="enter product category"
      />
      {error && !category && (
        <span className="error">Enter valid category</span>
      )}
      <input
        type="text"
        name=""
        className="name"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        placeholder="enter product company"
      />
      {error && !company && <span className="error">Enter valid company</span>}
      <button type="button" onClick={updateProduct} className="btn">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
