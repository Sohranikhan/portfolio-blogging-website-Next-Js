"use client"
import { useRouter } from 'next/navigation'
import { handleOtp, resendOtp } from '../../actions/actions'
import { ToastContainer, toast } from 'react-toastify'
const OtpForms = ({ id }) => {
  const router = useRouter()
  return (
    <div className='w-full h-auto min-h-[34rem]'>
      <form action={async (FormData) => {
        const data = await handleOtp(FormData)
        if (data?.success === true) {
          router.push('/login')
        }
        else {
          toast.error(data?.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }}
        className="flex flex-col items-start gap-3 w-full max-w-96">
        <h2 className="mb-5">Please Enter OTP, Sended <br /> To Your Email</h2>
        <input type="text" name='otp' className="w-full text-2xl mx-auto h-11 p-2 border-4 bg-transparent text-center outline-none border-primary-400 rounded" placeholder="0000" />
        <input type="text" name='id' defaultValue={id} hidden />
        <button className="h-8 px-2 my-3 rounded w-fit bg-primary text-black">Verify</button>
      </form>
      <form action={async (FormData) => {
        const data = await resendOtp(FormData)
        if (data?.success === true) {
          toast.success(data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else {
          toast.error(data?.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

      }}></form>
      <input type="text" name='id' defaultValue={id} hidden />
      <button className="h-9 px-2 rounded w-fit my-2  bg-primarydark text-black" type='submit'>Resend OTP</button>
      <ToastContainer />
    </div>
  )
}

export default OtpForms