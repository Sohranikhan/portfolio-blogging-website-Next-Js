"use client"
import { toast, ToastContainer } from "react-toastify";

const DeleteBtn = ({ id, path , handler}) => {
    return (
    <div className="flex items-start justify-center mx-3">
    <form
      action={async(formData)=>{
        const data = await handler(formData)
        if (data?.success===true) {} 
        else {
         toast.error(data?.error,{
           theme:'dark'
         })
        }
       }}
      title="Delete Post"
      className="bg-red-500 text-white h-9 px-2 flex items-center justify-center rounded"
    >
      <input type="text" name="id" defaultValue={`${id}`} hidden />
      <input type="text" name="path" defaultValue={`${path}`} hidden />
      <button className=" bg-transparent border-none ">Delete</button>
    </form>
    <ToastContainer />
    </div>
  );
};

export default DeleteBtn;
