import React, { useEffect, useState } from 'react'
import { TbTrash } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';


//Get All Products
const ListProduct = () => {
  const api = import.meta.env.VITE_SERVER_URI;

    const [allproducts, setAllproducts] = useState([]);
    const fetchInfo = async () =>{
      await fetch(`${api}/allproducts`)
      .then((res)=> res.json())
      .then((data)=> {setAllproducts(data)})
    }
    useEffect(() =>{
      fetchInfo();
    },[])


//Remove Product
  const remove_product = async (id) => {
    await fetch(`${api}/removeproduct`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
    toast("Successfully Removed")
  }

  return (
    <div className='p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7'>
      <div><Toaster/></div>
      <h4 className='bold-22 p-5 uppercase'>Product List</h4>
        <div className='max-h-[77vh] overflow-auto px-4 text-center  '>
          <table className='w-full mx-auto'>
            <thead>
              <tr className='bg-primary bold-14 sm:regular-22 text-start py-12'>
                <th className='p-2'>Product</th>
                <th className='p-2'>Title</th>
                <th className='p-2'>Old Price</th>
                <th className='p-2'>New Price</th>
                <th className='p-2'>Category</th>
                <th className='p-2'>Remove</th>
              </tr>
            </thead>
            <tbody>
                {allproducts.map((product,i) => (
                  <tr key={i} className='border-b border-slate-900/20 text-gray-30 p-6 medium-14'>
                     <td className='flexStart sm:flexCenter'>
                     <img src={`${product.image}`} alt="" className='rounded-lg ring-1 object-scale-down w-16 h-16 ring-slate-900/5 my-1'/>
                     </td>
                     <td><div className='line-clamp-3'>{product.name}</div></td>
                     <td>${product.old_price}</td>
                     <td>${product.new_price}</td>
                     <td>{product.category}</td>
                     <td><div className='bold-22 pl-6 sm:pl-14'><TbTrash onClick={(() => remove_product(product.id))} /></div></td>
                  </tr>
                ))}
              
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ListProduct