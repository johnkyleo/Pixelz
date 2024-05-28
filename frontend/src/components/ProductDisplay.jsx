import React, { useContext } from 'react'
import nophoto from '../assets/nophoto.jpg'

import {MdStar} from "react-icons/md"
import { ShopContext } from '../context/ShopContext'

const ProductDisplay = (props) => {

        const {product} = props;
        const {addToCart} = useContext(ShopContext);
  return (
    <section>
        <div className='flex flex-col gap-14 xl:flex-row'>
           {/* left side */}
            <div className='flex gap-x-2 xl:flex-1'>
                <div className='flex flex-col gap-[7px] flex-wrap'>
                    <img src={nophoto} alt="productImage" className='max-h-[99px]'/>
                    <img src={nophoto} alt="productImage" className='max-h-[99px]'/>
                    <img src={nophoto} alt="productImage" className='max-h-[99px]'/>
                    <img src={nophoto} alt="productImage" className='max-h-[99px]'/>
                </div>
                <div>
                    <img src={product.image} alt="" />
                </div>
            </div>
            {/* right side */}
            <div className='flex flex-col xl:flex-[1.5]'>
                <h3 className='h3'>{product.name}</h3>
                <div className='flex gap-x-2 text-yellow-400 medium-22'>
                    <MdStar/>
                    <MdStar/>
                    <MdStar/>
                    <MdStar/>
                    <p>(111)</p>
                </div>
                <div className='flex gap-x-6 medium-20 my-4'>
                    <div className='line-through text-orange-600'>${product.old_price}</div>
                    <div className='text-secondary '>${product.new_price}</div>
                </div>
                <div className='mb-4'>  
                    <div className='flex gap-3 my-3'>
                        
                    </div>
                    <div className='flex flex-col gap-y-3 mb-4 max-w-[555px]'>
                        <button onClick={() => {addToCart(product.id)}} 
                        className='btn_dark_outline !rounded-none uppercase regular-14 tracking-widest'>Add to cart</button>
                        <button className='btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest'>Buy it now</button>
                    </div>
                    <p><span className='medium-16 text-tertiary'>Category :</span> Lorem | Ipsum | Dolor | Sit</p>
                    <p><span className='medium-16 text-tertiary'>Tags :</span> Lorem | Ipsum </p>
                    </div>
            </div>
        </div>
    </section>
  )
}

export default ProductDisplay