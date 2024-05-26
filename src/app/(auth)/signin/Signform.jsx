"use client"
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import SubmitBtn from'../../../components/SubmitBtn/SubmitBtn'
import PasswordInput from "../../../components/PasswordInput/PasswordInput";

const Signform = () => {
const router = useRouter()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
          if (name != '' && email != '' && password != '' && password.length > 5) {
            
            const res= await fetch("/api/signin",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const response = await res.json();
            response.success === true && router.push(encodeURI(`/login`))
            if (response.success === false) {
               toast.error(response.message, {
                theme: "dark",
                });
            }
          }
          else{
            toast.error("Please fill form correctly", {
              theme: "dark",
              });
          }
        } catch (error) {
          toast.error(error, {
            theme: "dark",
            });
        }
    
    }
  
    return ( 
        <form onSubmit={handleSubmit} className="w-full md-w-[90%] flex items-center justify-center flex-col gap-4">
        <input
            className="w-full h-9 border rounded border-slate-500 px-3 text-base bg-transparent outline-none"
            type="text"
            name="name"
            id="fullname"
            placeholder="Enter your Full Name"
          />
        <input
            className="w-full h-9 border rounded border-slate-500 px-3 text-base bg-transparent outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
         <PasswordInput />
          <SubmitBtn text={'SignIn'} />
          <p className="text-primary-600 font-bold text-sm">
            Have an account?{" "}
            <a href="/api/auth/signin" className=" text-pink-500 font-bold">
              Login
            </a>
          </p>
          <ToastContainer />
        </form>
     );
}
 
export default Signform;