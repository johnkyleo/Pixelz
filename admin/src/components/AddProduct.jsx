import { MdAdd } from "react-icons/md";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddProduct = () => {
  const api = import.meta.env.VITE_SERVER_URI;

    const [productDetails, setProductDetails] = useState({
      name: "",
      image: "",
      category: "phone",
      new_price: "",
      old_price: "" 
    })
    const changeHandler = (e) => {
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    
    const Add_Product = async () => {
      let responseData;
      let product = productDetails;

      let formData = new FormData();
     
      await fetch(`${api}/upload`,{
        method: 'POST',
        headers:{
          Accept: 'application.json'
        },
        body: formData,
      }).then((resp) => resp.json())
      .then((data) => {responseData = data})

          if(responseData.success){
            product.image = responseData.image_url;
           
            await fetch(`${api}/addproduct`,{
              method: 'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(product),
            }).then((resp) => resp.json())
            .then((data)=> {
              if (data.success) {
                toast.success("Product Added");
                // Reset form fields
                setProductDetails({
                  name: "",
                  image: "",
                  category: "phone",
                  new_price: "",
                  old_price: ""
                });
                setImage(false);
              } else {
                toast.error("Upload Failed");
              }
            });
        }
    }



  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
      <div><Toaster/></div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product Name</h4>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here...' 
        className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Price</h4>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" 
        placeholder='Type here...' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Offer Price</h4>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here...'
         className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Image URL</h4>
        <input value={productDetails.image} onChange={changeHandler} type="text" name="image" placeholder='Type here...'
         className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
      </div>
      <div className='mb-3 flex items-center gap-x-4'>
        <h4 className='bold-18 pb-2'>Product Category</h4>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='bg-primary ring-1
         ring-slate-900/20 medium-16 outline-none rounded-sm'>
          <option value="phone">Phone</option>  
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>
     
      
      <button onClick={() => Add_Product()} className='btn_dark_rounded my-4 flexCenter gap-x-1'><MdAdd />Add Product</button>

    </div>
  )
}

export default AddProduct