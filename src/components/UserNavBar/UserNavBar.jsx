"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
const UserNavBar = () => {
  const session = useSession()
  if (!session?.data?.user) {
    return (
      <div className="w-full flex items-center justify-between h-8 p-2">
        <div className="userData w-auto flex gap-3 ">
          <p className="w-full">Join<span className="text-yellow-500 p-2">Writer Community</span></p>
        </div>
        <div className="w-fit h-auto flex items-end justify-end">
          <Link href="/api/auth/signin" className=" text-2xl"> 👆</Link>
        </div>
      </div>
    )
  }
  else if (session?.data?.user?.verified) {
    return (
      <div className="w-full flex items-start justify-between h-8 p-2 my-3">
        <div className=""></div>
        <Link href={`/user/${session?.data?.user?.id}`} className="userData w-auto flex gap-3 ">
          <div className="relative">
            <Image src={session?.data?.user?.image} width={35} height={35} alt={session?.data?.user?.name} />
            <p className="absolute top-[-8px] left-[-8px] text-sm">{session?.data?.user?.verified ? '🟢' : '🔴'}</p>
          </div>
          <p>{session?.data?.user?.name}</p>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="w-full flex items-center justify-between h-8 border-b-primary-300 p-2 ">
        <div className="userData w-auto flex gap-3 ">
          <div className="">
            <Image src={session?.data?.user?.image} width={35} height={35} alt={session?.data?.user?.name} />
            <p>{session?.data?.user?.verified ? '🟢' : '🔴'}</p>
          </div>
          <p>{session?.data?.user?.name}</p>
        </div>
        <div className="w-auto h-full flex gap-3">


          <Link href={`/verifyotp/${session.user.id}`}>Verify Now</Link>
        </div>
      </div>
    )
  }
}

export default UserNavBar