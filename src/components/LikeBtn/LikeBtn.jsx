"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { handleLike } from "../../actions/actions"
import LoginForm from "../../app/(auth)/login/Loginform"
import { usePathname } from "next/navigation"
const LikeBtn = ({ postId, preLikes}) => {
const path = usePathname()
    const [tLikes, settLikes] = useState(preLikes)
const [login, setlogin] = useState(false)

return (
    <>
    <form action={async(FormData)=>{
        const res = await handleLike(FormData)
        if (res?.status=== 500) {
            setlogin(true)
        }
        if (res?.success === true ) {
            toast.success(res?.message,{
                theme: 'dark'
            })
            settLikes(res?.likes)
        }else{
            toast.error(res?.message,{
                theme: 'dark'
            })
        }
    }} className="overflow-visible flex w-auto items-center gap-2">
        <input type="text" name="postid" defaultValue={`${postId}`} hidden/>
            <p>{tLikes}</p>
            <button className="flex gap-1 border-none bg-transparent">
                 ❤️
            </button>
    </form>
    {login && <div className="fixed top-12 left-0 flex flex-col items-center justify-center w-full h-[100vh] bg-background-100 text-center">
                <button className="absolute top-14 right-8 z-30" onClick={()=>setlogin(false)}>✖️</button>
                <h2 className="my-6 text-gray-300">To Like Post, You Have To <br />
                 <span className="text-primary-500">Login</span> Before</h2>
                <div className="max-w-[600px] w-full">
                <LoginForm callBack={path} setlogin={setlogin} />
                </div>
                </div>
                }
    </>
    )
}

export default LikeBtn