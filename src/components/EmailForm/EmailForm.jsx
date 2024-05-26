"use client"
import { useRef } from "react";
import { IoMdMail } from "react-icons/io";
import { toast ,ToastContainer } from "react-toastify";

const EmailForm = () => {
    const formRef = useRef()
    const handleMail = async (e) => {
        e.preventDefault();
    const form = new FormData()
    const userName = e.target[0].value
        const email = e.target[1].value
        const message = e.target[2].value
    
    if (userName !== '' && email !== '' && message !== '') {
        form.append("userName", userName )
        form.append("email", email)
        form.append("message", message)
        
        const sendData = await fetch('api/sendmail', {
            method: 'POST',
            body: form
        })
        const jsData = await sendData.json();
        if (jsData.success === true ) {
          toast.success('We Have Recieved Your Email, Thanks for Your Time🥰.')
          formRef.current.reset()
        }
    }else{
        toast.error("Please Fill all fiels & Your message lenght should be > 10")
    }
        
    }
    return (
        <form ref={formRef} className="w-auto flex-1 flex flex-col gap-5" onSubmit={handleMail}>
            <h1 className="flex gap-4 text-xl lg:text-2xl items-center justify-center text-center"><IoMdMail color="darkred" size={40} /> Contact Me</h1>
            <input type="text" name="name" placeholder="Your Name" className="p-2 bg-transparent border-2 outline-none border-text rounded text-lg w-full" />
            <input type="text" name="email" placeholder="Email Address" className="p-2 bg-transparent border-2 outline-none border-text rounded text-lg w-full" />
            <textarea name="message" id="msg" cols="30" rows="7" placeholder="Type your message..." className="p-2 bg-transparent border-2 outline-none border-text rounded text-lg w-full"></textarea>
            <button className="h-8 px-2 rounded bg-primary text-black font-bold border-none w-fit">Send Mail</button>
            <ToastContainer />
        </form>
    )
}

export default EmailForm