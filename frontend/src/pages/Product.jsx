import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import {useParams} from 'react-router-dom'
import ProductHd from "../components/ProductHd";
import ProductDisplay from "../components/ProductDisplay";
import ProductDesc from "../components/ProductDesc";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const {all_products} = useContext(ShopContext);
  const {productId} = useParams();
  const productIdNumber = Number(productId);
  
  
  const product = all_products.find((e)=> e.id === Number(productId));

 
  if(!product){
    return <div>Product Not Found</div>
  }

  return (
    <section className="max_padd_container py-20">
      <div>
        <ProductHd product={product}/>
        <ProductDisplay product={product}/>
        <ProductDesc/>
        <RelatedProducts/>
      </div>
    </section>
  )
}

export default Product