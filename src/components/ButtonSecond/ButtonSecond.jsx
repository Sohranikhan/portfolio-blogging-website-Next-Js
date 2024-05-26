import Link from "next/link";
const Button = ({text,url, title}) => {

    return ( 
        <Link href={url} className="max-w-auto w-full mt-6 h-8 flex items-center justify-center" title={title}>
                    <button className=" w-auto min-w-auto px-2 hover:bg-text hover:text-background h-8 text-base rounded-lg bg-transparent border-2 border-text text-text">{text}</button>
        </Link>
     );
}
 
export default Button;