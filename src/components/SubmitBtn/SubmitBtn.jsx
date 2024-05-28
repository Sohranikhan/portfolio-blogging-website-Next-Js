"use client"
import Loader from "../Loader/Loader"
const SubmitBtn = ({text, loading}) => {
    if (loading) {
        return(
            <button type='submit' disabled className=" flex items-center justify-center w-full h-9 bg-primary py-1 rounded text-black font-bold">
            <Loader />
        </button>
        )
    } else {
        return(
        <button type='submit' className=" w-full h-9 bg-primary py-1 rounded text-black font-bold">
            {text}
        </button>
        )
    }
}

export default SubmitBtn