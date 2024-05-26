import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer w-full mt-4 text-xs h-auto flex flex-col items-center justify-between">
      <div className="icons flex items-center w-full max-w-lg justify-evenly mb-4 relative">
        <Link href="#">
          <Image
            src="/icons/facebook.svg"
            width="36"
            height="36"
            alt="Social Media Icons"
            className="w-9 h-9 cursor-pointer"
          />
        </Link>
        <Link href="#">
          <Image
            src="/icons/instagram.svg"
            width="36"
            height="36"
            alt="Social Media Icons"
            className="w-9 h-9 cursor-pointer"
          />
        </Link>
        <Link href="#">
          <Image
            src="/icons/whatsapp.svg"
            width="36"
            height="36"
            alt="Social Media Icons"
            className="w-9 h-9 cursor-pointer"
          />
        </Link>
        <Link href="#">
          <Image
            src="/icons/telegram.svg"
            width="36"
            height="36"
            alt="Social Media Icons"
            className="w-9 h-9 cursor-pointer"
          />
        </Link>
      </div>
      <p className="text-sm my-2">@2024 Akdevp All rights reserved.</p>
    </div>
  );
};

export default Footer;
