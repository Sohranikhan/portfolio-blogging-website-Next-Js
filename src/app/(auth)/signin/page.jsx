"use client"
import Signform from "./Signform";
import Logo from "../../../components/Logo/Logo";

const SignIn = () => {

  return (
    <div className=" h-auto min-h-[34rem] flex items-center justify-center">
      <div className="w-[30rem] max-w-[520px] flex flex-col items-center justify-center gap-1 rounded">
        <h2 className="w-full py-1 text-center text-3xl font-extrabold">
        Please SignIn to  
        </h2>
<Logo />
{/* form component */}
<Signform />
        
      </div>
    </div>
  );
};

export default SignIn;
