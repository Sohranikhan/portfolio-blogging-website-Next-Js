import Link from "next/link";
const Button = ({text,url, title}) => {

    return ( 
        <Link href={url} className=" w-full px-2 mt-6 h-11 flex items-center justify-center" title={title}>
                    <button className="font-bold flex items-center text-base justify-center w-fit px-4 h-8 rounded-lg bg-primary hover:bg-green-700 text-black">{text}</button>
        </Link>
     );
}
 
export default Button;