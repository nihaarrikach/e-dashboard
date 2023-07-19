import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/product/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (e) => {
    console.warn(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        name=""
        placeholder="search product"
        className="inputproduct"
        onChange={searchHandle}
      />
      <ul>
        <li>Sno</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Comapny</li>
        <li>Operation</li>
      </ul>
      {  products.length>0 ? products.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button className="button" onClick={() => deleteProduct(item._id)}>
              delete
            </button>
            <Link to={"/update/" + item._id}>update</Link>
          </li>
        </ul>
      )
        : <h1>No Result Found</h1>
      }
    </div>
  );
};
export default ProductList;
