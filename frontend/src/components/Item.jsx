import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";


const Item = ({id, name, image, old_price, new_price}) => {
  return (
    <div className='rounded-xl overflow-hidden shadow-1g'>
        <div className='relative flexCenter group overflow-hidden 
        transition-all duration-100'>
            <Link to={`/product/${id}`} className='h-12 w-12 bg-white rounded-full flexCenter 
            absolute top-1/2 bottom-1/2 !py-2 z-20 scale-0 
            group-hover:scale-100 transition-all duration-500' ><FaSearch 
            className='hover:rotate-90 hover:scale-125 transition-all duration-200'/> 
            </Link>
                <img onClick={window.scrollTo(0, 0)} src={image} alt="productImage" className='w-60 h-80 object-scale-down block group-hover:scale-110
                transition-all duration-1000'/>
            
        </div>
        <div className='overflow-hidden text-center'>
            <h4 className='my-[6px] medium-16 line-clamp-2 text-gray-30'>{name}</h4>
                <div className='flex gap-5 align-center justify-center'>                   
                    <div className='bold-16'>
                        ${new_price}
                    </div>
                    <div className='bold-16 line-through text-orange-600'>
                        ${old_price}
                    </div>
                </div>
        </div>
    </div>
   
  )
}

export default Item