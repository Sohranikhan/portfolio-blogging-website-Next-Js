"use client"
import { useFormStatus } from 'react-dom'
const SubmitBtn = ({text}) => {
    const { pending } = useFormStatus()
    if (pending) {
        return(
            <button type='submit' disabled className=" w-full h-9 bg-primary py-1 rounded text-black font-bold">
            {text}
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