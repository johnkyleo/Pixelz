import React from 'react'

const ProductDesc = () => {
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
            <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
            
        </div>
        <div className='flex flex-col pb-16'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptates quia corporis maiores eos, 
                similique, accusantium qui vel, nostrum est dolores sint quasi maxime in quam quibusdam? Animi, ipsam reprehenderit.</p>
        </div>
    </div>
    
  )
}

export default ProductDesc;