import { useState, useEffect } from 'react';
import Item from './Item'

const RelatedProducts = () => {

  const[popular, setPopular] = useState([]);
  const api = import.meta.env.VITE_SERVER_URI;

  useEffect(() => {
    fetch(`${api}/popularproducts`)
    .then(response => response.json())
    .then(data => {
       const randomItems = [];
       for (let i = 0; i < 4; i++) {
         const randomIndex = Math.floor(Math.random() * data.length);
         randomItems.push(data[randomIndex]);
         data.splice(randomIndex, 1);
       }
       setPopular(randomItems);

  });
  },[])

  return (
    <section className='bg-white'>
        <div className='max_padd_container py-12 xl:w-[88%]'>
            <h3 className='h3 text-center'>Related Products</h3>
            <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16'/>
                <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {popular.map((item) => (
                        <Item key={item.id} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price}/>
                    ))}
                </div>
        </div>

    </section>
  )
}

export default RelatedProducts