"use client"
// import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { handleComment } from "../../actions/actions";
import { usePathname } from "next/navigation";
import LoginForm from "../../app/(auth)/login/Loginform";

var path;
const CommentForm = ({postId}) => {
    path = usePathname()
    const [login, setlogin] = useState(false)
    const ref = useRef()
    return (
        <div>
        <form ref={ref} action={async (formData) => {
            const data = await handleComment(formData)
            if(data?.status === 500){
                setlogin(true)
                return
            }
            if (data?.success === true) {
                toast.success(data.message,{
                    theme:"dark",
                    autoClose: 3000
                })
            }
            else{
                (data);
                toast.error("Something Went Wrong!",{
                    theme:"dark",
                    autoClose: 3000
                })
            }
            ref.current?.reset()
        }}
        className="w-full flex items-center justify-center relative ">
            <textarea name="comment" rows="2" placeholder="Type Comment.." className="w-full text-xl rounded bg-transparent border-2 border-background-500 p-2 resize-none"></textarea>
            <input type="text" name="postid" defaultValue={postId} hidden />
            <input type="text" name="path" defaultValue={path} hidden />
            <button className="absolute top-0 right-0 px-4 border-none h-full my-auto">
                <Image src="/icons/paper-plane.svg" width="30" height="30" alt="Post Comment" />
            </button>
        </form>
            <ToastContainer />
            {login && <div className="fixed top-12 left-0 flex flex-col items-center justify-center w-full h-[100vh] bg-background-100 text-center">
                <button className="absolute top-14 right-8 z-30" onClick={()=>setlogin(false)}>✖️</button>
                <h2 className="my-6">Please Login Before Submit Your <br /> Comment🙂</h2>
                <div className="max-w-[600px] w-full">
                <LoginForm callBack={path} setlogin={setlogin} />
                </div>
                </div>}
                </div>
    )
}

export default CommentForm