"use client"
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import SignOutBtn from "../SignOutBtn/SignOutBtn";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"
import Logo from"../Logo/Logo"
const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Blogs",
    url: "/blog",
  },
  {
    id: 2,
    title: "Projects",
    url: "/projects",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  }
];
const Navbar = () => {
  const { data: session, status } = useSession()
  const [sidenav, setsidenav] = useState(false);

  const handleNav = () =>{
      setsidenav(!sidenav)
   }
return (
    <div className="navbar w-full h-14 pt-2 z-50 flex justify-between items-center bg-text-50">
{/* Logo */}
<Logo />
      <button className="md:hidden " onClick={handleNav}>
        <Image src="/icons/side-menu.svg" width="45" height="45" className=" " alt="Navbar manue icon" />
      </button>
      <div className="linkContainer hidden md:flex items-center justify-center gap-5">
      <DarkModeToggle />
      {links.map((link) => (
        <Link key={link.id} href={link.url} className="py-5 flex items-center justify-center active:border-b-4 text-base border-primary focus:border-b-4">
          {link.title}
        </Link>
      ))}
      { (status === "authenticated" && session?.user?.verified ) &&
        <Link href="/dashboard" className="h-20 flex items-center justify-center active:border-b-4 border-primary text-base focus:border-b-4" >Dashboard</Link>
      }
<SignOutBtn />
      </div>
      { sidenav && 
            <div className="fixed md:hidden z-50 top-0 left-0 w-[50%] h-[100vh] bg-background text-text" onMouseLeave={()=> setsidenav(!sidenav)}>

<div className="linkCol flex flex-col items-start gap-2 ">
  <div className=" pl-4 pt-2">
<Logo />
  </div>

{links.map((link) => (
      <Link key={link.id} onClick={()=> setsidenav(!sidenav)} href={link.url} className="w-full flex items-center px-4 h-11 hover:bg-green-500 ">
        {link.title}
      </Link>
    ))}
    { (status === "authenticated" && session?.user?.verified ) &&
        <Link href="/dashboard" className="w-full flex items-center px-4 h-11 hover:bg-background-100" >Dashboard</Link>
      }
    <div className="mx-4 flex flex-col gap-6">
<SignOutBtn />
<DarkModeToggle />
    </div>
</div>
</div>
}
    </div>
  );
};

export default Navbar;
