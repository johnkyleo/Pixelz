import React, { createContext, useEffect, useState } from 'react';


export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const[all_products, setAll_products] = useState([]);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    fetch('http://localhost:4000/allproducts').then((response) => response.json()).then((data) => setAll_products(data));
    if(token){
      fetch ("http://localhost:4000/getcart", {
        method: 'POST',
        headers:{
          Accept: 'application/form-data', 
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: "", 
      }).then((response) => response.json()).then((data) => setCartItems(data));
    }
  },[])


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(token){
      fetch ("http://localhost:4000/addtocart", {
        method: 'POST',
        headers:{
          Accept: 'application/form-data',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({'itemId': itemId}),  
      }).then((response) => response.json()).then((data) => console.log(data));
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      fetch ("http://localhost:4000/removefromcart", {
        method: 'POST',
        headers:{
          Accept: 'application/form-data',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({'itemId': itemId}),  
      }).then((response) => response.json()).then((data) => console.log(data));
    }
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_products.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItem = 0
    for(const item in cartItems){
      if(cartItems[item]> 0 ){
        totalItem += cartItems[item]
      }
    }
    return totalItem;
  }

  const contextValue = {getTotalCartItems, getTotalAmount, all_products, cartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;