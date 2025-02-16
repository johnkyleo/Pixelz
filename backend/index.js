const port = 4000;
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer =  require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { type } = require("os");
const _ = require('lodash');
require('dotenv').config();

app.use(express.json());
app.use(cors());


//DB Connection
mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("DB Connected")
}).catch((error)=>{
  console.log("Error Connecting to Mongo DB: "+ error)});

//Api creation
app.get("/",(req, res)=>{
  res.send("Express is running")
})

//Image Storage using Multer
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) =>{
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage});
//Upload Endpoint
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/upload', upload.single('product'), async (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;

  // Save imageUrl to MongoDB
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    image: imageUrl,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  try {
    await product.save();
    res.send({ success: true, imageUrl });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

//Product Schema
const Product = mongoose.model("Product",{
    id: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      requie: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    new_price: {
      type: Number,
      require: true,
    },
    old_price: {
      type: Number,
      require: true
    },
    date:{
      type: Date,
      default: Date.now,
    },
    available:{
      type: Boolean,
      default: true,
    }
})

//Add Product Endpoint
app.post('/addproduct', async(req, res) => {

    let products = await Product.find({});
    let id;
    if(products.length > 0){
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1 ;
    }
    else{
      id = 1;
    }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price, 
  });
  console.log(product);
  await product.save();
  console.log("Saved")
  res.json({
    success: true,
    name: req.body.name,
  })
})

//Remove Product Endpoint
app.post('/removeproduct', async(req, res) =>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed")
    res.json({
      success: true,
      name: req.body.name,
    })

})

//Get All Product End Point
app.get('/allproducts', async(req, res) => {
  let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products);
})

//New Collection End Point
app.get('/newcollection', async(req, res) => { 
  let products = await Product.find({}); 
  let newcollection = products.slice(1).slice(-8); 
  console.log("New Collection Fetched"); 
  res.send(newcollection); 
})

//Popular Item End Point
app.get('/popularproducts', async(req, res) => {
  let products = await Product.find({category: "phone"}); 
  let newcollection = products.slice(0, 4); 
  console.log("Popular Product Fetched"); 
  res.send(newcollection); 
})



//User Schema
const User = mongoose.model("User",{
  name: {
    type: String
  },
  email:{
    type: String,
    unique: true,
  },
  password:{
    type: String,
  },
  cartData:{
    type: Object,
  },
  date:{
    type: Date,
    default: Date.now,
  }

})

//Creating Account End Point
app.post('/signup', async(req, res) =>{
  let check = await User.findOne({email:req.body.email});

    if (check){
      return res.status(400).json({success:false, errors: "Email Already Exist"});
    }
   
    let cart = {};
    for(let i = 0; i < 300; i++){
      cart[i]= 0;
    }

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    })
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})
})

//Login Endpoint
app.post('/login', async(req, res) => {
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passMatch = req.body.password === user.password;
            if(passMatch){
              const data = {
                user:{
                  id: user.id
                }
              }
              const token = jwt.sign(data, 'secret_ecom');
              res.json({success: true, token})
            }else{
              res.json({success: false, errors:"Invalid Password"})
            }
      }else{
        res.json({success: false, errors:"Invalid Email"})
      }
})


//Fetch user Middleware
const fetchUser = async(req, res, next) => {
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors: 'Please Login First1'})
  }
  else{
    try{
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    }catch(error){
      res.status(401).send({errors: 'Please Login First2'})
    }
  }
}

//Add to Cart End Point
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log("Added", req.body.itemId)
  let userData = await User.findOne({_id: req.user.id})
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
  res.json({ message: 'Item Added' });
})

//Remove Cart End Point
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log("Removed", req.body.itemId)
  let userData = await User.findOne({_id: req.user.id})
  if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
  }   
  res.json({ message: 'Item removed' });
})

//GetCart Data Endpoint
const { ObjectId } = require('mongoose').Types;

app.post('/getcart', fetchUser, async(req, res) => {
 
 let userData = await User.findOne({_id: req.user.id});
 res.json(userData.cartData)
});

app.listen(port, (error)=>{
  if(!error){
    console.log("Server is running: "+ port)
  }
  else{
    return("error: "+ error)
  }
})