import Link from "next/link"
import './Logo.css'
import Image from "next/image"
const Logo = () => {
  return (
    <Link href="/" className="font-bold flex items-center justify-center w-auto h-full">
     <Image src='/logo/profile.webp' width={120} height={45} className="w-32 h-11" alt='Akdevp cover logo' />
    </Link>
)
}

export default Logo