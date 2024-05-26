"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
const SignOutBtn = () => {
    const { data: session } = useSession()
if (session?.user?.verified) {
  return (
      <button className=" p-[2px] border-none bg-primary text-black text-sm font-bold hover:bg-primarydark rounded" title="Sign Out" onClick={() => signOut()}>Sign Out</button>
  )
}
return (
    <Link href="/api/auth/signin" className="p-[2px] border-none bg-primary text-sm text-black hover:bg-primarydark font-bold rounded" title="Sign In">Sign In</Link>
     );
}
 
export default SignOutBtn;