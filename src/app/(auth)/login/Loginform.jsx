"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn";

const LoginForm = ({callBack, setlogin}) => {
  const router = useRouter()     
        const handleSubmit = async(e) =>{
            e.preventDefault()
            const email = e.target[0].value
            const password = e.target[1].value
            try {
                 const data = await signIn("credentials",{email,password ,redirec: false })
                  console.log(data);
                       if (res.status === 200) {
                         router.push(`https://akdevp.vercel.app/${callBack}`,'page'); 
                         setlogin && setlogin(false)
                         return
                        }
                      toast.error('Please Enter Correct Credentials!', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                 }
             
           catch (error) {
              toast.error(error, {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
        }
    return ( 
        <form onSubmit={handleSubmit} className="w-full md-w-[90%] flex items-center justify-center flex-col gap-4">
        <input
            className="w-full h-10 border rounded border-slate-500 px-3 text-lg bg-transparent outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            className="w-full h-10 border rounded border-slate-500 px-3 text-md bg-transparent outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <SubmitBtn text={'SignIn'} />
          <p className="text-primary-600 font-bold text-sm">
            Don not have an account?{" "}
            <a href="/signin" className=" text-pink-500 font-bold">
              SignIn
            </a>
          </p>
          
          <ToastContainer />
        </form>
     );
}
 
export default LoginForm;