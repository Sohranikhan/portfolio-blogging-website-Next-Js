"use client"
import { useState } from "react"
import {FaEye } from "react-icons/fa"
const PasswordInput = () => {
const [type, settype] = useState(false)

  return (
    <div className="w-full h-auto relative">
        <input 
            ref={ref}
            className="w-full h-9 border rounded border-slate-500 px-3 text-base bg-transparent outline-none"
            type={!type ? 'password' : 'text'}
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        <div className="absolute right-1 top-4"><FaEye size={30} color={'green'} onClick={()=> settype(!type)} /></div>
    </div>
  )
}

export default PasswordInput