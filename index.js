const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
const Login = require("./db/Login");
const cors = require("cors");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";
app.use(express.json());
app.use(cors());

//route of api,calling api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "no response found something went wrong please try again later",
      });
    }
    res.send({ result, auth: token });
  });
});

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "no response found something went wrong please try again later",
      });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    let loginCredenntials=await User.findOne(req.body).select("-name")
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, async(err, token) => {
        if (err) {
          res.send({
            result:
              "no response found something went wrong please try again later",
          });
        }
       
        res.send({ user, auth: token, loginCredenntials });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add-product", verifyToken,async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken,async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no response" });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {

        res.status(401).send({result:"please provide valid token"})
      } else {
        next();
      }
    });
  } else {


    res.status(403).send({result:"please add token with header"})
  }
 
}

app.listen(8000, function (err) {
  if (err) console.log("error found");
  console.log("Server listening on PORT");
});

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model("product", productSchema);
//     const data = await product.find();
//     console.log(data);
//   } catch (error) {
//     console.error("the err is"+error);
//   }
// };
// connectDB();
