import Nav from "./components/Nav";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AddProduct from "./components/AddProduct"
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login"
import ProductList from "./components/ProductList"
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Routes>
          <Route element={<PrivateComponent></PrivateComponent>}>
            <Route path="/" element={<ProductList/>}></Route>
            <Route path="/add" element={<AddProduct/>}></Route>

            <Route path="/update/:id" element={<UpdateProduct></UpdateProduct>}></Route>
            <Route path="/logout" element={<h1>logout component</h1>}></Route>
            <Route path="/profile" element={<h1>Profile component</h1>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
