import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import bannermens from './assets/bannermens.png'
import bannerwomens from './assets/bannerwomens.png'
import bannerkids from './assets/bannerkids.png'



export default function App() {
  return (
    <main className="bg-white text-tertiary">
      <BrowserRouter>
      <Header/>

        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/phone" element={<Category category="phone" banner={bannermens}/>} />
          <Route path="/laptop" element={<Category category="laptop" banner={bannerwomens}/>} />
          <Route path="/accessory" element={<Category category="accessory" banner={bannerkids}/>} />
          <Route path="/product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart-page" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </main>
  )
}