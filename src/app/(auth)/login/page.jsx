import LoginForm from "./Loginform";
import Logo from '../../../components/Logo/Logo'
const Login =  () => {
  return (
    <div className=" h-auto min-h-[34rem] flex items-center justify-center">
      <div className=" w-[30rem] max-w-[520px] flex flex-col items-center justify-center gap-2 rounded">
        <h2 className="w-full py-1 my-3 text-center text-3xl font-extrabold">
        Please Login to 
        </h2>
        <Logo />
        <LoginForm callBack='/' />
      </div>
    </div>
  );
};

export default Login;
