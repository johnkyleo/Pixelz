import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async() => {
    console.log("LOGIN CLICKED", formData)
    let responseData;
     await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers:{
        Accept: 'application/formData',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)
    
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
      toast("Succesfully Login");
    }
    else{
      toast.error(responseData.errors)
    }
  }
  const signup = async() => {
    console.log("Sign Up CLICKED", formData)
    let responseData;
     await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers:{
        Accept: 'application/formData',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)
    
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      toast(responseData.token)
      window.location.replace('/')
    }
    else{
      toast.error(responseData.errors)
    }
  }

  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div><Toaster/></div>
      <div className='max-w[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md'>
        <h3 className='h3'>{state} </h3>
        <div className='flex flex-col gap-4 mt-7'>
          {state == "Sign Up" ? <input type="text" name="username" placeholder='Username' value={formData.username} onChange={changeHandler}
          className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/> : ''}
          
          <input type="email" name="email" placeholder='Email Address' value={formData.email} onChange={changeHandler}
          className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/>

          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={changeHandler}
          className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'/> 
        </div>
        <button onClick={() => {state === "Login"? login() : signup()}} className='btn_dark_rounded my-5 w-full !rounded-md'>Continue</button>
        {state == "Sign Up"?<p className='text-black font-bold'>Already have an account? <button onClick={() => {setState("Login")}} className='text-secondary underline cursor-pointer'>Login</button></p>:
        <p className='text-black font-bold'>Create an account? <button onClick={() => {setState("Sign Up")}} className='text-secondary underline cursor-pointer'>Click Here</button></p>}
        <div className='flexCenter mt-6 gap-3'>
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  )
}

export default Login