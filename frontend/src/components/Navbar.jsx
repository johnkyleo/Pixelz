import { NavLink } from "react-router-dom"
import { LuCable } from "react-icons/lu";
import { IoPhonePortraitOutline,IoHomeOutline,IoLaptopOutline } from "react-icons/io5";



const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> <IoHomeOutline />Home</div> </NavLink>
        <NavLink to={'/phone'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> <IoPhonePortraitOutline />  Phone's</div> </NavLink>
        <NavLink to={'/laptop'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> <IoLaptopOutline />Laptop's</div> </NavLink>
        <NavLink to={'/accessory'} className={({isActive}) => isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> <LuCable />Accessories</div> </NavLink>    
    </nav>
  )
}

export default Navbar