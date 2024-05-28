"use client"
import Signform from "./Signform";
import Image from "next/image";

const SignIn = () => {

  return (
    <div className=" h-auto min-h-[34rem] flex items-center justify-center">
      <div className="w-[30rem] max-w-[520px] flex flex-col items-center justify-center gap-1 rounded">
        <h2 className="w-full py-1 text-center text-3xl font-extrabold">
        Please SignIn to  
        </h2>
        <Image src='/logo/profile.webp' width={120} height={45} className="w-32 h-11" alt='Akdevp cover logo' />
{/* form component */}
<Signform />
        
      </div>
    </div>
  );
};

export default SignIn;
